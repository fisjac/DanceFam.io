from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
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
    return event.to_dict_detailed()

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
