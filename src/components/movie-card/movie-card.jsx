import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom'
import "./movie-card.scss"


export class MovieCard extends React.Component {

    constructor() {
        super();
        this.state = {
            FavoriteMovies: []
        };
    }

    onAddFavorite = (movie) => {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.post(
            `https://cinesam2022.herokuapp.com/users/${Username}/movies/${movie._id}`,
            {
                FavoriteMovies: this.state.FavoriteMovies
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    FavoriteMovies: response.data.FavoriteMovies
                });
                console.log(response);
                alert("Movie Added");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const { movie, onAddFavorite } = this.props;

        return (
            <Container>
                <CardGroup>
                    <Card id="movie-card">
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                            <Card.Title id="card-title">{movie.Title}</Card.Title>
                            <Link to={`/movies/${movie._id}`}>
                                <Button id="card-button" variant="link">Show more</Button>
                            </Link>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="primary" value={movie._id} onClick={() => this.onAddFavorite(movie)}>Add to Favorite</Button>
                        </Card.Footer>
                    </Card>
                </CardGroup>
            </Container>
        )
    };
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired
};