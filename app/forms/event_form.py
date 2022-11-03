from xmlrpc.client import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Event


class EventForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    start = DateTimeField('Start', validators=[DataRequired()])
    end = DateTimeField('End', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
