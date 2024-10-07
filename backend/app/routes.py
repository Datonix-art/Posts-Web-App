from flask import Blueprint, request, jsonify
from app.models import PostModel, CommentModel, db
import os


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
  
@main_bp.route('/get_comments')
def get_comments():
  post_id = request.args.get('post_id')
  
  if not post_id:
    return jsonify({'error': 'Missing post id'}), 400
  
  comments = CommentModel.query.filter_by(post_id=post_id).all()
  comment_to_json = [comment.to_json() for comment in comments]
  return jsonify({'comments': comment_to_json}), 200
  
@main_bp.route('/create_comment', methods=['POST'])
def create_comment():
  data = request.get_json()

  if 'comment' not in data or 'post_id' not in data:
      return jsonify({'message': 'Missing fields: comment and post_id'}), 400

  comment = data['comment']
  post_id = data['post_id']

  new_comment = CommentModel(comment=comment, post_id=post_id)
  try:
    new_comment.create()
    return jsonify({'message': 'comment create succesfully', 'comment': new_comment.to_json()}), 201
  except Exception as e:
    print(f"Error creating comment: {e}") 
    return jsonify({'message': f'error creating comment: {e}'}), 500
  
@main_bp.route('/delete_posts', methods=['DELETE'])
def delete_posts():
  try:
    num_deleted = PostModel.query.delete()
    db.session.commit()
    if num_deleted == 0:
        return jsonify({'message': 'There are no posts to delete.'}), 200
    return jsonify({'message': 'Posts deleted successfully.'}), 200
  except Exception as e:
    db.session.rollback()
    print(f'Error message: {str(e)}')
    return jsonify({'error': str(e)}), 500
