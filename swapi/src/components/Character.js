import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/CharacterList.css';

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
                <div className="container char-list">
                  <div className="">
                    <div className=" d-flex justify-content-center">
                        <div className="card mb-4 ml-2 mr-2">
                          <div className="card-body">
                            <h5 className="card-title">
                                {char.name}
                            </h5>
                            <p className="card-text">
                                {species.name}, {char.gender}
                            </p>
                            <p className="card-text">
                              Birth Year: {char.birth_year}
                            </p>
                            <p className="card-text">
                                Hair colour: {char.hair_color}
                            </p>
                            <p className="card-text">
                                Heght: {char.height}
                            </p>
                            <p className="card-text">
                                Mass: {char.mass}
                            </p>
                            <p className="card-text">
                                Home: {planet.name}
                            </p>
                            <p className="card-text">
                                Speaks {species.language}
                            </p>
                            <Link to={'/'} className="btn btn-success">Go back</Link>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
            );
        }

        return (
            <div>
                <h1 className="display-3 text-light mt-4 mb-5">Person</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                {content}
            </div>
        )
    }
}
