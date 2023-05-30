from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import config

db = SQLAlchemy()

def create_app():
    
    app = Flask(__name__)
    app.config.from_object(config)
    
    CORS(app, resources={r"/flask/*" : {"origins" : '*'}})
    db.init_app(app)

    from .views import object_detect
    app.register_blueprint(object_detect.bp)
    
    return app