from .db import db

class Status(db):
  __tablename__ = 'statuses'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
