from xmlrpc.client import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Event


class EventForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    start = DateTimeField('Start Date', validators=[DataRequired()])
    end = DateTimeField('Start Date', validators=[DataRequired()])
    description = StringField('Name', validators=[DataRequired()])
    city = StringField('Name', validators=[DataRequired()])
    state = StringField('Name', validators=[DataRequired()])
    address = StringField('Name', validators=[DataRequired()])
    country = StringField('Name', validators=[DataRequired()])
