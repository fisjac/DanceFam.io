from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Community

class EditCommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    description = StringField('Description', validators=[Length(max=250)])
    image_url = StringField('Image Url')
