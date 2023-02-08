from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, Field, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length


class StyleField(Field):

    def process_formdata(self, styles_list):
        if styles_list:
            styles_object = styles_list[0]
            self.data = [key for key in styles_object.keys() if styles_object[key]]
        else:
            self.data = []

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
    type = StringField('Type', validators=[DataRequired()])
    styles = StyleField('Styles', validators=[DataRequired()])
    venue_id = IntegerField('Venue Id', validators=DataRequired())
    external_url = StringField('Event Page')
    image_url = StringField('Image Url')
