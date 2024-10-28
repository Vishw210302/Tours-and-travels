import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScrollToTop from './Api/ScrollToTop';
import { FlightTicketsDetailsProvider } from './Context/FlightTicketsDetailsContext';
import { PassengerCountProvider } from './Context/PassengerCountContext';
import Aboutus from './Pages/AboutUs/Aboutus';
import DomesticPackages from './Pages/AllPackages/DomesticPackages';
import InternationalPackages from './Pages/AllPackages/InternationalPackages';
import BlogDetailsPage from './Pages/Blogs/BlogDetailsPage';
import Blogs from './Pages/Blogs/Blogs';
import ContactUs from './Pages/ContactUs/ContactUs';
import FlightSeatBooking from './Pages/FlightBook/Components/FlightSeatBooking';
import FlightsTicketsPaymentPage from './Pages/FlightBook/Components/FlightsTicketsPaymentPage';
import MealAndSelect from './Pages/FlightBook/Components/MealAndSelect';
import PassengerDetails from './Pages/FlightBook/Components/PassengerDetails';
import FlightBook from './Pages/FlightBook/FlightBook';
import FlightsPageListing from './Pages/FlightsPagesListing/FlightsPageListing';
import Home from './Pages/Home/Home';
import HotelBookingResult from './Pages/HotelsBooking/HotelBookingResult';
import HotelBookings from './Pages/HotelsBooking/HotelBookings';
import Itenary from './Pages/Itenary/Itenary';
import ItenaryDetail from './Pages/Itenary/ItenaryDetails/index';
import MainLayout from './Pages/MainLayout';
import PopularTheme from './Pages/PopularTheme/PopularTheme';

const stripePromise = loadStripe('pk_test_51ON98CSEV9soa2c8CWj7i2O7pHm9b1EXoTi1LBhfICMonxhRKNHPPZU1bQ9FCYPwfcb4BzZ3RF8eTLHEt0ENjI3L00VzfQwTB9');

function App() {

  return (
    <PassengerCountProvider>
      <FlightTicketsDetailsProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <ScrollToTop />
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
                <Route path="hotels" element={<HotelBookings />} />
                <Route path="booking-results" element={<HotelBookingResult />} />
                <Route path="itenary-details/:id" element={<ItenaryDetail />} />
                <Route path="blog-details/:id" element={<BlogDetailsPage />} />
                <Route path="flight-book/:className/:key/:id" element={<FlightBook />} />
                <Route path="meal-booking/:className/:id" element={<MealAndSelect />} />
                <Route path="flight-seat-booking/:className/:id" element={<FlightSeatBooking />} />
                <Route path="tickets-payment/:className/:id" element={<FlightsTicketsPaymentPage />} />
                <Route path="passenger-details/:className/:id" element={<PassengerDetails />} />
                <Route path="popularTheme" element={<PopularTheme />} />
              </Route>
            </Routes>
          </Router>
        </Elements>
      </FlightTicketsDetailsProvider>
    </PassengerCountProvider>
  )
}

export default App