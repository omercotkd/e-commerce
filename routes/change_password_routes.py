from flask import Blueprint, request, Response, redirect
from flask_login import current_user, login_required, login_user
from main import db, timed_url
import os
from Modules.Users import User
from werkzeug.security import generate_password_hash
from flask_login import current_user, login_required, login_user
from itsdangerous import SignatureExpired

change_password_routes = Blueprint("change_password_routes", __name__)

@change_password_routes.route("/api/change-password", methods=["POST"])
@login_required
def change_password():
    '''handle password change'''
    if current_user.confirmed_email:
        data = request.form
        new_password = data.get("new_password", None)
        if(not new_password):
            return Response(status=401)
        current_user.password = generate_password_hash(
            new_password,
            method='pbkdf2:sha256',
            salt_length=10
        )
        db.session.commit()
        return Response(status=201)

    return Response(status=401)


@change_password_routes.route("/api/handle-password-reset-token/<token>")
def handle_password_reset_token(token):
    '''handle the reset password link'''
    try:
        email = timed_url.loads(token, salt=os.getenv(
            "RESET_PASSWORD_SALT"), max_age=(3600))
    except SignatureExpired:
        return "link expiard u can request a new one"
    except:
        return "unkown error try again and check the link"
    else:
        user_to_reset = User.query.filter_by(email=email).first()
        login_user(user_to_reset)
        return redirect("/myAccount/change-password")