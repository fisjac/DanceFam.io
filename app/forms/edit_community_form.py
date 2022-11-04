from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Community

class EditCommunityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description')
