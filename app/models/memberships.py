from .db import db

class memberships(db.Model):
  __tablename__ = "memberships"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  community_id = db.Column(db.Integer, db.ForeignKey("communities.id"))
  role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

  users = db.relationship('User', backpopulates='communities')
  communities = db.relationship('Community', backpopulates='users')
