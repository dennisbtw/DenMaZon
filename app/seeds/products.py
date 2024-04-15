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
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/coffee-maker.jpeg',
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
    product7 = Product(
        user_id=1,
        name='Wireless Keyboard',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/GOKeyboard4-min.jpg',
        description='Type with freedom using this sleek wireless keyboard. Ergonomic design for comfortable typing experience.',
        price=49.99,
        created_at=datetime.now()
    )
    product8 = Product(
        user_id=1,
        name='External Hard Drive',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/western-digital-my-passport-2tb-56a6fa9b3df78cf772913ec1.jpg',
        description='Expand your storage capacity with this reliable external hard drive. Plug-and-play compatibility for easy use.',
        price=79.99,
        created_at=datetime.now()
    )
    product9 = Product(
        user_id=1,
        name='Fitness Tracker',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/fitness-tracker.jpg',
        description='Track your fitness goals with this versatile fitness tracker. Monitor heart rate, steps, and sleep patterns.',
        price=59.99,
        created_at=datetime.now()
    )
    product10 = Product(
        user_id=2,
        name='Travel Backpack',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/backpack.jpg',
        description='Stay organized on the go with this durable travel backpack. Multiple compartments for easy storage of belongings.',
        price=39.99,
        created_at=datetime.now()
    )
    product11 = Product(
        user_id=2,
        name='Desk Organizer',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/desk-organizer.jpeg',
        description='Keep your workspace tidy with this multifunctional desk organizer. Store pens, paper clips, and more.',
        price=24.99,
        created_at=datetime.now()
    )
    product12 = Product(
        user_id=2,
        name='Yoga Mat',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/yoga-mat.jpg',
        description='Unwind and de-stress with this high-quality yoga mat. Non-slip surface for stability during yoga sessions.',
        price=34.99,
        created_at=datetime.now()
    )
    product13 = Product(
        user_id=3,
        name='Electric Toothbrush',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/toothbrush.jpg',
        description='Achieve a brighter smile with this electric toothbrush. Sonic technology for effective plaque removal.',
        price=49.99,
        created_at=datetime.now()
    )
    product14 = Product(
        user_id=3,
        name='Digital Camera',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/camera.jpg',
        description='Capture memories with stunning clarity using this digital camera. Lightweight and easy to use for amateur photographers.',
        price=199.99,
        created_at=datetime.now()
    )
    product15 = Product(
        user_id=3,
        name='Indoor Grill',
        image='https://denmazonbucket.s3.us-west-1.amazonaws.com/indoor-grill.jpg',
        description='Enjoy grilled meals year-round with this convenient indoor grill. Easy to clean and compact design.',
        price=79.99,
        created_at=datetime.now()
    )
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()