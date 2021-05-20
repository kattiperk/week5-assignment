import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/CharacterList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faUser, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

export default class Character extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: true,
            char: {},
            planet: [],
            species: [],
            error: false,
        }
    }

    componentDidMount() {
        let id = parseInt(this.props.match.params.id) + 1;
        Promise.all([
            fetch('https://swapi.dev/api/people/' + id),
            fetch('https://swapi.dev/api/planets/' + id),
            fetch('https://swapi.dev/api/species/' + id)
        ])
            .then(([response1, response2, response3]) => Promise.all([response1.json(), response2.json(), response3.json()]))
            .then(([data1, data2, data3]) => {
                this.setState({
                  isLoading: false,
                  char: data1,
                  planet: data2,
                  species: data3
                })
            })
            .catch(() => {
                this.setState({
                  isLoading: false,
                  error: true
                })
            })
    }
    
    render() {
        const {isLoading, error, char, planet, species} = this.state;
        let content;

        if (char) {
            content = (
                <div className="container">
                  <div className="">
                    <div className=" d-flex justify-content-center">
                        <div className="card w-50 mb-4 ml-2 mr-2">
                          <div className="card-body">
                            <h5 className="card-title h3">
                                {char.name}
                            </h5>
                            <hr />
                            <div className="d-flex align-items-left justify-content-between">
                                <div className="w-50">
                                    <p className="card-text">
                                        <FontAwesomeIcon icon={faUser} className="mr-1" />
                                        {species.name}, {char.gender}
                                    </p>
                                    <p className="card-text">
                                        <FontAwesomeIcon icon={faGlobeAmericas} className="mr-1" />
                                        from <strong>{planet.name}</strong>
                                    </p>
                                </div>
                                <div className="w-50">
                                    <p className="card-text">
                                        Hello!
                                        I am {char.name}, born in {char.birth_year}. My height is {char.height} cm and body mass is {char.mass} kg. I have {char.hair_color} hair and {char.eye_color} eyes. Let's chat in {species.language} language.
                                    </p>
                                    {/* <p className="card-text">
                                        {char.height} cm / {char.mass} kg
                                    </p>
                                    <p className="card-text">
                                        Hair colour is {char.hair_color}
                                    </p>
                                    <p className="card-text">
                                        Speaks {species.language}
                                    </p> */}
                                </div>
                            </div>
                            <Link to={'/'} className="btn btn-outline-secondary mt-4">
                                <FontAwesomeIcon icon={faLongArrowAltLeft} className="mr-2" />
                                Go back
                            </Link>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
            );
        }

        return (
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                {content}
            </div>
        )
    }
}
