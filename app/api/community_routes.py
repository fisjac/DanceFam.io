from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from wtforms.validators import ValidationError

from app.forms.community_form import CommunityForm
from app.forms.edit_community_form import EditCommunityForm
from app.forms.event_form import EventForm
from app.models import Community, db, Membership, Event
from app.models.registration import Registration

community_routes = Blueprint('communities', __name__)

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
@community_routes.route('')
def communities():
    communities = Community.query.all()
    return jsonify([community.to_dict() for community in communities])


# POST
@community_routes.route('/', methods=['POST'])
@login_required
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['image_url']:
            image_url = form.data['image_url']
        else: image_url = None
        community = Community(
            name=form.data['name'],
            description=form.data['description'],
            image_url = image_url,
        )
        membership = Membership(owner_status=True)
        membership.user = current_user
        membership.community = community
        db.session.add_all([community,membership])
        db.session.commit()
        return community.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# GET by Id
@community_routes.route('/<int:id>')
def community(id):
    community = Community.query.get(id)
    if community is None:
        return {
            "message": "Community couldn't be found",
            "statusCode": 404}, 404
    return community.to_dict()

# PUT by Id
@community_routes.route('/<int:id>', methods=['PUT'])
def edit_community(id):
    community = Community.query.get(id)
    if community is None:
        return {
            "message": "Community couldn't be found",
            "statusCode": 404}, 404
    elif Membership.get_owner(id)['id'] != current_user.id:
        return {
            "message": "User not authorized to delete this community",
            "statusCode": 401}, 401
    else:
        form = EditCommunityForm()
        existing_community = Community.query.filter(Community.name == form.data['name']).first()
        if existing_community is not None:
             if existing_community.id != id:
                return {'errors': ['Name: This community already exists.']}, 401
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if form.data['name']:
                community.name = form.data['name']
            if form.data['description']:
                community.description = form.data['description']
            if form.data['image_url']:
                community.image_url = form.data['image_url']
            db.session.commit()
            return community.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE by Id
@community_routes.route('/<int:id>', methods=['DELETE'])
def delete_community(id):
    community = Community.query.get(id)
    if community is None:
        return {
            "message": "Community couldn't be found",
            "statusCode": 404}, 404
    elif Membership.get_owner(id)['id'] != current_user.id:
        return {
            "message": "User not authorized to delete this community",
            "statusCode": 401}, 401
    else:
        db.session.delete(community)
        db.session.commit()
        return {
            "message": "Community successfully deleted",
            "statusCode": 200}, 200


# POST event to community
@community_routes.route('/<int:community_id>/events', methods=['POST'])
@login_required
def create_event(community_id):
    community = Community.query.get(community_id)
    if community is None:
        return {
            "message": "Community couldn't be found",
            "statusCode": 404}, 404
    elif Membership.get_owner(community_id)['id'] != current_user.id:
        return {
            "message": "User not authorized to add events to this community",
            "statusCode": 401}, 401
    else:
        form = EventForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if form.data['image_url']:
                image_url = form.data['image_url']
            else: image_url = None
            event = Event(
                organiser_id = current_user.id,
                community_id = community_id,
                name = form.data['name'],
                start = form.data['start'],
                end = form.data['end'],
                description = form.data['description'],
                city = form.data['city'],
                state = form.data['state'],
                address = form.data['address'],
                country = form.data['country'],
                image_url = image_url,

            )

            event.community = community
            registration = Registration()
            registration.user = current_user
            registration.event = event
            db.session.add_all([registration])
            db.session.commit()
            return event.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
