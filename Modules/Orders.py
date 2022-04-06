from main import db
from sqlalchemy.orm import relationship

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    # when adding need to make sure that the time is local to my country
    date = db.Column(db.String(100), nullable=False)
    the_order = db.Column(db.Text, nullable=False)
    comments = db.Column(db.String(500))
    delivered = db.Column(db.Boolean, default=False)

    customer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    order_owner = relationship("User", back_populates="user_orders")