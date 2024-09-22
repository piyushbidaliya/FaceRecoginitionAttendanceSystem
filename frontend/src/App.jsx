import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer, TakeAttendance, AddStudent, StudentAttendance, Home, Login, Register } from "./components"




export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <BrowserRouter>
          <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/take-attendance" element={<TakeAttendance/>}/>
              <Route path="/add-student" element={<AddStudent/>}/>
              <Route path="/student-attendance" element={<StudentAttendance/>} />
              <Route path="/" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </main>
  )
}