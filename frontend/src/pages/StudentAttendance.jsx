import React, { useEffect, useState } from 'react';
import { TbTrash } from 'react-icons/tb';
import { Header } from '../components';

const StudentAttendance = () => {
    const [allStudents, setAllStudents] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/allstudents', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const students = await response.json();
            console.log(students); // Log to verify the data
            setAllStudents(students);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    }

    const removeStudent = async (student_id) => {
        try {
            const response = await fetch('http://localhost:5000/removestudent', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: student_id }) // Ensure correct ID is sent
            });
            const result = await response.json();
            console.log(result); // Log response for debugging
            if (result.success) {
                setAllStudents(allStudents.filter(student => student.id !== student_id));
            } else {
                console.error("Failed to remove student:", result.message);
            }
        } catch (error) {
            console.error("Error removing student:", error);
        }
    }
    
    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <>
        <Header/>
        <section className='mb-20'>
            <div className='relative top-24'>
                <div className='lg:mx-7 p-4 bg-white'>
                    <div className='bg-primary flexCenter justify-between px-4 py-3 rounded-sm'>
                        <h4 className='bold-18'>Total Student ({allStudents.length})</h4>
                    </div>
                    <div className='table_wrapper'>
                        <table className='w-full'>
                            <thead>
                                <tr className='text-left'>
                                    <th className='px-4 py-3'>Id</th>
                                    <th className='px-4 py-3'>Name</th>
                                    <th className='px-4 py-3'>Major</th>
                                    <th className='px-4 py-3'>Year</th>
                                    <th className='px-4 py-3'>Total Attendance</th>
                                    <th className='px-4 py-3'>Last Attendance Time</th>
                                    <th className='px-4 py-3'>Image</th>
                                    <th className='px-4 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allStudents && Object.entries(allStudents).map(([key, student]) => (
                                    <tr key={key}>
                                        <td className='px-4 py-3'>{student.id}</td>
                                        <td className='px-4 py-3'>{student.name}</td>
                                        <td className='px-4 py-3'>{student.major}</td>
                                        <td className='px-4 py-3'>{student.year}</td>
                                        <td className='px-4 py-3'>{student.total_attendance}</td>
                                        <td className='px-4 py-3'>{student.last_attendance_time}</td>
                                        <td className='px-4 py-3'><img src={student.image} alt="Student" className='w-12 h-12 rounded-full object-cover'/></td>
                                        <td className='px-4 py-3'><button onClick={() => removeStudent(student.id)} className='flexCenter bg-red-500 text-white p-2 rounded-full'><TbTrash /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default StudentAttendance;
