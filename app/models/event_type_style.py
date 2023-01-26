from .db import db
from .registration import Registration

event_styles = db.Table(
  "event_styles",
  db.Model.metadata,
  db.Column("id", db.Integer, primary_key=True),
  db.Column("event_id", db.Integer, db.ForeignKey("events.id")),
  db.Column("style_id", db.Integer, db.ForeignKey("styles.id"))
)

class Type(db.Model):
  __tablename__ = "types"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  events = db.relationship("Event")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }

class Event(db.Model):
  __tablename__ = "events"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  start= db.Column(db.DateTime, nullable=False)
  end= db.Column(db.DateTime, nullable=False)
  city = db.Column(db.String(255))
  state = db.Column(db.String(255))
  address = db.Column(db.String(255))
  country = db.Column(db.String(255))
  lat = db.Column(db.Float())
  lng = db.Column(db.Float())
  external_url = db.Column(db.String(255), nullable=True)
  image_url = db.Column(db.String(255),nullable=True)
  organiser_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  type_id = db.Column(db.Integer, db.ForeignKey("types.id"))

  # Relationships
  # community = db.relationship("Community", back_populates="events")

  registrations = db.relationship("Registration", back_populates="event", cascade='delete')

  styles = db.relationship("Style", secondary=event_styles, back_populates="events")


  def get_user_events(user_id):
    events = db.session.query(Event).join(Registration).filter(Registration.user_id == user_id)
    return [event.name for event in events]

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "start": self.start,
      "end": self.end,
      "city": self.city,
      "state": self.state,
      "address": self.address,
      "country": self.country,
      "lat": self.lat,
      "lng": self.lng,
      "styles": [style.to_dict() for style in self.styles],
      "type": Type.query.get(self.type_id).name,
      "organiserId": self.organiser_id,
      "externalUrl": self.external_url,
      "imageUrl": self.image_url,
      "attendeeCount": len(self.registrations),
      "attendees": {} if len(list(self.registrations)) == 0\
        else {registration.user.id: registration.user.safe_info() for registration in self.registrations},
    }

class Style(db.Model):
  __tablename__ = "styles"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False, unique=True)

  events = db.relationship("Event", secondary=event_styles, back_populates="styles")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }
