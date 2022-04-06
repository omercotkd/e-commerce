from flask import Blueprint, request, Response
from Modules.Users import User
from werkzeug.security import generate_password_hash
from main import db
from Modules.EmailManger import send_confirmation_email
from flask_login import login_user

register_routes = Blueprint("register_routes", __name__)

@register_routes.route("/api/register", methods=["POST"])
def register_user():
    '''register new user via form data from a post request'''
    # get the data from the request
    data = request.form
    new_user_email = data.get("email", None)
    new_user_fname = data.get("first_name", None)
    new_user_lname = data.get("last_name", None)
    new_user_password = data.get("password", None)
    new_user_phone = data.get("phone_number", None)
    new_user_address = data.get("address", None)
    new_user_company_id = data.get("company_id", None)
    new_user_company_name = data.get("company_name", None)

    # checks if all the needed data is provided
    if not new_user_email or not new_user_fname or not new_user_lname or not new_user_password:
        return Response("חסר מידע ליצירת המשתמש", status=400)

    if User.query.filter_by(email=new_user_email).first():
        return Response("משתמש עם האימייל הזה כבר קיים", status=303)

    # encript the password
    hash_and_salted_password = generate_password_hash(
        new_user_password,
        method='pbkdf2:sha256',
        salt_length=10
    )

    # create the new user and add him to the db
    new_user = User(
        email=new_user_email,
        password=hash_and_salted_password,
        name=new_user_fname,
        last_name=new_user_lname,
        adderss=new_user_address,
        phone_number=new_user_phone,
        company_id=new_user_company_id,
        company_name=new_user_company_name
    )
    db.session.add(new_user)
    db.session.commit()

    # test if the user was crated
    if not User.query.filter_by(email=new_user_email).first():
        return Response("בעיה לא ידועה נסה שנית", status=500)

    send_confirmation_email(new_user_email)
    login_user(new_user)
    return Response("משתמש נוצר", status=201)