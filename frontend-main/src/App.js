import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./componets/Navbar";
import DisplayNavbar from "./componets/DisplayNavbar";

function App() {
  return (
    <div className="App">
      <DisplayNavbar />
      <Navbar />
    </div>
  );
}

export default App;
