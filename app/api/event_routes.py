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
@event_routes.route('/')
def events():
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}

# GET by id
@event_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    if event is None:
        return {
        "message": "Event couldn't be found",
        "statusCode": 404}, 404
    return event.to_dict()


# # POST
# @event_routes.route('/', methods=['POST'])
# @login_required
# def create_event():
#     form = EventForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         event = Event(
#             organiser_id = current_user.id,
#             name = form.data['name']
#             start_date = form.data['start_date']
#             end_date = form.data['end_date']
#             description = form.data['description']
#             city = form.data['city']
#             state = form.data['state']
#             address = form.data['address']
#             country = form.data['country']
#         )
#         event.user = current_user
#         event.community = event
#         db.session.add_all([community,event])
#         db.session.commit()
#         return event.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# GET by Id
@event_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    if event is None:
        return {
            "message": "Event couldn't be found",
            "statusCode": 404}, 404
    return event.to_dict()


# DELETE by Id
@event_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    if event is None:
        return {
            "message": "Event couldn't be found",
            "statusCode": 404}, 404
    elif Event.get_registration(current_user.id, id).role_id != 1:
        return {
            "message": "User not authorized to delete this community",
            "statusCode": 401}, 401
    else:
        db.session.delete(event)
        db.session.commit()
        return {
            "message": "Community successfully deleted",
            "statusCode": 200}, 200
