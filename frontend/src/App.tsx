import './App.css'
// import FarmForm from './components/FarmForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmPage  from './pages/FarmPage';
// import AddFarm from './pages/AddFarm';
// import EditFarm from './pages/EditFarm';

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
          {/* <Route path="/farms/new" element={<AddFarm />} />
          <Route path="/farms/:id/edit" element={<EditFarm />} /> */}
        </Routes>
      </main>
    </Router>

    </>
  )
}

export default App
