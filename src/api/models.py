from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Enum  # IMPORT NECESARIO
from enum import Enum as PyEnum  # Para definir tu enum en Python


db = SQLAlchemy()

# Aqui modelo de datos de starwars en develop.

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name
        }


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    description = db.Column(db.String(500))
    body = db.Column(db.Text)
    date = db.Column(db.Date, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('posts', lazy=True))
    
    
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(500), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship('User', backref=db.backref('comments', lazy=True))
    post = db.relationship('Post', backref=db.backref('comments', lazy=True))


class MediaType(PyEnum):
    IMAGE = "image"
    VIDEO = "video"


class Media(db.Model):
    __tablename__ = 'medias'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(Enum(MediaType), nullable=False)
    url = db.Column(db.String(500), nullable=False)

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post = db.relationship('Post', backref=db.backref('medias', lazy=True))
   
   
class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)

    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    follower = db.relationship(
        'User',
        foreign_keys=[follower_id],
        backref=db.backref('following', lazy='dynamic')
    )

    following = db.relationship(
        'User',
        foreign_keys=[following_id],
        backref=db.backref('followers', lazy='dynamic')
    )


class Character(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    height = db.Column(db.String(20))
    mass = db.Column(db.String(20))
    hair_color = db.Column(db.String(50))
    skin_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(20))
    gender = db.Column(db.String(20))


class Planet(db.Model):
    __tablename__ = 'planets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    diameter = db.Column(db.String(50))
    rotation_period = db.Column(db.String(50))
    orbital_period = db.Column(db.String(50))
    gravity = db.Column(db.String(50))
    population = db.Column(db.String(50))
    climate = db.Column(db.String(100))
    terrain = db.Column(db.String(100))


class CharacterFavorite(db.Model):
    __tablename__ = 'character_favorites'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))

    user = db.relationship('User', backref=db.backref('favorite_characters', lazy=True))
    character = db.relationship('Character', backref=db.backref('favorited_by', lazy=True))


class PlanetFavorite(db.Model):
    __tablename__ = 'planet_favorites'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))

    user = db.relationship('User', backref=db.backref('favorite_planets', lazy=True))
    planet = db.relationship('Planet', backref=db.backref('favorited_by', lazy=True))


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