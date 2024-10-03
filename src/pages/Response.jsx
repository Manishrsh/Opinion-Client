import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Response = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getthisans = (id) => {
    const encodedId = encodeURIComponent(id); // Properly encode the ID
    console.log('Navigating to:', encodedId);
    navigate(`/response/${encodedId}`);
  };

  useEffect(() => {
    const getquesans = async () => {
      try {
        const response = await axios.get('http://localhost:3000/queans', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setIsAuthenticated(true);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAuthenticated(false);
      }
    };

    getquesans();
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Unauthorized</div>;
  }

  return (
    <div id="cards">
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <motion.div
            drag
            className="cards"
            key={index}
            data-value={question._id} // Use the question ID for navigation
            initial={{ y: 550 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 250 }}
            onClick={(e) => getthisans(e.currentTarget.dataset.value)}
          >
            <h3>{question.question}</h3>
            <p>Number of answers: {question.answerCount}</p>
          </motion.div>
        ))
      ) : (
        <div>No questions found.</div>
      )}
    </div>
  );
};

export default Response;
