import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmsPage  from './pages/FarmsPage';
// import FarmForm from './components/farm/FarmForm';
import Navbar from './components/nav/Navbar';

function App() {

  return (
    <>
      {/* <main>
        <h1>FarmApp</h1>
        <FarmForm/>
      </main> */}

      <Router>
        <Navbar/>
          <main className="p-6">
            {/* <h1 className="text-2xl font-bold mb-4">FarmApp</h1> */}
            <Routes>
              <Route path="/" element={<FarmsPage  />} />
              {/* <Route path="/farms/new" element={<FarmForm />} />
              <Route path="/farms/edit/:id" element={<FarmForm />} /> */}
            </Routes>
          </main>
    </Router>

    </>
  )
}

export default App
