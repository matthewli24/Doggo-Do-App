from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager


# create flask app
app = Flask(__name__,template_folder="build", static_folder="build/static")
api = Api(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template('index.html')

# setting up db config
username = "todoappflask"
password = "todoappflask"
endpoint = "todoappflask.cejj8nvffgy6.us-east-1.rds.amazonaws.com"
db_instance_name = "todoappflask"
uri = 'mysql+pymysql://{}:{}@{}:3306/{}'.format(username, password, endpoint, db_instance_name)

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "b2BKk88uOQB98oJpYss3ZtkrTlfmhyeud9EOHYH6iEhIwsoQG5Gegv0EgtlePea"

db = SQLAlchemy(app)

#config for jwt token
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config['JWT_SECRET_KEY'] = "b2BKk88uOQB98oJpYss3ZtkrTlfmhyeud9EOHYH6iEhIwsoQG5Gegv0EgtlePea"
jwt = JWTManager(app)


@app.before_first_request
def create_tables():
  db.create_all()

from api.models import User, Todo_item, RevokedTokenModel

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
  jti = decrypted_token['jti']
  return RevokedTokenModel.is_jti_blacklisted(jti)

from api import routes

api.add_resource(routes.Index, '/api')
api.add_resource(routes.UserRegistration, '/api/registration')
api.add_resource(routes.UserLogin, '/api/login')
api.add_resource(routes.UserLogoutAccess, '/api/logout/access')
api.add_resource(routes.UserLogoutRefresh, '/api/logout/refresh')
api.add_resource(routes.TokenRefresh, '/api/token/refresh')
api.add_resource(routes.AllUsers, '/api/users')
api.add_resource(routes.SecretResource, '/api/secret')
api.add_resource(routes.AddItem,'/api/additem')
api.add_resource(routes.GetUserList,'/api/todolist')
api.add_resource(routes.UpdateItem,'/api/updateitem')
api.add_resource(routes.DeleteItem,'/api/deleteitem')
