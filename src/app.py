"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.admin import setup_admin
from api.commands import setup_commands
from api.routes import api

# Environment
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Static files (React build)
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "../dist/")

app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app)

# -------------------
# Database configuration
# -------------------
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url.replace("postgres://", "postgresql://")
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# -------------------
# JWT configuration
# -------------------
# Ideal: set JWT_SECRET_KEY in .env
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "change-this-secret")
jwt = JWTManager(app)

# -------------------
# Admin & Commands
# -------------------
setup_admin(app)
setup_commands(app)

# -------------------
# Routes / Blueprints
# -------------------
app.register_blueprint(api, url_prefix="/api")

# -------------------
# Error handling
# -------------------
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# -------------------
# Sitemap / Frontend serving
# -------------------
@app.route("/")
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, "index.html")


@app.route("/<path:path>", methods=["GET"])
def serve_any_other_file(path):
    full_path = os.path.join(static_file_dir, path)
    if not os.path.isfile(full_path):
        path = "index.html"

    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response


# -------------------
# Run server
# -------------------
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    debug = os.getenv("FLASK_DEBUG") == "1"
    app.run(host="0.0.0.0", port=PORT, debug=debug)
