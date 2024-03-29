from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
# , FileRequired
from wtforms import SubmitField, StringField, IntegerField, FloatField, DateTimeField
from wtforms.validators import DataRequired
from ..api.aws_images import ALLOWED_EXTENSIONS
from datetime import datetime

class ProductForm(FlaskForm):
    user_id = IntegerField('User Id', validators = [DataRequired()])
    name = StringField('Product Name', validators = [DataRequired()])
    image = FileField('Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    # FileRequired(), 
    description = StringField('Description', validators = [DataRequired()])
    price = FloatField('Price', validators = [DataRequired()])
    created_at = DateTimeField('Current Time', default=datetime.utcnow, validators = [DataRequired()])
    submit = SubmitField("Create Product")