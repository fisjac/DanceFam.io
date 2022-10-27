from .db import db

class Membership(db.Model):
  __tablename__ = "memberships"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  community_id = db.Column(db.Integer, db.ForeignKey("communities.id"))
  role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

  user = db.relationship('User', back_populates='communities')
  community = db.relationship('Community', back_populates='users')
