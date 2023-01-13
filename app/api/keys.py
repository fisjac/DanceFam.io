from flask import Blueprint, jsonify

from app.config import Config

key_routes = Blueprint('maps', __name__)

@key_routes.route('/places', methods=['POST'])
def get_places_key():
  return jsonify(Config.PLACES_API_KEY)
