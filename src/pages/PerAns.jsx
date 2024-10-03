import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PerAns = () => {
  const token = localStorage.getItem('token');
  const { que } = useParams(); // Extract the question ID from the URL
  const decodedQue = decodeURIComponent(que); // Decode the parameter
  const [perans, setPerans] = useState('');

  useEffect(() => {
    const getAnsdata = async () => {
      try {
        console.log('Fetching data for:', decodedQue);
        const response = await axios.get(`http://localhost:3000/queans/perans/${decodedQue}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPerans(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAnsdata();
  }, [decodedQue, token]);

  return (
    <>
      <h2>Answer Details</h2>
      <pre>{JSON.stringify(perans, null, 2)}</pre>
    </>
  );
};

export default PerAns;
