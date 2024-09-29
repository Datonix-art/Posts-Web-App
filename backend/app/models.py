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
  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(40), nullable=False, unique=True)
  content = db.Column(db.Text(300), nullable=False, unique=False)
  image = db.Column(db.String, nullable=False, unique=False)
  created_at = db.Column(db.Date, default=datetime.now())

  def to_json(self):
    return {
      'title': self.title,
      'content': self.content,
      'image': self.image
    }