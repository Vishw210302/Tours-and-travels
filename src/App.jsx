
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Pages/MainLayout';
import Home from './Pages/Home/Home';
import Aboutus from './Pages/AboutUs/Aboutus';
import Blog from './Pages/Blog/Blog';
import ContactUs from './Pages/ContactUs/ContactUs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />    
          <Route path="about" element={<Aboutus />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
