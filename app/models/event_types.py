from .db import db

event_types = db.Table(
  "event_types",
  db.Model.metadata,
  db.Column("id", db.Integer, primary_key=True),
  db.Column("event_id", db.Integer, db.ForeignKey("events.id")),
  db.Column("type_id", db.Integer, db.ForeignKey("types.id"))
)
