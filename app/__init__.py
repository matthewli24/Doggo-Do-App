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

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
  jti = decrypted_token['jti']
  return models.RevokedTokenModel.is_jti_blacklisted(jti)

from app import routes

api.add_resource(routes.Index, '/')
api.add_resource(routes.UserRegistration, '/registration')
api.add_resource(routes.UserLogin, '/login')
api.add_resource(routes.UserLogoutAccess, '/logout/access')
api.add_resource(routes.UserLogoutRefresh, '/logout/refresh')
api.add_resource(routes.TokenRefresh, '/token/refresh')
api.add_resource(routes.AllUsers, '/users')
api.add_resource(routes.SecretResource, '/secret')
api.add_resource(routes.AddItem,'/additem')
api.add_resource(routes.GetUserList,'/todolist')
api.add_resource(routes.UpdateItem,'/update')
