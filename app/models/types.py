from .db import db
from event_types import event_types

class Type(db):
  __tablename__ = 'types'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship('Event', secondary=event_types, backpropagates='types')
