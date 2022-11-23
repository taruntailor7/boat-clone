import "./App.css";
import { AllRoutes } from "./Components/AllRoutes";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Pages/Footer";

function App() {
  // let isAuth = localStorage.getItem('isAuth');
  // let name = localStorage.getItem("name");
  
  //isAuth={isAuth} name={name} handleLogout={handleLogout}

  // const handleLogout = ()=>{
  //   localStorage.setItem("isAuth", false);
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("name");
  // }
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
