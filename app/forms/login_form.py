from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    if '@' in credential:
        user = User.query.filter(User.email == credential).first()
    else:
        user = User.query.filter(User.username == credential).first()
    if not user:
        raise ValidationError('Invalid login information provided.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    if '@' in credential:
        user = User.query.filter(User.email == credential).first()
    else:
        user = User.query.filter(User.username == credential).first()
    if not user:
        raise ValidationError('Invalid login information provided.')
    if not user.check_password(password):
        raise ValidationError('Invalid login information provided.')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired()])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
