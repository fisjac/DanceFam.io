from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Community

community_routes = Blueprint('communities', __name__)



@community_routes.route('/')
def communities():
    communities = Community.query.all()
    return {'communities': [community.to_dict() for community in communities]}

@community_routes.route('/<int:id>')
def community(id):
    community = Community.query.get(id)
    return community.to_dict()
