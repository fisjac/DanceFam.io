from .db import db, event_styles

class Style(db):
  __tablename__ = 'styles'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship('Event', secondary=event_styles, backpropagates='styles')
