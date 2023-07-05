import React, { Component } from 'react'
import axios from "axios";
import Joke from './Joke';

const API_URL = "https://icanhazdadjoke.com/";

class JokeList extends Component {
    static defaultProps = {
       numJokesToGet: 10 
    }
    constructor(props) {
        super(props);
        this.state = { jokes: [] };

    }

    async componentDidMount() {
        let jokes =[]
        while(jokes.length < this.props.numJokesToGet){
            let res = await axios.get(API_URL, {
                headers: { Accept: "application/json" }
            });
            jokes.push(res.data.joke);
        }
        console.log(jokes)
        this.setState({ jokes: jokes });
        
    }

    render() {
        // const jokes = this.state.newJoke.map((j) => (
        //     <Joke jokeText={j.joke} jokeID={j.id} key={j.id} />
        // ));
        return (
            <div className="JokeList">
                <h1>Dad Jokes</h1>
                <div className="JokeList-jokes">
                    {this.state.jokes.map((j) => (
                        <div>{j}</div>
                    ))}
                </div>

                <button className="Joke_bnt">Dad Jokes</button>
            </div>
        );
    }
}

export default JokeList;