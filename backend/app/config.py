from dotenv import load_dotenv
import os

load_dotenv()

class config:
  SECRET_KEY = os.getenv('SECRET_KEY')
  SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
  SQLALCHEMY_TRACK_MODIFICATIONS = False