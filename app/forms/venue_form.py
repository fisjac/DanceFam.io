from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, Length

class venue_form(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  city = StringField('City', validators=[DataRequired()])
  state = StringField('State', validators=[DataRequired(),Length(max=50)])
  address = StringField('Address', validators=[DataRequired(),Length(max=50)])
  country = StringField('Country', validators=[DataRequired(),Length(max=50)])
  url = StringField('URL')
  lat = FloatField('Lattitude', validators=[DataRequired()])
  lng = FloatField('Longitude', validators=[DataRequired()])
