from .db import db

class Registration(db.Model):
  __tablename__ = "registrations"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))
  event_id = db.Column(db.Integer, db.ForeignKey("events.id", ondelete="CASCADE" ))
  # status_id = db.Column(db.Integer, db.ForeignKey("statuses.id"))

  event = db.relationship('Event', back_populates='registrations')
  user = db.relationship('User', back_populates='registrations')
