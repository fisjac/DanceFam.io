from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event

event_routes = Blueprint('events', __name__)

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
        "message": "Community couldn't be found",
        "statusCode": 404}, 404
    return event.to_dict()


# POST
@community_routes.route('/', methods=['POST'])
@login_required
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community(
            name=form.data['name']
        )
        membership = Membership(role_id=1)
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

    return community.to_dict()


# DELETE by Id
@community_routes.route('/<int:id>', methods=['DELETE'])
def delete_community(id):
    community = Community.query.get(id)
    if community is None:
        return {
            "message": "Community couldn't be found",
            "statusCode": 404}, 404
    elif Membership.get_membership(current_user.id, id).role_id != 1:
        return {
            "message": "User not authorized to delete this community",
            "statusCode": 401}, 401
    else:
        db.session.delete(community)
        db.session.commit()
        return {
            "message": "Community successfully deleted",
            "statusCode": 200}, 200
