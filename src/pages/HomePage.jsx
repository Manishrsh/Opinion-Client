import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../styles/homepage.css";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { io } from 'socket.io-client';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postdata, setPostdata] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData, postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:3000/addpost/ans/${postId}`,
        { answer: formData.answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getpostdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getpost", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPostdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching the posts!", error);
        setError(error);
      }
    };
    getpostdata();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('addpost', (newPost) => {
      console.log(newPost)
      setPostdata(prevPostdata => [newPost, ...prevPostdata]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  var url = 'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2024-07-23&' +
    'sortBy=popularity&' +
    'apiKey=d7d006e8934546b0afb8d4362c956165';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=d7d006e8934546b0afb8d4362c956165");
        setData(res.data);
        console.log(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    console.log(postdata)
  },[postdata])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Row>
        <Col sm={4} id="sidebarRapper">
          {data &&
            data.articles.map((element, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="sidebardiv"
                key={index}
              >
                <Card id="MainWapeer" border="primary" style={{ width: "18rem" }}>
                  <Card.Header>{element.title}</Card.Header>
                  <Card.Body>
                    <img src={`${element.urlToImage}`} id="newsImg" alt="news" />
                    <Card.Title>Author : {element.author}</Card.Title>
                    <Card.Text>{element.description}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
        </Col>
        <Col sm={8}>
          {postdata.length > 0 &&
            postdata.map((post, index) => (
              <Card className="mt-3" key={index}>
                <Card.Header>{post.question}</Card.Header>
                <Card.Body>
                  {post.answertype === "yesno" ? (
                    <Form onSubmit={handleSubmit((formData) => onSubmit(formData, post._id))}>
                      <div className="mb-3">
                        <Form.Check
                          inline
                          label="Yes"
                          name="answer"
                          type="radio"
                          value="yes"
                          {...register("answer", { required: true })}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="answer"
                          type="radio"
                          value="no"
                          {...register("answer", { required: true })}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </Form>
                  ) : (
                    <h1>No data</h1>
                  )}
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
