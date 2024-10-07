from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

migrate = Migrate()
db = SQLAlchemy()

def create_app():
  app = Flask(__name__)

  app.config.from_object('app.config.config')

  CORS(app=app, origins=["http://localhost:5173"]) 
  db.init_app(app=app)
  migrate.init_app(app=app, db=db)

  from app.routes import main_bp
  app.register_blueprint(main_bp)

  return app