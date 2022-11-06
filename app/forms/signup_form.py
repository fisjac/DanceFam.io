from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(),Length(max=30)])
    last_name = StringField('Last Name', validators=[DataRequired(),Length(max=30)])
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(6,30)])
    email = StringField('email', validators=[DataRequired(), Email(), email_exists])
    password = StringField('password', validators=[DataRequired(),Length(8,30) ])
