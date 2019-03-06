from app import app, db
from flask import jsonify
from flask_restful import Resource, reqparse
from app.models import User, Todo_item, RevokedTokenModel
from flask_jwt_extended import (create_access_token,
                                create_refresh_token,
                                jwt_required,
                                jwt_refresh_token_required,
                                get_jwt_identity,
                                get_raw_jwt,
                                get_current_user)


class Index(Resource):
  def get(self):
    return jsonify({"message": "Welcome to the Flask Api!"})


class UserRegistration(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("username", help="This field cannot be blank", required=True)
    data = parser.parse_args()

    if User.find_by_username(data["username"]):
      return jsonify({"message": "User {} already exists". format(data["username"])})

    new_user = User(username=data["username"])

    try:
      new_user.save_to_db()
      access_token = create_access_token(identity = data["username"])
      refresh_token = create_refresh_token(identity = data["username"])
      return jsonify({
          "message": "User {} was created".format(data["username"]),
          "access_token": access_token,
          "refresh_token": refresh_token
      })
    except:
      return {"message": "AH Shit! Something went wrong"}, 500


class UserLogin(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("username", help="This field cannot be blank", required=True)
    data = parser.parse_args()

    current_user = User.find_by_username(data["username"])

    if not current_user:
      return jsonify({"message": "User {} doesn\'t exist".format(data["username"])})

    if current_user:
      access_token = create_access_token(identity = data["username"])
      refresh_token = create_refresh_token(identity = data["username"])
      return jsonify({
        "message": "Logged in as {}".format(current_user.username),
        "access_token": access_token,
        "refresh_token": refresh_token
      })
    else:
      return jsonify({"message": "Wrong credentials"})



class UserLogoutAccess(Resource):
  def post(self):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()["jti"]
        try:
          revoked_token = RevokedTokenModel(jti = jti)
          revoked_token.add()
          return jsonify({"message":"Access token has been revoked"})
        except:
          return {"message": "AH Shit! Something went wrong"}, 500


class UserLogoutRefresh(Resource):
  @jwt_refresh_token_required
  def post(self):
    jti = get_raw_jwt()["jti"]
    try:
      revoked_token = RevokedTokenModel(jti = jti)
      revoked_token.add()
      return jsonify({"message":"Refresh token has been revoked"})
    except:
      return {"message": "AH Shit! Something went wrong"}, 500


class TokenRefresh(Resource):
  @jwt_refresh_token_required
  def post(self):
    current_user = get_jwt_identity()
    access_token = create_access_token(identity = current_user)
    return jsonify({"access_token": access_token})


class AllUsers(Resource):
  def get(self):
    return User.all_users()


class SecretResource(Resource):
  @jwt_required
  def get(self):
    return jsonify({
        "answer": 42
    })


class AddItem(Resource):
  @jwt_required
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("item", help="This field cannot be blank", required=True)
    data = parser.parse_args()

    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()


    item_to_be_added = Todo_item(item=data["item"],
                                 completed=False,
                                 user_id=user.id)

    item_to_be_added.add_item()

    return jsonify({'message':"Added Cat-Do item"})

class GetUserList(Resource):
  @jwt_required
  def get(self):
    current_username = get_jwt_identity()
    user = User.query.filter_by(username=current_username).first()

    return Todo_item.all_users_items(user.todo_items)


class UpdateItem(Resource):
  @jwt_required
  def put(self):
    parser = reqparse.RequestParser()
    parser.add_argument("id", type=int, help="This field cannot be blank", required=True)
    data = parser.parse_args()

    ## TODO: make sure the current_user is the author of the item(s)
    current_username = get_jwt_identity()
    current_user = User.query.filter_by(username=current_username).first()

    item = Todo_item.query.get(data["id"])

    if item and item.user_id == current_user.id:
        if not item.completed:
            item.completed = True
            db.session.commit()
        else:
            item.completed = False
            db.session.commit()

        return "updated item {}".format(item.id)
    else:
        return {"message": "item id is probably not valid"}, 500


class DeleteItem(Resource):
    @jwt_required
    def delete(self):
      parser = reqparse.RequestParser()
      parser.add_argument("id", type=int, help="This field cannot be blank", required=True)
      data = parser.parse_args()

      current_username = get_jwt_identity()
      current_user = User.query.filter_by(username=current_username).first()

      item = Todo_item.query.get(data["id"])

      if item and item.user_id == current_user.id:
        db.session.delete(item)
        db.session.commit()
        return "deleted item id: {} with content: {}".format(item.id, item.item)
      else:
          return {"message": "item id is probably not valid"}, 500
