import face_recognition
import json
import glob
import os
import base64
import time


def main():
    if glob.glob("uploads/input.*") != []:

        path = glob.glob("uploads/input.*")[0]
        time.sleep(1)
        image = face_recognition.load_image_file(path)
        face_encoding = face_recognition.face_encodings(image)[0]
        data = json.dumps(face_encoding.tolist())

        with open(path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            tmp = '{' + '"data":"' + data + '", "face":"' + \
                encoded_string.decode('utf-8') + '"}'
            with open("data.txt", "w") as fp:

                json.dump(
                    json.loads(tmp), fp)
                print("created")
                os.remove(path)


while True:
    main()
