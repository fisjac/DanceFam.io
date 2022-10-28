from .db import db
from .role import Role

class Membership(db.Model):
  __tablename__ = "memberships"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  community_id = db.Column(db.Integer, db.ForeignKey("communities.id"))
  role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

  user = db.relationship('User', back_populates='communities')
  community = db.relationship('Community', back_populates='users')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'community_id': self.community_id,
      'role_id': self.role_id,
      'role': Role.query.get(self.role_id).name
    }

  def get_membership(user_id, community_id):
    print(user_id, community_id)
    membership = db.session.query(Membership).\
      filter_by(user_id= user_id, community_id= community_id).first()
    if membership is None:
      return None
    return membership
