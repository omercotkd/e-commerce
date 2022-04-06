from main import db

class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)

    normal_price = db.Column(db.Float, nullable=False)
    coach_price = db.Column(db.Float)

    sizes = db.Column(db.String(1000))
    sizes_text = db.Column(db.String(10))
    price_jump = db.Column(db.Float, default=0)
    price_jump_coach = db.Column(db.Float, default=0)

    in_stock = db.Column(db.Boolean, default=True)
    number_images = db.Column(db.Integer)
    group = db.Column(db.String(10))