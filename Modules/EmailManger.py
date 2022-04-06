from main import mail, timed_url, app
from flask_mail import Message
from flask import url_for
import os

def send_confirmation_email(email):
    '''send  a new confirmation link to a provided email'''
    confirmation_token = timed_url.dumps(
        email, salt=os.getenv("EMAIL_CONFIRM_SALT"))
    conf_link = url_for(
        "email_routes.confirm_email", token=confirmation_token, _external=True)

    # sending the mail
    msg = Message(subject="אישור אימייל לא.ל דאבל אימפקט",
                  sender=app.config.get("MAIL_USERNAME"),
                  recipients=[email],
                  body=f"כדי לאשר את האימייל שלך לחץ על הקישור הבא: \n {conf_link} \n הלינק תקף ל24 השעות הקרובות."
                  )

    mail.send(msg)

def send_reset_password_email(email):
    '''send a password reset link to a given email'''

    reset_token = timed_url.dumps(email, salt=os.getenv("RESET_PASSWORD_SALT"))
    reset_link = url_for("change_password_routes.handle_password_reset_token",
                         token=reset_token, _external=True)

    msg = Message(subject="קישור לאיפוס סיסמה א.ל דאבל אימפקט",
                  sender=app.config.get("MAIL_USERNAME"),
                  recipients=[email],
                  body=f"לאיפוס הסיסמה שלך לחץ על הקישור הבא: \n {reset_link} הקישור תקף לשעה הקרובה בלבד."
                  )

    mail.send(msg)