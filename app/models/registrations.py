from .db import db

class Registration(db.Model):
  __tablename__ = "registrations"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
  status_id = db.Column(db.Integer, db.ForeignKey("statuses.id"))

  events = db.relationship('Event', back_populates='users')
  users = db.relationship('User', back_populates='events')
