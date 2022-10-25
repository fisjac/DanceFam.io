from .db import db

event_styles = db.Table(
  "event_styles",
  db.Model.metadata,
  db.Column("id", db.Integer, primary_key=True),
  db.Column("event_id", db.Integer, db.ForeignKey("events.id")),
  db.Column("style_id", db.Integer, db.ForeignKey("styles.id"))
)
