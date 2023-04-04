import react from 'react'
import {
  HashRouter as Router,
  Route, Routes
} from 'react-router-dom';

import Calculator from './components/Calculator';
import DataSearch from './components/DataSearch';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Logo from './components/Logo';

function App() {
  return (
    <div className="App h-screen overflow-hidden bg-gradient-to-tr from-neutral-700 via-gray-800 to-neutral-900">

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Logo />} />
          <Route path='/rate_calculator' element={<Calculator />} />
          <Route path='/data_search' element={<DataSearch />} />
          <Route path='/loading' element={<Loading />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
