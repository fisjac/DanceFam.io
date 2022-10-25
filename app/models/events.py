from .db import db
from .event_styles import event_styles
from .event_types import event_types

class Event(db):
  __tablename__ = 'events'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  community_id = db.Column(db.Integer, db.Foreignkey("communities.id"), nullable=False)

  # Relationships
  community = db.relationship("Community", backpopulates="events")

  users = db.relationship("Registration", backpopulates="events")

  styles = db.relationship("Style", secondary=event_styles, backpopulates='events')

  types = db.relationship('Type', secondary=event_types, backpropagates='events')
