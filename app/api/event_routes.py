from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models import Event, db
from app.forms.event_form import EventForm
event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET all
@event_routes.route('')
def events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

# GET by id
@event_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    if event is None:
        return {
        "message": "Event couldn't be found",
        "statusCode": 404}, 404
    return event.to_dict()

# EDIT by Id
@event_routes.route('/<int:id>', methods=['PUT'])
def edit_event(id):
    event = Event.query.get(id)
    if event is None:
        return {
            "message": "Event couldn't be found",
            "statusCode": 404}, 404
    elif event.organiser_id != current_user.id:
        return {
            "message": "User not authorized to delete this community",
            "statusCode": 401}, 401
    else:
        form = EventForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            event.name = form.data['name']
            event.start = form.data['start']
            event.end = form.data['end']
            event.description = form.data['description']
            event.city = form.data['city']
            event.state = form.data['state']
            event.address = form.data['address']
            event.country = form.data['country']
            event.image_url = form.data['image_url']

            db.session.commit()
            return event.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE by Id
@event_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    if event is None:
        return {
            "message": "Event couldn't be found",
            "statusCode": 404}, 404
    elif event.organiser_id != current_user.id:
        return {
            "message": "User not authorized to delete this community",
            "statusCode": 401}, 401
    else:
        db.session.delete(event)
        db.session.commit()
        return {
            "message": "Community successfully deleted",
            "statusCode": 200}, 200
