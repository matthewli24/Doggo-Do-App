
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager

# create flask app
app = Flask(__name__)
api = Api(app)

# setting up db config
username = "todoappflask"
password = "todoappflask"
endpoint = "todoappflask.cejj8nvffgy6.us-east-1.rds.amazonaws.com"
db_instance_name = "todoappflask"
uri = 'mysql+pymysql://{}:{}@{}:3306/{}'.format(
    username, password, endpoint, db_instance_name)
print(uri)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "super_secret_key"
app.config['JWT_SECRET_KEY'] = "super_secret_key"

db = SQLAlchemy(app)

@app.before_first_request
def create_tables():
  db.create_all()

from app import routes

api.add_resource(routes.Index, '/')
api.add_resource(routes.UserRegistration, '/registration')
api.add_resource(routes.UserLogin, '/login')
api.add_resource(routes.UserLogoutAccess, '/logout/access')
api.add_resource(routes.UserLogoutRefresh, '/logout/refresh')
api.add_resource(routes.TokenRefresh, '/token/refresh')
api.add_resource(routes.AllUsers, '/users')
api.add_resource(routes.SecretResource, '/secret')
