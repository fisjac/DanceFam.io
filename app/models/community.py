from .db import db
from .storage.role import Role
from .membership import Membership
from sqlalchemy.orm import join

class Community(db.Model):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255))

  memberships = db.relationship("Membership", back_populates="community",cascade='delete')
  events = db.relationship('Event', back_populates='community', cascade='delete')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'memberCount': len(list(self.memberships)),
      'owner': Membership.get_owner(self.id)
    }

  def to_dict_detailed(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'memberCount': len(list(self.memberships)),
      'members': {membership.user.id: membership.user.safe_info() for membership in self.memberships},
      'events': {} if len(list(self.events)) == 0\
        else {event.id: event.id for event in self.events},
      'owner': Membership.get_owner(self.id),
    }
