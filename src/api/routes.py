"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/products', methods = ['GET', 'POST'])
def products():
    response_body={}
    if request.method == 'GET':
        # Obtener todos los registros de Products
        rows = db.session.execute(db.select(Products)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Respondiendo desde el GET de /products'
        return response_body, 200 
    if request.method == 'POST':
        data = request.json
        print('Esto es lo que muestra el print', data, '********')
        row = Products(name=data.get('name', None),
                       description=data.get('description', 'Sin descripcion'),
                       price=data.get('price', None))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Respondiendo desde el POST de /products'  
    return response_body, 200   

# lo que haya en la ruta al lado de 'int' en este caso id tiene que recibirlo la funcion como parametro
@api.route('/products/<int:product_id>', methods=['GET', 'PUT', 'DELETE'])
def product(product_id):
    response_body = {}
    row = db.session.execute(db.select(Products).where(Products.id==product_id)).scalar()
    if not row:
            response_body['message'] = 'Producto no encontrado'
            return response_body, 404
    if request.method == 'GET':
        # print('Valor de row:',row)
        response_body['results'] = row.serialize()
        response_body['message'] = f'Detalles del producto {product_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name', row.name)
        row.description = data.get('description', row.description)
        row.price = data.get('price', row.price)
        db.session.commit()
        response_body['message'] = f'Producto {product_id} modificado'
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Producto {product_id} eliminado'
        return response_body, 200
    
"""
@api.route('/students', methods=['GET'])
def students():
    response_body = {}
    # Vamos a consumir una api externa/de terceros
    url = "https://jsonplaceholder.typicode.com/users"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for row in data:
            print(row['name'], row['company']['name'])
            row = Students(name=row['name'],
                           phone=row['phone'],
                           email=row['email'],
                           company=row['company']['name'])
            db.session.add(row)
            db.session.commit()
            response_body['message'] = 'Estudiantes agregados desde la API'
            response_body['results'] = data
        return response_body, 200
    return response_body, 400
"""