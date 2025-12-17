from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
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
""""
class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'description': self.description,
                'price': self.price}
        
    def __repr__(self):
        return f'<Product: {self.id} - {self.name}>'
"""
    
class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id],
                              backref=db.backref('post_to', lazy='select'))


class Medias(db.Model):
    __tablename__ = 'medias'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum, nullable=False)
    url = db.Column(db.String(500), unique=True, nullable=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts',foreign_keys=[post_id],
                              backref=db.backref('media_to', lazy='select'))
    

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(500), unique=True, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id], 
                                   backref=db.backref('author_to', lazy='select'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts',foreign_keys=[post_id],
                              backref=db.backref('media_to', lazy='select'))


class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    user_from_id_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_from_id_to = db.relationship('Users', foreign_keys=[user_from_id_id], 
                                   backref=db.backref('user_from_id_to', lazy='select'))
    user_to_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to_id = db.relationship('Users', foreign_keys=[user_to_id],
                                  backref=db.backref('user_to_id_to', lazy='select'))


    

