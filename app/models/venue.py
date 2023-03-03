from .db import db
from datetime import datetime

class Venue(db.Model):
  __tablename__ = 'venues'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255))
  address = db.Column(db.String(255))
  city = db.Column(db.String(255))
  state = db.Column(db.String(255))
  country = db.Column(db.String(255))
  url = db.Column(db.String(255))
  lat = db.Column(db.Float())
  lng = db.Column(db.Float())

  events = db.relationship("Event", back_populates='venue', cascade='delete' )
  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "city": self.city,
      "state": self.state,
      "address": self.address,
      "country": self.country,
      "lat": self.lat,
      "lng": self.lng,
      "url": self.url,
      "styles": list({style[0].name for style in [event.styles for event in self.events]}),
      "types": list({event.type.name for event in self.events }),
      "events": [event.id for event in self.events if event.end >= datetime.today()]
    }
