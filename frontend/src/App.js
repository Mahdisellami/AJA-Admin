import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddMoleculePage from "./pages/AddMoleculePage";
import AddQuestionPage from "./pages/AddQuestionPage";
import QuestionTablePage from "./pages/QuestionTablePage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-molecule" element={<AddMoleculePage />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
        <Route path="/question-table" element={<QuestionTablePage />} />
      </Routes>
    </Router>
  );
};

export default App;
