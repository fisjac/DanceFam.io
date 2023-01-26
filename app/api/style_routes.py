from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from wtforms.validators import ValidationError

from app.forms.style_form import StyleForm
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

# POST
@style_routes.route('', methods = ['POST'])
@login_required
def add_style():
    form = StyleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.email == 'jfisher9882@gmail.com':
        if form.validate_on_submit():
            existingStyle = Style.query.filter(Style.name == form.data['name'])
            if len(list(existingStyle)):
                return {
                'message': 'Style already exists',
                'statusCode': 400
                }, 400

            style = Style(name = form.data['name'])
            db.session.add(style)
            db.session.commit()
            return style.to_dict()

    else:
        return {
            'message': 'User not authorized to add styles',
            'statusCode': 401
        }, 401
    return {'error': validation_errors_to_error_messages(form.errors)}, 401
