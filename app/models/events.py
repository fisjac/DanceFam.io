from .db import db

event_styles = db.Table(
  "event_styles",
  db.Model.metadata,
  db.Column("id", db.Integer, primary_key=True),
  db.Column("event_id", db.Integer, db.ForeignKey("events.id")),
  db.Column("style_id", db.Integer, db.ForeignKey("styles.id"))
)

event_types = db.Table(
  "event_types",
  db.Model.metadata,
  db.Column("id", db.Integer, primary_key=True),
  db.Column("event_id", db.Integer, db.ForeignKey("events.id")),
  db.Column("type_id", db.Integer, db.ForeignKey("types.id"))
)

class Type(db.Model):
  __tablename__ = 'types'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship('Event', secondary=event_types, back_populates='types')

class Event(db.Model):
  __tablename__ = 'events'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)

  # Relationships
  community = db.relationship("Community", back_populates="events")

  users = db.relationship("Registration", back_populates="events")

  styles = db.relationship("Style", secondary=event_styles, back_populates='events')

  types = db.relationship('Type', secondary=event_types, back_populates='events')

class Style(db.Model):
  __tablename__ = 'styles'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship('Event', secondary=event_styles, back_populates='styles')
