from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired

class VenueForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  city = StringField('City', validators=[DataRequired()])
  state = StringField('State', validators=[DataRequired()])
  address = StringField('Address', validators=[DataRequired()])
  country = StringField('Country', validators=[DataRequired()])
  url = StringField('URL')
  lat = FloatField('Lattitude', validators=[DataRequired()])
  lng = FloatField('Longitude', validators=[DataRequired()])
