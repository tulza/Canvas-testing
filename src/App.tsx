import Navigation from "@components/Navigation";
import "@styles/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Canvas from "./components/pages/Canvas";

function App() {
  return (
    <Router basename="/vite-react-ts-template">
      <Navigation />
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;