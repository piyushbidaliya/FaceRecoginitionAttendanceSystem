import subprocess
import firebase_admin
from firebase_admin import credentials, db, storage
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from config import databaseURL, storageBucket

app = Flask(__name__)
CORS(app)

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': databaseURL,
    'storageBucket': storageBucket
})

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/take_attendance', methods=['POST'])
def take_attendance():
    # Launch main.py
    subprocess.Popen(['python', 'main.py'])
    return jsonify({"status": "Attendance started", "url": "http://127.0.0.1:5000/attendance_started"}), 200

@app.route('/attendance_started', methods=['GET'])
def attendance_started():
    return "<h1>Attendance process has started.</h1>"


@app.route('/allstudents', methods=['GET'])
def all_students():
    ref = db.reference('Students')
    students = ref.get()
    if students:
        students_with_id = [
            {**student_data, 'id': student_id} 
            for student_id, student_data in students.items()
        ]
        return jsonify(students_with_id), 200
    return jsonify([]), 200


@app.route('/removestudent', methods=['POST'])
def remove_student():
    data = request.get_json()
    student_id = data.get('id')
    if not student_id:
        return jsonify({"success": False, "message": "No student ID provided"}), 400

    ref = db.reference('Students')
    student_ref = ref.child(student_id)
    if student_ref.get():
        student_ref.delete()
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False, "message": "Student not found"}), 404


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"success": False, "message": "No file part"})

    file = request.files['file']
    if file.filename == '':
        return jsonify({"success": False, "message": "No selected file"})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        bucket = storage.bucket()
        blob = bucket.blob(f'Images/{filename}')
        blob.upload_from_filename(file_path)
        blob.make_public()
        
        file_url = blob.public_url
        return jsonify({"success": True, "image_url": file_url})

    return jsonify({"success": False, "message": "File type not allowed"})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/addstudent', methods=['POST'])
def add_student():
    data = request.get_json()
    student_id = data['id']
    student = {
        "name": data['name'],
        "major": data['major'],
        "starting_year": data['starting_year'],
        "standing": data['standing'],
        "year": data['year'],
        "image": data.get('image', ''),  
        "total_attendance": data.get('total_attendance', 0),
        "last_attendance_time": data.get('last_attendance_time', "")
    }
    ref = db.reference('Students')
    ref.child(student_id).set(student)
    return jsonify({"success": True})

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
