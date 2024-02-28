from flask import Blueprint, redirect, request
from app.models import Product, db
from .aws_images import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from app.forms.product_form import ProductForm

product_routes = Blueprint('product', __name__ )

# getting all products
@product_routes.route('/')
def getProducts():
    products = Product.query.all()
    response = [product.to_dict() for product in products]
    return {'products': response}


# create a product

@product_routes.route('/new-product', methods=['POST'])
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_filename = get_unique_filename(form.image.data.filename)
        image_upload_result = upload_file_to_s3(form.image.data)
        if 'url' not in image_upload_result:
            return {"message":"failed to upload file"}

        new_product = Product(
            user_id=form.data['user_id'],
            name=form.data['name'],
            image=image_upload_result['url'],
            description=form.data['description'],
            price=form.data['price'],
            created_at=form.data['created_at']
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return form.errors

# update a product

@product_routes.route('/<int:productId>/edit', methods =['PUT'])
def updateProduct(productId):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product.query.get(productId)
        data = form.data

        if 'image' in data and data['image'] is not None:
            image_filename = get_unique_filename(data['image'].filename)
            image_upload_result = upload_file_to_s3(data['image'])
            if 'url' in image_upload_result:
                product.image = image_upload_result['url']
            else:
                return {"message": "Failed to upload file"}

            
        product.user_id = data['user_id']
        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        product.created_at = data['created_at']
        
        db.session.commit()
        return product.to_dict()
    return form.errors

# delete a product

@product_routes.route('/<int:productId>', methods = ['DELETE'])
def deleteProduct(productId):
    product = Product.query.get(productId)
    remove_file_from_s3(product.to_dict()['image'])
    db.session.delete(product)
    db.session.commit()
    return product.to_dict()

# getting one product

@product_routes.route('/<int:productId>')
def oneProduct(productId):
    product = Product.query.get(productId)
    return product.to_dict()

# getting current users songs

@product_routes.route('/user/<int:userId>')
def getUserProducts(userId):
    products = Product.query.filter(Product.user_id == userId).all()

    return {"Products":[product.to_dict() for product in products]}

