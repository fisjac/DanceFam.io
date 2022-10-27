from .db import db

class Community(db.Model):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  users = db.relationship("Membership", back_populates="community")
  events = db.relationship('Event', back_populates='community')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'memberCount': len(list(self.users)),
      'events': [event.id for event in self.events]
    }
