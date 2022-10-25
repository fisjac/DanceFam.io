from .db import db

class Registration(db.Model):
  __tablename__ = "registrations"

  id = db.Column(db.Integer, primary_key=True),
  event_id =db.Column(db.Integer, db.ForeignKey("events.id"))
  status_id =db.Column(db.Integer, db.ForeignKey("statuses.id"))

  events = db.relationship('Event', backpopulates='users')
  users = db.relationship('User', backpopulates='events')
