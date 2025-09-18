"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', method=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email:
        return jsonify({"msg": "Bag email or password in body."}), 401
    
    user = User.query.filter_by(email=email).one_or_none()

    if not user:
        return jsonify({"msg": "Bad username or password"}, 401)
    
    if user.password != password:
        return ({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identify=email)
    return jsonify({
        "access_token": access_token,
        "name": user.name,
        "email": user.email
    }), 200

@api.route('/signup', method=["POST"])
def singup():
    body = request .get_json()

    if not body.get('name') or not body.get('password'):
        return jsonify({"error": "Email y password son requeridos"}), 400
    
    if User.query.filter_by(email=body['email']).first():
        return jsonify({"error": "Email ya esxiste"}), 400
    
    user = User(
        email=body['email'],
        password=body['password'],
        is_active=True
    )

    try:
        db.session.add(user)
        db.session.commit()
    except:
        return jsonify({"msg": "Usuario no creado"}), 500
     