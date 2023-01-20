from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length

def less_than_end(form, field):
    start = field.data
    end = form['end'].data
    if end <= start:
        raise ValidationError(f'Must be less than end')
    return

class EventForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    start = DateTimeField('Start', validators=[DataRequired(), less_than_end])
    end = DateTimeField('End', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired(),Length(max=50)])
    state = StringField('State', validators=[DataRequired(),Length(max=50)])
    address = StringField('Address', validators=[DataRequired(),Length(max=50)])
    country = StringField('Country', validators=[DataRequired(),Length(max=50)])
    lat = FloatField('Lattitude', validators=[DataRequired()])
    lng = FloatField('Longitude', validators=[DataRequired()])
    external_url = StringField('Event Page')
    image_url = StringField('Image Url')
