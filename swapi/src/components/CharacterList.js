import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/CharacterList.css';

export default class CharacterList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoading: true,
             charList: [],
             error: false,
        }
    }

    componentDidMount() {
        fetch('https://swapi.dev/api/people')
            .then(response => response.json())
            .then(data => {
                this.setState({
                  isLoading: false,
                  charList: data.results
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
        const {isLoading, error, charList } = this.state;
        let content;

        if (charList) {
            content = (
                <div className="container char-list">
                  <div className="">
                    <div className=" d-flex justify-content-evenly flex-wrap">
                    {charList.map((character, id) =>
                        <div className="card mb-4 ml-2 mr-2" key={id}>
                          {/* <img src={character.url} className="card-img-top" alt={character.name}></img> */}
                          <div className="card-body">
                            <h5 className="card-title">
                                {character.name}
                            </h5>
                            <p className="card-text">
                              Gender: {character.gender}
                            </p>
                            <Link to={'/' + id} className="btn btn-success w-100">View full profile</Link>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
            );
        }

        console.log(charList)

        return (
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                {content}
            </div>
        )
    }
}
