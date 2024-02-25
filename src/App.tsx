import Navigation from "@components/Navigation";
import "@styles/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Canvas from "./components/pages/Canvas";
import Canvas1 from "./components/pages/Canvas1";
import Canvas2 from "./components/pages/Canvas2";
import Canvas3 from "./components/pages/Canvas3";

function App() {
  return (
    <Router basename="/Canvas-testing">
      <Navigation />
      <Routes>
        <Route path="/main" element={<Canvas />} />
        <Route path="1" element={<Canvas1 />} />
        <Route path="2" element={<Canvas2 />} />
        <Route path="3" element={<Canvas3 />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </Router>
  );
}

export default App;
