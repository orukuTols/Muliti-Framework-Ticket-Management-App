import { BrowserRouter, Routes, Route } from "react-router-dom"; // ⬅️ Must import Routes and Route
import Navbar from "./components/Navbar"; // 
import Footer from "./components/Footer"; // 
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from './pages/Login.jsx';
import SignUpPage from './pages/SignUp.jsx';
import Hero from "./components/Hero.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import TicketManager from './pages/TicketManager.jsx';
import HomeRouter from './components/HomeRouter.jsx';


function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
    
        <main className="flex-grow">
         <Navbar />
          <Routes>  
           
            <Route path="/" element={<HomeRouter />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage/>} />
         
          </Routes>
<Footer />
        </main>

        
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;