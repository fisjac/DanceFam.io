from flask import Blueprint, jsonify

from app.config import Config

key_routes = Blueprint('maps', __name__)

@key_routes.route('/maps', methods=['POST'])
def get_maps_key():
  return jsonify(Config.MAPS_JS_API_KEY)

@key_routes.route('/places', methods=['POST'])
def get_places_key():
  return jsonify(Config.PLACES_API_KEY)
