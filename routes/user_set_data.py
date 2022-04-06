from flask import Blueprint, request, Response
from flask_login import login_required, current_user
from main import db
from appFunctions import get_time_in_israel, check_time_passed
from Modules.Orders import Order

user_set_data = Blueprint("user_set_data", __name__)

@user_set_data.route("/api/set-cart-items", methods=["POST"])
@login_required
def set_cart_items():
    '''update the cart by a data provided in a post request'''
    data = request.form

    current_user.cart_items = data.get("cart", None)
    db.session.commit()
    return Response(status=200)


@user_set_data.route("/api/submit-order", methods=["POST"])
@login_required
def order_submition():
    '''handle order submiton'''
    if not current_user.confirmed_email:
        return Response(status=401)

    data = request.form

    comments = data.get("comments", None)

    new_order = Order(
        date=get_time_in_israel(),
        the_order=current_user.cart_items,
        comments=comments,
        order_owner=current_user
    )

    db.session.add(new_order)
    current_user.cart_items = None
    db.session.commit()

    return Response(status=200)

@user_set_data.route("/api/change-order", methods=["POST"])
@login_required
def change_user_order():
    data = request.form
    order_id = data.get("id", None)

    if not order_id:
        return Response("some data is missing", status=401)

    order_to_change = Order.query.filter_by(id=order_id).first()

    if not order_to_change:
        return Response("no order with that id", status=401)

    if check_time_passed(order_to_change.date) > 6.2:
        return Response("you cant change order after 6 hours passed", status=401)

    # check if the current user owen the order
    if order_to_change.order_owner == current_user:
        order_to_change.the_order = data.get("order")
        order_to_change.comments = data.get("comments")
        db.session.commit()
        return Response(status=200)
    else:
        return Response("you cant change order that isnt yours", status=401)


@user_set_data.route("/api/update-user-info", methods=["POST"])
@login_required
def update_user_info():
    data = request.form
    new_name = data.get("fName", None)
    new_last_name = data.get("lName", None)
    new_phone = data.get("phone", None)

    if not new_name or not new_last_name or not new_phone:
        return Response("חסר מידע", status=401)

    current_user.name = new_name
    current_user.last_name = new_last_name
    current_user.adderss = data.get("address")
    current_user.phone_number = new_phone
    current_user.company_id = data.get("companyId")
    current_user.company_name = data.get("companyName")
    db.session.commit()

    return Response(status=200)