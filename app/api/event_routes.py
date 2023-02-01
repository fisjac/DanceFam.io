from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models import Event, Registration, db, Type, Style
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
    new_events = Event.query.filter(Event.start >= datetime.today().date())
    return jsonify([event.to_dict() for event in new_events])



# GET by id
@event_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    if event is None:
        return {
        "message": "Event couldn't be found",
        "statusCode": 404}, 404
    return event.to_dict()

# POST event
@event_routes.route('', methods=['POST'])
@login_required
def create_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['image_url']:
            image_url = form.data['image_url']
        else: image_url = None
        if form.data['external_url']:
            external_url = form.data['external_url']
        else: external_url = None

        event = Event(
            organiser_id = current_user.id,
            name = form.data['name'],
            start = form.data['start'],
            end = form.data['end'],
            city = form.data['city'],
            state = form.data['state'],
            address = form.data['address'],
            country = form.data['country'],
            lat = form.data['lat'],
            lng = form.data['lng'],
            external_url = external_url,
            image_url = image_url,
            type_id = Type.query.filter(Type.name == form.data['type'])[0].id
        )

        for style in form.data['styles']:
            style_instance = Style.query.filter(Style.name == style)[0]
            event.styles.append(style_instance)

        new_registration = Registration()
        new_registration.user = current_user
        new_registration.event = event
        db.session.add_all([new_registration])
        db.session.commit()
        return event.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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
            if form.data['image_url']:
                image_url = form.data['image_url']
            else: image_url = None
            if form.data['external_url']:
                print('-------------',form.data['external_url'])
                external_url = form.data['external_url']
            else: external_url = None
            event.name = form.data['name']
            event.start = form.data['start']
            event.end = form.data['end']
            event.city = form.data['city']
            event.state = form.data['state']
            event.address = form.data['address']
            event.country = form.data['country']
            event.lat = form.data['lat']
            event.lng = form.data['lng']
            event.external_url = external_url
            event.image_url = image_url
            event.type_id = Type.query.filter(Type.name == form.data['type'])[0].id

            event.styles = []
            for style in form.data['styles']:
                style_instance = Style.query.filter(Style.name == style)[0]
                event.styles.append(style_instance)

            db.session.commit()
            return event.to_dict()
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
            "message": "User not authorized to delete this event",
            "statusCode": 401}, 401
    else:
        db.session.delete(event)
        db.session.commit()
        return {
            "message": "Event successfully deleted",
            "statusCode": 200}, 200
