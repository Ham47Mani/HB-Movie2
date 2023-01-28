//--- Import Styles Files
import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

//--- Route
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './config/AllRoutes';

//--- Component
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AllRoutes />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
