
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import  About from './components/About';
import Bookmark from './components/Bookmark';
import Navbar from './components/Navbar';

function App() {
  return (

        <Router>
       <Navbar/>
        <div className='container p-4'>
        </div>
       <Routes>
        <Route path="/about" element={<About/>}>
        </Route>
        <Route path="/" element={<Bookmark/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
