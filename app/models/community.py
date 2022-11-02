from .db import db
from .storage.role import Role
from .membership import Membership
from sqlalchemy.orm import join

class Community(db.Model):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)


  memberships = db.relationship("Membership", back_populates="community")
  events = db.relationship('Event', back_populates='community')

  def get_user_communities(user_id):
    communities = db.session.query(Community).join(Membership).filter(Membership.user_id == user_id)
    return [community.name for community in communities]

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'memberCount': len(list(self.memberships)),
      'events': [event.id for event in self.events],
      'ownerId': Membership.get_owner_id(self.id),
    }
