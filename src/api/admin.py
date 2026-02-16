import os
from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView



def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'darkly'
    admin = Admin(app, name='4Geeks Admin')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    # admin.add_view(ModelView(Products, db.session))
    # admin.add_view(ModelView(Bills, db.session))
    # admin.add_view(ModelView(BillItems, db.session))
    