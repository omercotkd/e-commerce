from main import db, timed_url
import os
from flask import Blueprint, url_for, redirect, Response, request
from Modules.Users import User
from Modules.EmailManger import send_reset_password_email, send_confirmation_email
from itsdangerous import SignatureExpired
from flask_login import login_required, current_user

email_routes = Blueprint("email_routes", __name__)

@email_routes.route("/f/confirm-email/<token>")
def confirm_email(token):
    '''confirm a user email vie the token provided in the link'''
    try:
        email_to_confirm = timed_url.loads(
            token, salt=os.getenv("EMAIL_CONFIRM_SALT"), max_age=(86400))
    except SignatureExpired:
        return f'link expiard u can make a new one in "My account"'
    except:
        return "unkown error try again and check the link"
    else:
        user_to_confirm = User.query.filter_by(email=email_to_confirm).first()
        user_to_confirm.confirmed_email = True
        db.session.commit()

    return redirect(url_for("home", _external=True))


@email_routes.route("/api/new-confiramtion-mail")
@login_required
def send_new_conf_mail():
    '''send new confirmetion link to a loged in user'''
    if not current_user.confirmed_email:
        send_confirmation_email(current_user.email)
        return Response(status=201)
    else:
        return Response(status=304)

@email_routes.route("/api/request-password-reset", methods=["POST"])
def send_reset_email():
    '''send reset password link to provided email in a post request'''
    data = request.form
    email = data.get("email", None)
    if User.query.filter_by(email=email).first():
        send_reset_password_email(email)

    return Response(status=201)