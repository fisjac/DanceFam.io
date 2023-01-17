from flask import Blueprint, jsonify, request
from wtforms.validators import ValidationError

from app.models import db, Style

style_routes = Blueprint('styles', __name__)

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
@style_routes.route('')
def all_styles():
    styles = Style.query.all()
    return jsonify([style.to_dict() for style in styles])
