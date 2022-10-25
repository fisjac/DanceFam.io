from .db import db

class Community(db):
  __tablename__ = 'communities'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  last_name = db.Column(db.String(255), nullable=False)
  hashed_password = db.Column(db.String(255), nullable=False)
