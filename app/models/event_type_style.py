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
  __tablename__ = "types"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship("Event", secondary=event_types, back_populates="types")

class Event(db.Model):
  __tablename__ = "events"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  start_date= db.Column(db.DateTime, nullable=False)
  end_date= db.Column(db.DateTime, nullable=False)
  description = db.Column(db.String(255))
  city = db.Column(db.String(255))
  state = db.Column(db.String(255))
  address = db.Column(db.String(255))
  country = db.Column(db.String(255))
  community_id = db.Column(db.Integer, db.ForeignKey("communities.id"), nullable=False)
  organiser_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  # Relationships
  community = db.relationship("Community", back_populates="events")

  users = db.relationship("Registration", back_populates="event")

  styles = db.relationship("Style", secondary=event_styles, back_populates="events")

  types = db.relationship("Type", secondary=event_types, back_populates="events")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "start_date": self.start_date,
      "end_date": self.end_date,
      "city": self.city,
      "state": self.state,
      "address": self.address,
      "country": self.country,
      "community_id": self.community_id,
      "organiser_id": self.organiser_id,
    }

class Style(db.Model):
  __tablename__ = "styles"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship("Event", secondary=event_styles, back_populates="styles")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }
