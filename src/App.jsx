
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookDisplay } from "./components";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BookDisplay />}></Route>
    </Routes>
  </Router>
)


export default App
