
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from config import databaseURL

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': databaseURL
})

ref = db.reference('Students')

data = {
    "2018267":
        {
            "name": "Ayush Negi",
            "major": "Computer",
            "starting_year": 2020,
            "total_attendance": 7,
            "standing": "A",
            "year": 4,
            "last_attendance_time": "2022-12-11 00:54:34",
            "image": "https://firebasestorage.googleapis.com/v0/b/faceattendance-8b317.appspot.com/o/Images%2F2018267.png?alt=media&token=efd4e416-e9d9-4613-972c-9c94b63d1571"
        },
    "852741":
        {
            "name": "Piyush Bidaliya",
            "major": "Economics",
            "starting_year": 2021,
            "total_attendance": 12,
            "standing": "B",
            "year": 1,
            "last_attendance_time": "2022-12-11 00:54:34",
            "image": "https://firebasestorage.googleapis.com/v0/b/faceattendance-8b317.appspot.com/o/Images%2F852741.jpg?alt=media&token=9f6cfc87-83f1-43ba-a3d2-43a826e63007"

        },
    "963852":
        {
            "name": "Aman Bisht",
            "major": "Physics",
            "starting_year": 2020,
            "total_attendance": 7,
            "standing": "G",
            "year": 2,
            "last_attendance_time": "2022-12-11 00:54:34",
            "image": "https://firebasestorage.googleapis.com/v0/b/faceattendance-8b317.appspot.com/o/Images%2F963852.png?alt=media&token=5b8e35af-4af3-4f7d-992c-64dd2dc22994"

        }
}

for key, value in data.items():
    ref.child(key).set(value)

