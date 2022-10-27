from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event

event_routes = Blueprint('events', __name__)


@event_routes.route('/')
def events():
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}


@event_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    return event.to_dict()
