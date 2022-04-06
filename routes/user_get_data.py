from flask import Blueprint, jsonify
from appFunctions import filter_keys
from flask_login import login_required, current_user

user_get_data = Blueprint("user_get_data", __name__, url_prefix="/api")


@user_get_data.route("/get-user-data")
@login_required
def get_user_data():
    '''send the current user data'''
    data = {
        "name": current_user.name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "adderss": current_user.adderss,
        "phone": current_user.phone_number,
        "company_id": current_user.company_id,
        "company_name": current_user.company_name,
        "confirmed_email": current_user.confirmed_email
    }

    return jsonify(data)


@user_get_data.route("/get-cart-items")
@login_required
def get_cart_items():
    '''return the cart items of the current user'''
    cart_items = current_user.cart_items
    return jsonify({"cart": cart_items})

@user_get_data.route("/get-user-orders")
@login_required
def get_my_orders():
    orders = [filter_keys(vars(order), ["_sa_instance_state"])
              for order in current_user.user_orders]

    return jsonify(orders)