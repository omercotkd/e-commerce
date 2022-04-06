from flask import Blueprint, request, Response
from Modules.Users import User
from werkzeug.security import check_password_hash
from flask_login import login_user, current_user, login_required, logout_user

user_login_routes = Blueprint("user_login_menger", __name__, url_prefix="/api")

@user_login_routes.route("/check-if-user-logged-in")
def check_looged_in():
    '''test if a user is loged in if so will return a 304'''
    if current_user.is_authenticated:
        return Response(status=304)
    else:
        return Response(status=401)

@user_login_routes.route("/login", methods=["POST"])
def api_login_user():
    '''login user from form data provided in a post request'''
    data = request.form
    email_enterd = data.get("email", None)
    password_enterd = data.get("password", None)

    # checks if the password and email where provide in the request
    if not email_enterd or not password_enterd:
        return Response("צריך לספק איימל וסיסמא", status=401)

    user = User.query.filter_by(email=email_enterd).first()

    # checks if the user exsits
    if not user:
        return Response("האיימל או הסיסמא שגויים", status=401)

    elif not check_password_hash(user.password, password_enterd):
        return Response("האיימל או הסיסמא שגויים", status=401)

    # if the password was coorect will login the user
    else:
        login_user(user)
        return Response(status=201)

@user_login_routes.route("/check-confirmed-email")
@login_required
def check_user_confirmed_email():
    '''check if the current_user confiremd is email'''
    if not current_user.confirmed_email:
        return Response(status=401)
    else:
        return Response(status=200)


@user_login_routes.route("/log-out")
@login_required
def log_out_user():
    logout_user()
    return Response(status=200)