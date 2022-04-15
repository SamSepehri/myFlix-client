import React from "react";

import "./director-view.scss";

import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom"

export class DirectorView extends React.Component {


    render() {
        const { director, movies, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="director-view">
                            <Card.Body>
                                <Card.Title>{director.Name}</Card.Title>
                                <Card.Text>
                                    Bio: {director.Bio}
                                </Card.Text>
                                <Card.Text>
                                    Birthday: {director.Birth}
                                </Card.Text>
                                <Card.Text>
                                    Death: {director.Death}
                                </Card.Text>
                                <Button id="director-back-button" onClick={() => { onBackClick(); }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CardGroup>
                            {movies.map(movie => (
                                <Card className="favorite-movie card-content" key={movie._id} >
                                    <Card.Img
                                        className="fav-poster"
                                        variant="top"
                                        src={movie.ImagePath} />
                                    <Card.Body style={{ backgroundColor: "black" }}>
                                        <Card.Title className="movie_title">
                                            {movie.Title}
                                        </Card.Title>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button id="card-button" variant="link">Show more</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            ))}
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}