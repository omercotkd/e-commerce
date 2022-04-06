from sqlalchemy.orm import relationship
from flask_login import UserMixin
from main import db

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    adderss = db.Column(db.String(300))
    phone_number = db.Column(db.String(13))
    company_id = db.Column(db.String(20))
    company_name = db.Column(db.String(100))
    is_coach = db.Column(db.Boolean, default=False)
    is_admin = db.Column(db.Boolean, default=False)
    cart_items = db.Column(db.Text)
    confirmed_email = db.Column(db.Boolean, default=False)

    user_orders = relationship("Order", back_populates="order_owner")