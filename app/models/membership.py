from .db import db
from .storage.role import Role

class Membership(db.Model):
  __tablename__ = "memberships"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  community_id = db.Column(db.Integer, db.ForeignKey("communities.id"))
  owner_status = db.Column(db.Boolean)
  # role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

  user = db.relationship('User', back_populates='memberships')
  community = db.relationship('Community', back_populates='memberships')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'community_id': self.community_id,
      'owner_status': self.owner_status,
      # 'role_id': self.role_id,
      # 'role': Role.query.get(self.role_id).name
    }


  def get_owner(community_id):
    membership = db.session.query(Membership).\
      filter_by(community_id= community_id, owner_status=True).first()
    if membership is None:
      return None
    return membership.user.safe_info()
