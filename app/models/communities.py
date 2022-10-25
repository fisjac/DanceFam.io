from .db import db, memberships

class Community(db):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)

  users = db.relationship("Membership", backpopulates="communities")
