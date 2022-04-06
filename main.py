from routes.admin_routes import admin_routes
from routes.change_password_routes import change_password_routes
from routes.user_set_data import user_set_data
from routes.user_get_data import user_get_data
from routes.register_routes import register_routes
from routes.emails_routes import email_routes
from routes.login_routes import user_login_routes
from Modules.Products import Product
from Modules.Users import User
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
import os
from dotenv import load_dotenv
from appFunctions import filter_keys, replace_key

load_dotenv()

app = Flask(__name__, static_folder="./build", static_url_path="/")
app.config['SECRET_KEY'] = os.getenv("APP_KEY")

app.config['UPLOAD_FOLDER'] = os.getenv("UPLOAD_FOLDER")
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

mail_settings = {
    "MAIL_SERVER": os.getenv("SMTP_SERVER"),
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.getenv("EMAIL_USERNAME"),
    "MAIL_PASSWORD": os.getenv("EMAIL_PASSWORD")
}

app.config.update(mail_settings)
mail = Mail(app)

timed_url = URLSafeTimedSerializer(app.config["SECRET_KEY"])

uri = os.getenv("DATABASE_URL")
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

# database config
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# user manager
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.errorhandler(404)
def not_fount(error):
    ''' when u refresh in a react route it will return a 404 this will handle the 404
    and will return the react static file that will know what to do with that url if it exsits'''
    return app.send_static_file("index.html")

# routes


@app.route("/")
def home():
    return app.send_static_file("index.html")


@app.route("/api/get-products")
def get_products():
    '''return all the products as json'''
    # get all the products from the database
    products = Product.query.all()

    # checks if the user is a coach  if true the normal_price will be filtered and vice versa
    price_tag = "normal_price" if current_user.is_authenticated and current_user.is_coach else "coach_price"
    jump_tag = "price_jump" if current_user.is_authenticated and current_user.is_coach else "price_jump_coach"
    # get the products data and filters out unnecessary keys
    data_1 = [filter_keys(vars(product), ["_sa_instance_state", price_tag, jump_tag])
              for product in products]
    # replace the coach_price or normal_price key to be named only price
    price_key = "normal_price" if price_tag == "coach_price" else "coach_price"
    jump_key = "price_jump" if jump_tag == "price_jump_coach" else "price_jump_coach"
    data_2 = [replace_key(item, old_key=price_key, new_key="price")
              for item in data_1]
    data = [replace_key(item, old_key=jump_key, new_key="price_jump")
            for item in data_2]

    return jsonify(data)


app.register_blueprint(admin_routes)
app.register_blueprint(user_login_routes)
app.register_blueprint(email_routes)
app.register_blueprint(register_routes)
app.register_blueprint(user_get_data)
app.register_blueprint(user_set_data)
app.register_blueprint(change_password_routes)
