
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DomesticPackages from './Pages/AllPackages/DomesticPackages';
import InternationalPackages from './Pages/AllPackages/InternationalPackages';
import Blogs from './Pages/Blogs/Blogs';
import ContactUs from './Pages/ContactUs/ContactUs';
import FlightsPageListing from './Pages/FlightsPagesListing/FlightsPageListing';
import Home from './Pages/Home/Home';
import Itenary from './Pages/Itenary/Itenary';
import ItenaryDetail from './Pages/Itenary/ItenaryDetails/index';
import MainLayout from './Pages/MainLayout';
import BlogDetailsPage from './Pages/Blogs/BlogDetailsPage';
import Aboutus from './Pages/AboutUs/Aboutus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="aboutUs" element={<Aboutus />} />
          <Route path="Blogs" element={<Blogs />} />
          <Route path="International" element={<InternationalPackages />} />
          <Route path="Domestic" element={<DomesticPackages />} />
          <Route path="itenary/:id" element={<Itenary />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="flights" element={<FlightsPageListing />} />
          <Route path="itenary-details/:id" element={<ItenaryDetail />} />
          <Route path="blog-details/:id" element={<BlogDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App