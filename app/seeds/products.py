from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_products():
    product1 = Product(
        user_id=1,
        name='Wireless Headphones',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/beats-headphones-rAGOGYD-600.jpg',
        description='Enjoy crystal-clear sound with these wireless headphones. Perfect for music lovers on the go.',
        price=59.99,
        created_at=datetime.now()
    )
    product2 = Product(
        user_id=1,
        name='Smartphone Stand',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/61Tg7uwHjNL.jpg',
        description='Keep your smartphone steady with this sleek and adjustable stand. Ideal for hands-free video calls and watching movies.',
        price=19.99,
        created_at=datetime.now()
    )
    product3 = Product(
        user_id=2,
        name='Coffee Maker',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/coffee-machine-png-5a3a13cd3508c8.64013787151375559721723651.jpg',
        description='Start your day right with freshly brewed coffee from this high-quality coffee maker. Features a programmable timer for convenience.',
        price=89.99,
        created_at=datetime.now()
    )
    product4 = Product(
        user_id=2,
        name='Portable Charger',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/818719026118_PRI.webp',
        description='Never run out of battery on the go with this compact and powerful portable charger. Compatible with all devices.',
        price=29.99,
        created_at=datetime.now()
    )
    product5 = Product(
        user_id=3,
        name='Wireless Mouse',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/New-Razer-Viper-Mini-Wireless-Signature-Edition-Mouse-Lightweight-49g-magnesium-alloy-Hollowed-out-Two-handed.webp',
        description='Enhance your productivity with this ergonomic wireless mouse. Smooth and precise tracking for all your tasks.',
        price=39.99,
        created_at=datetime.now()
    )
    product6 = Product(
        user_id=3,
        name='Bluetooth Speaker',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/GUEST_6b785e97-ac6e-4187-8e46-051cf7334be9.jpeg',
        description='Bring the party anywhere with this portable Bluetooth speaker. Crisp sound quality and long-lasting battery life.',
        price=79.99,
        created_at=datetime.now()
    )
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()