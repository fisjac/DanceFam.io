from .db import db

class Community(db.Model):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  users = db.relationship("Membership", back_populates="communities")
  events = db.relationship('Event', back_populates='community')
