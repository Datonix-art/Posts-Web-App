from flask import Blueprint, request, jsonify
import os
from app.models import PostModel

main_bp = Blueprint('main_bp', __name__)

@main_bp.route('/')
def index():
  return jsonify({'message': 'everything has loaded perfectly'}), 200

@main_bp.route('/get_posts')
def get_posts():
  posts = PostModel.query.all()
  posts_to_json = [post.to_json() for post in posts]
  return jsonify({"posts" : posts_to_json}), 200

@main_bp.route('/create_post', methods=['POST'])
def create_post():
  title = request.form.get('title')
  content = request.form.get('content')
  image_file = request.files.get('image')

  if not image_file:
    return jsonify({'message': 'no image was uploaded'}), 400
  
  existing_post = PostModel.query.filter_by(title=title).first()
  if existing_post:
    return jsonify({'message': 'Title must be unique'}), 400
  
  image_filename = image_file.filename
  new_post = PostModel(title = title, content = content, image = image_filename)
  image_file.save((os.path.join(main_bp.root_path, 'static/images', image_filename)))
  
  try:
    new_post.create()
    return jsonify({'message':'post created succesfully'}), 201
  except Exception as e:
    return jsonify({'error': f'Error creating post: {e}'}), 409
  