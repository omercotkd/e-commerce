from flask import Blueprint, Response, request, jsonify
from functools import wraps
from flask_login import current_user
from Modules.Products import Product
from main import db, app
import os
from Modules.FilesFunctions import ALLOWED_EXTENSIONS, allowed_file
from werkzeug.utils import secure_filename
from Modules.Users import User
from Modules.Orders import Order
from appFunctions import filter_keys

admin_routes = Blueprint("admin_routes", __name__, url_prefix="/api/admin")

def admin_only(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        # If id is not 1 then return abort with 403 error
        if not current_user.is_authenticated or not current_user.is_admin:
            return Response("unauthorized", 403)
        # Otherwise continue with the route function
        return func(*args, **kwargs)
    return decorated_function


@admin_routes.route("/test-admin")
@admin_only
def test_if_admin():
    '''test if a user is an admin'''
    return Response("", 200)

@admin_routes.route("/add-products", methods=["POST"])
@admin_only
def add_products():
    '''add new product, only admins can excesses this route'''
    new_product = request.form
    new_product_name = new_product.get("name", "require")
    new_product_price = new_product.get("price", "require")

    # checks if a name and price were provided
    if new_product_name == "require" or new_product_price == "require":
        return Response("Need to provide name and price.", status=400)

    # checks if the new product prices can be converted to float
    try:
        new_product_price = float(new_product_price)
        new_product_coach_price = float(
            new_product.get("coachPrice", new_product_price))
        new_product_price_jump = float(new_product.get("priceJump"))
        new_product_coach_price_jump = float(
            new_product.get("priceJumpCoach", new_product_price_jump))
    except ValueError:
        return Response("Please enter a valid price", status=400)

    # checks if a product with that name alredy exsits
    if Product.query.filter_by(name=new_product_name).first():
        return Response("Product with that name already exsits", status=400)

    # checks if a file was provided
    if 'file0' not in request.files:
        return Response("A file needs to be provided", status=400)

    file0 = request.files['file0']

    if file0.filename == "":
        return Response("A file needs to be provided", status=400)

    # create a new product in the database and save it
    create_product = Product(
        name=new_product_name,
        group=new_product.get("group", None),
        normal_price=new_product_price,
        coach_price=new_product_coach_price,
        description=new_product.get("description", None),
        price_jump=new_product_price_jump,
        price_jump_coach=new_product_coach_price_jump,
        sizes=new_product.get("sizes", None),
        sizes_text=new_product.get("sizesText"),
        number_images=len(request.files)
    )

    db.session.add(create_product)
    db.session.commit()

    # saves the files in a new folder for that product
    for i in range(len(request.files)):
        file = request.files[f'file{i}']
        if file and allowed_file(file.filename):
            try:
                os.mkdir(
                    f"{app.config['UPLOAD_FOLDER']}\\product-{create_product.id}")
            except FileExistsError:
                pass
            filename = secure_filename(
                f"image{i}." + file.filename.rsplit(".", 1)[1].lower())

            file.save(os.path.join(
                f"{app.config['UPLOAD_FOLDER']}\\product-{create_product.id}", filename))
        else:
            db.session.delete(create_product)
            db.session.commit()
            return Response(f"Please Uplaod a {ALLOWED_EXTENSIONS}", status=400)

    return Response(status=200)

@admin_routes.route("/get-all-orders")
@admin_only
def get_all_orders():
    '''return all the orders as json'''
    orders = Order.query.all()
    all_orders = [filter_keys(vars(order), ["_sa_instance_state"])
                  for order in orders]
                  
    return jsonify(all_orders)

@admin_routes.route("/get-all-users")
@admin_only
def get_all_users():
    '''return all the users as json'''
    users = User.query.all()
    all_users = [filter_keys(
        vars(user), ["_sa_instance_state", "cart_items", "password"]) for user in users]
    return jsonify(all_users)