// =======================================
// App.jsx
// 라우팅 설정
// =======================================
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BasicExamples from "./BasicExamples.jsx";
import IntermediateExamples from "./IntermediateExamples.jsx";
import AdvancedExamples from "./AdvancedExamples.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/basic">기본 예제</Link>
          <Link to="/intermediate">중급 예제</Link>
          <Link to="/advanced">고급 예제</Link>
        </nav>

        <Routes>
          <Route path="/basic" element={<BasicExamples />} />
          <Route path="/intermediate" element={<IntermediateExamples />} />
          <Route path="/advanced" element={<AdvancedExamples />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
