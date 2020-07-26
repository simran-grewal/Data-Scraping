from flask import Flask, make_response
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import pymongo
from pymongo import MongoClient
import json
from flask_json import json_response
from pymongo import MongoClient
from mongodb import get_images


client = MongoClient('localhost', 27017)
instagram = client.instagram
user = instagram.user


app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@cross_origin()
@app.route('/get_posts', methods=["POST"])
def set_name():
    name = json.loads(request.data)["name"]
    images = get_images(user, name)
    return json.dumps({"images": images})


# @cross_origin()
# def get_name():
#     data = get_data(db)
#     return json.dumps({"insta_data": data, "name": "Simran"})
