from app import app
from flask import jsonify
from flask_restful import Resource, reqparse
from app.models import User, Todo_item

parser = reqparse.RequestParser()
parser.add_argument(
    'username', help='This field cannot be blank', required=True)


class Index(Resource):
  def get(self):
    return {'message': 'Hello, World!'}


class UserRegistration(Resource):
  def post(self):
    data = parser.parse_args()

    if User.find_by_username(data['username']):
      return {'message': 'User {} already exists'. format(data['username'])}

    new_user = User(username=data['username'])

    try:
      new_user.save_to_db()
      return {
          'message': 'User {} was created'.format(data['username'])
      }
    except:
      return {'message': 'Something went wrong'}, 500


class UserLogin(Resource):
  def post(self):
    data = parser.parse_args()
    return data


class UserLogoutAccess(Resource):
  def post(self):
    return {'message': 'User logout'}


class UserLogoutRefresh(Resource):
  def post(self):
    return {'message': 'User logout'}


class TokenRefresh(Resource):
  def post(self):
    return {'message': 'Token refresh'}


class AllUsers(Resource):
  def get(self):
    return User.all_users()

  def delete(self):
    return {'message': 'Delete all users'}


class SecretResource(Resource):
  def get(self):
    return {
        'answer': 42
    }
