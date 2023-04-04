import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddComment = (props) => {
  const [comment, setComment] = useState({
    comment: '',
    rate: 1,
    elementId: props.asin,
  });

  useEffect(() => {
    setComment((prevComment) => ({
      ...prevComment,
      elementId: props.asin,
    }));
  }, [props.asin]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/',
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJjNGEyYTBlNzg3MDAwMTRkODk0N2UiLCJpYXQiOjE2ODA2MjQxNzAsImV4cCI6MTY4MTgzMzc3MH0.f__vB5OnlWiEnHXMa8uVegOF2diS_UjQ3ZfWq03a8Ck',
          },
        }
      );
      if (response.ok) {
        alert('Comment was sent!');
        setComment({
          comment: '',
          rate: 1,
          elementId: props.asin,
        });
      } else {
        console.log('error');
        alert('something went wrong');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment.comment}
            onChange={(e) =>
              setComment((prevComment) => ({
                ...prevComment,
                comment: e.target.value,
              }))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment((prevComment) => ({
                ...prevComment,
                rate: e.target.value,
              }))
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
