from .db import db
from .storage.role import Role
from .membership import Membership
from sqlalchemy.orm import join

class Community(db.Model):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  details = db.Column(db.String(255))

  memberships = db.relationship("Membership", back_populates="community")
  events = db.relationship('Event', back_populates='community')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'memberCount': len(list(self.memberships)),
      'ownerId': Membership.get_owner_id(self.id),
    }

  def to_dict_detailed(self):
    return {
      'id': self.id,
      'name': self.name,
      'details': self.details,
      'memberCount': len(list(self.memberships)),
      'members': [membership.user.safe_info() for membership in self.memberships],
      'events': [event.id for event in self.events],
      'ownerId': Membership.get_owner_id(self.id),
    }
