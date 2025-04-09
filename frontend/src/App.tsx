import './App.css'
// import FarmForm from './components/FarmForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmPage  from './pages/FarmPage';
import FarmFormPage from './pages/FarmFormPage';

function App() {

  return (
    <>
      {/* <main>
        <h1>FarmApp</h1>
        <FarmForm/>
      </main> */}

      <Router>
      <main className="p-6">
        {/* <h1 className="text-2xl font-bold mb-4">FarmApp</h1> */}
        <Routes>
          <Route path="/" element={<FarmPage  />} />
          <Route path="/farms/new" element={<FarmFormPage />} />
          <Route path="/farms/edit/:id" element={<FarmFormPage />} />
        </Routes>
      </main>
    </Router>

    </>
  )
}

export default App
