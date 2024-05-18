import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './components/Register'
import Header from './components/Header'
import { DatePickerDemo } from './components/DatePickerDemo'

function App() {

  return (
    <main>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/date" element={<DatePickerDemo />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
