from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Community


def community_exists(form, field):
    # Checking if user exists
    name = field.data
    community = Community.query.filter(Community.name == name).first()
    if community:
        raise ValidationError('This community already exists.')

class CommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), community_exists, Length(max=50)])
    description = StringField('Description', validators=[Length(max=200)])
    image_url = StringField('Image Url')
