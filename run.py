import requests
from pymongo import MongoClient
import face_recognition
import json
from bson.objectid import ObjectId
import time

client = MongoClient('mongodb://localhost:27017')
db = client['users']
users = db.users
URL = "https://kameken-smart-mirror.com/api/getFace"
#URL = "http://192.168.3.2:8000/api/getFace"
print("connecting")


r = requests.get(url=URL)
res = r.json()
data = res["data"]
for obj in data:
    if "image" not in obj:
        try:
            image = face_recognition.load_image_file(
                "public/" + obj["_id"] + ".png")
            face_encoding = face_recognition.face_encodings(image)[0]
            face_data = json.dumps(face_encoding.tolist())
            # print(face_data)
            current_user = {"_id": ObjectId(obj["_id"])}
            update = {"$set": {"image": face_data}}

            users.update_one(current_user, update)
            print("Updating")
        except:
            print("there is no image for " + obj['_id'])




