from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Venue
from app.forms.venue_form import VenueForm

venue_routes = Blueprint('venues', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all venues
@venue_routes.route('')
def get_all_venues():
  venues = Venue.query.all()
  return jsonify([venue.to_dict() for venue in venues])

# GET by id
@venue_routes.route('/<int:id>')
def get_venue(id):
    venue = Venue.query.get(id)
    if venue is None:
        return {
        "message": "Venue couldn't be found",
        "statusCode": 404}, 404
    return jsonify(venue.to_dict())

# POST venue
@venue_routes.route('', methods=['POST'])
@login_required
def create_venue():
  form = VenueForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    if form.data['url']:
      url = form.data['url']
    else: url = None

    existing_venue = Venue.query.filter_by(name=form.data['name'], address=form.data['address'])
    print(existing_venue)
    if existing_venue:
      return {'errors':
        ["Venue already exists"],
        }, 400

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
    return venue.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
