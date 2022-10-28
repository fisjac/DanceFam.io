from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.community_form import CommunityForm
from app.models import Community, db, Membership

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
@community_routes.route('/')
def communities():
    communities = Community.query.all()
    return {'communities': [community.to_dict() for community in communities]}


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
        return {
            "message": "Community couldn't be found",
            "statusCode": 404}, 404
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
