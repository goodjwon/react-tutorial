import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import UseRef1 from './useRef_1';
import UseRef2 from './useRef_2';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/ref1">UseRef1</Link>
            </li>
            <li>
              <Link to="/ref2">UseRef2</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/ref1" element={<UseRef1 />} />
          <Route path="/ref2" element={<UseRef2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
