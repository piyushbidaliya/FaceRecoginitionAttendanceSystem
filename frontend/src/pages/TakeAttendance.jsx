import React from 'react';
import { Header } from '../components';

const TakeAttendance = () => {
  const startAttendance = async () => {
    const response = await fetch('http://127.0.0.1:5000/take_attendance', { method: 'POST' });
    const data = await response.json();
    if (data.status === 'Attendance started') {
      window.open(data.url, '_blank');
    } else {
      alert('Failed to start attendance');
    }
  };

  return (
    <>
      <Header />
      <section className='relative bg-banner bg-center bg-no-repeat h-screen bg-cover w-full'>
        <div className='max_padd_container relative top-32 xs:top-52'>
          <h1 className="text-2xl font-bold mb-4 text-center text-primary bg-secondary rounded-lg">Take Attendance</h1>
          <div className='mt-16 text-center'>
            <button className="btn_dark_rounded" onClick={startAttendance}>Start Attendance</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default TakeAttendance;
