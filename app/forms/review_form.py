from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from datetime import datetime

class ReviewForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    product_id = IntegerField('Product Id', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired()])
    created_at = DateTimeField('Date Created', default=datetime.utcnow, validators=[DataRequired()])
    updated_at = DateTimeField('Date Updated', default=datetime.utcnow, validators=[DataRequired()])
