from app import app
from flask import jsonify
from flask_restful import Resource, reqparse
from app.models import User, Todo_item, RevokedTokenModel
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument(
    'username', help='This field cannot be blank', required=True)


class Index(Resource):
  def get(self):
    return {'message': 'Welcome to the Flask Api!'}


class UserRegistration(Resource):
  def post(self):
    data = parser.parse_args()

    if User.find_by_username(data['username']):
      return {'message': 'User {} already exists'. format(data['username'])}

    new_user = User(username=data['username'])

    try:
      new_user.save_to_db()
      access_token = create_access_token(identity = data['username'])
      refresh_token = create_refresh_token(identity = data['username'])
      return {
          'message': 'User {} was created'.format(data['username']),
          'access_token': access_token,
          'refresh_token': refresh_token
      }
    except:
      return {'message': 'AH Shit! Something went wrong'}, 500


class UserLogin(Resource):
  def post(self):
    data = parser.parse_args()
    current_user = User.find_by_username(data['username'])

    if not current_user:
      return {'message': 'User {} doesn\'t exist'.format(data['username'])}

    if current_user:
      access_token = create_access_token(identity = data['username'])
      refresh_token = create_refresh_token(identity = data['username'])
      return {
        'message': 'Logged in as {}'.format(current_user.username),
        'access_token': access_token,
        'refresh_token': refresh_token
      }
    else:
      return {'message': 'Wrong credentials'}



class UserLogoutAccess(Resource):
  def post(self):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
          revoked_token = RevokedTokenModel(jti = jti)
          revoked_token.add()
          return {'message':'Access token has been revoked'}
        except:
          return {'message': 'AH Shit! Something went wrong'}, 500


class UserLogoutRefresh(Resource):
  @jwt_refresh_token_required
  def post(self):
    jti = get_raw_jwt()['jti']
    try:
      revoked_token = RevokedTokenModel(jti = jti)
      revoked_token.add()
      return {'message':'Refresh token has been revoked'}
    except:
      return {'message': 'AH Shit! Something went wrong'}, 500


class TokenRefresh(Resource):
  @jwt_refresh_token_required
  def post(self):
    current_user = get_jwt_identity()
    access_token = create_access_token(identity = current_user)
    return {'access_token': access_token}


class AllUsers(Resource):
  def get(self):
    return User.all_users()

  def delete(self):
    return {'message': 'Delete all users'}


class SecretResource(Resource):
  @jwt_required
  def get(self):
    return {
        'answer': 42
    }
