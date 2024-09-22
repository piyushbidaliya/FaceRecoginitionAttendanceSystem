import React, { useState } from 'react';
import upload_area from '../assets/upload_area.svg';
import { MdAdd } from 'react-icons/md';
import { Header } from '../components';

const AddStudent = () => {

    const [image, setImage] = useState(null);
    const [studentDetails, setStudent] = useState({
      id: '',
      name: '',
      major: '',
      starting_year: '',
      standing: '',
      year: '',
      total_attendance: 0,
      last_attendance_time: ''
    });

    const Add_Student = async () => {
        console.log(studentDetails);
        let responseData;
        let student = studentDetails;
        let formData = new FormData();
        formData.append('file', image);

        // Upload the image first
        await fetch('http://localhost:5000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data });

        if (responseData.success) {
            student.image = responseData.image_url;
            console.log(student);
            await fetch('http://localhost:5000/addstudent', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Student Added") : alert("Upload Failed");
            });
        }
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setStudent({ ...studentDetails, [e.target.name]: e.target.value });
    }

    return (
    <div><Header/>
      <section className='mb-20'>
        <div className='p-8 box-border bg-white rounded-sm lg:mx-7 relative top-24'>
            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Student Id:</h4>
                <input value={studentDetails.id} onChange={changeHandler} type="text" name='id' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>
            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Name:</h4>
                <input value={studentDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>
            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Major:</h4>
                <input value={studentDetails.major} onChange={changeHandler} type="text" name='major' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>

            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Starting Year:</h4>
                <input value={studentDetails.starting_year} onChange={changeHandler} type="text" name='starting_year' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>

            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Standing:</h4>
                <input value={studentDetails.standing} onChange={changeHandler} type="text" name='standing' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>

            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Year:</h4>
                <input value={studentDetails.year} onChange={changeHandler} type="text" name='year' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>

            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Total Attendance:</h4>
                <input value={studentDetails.total_attendance} onChange={changeHandler} type="number" name='total_attendance' placeholder='Type Here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>

            <div className='mb-3'>
                <h4 className='bold-18 pb-2'>Last Attendance Time:</h4>
                <input value={studentDetails.last_attendance_time} onChange={changeHandler} type="text" name='last_attendance_time' placeholder='YYYY-MM-DD HH:MM:SS' className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' />
            </div>

            <div>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='w-20 rounded-sm inline-block' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden className='bg-primary max-w-80 w-full py-3 px-4' />
            </div>
            <button onClick={Add_Student} className='btn_dark_rounded mt-4 flexCenter gap-x-2'><MdAdd className='bold-18' />Add Student</button>
        </div>
        </section>
        </div>

    );
}

export default AddStudent;
