from flask import Flask, make_response
from flask_pymongo import PyMongo
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from scrape import InstagramBot
from mongodb import get_data
import pymongo
from pymongo import MongoClient
import json
from flask_json import json_response


client = MongoClient('localhost', 27017)

db = client.test

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def hello_world():
    return 'Hello, World!'


@app.route('/getname')
# def get_name():
#     return jsonify({"name": "Simranjt Singh....This is from Server"})
@cross_origin()
def get_name():
    data = get_data(db)
    return json.dumps({"insta_data": data, "name": "Simran"})


@app.route('/get_posts', methods=["POST"])
def set_name():
    name = json.loads(request.data)
    print(name["name"])
    bot = InstagramBot('7783250627', 'Langara!')
    images = bot.signIn(name["name"])
    return json.dumps({"images": images})
