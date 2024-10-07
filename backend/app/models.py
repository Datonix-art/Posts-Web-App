from app import db
from datetime import datetime

class BaseModel:
  def create(self):
    db.session.add(self)
    db.session.commit()
  def save(self):
    db.session.commit()
  def delete(self):
    db.session.delete(self)
    db.session.commit()

class PostModel(db.Model, BaseModel):
  __tablename__ = 'post'
  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(40), nullable=False, unique=True)
  content = db.Column(db.Text(300), nullable=False, unique=False)
  image = db.Column(db.String, nullable=False, unique=False)
  created_at = db.Column(db.Date, default=datetime.now())
  comments = db.relationship('CommentModel', backref='comments', lazy=True)

  def to_json(self):
    return {
      'id': self.id,
      'title': self.title,
      'content': self.content,
      'image': self.image
    }

class CommentModel(db.Model, BaseModel):
  __tablename__ = 'comment'
  id = db.Column(db.Integer, primary_key = True)
  comment = db.Column(db.Text(150), nullable=False, unique=False)
  post_id = db.Column(db.Integer, db.ForeignKey('post.id'))

  def to_json(self):
    return {
      'id': self.id,
      'comment': self.comment,
      'post_id': self.post_id
    }
