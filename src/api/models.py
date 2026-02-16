from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Enum  
from enum import Enum as PyEnum  
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()



class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    is_active = db.Column(db.Boolean(), default=True)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)  # ✅ FIX

    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }


class Character(db.Model):
    __tablename__ = "characters"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    height = db.Column(db.String(20))
    mass = db.Column(db.String(20))
    hair_color = db.Column(db.String(50))
    skin_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(20))
    gender = db.Column(db.String(20))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender,
        }


class Planet(db.Model):
    __tablename__ = "planets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    diameter = db.Column(db.String(50))
    rotation_period = db.Column(db.String(50))
    orbital_period = db.Column(db.String(50))
    gravity = db.Column(db.String(50))
    population = db.Column(db.String(50))
    climate = db.Column(db.String(100))
    terrain = db.Column(db.String(100))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "diameter": self.diameter,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "gravity": self.gravity,
            "population": self.population,
            "climate": self.climate,
            "terrain": self.terrain,
        }


class Starship(db.Model):
    __tablename__ = "starships"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

    model = db.Column(db.String(120))
    manufacturer = db.Column(db.String(200))
    cost_in_credits = db.Column(db.String(50))
    length = db.Column(db.String(50))
    crew = db.Column(db.String(50))
    passengers = db.Column(db.String(50))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "cost_in_credits": self.cost_in_credits,
            "length": self.length,
            "crew": self.crew,
            "passengers": self.passengers,
        }

class CharacterFavorite(db.Model):
    __tablename__ = "character_favorites"
    __table_args__ = (
        UniqueConstraint("user_id", "character_id", name="uq_user_character_fav"),
    )

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"), nullable=False)

    user = db.relationship("User", backref=db.backref("favorite_characters", lazy=True))
    character = db.relationship("Character", backref=db.backref("favorited_by", lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character": self.character.serialize(),
        }


class PlanetFavorite(db.Model):
    __tablename__ = "planet_favorites"
    __table_args__ = (
        UniqueConstraint("user_id", "planet_id", name="uq_user_planet_fav"),
    )

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    planet_id = db.Column(db.Integer, db.ForeignKey("planets.id"), nullable=False)

    user = db.relationship("User", backref=db.backref("favorite_planets", lazy=True))
    planet = db.relationship("Planet", backref=db.backref("favorited_by", lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "planet": self.planet.serialize(),
        }


class StarshipFavorite(db.Model):
    __tablename__ = "starship_favorites"
    __table_args__ = (
        UniqueConstraint("user_id", "starship_id", name="uq_user_starship_fav"),
    )

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    starship_id = db.Column(db.Integer, db.ForeignKey("starships.id"), nullable=False)

    user = db.relationship("User", backref=db.backref("favorite_starships", lazy=True))
    starship = db.relationship("Starship", backref=db.backref("favorited_by", lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "starship": self.starship.serialize(),
        }

# Aqui comentado el modelo de datos de Instagram...


"""
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'
    # do not serialize the password, its a security breach
    def serialize(self):
        return {"id": self.id,
                "email": self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin,
                'first_name': self.first_name,
                'last_name': self.last_name}
        
        
class MediaType(PyEnum):
    FOTO = "foto"
    VIDEO = "video"
    
    
class Medias(db.Model):
    __tablename__ = 'medias'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(Enum(MediaType), nullable=False)  # <--- CORRECCIÓN
    url = db.Column(db.String(500), unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post_to = db.relationship('Post', foreign_keys=[post_id],
                              backref=db.backref('media_to', lazy='select'))
    
    
class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_to = db.relationship('User', foreign_keys=[user_id],
                              backref=db.backref('post_to', lazy='select'))
    
    
class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(500), unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author_to = db.relationship('User', foreign_keys=[author_id],
                                  backref=db.backref('author_to', lazy='select'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post_to = db.relationship('Post', foreign_keys=[post_id],
                              backref=db.backref('comment_to', lazy='select'))
    
    
class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    following_to = db.relationship('User', foreign_keys=[user_from_id],
                                   backref=db.backref('following_to', lazy='select'))
    user_to_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    follower_to = db.relationship('User', foreign_keys=[user_to_id],
                                  backref=db.backref('follower_to', lazy='select'))
    def __repr__(self):
        return f'<Follower {self.user_from_id} -> {self.user_to_id}>' 
    """