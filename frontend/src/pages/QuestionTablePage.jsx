import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuestionTablePage = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/questions");
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/questions/${id}`);
      setQuestions(questions.filter((question) => question._id !== id));
      console.log("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Questions</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Question Text</th>
            <th>Condition Field</th>
            <th>Options</th>
            <th>Answers</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.text}</td>
              <td>{question.condition_field}</td>
              <td>{question.options ? "Yes" : "No"}</td>
              <td>
                <ul>
                  {question.answers.map((answer, index) => (
                    <li key={index}>{answer.answer}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Link
                  to={`/edit-question/${question._id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(question._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTablePage;
