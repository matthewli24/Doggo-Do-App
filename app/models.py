from app import db


class User(db.Model):

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  todo_items = db.relationship('Todo_item', backref='user', lazy=True)

  def __repr__(self):
    return '<User %r>' % self.username

  def save_to_db(self):
    db.session.add(self)
    db.session.commit()

  @classmethod
  def find_by_username(cls, username):
    return cls.query.filter_by(username=username).first()

  @classmethod
  def all_users(cls):
    def to_json(x):
      return {'username': x.username}
    return {'users': list(map(lambda x: to_json(x), User.query.all()))}


class Todo_item(db.Model):

  id = db.Column(db.Integer, primary_key=True)
  item = db.Column(db.String(120), nullable=False)
  completed = db.Column(db.Boolean, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

  def __repr__(self):
    return '<Todo_item %r>' % self.item


class RevokedTokenModel(db.Model):
  __tablename__ = 'revoked_tokens'
  id = db.Column(db.Integer, primary_key=True)
  jti = db.Column(db.String(120))

  def add(self):
    db.session.add(self)
    db.session.commit()

  @classmethod
  def is_jti_blacklisted(cls, jti):
    query = cls.query.filter_by(jti=jti).first()
    return bool(query)
