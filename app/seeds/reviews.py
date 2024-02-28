from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        user_id=1,
        product_id=6,
        rating=5,
        review='Excellent Bluetooth speaker with amazing sound quality!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review2 = Review(
        user_id=1,
        product_id=5,
        rating=4,
        review='Great wireless mouse, very comfortable to use.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review3 = Review(
        user_id=2,
        product_id=2,
        rating=4,
        review='Sleek smartphone stand, does the job well.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review4 = Review(
        user_id=2,
        product_id=1,
        rating=5,
        review='Love these wireless headphones, amazing sound!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review5 = Review(
        user_id=3,
        product_id=3,
        rating=3,
        review='Decent coffee machine, but could be better.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review6 = Review(
        user_id=3,
        product_id=4,
        rating=5,
        review='Life-saving portable charger, highly recommend!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()