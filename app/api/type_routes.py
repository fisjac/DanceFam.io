from flask import Blueprint, jsonify, request
from wtforms.validators import ValidationError

from app.models import db, Type

type_routes = Blueprint('types', __name__)

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
@type_routes.route('')
def all_types():
    types = Type.query.all()
    return jsonify([type.to_dict() for type in types])
