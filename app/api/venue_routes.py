from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Venue
from app.forms import venue_form

venue_routes = Blueprint('venues', __name__)

# Get all venues
@venue_routes.route('/')
def get_all_venues():
  venues = Venue.query.all()
  return {"venues":[venues.to_dict for venue in venues]}

# GET by id
@venue_routes.route('/<int:id>')
def get_venue(id):
    venue = Venue.query.get(id)
    if venue is None:
        return {
        "message": "Venue couldn't be found",
        "statusCode": 404}, 404
    return venue.to_dict()

# POST venue
@venue_routes.route('/', methods=['POST'])
@login_required
def create_venue():
  form = venue_form()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    if form.data['url']:
      url = form.data['url']
    else: url = None

    venue = Venue(
      name = form.data["name"],
      city = form.data["city"],
      state = form.data["state"],
      address = form.data["address"],
      country = form.data["country"],
      lat = form.data["lat"],
      lng = form.data["lng"],
      url = url
    )
  db.session.add(venue)
  db.session.commit()
