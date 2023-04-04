import React, { useState, useEffect } from 'react';
import SingleBook from './SingleBook';
import { Col, Form, Row } from 'react-bootstrap';
import CommentArea from './CommentArea';

const BookList = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(props.books);

  useEffect(() => {
    setFilteredBooks(props.books.filter((b) => b.title.toLowerCase().includes(searchQuery)));
  }, [props.books, searchQuery]);

  const changeSelectedBook = (asin) => {
    setSelectedBook(asin);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Search a book</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {filteredBooks.map((b) => (
              <Col xs={12} md={4} key={b.asin}>
                <SingleBook
                  book={b}
                  selectedBook={selectedBook}
                  changeSelectedBook={changeSelectedBook}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={selectedBook} />
        </Col>
      </Row>
    </>
  );
};

export default BookList;
