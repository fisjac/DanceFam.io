from flask import jsonify
from .db import db
from .event_type_style import Event
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    memberships = db.relationship("Membership", back_populates="user")
    registrations = db.relationship("Registration", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'communities':  {membership.community.id: membership.community.id for membership in self.memberships} if len(list(self.memberships)) else {} ,
            'events': {registration.event.id: registration.event.id for registration in self.registrations} if len(list(self.registrations)) else {}
        }
    def safe_info(self):
        return {
            'firstName': self.first_name,
            'lastName': self.last_name,
            'id': self.id
        }
