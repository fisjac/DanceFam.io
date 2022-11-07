from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError, Length



class EventForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    start = DateTimeField('Start', validators=[DataRequired()])
    end = DateTimeField('End', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), Length(max=250)])
    city = StringField('City', validators=[DataRequired(),Length(max=50)])
    state = StringField('State', validators=[DataRequired(),Length(max=50)])
    address = StringField('Address', validators=[DataRequired(),Length(max=50)])
    country = StringField('Country', validators=[DataRequired(),Length(max=50)])
    image_url = StringField('Image Url')
