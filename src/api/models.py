from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Enum  # IMPORT NECESARIO
from enum import Enum as PyEnum  # Para definir tu enum en Python


db = SQLAlchemy()


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