import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid"
import { v4 as uuidv4 } from "uuid";
import Joke from "./Joke";
import "./JokeList.css"

const API_URL = "https://icanhazdadjoke.com/";

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10,
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes")) || []
        };
    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }
    
    async getJokes(){
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get(API_URL, {
                headers: { Accept: "application/json" },
            });
            jokes.push({id:uuidv4(), text: res.data.joke, votes: 0 });
        }
        console.log(jokes);
        this.setState({ jokes: jokes });
        window.localStorage.setItem("jokes", JSON.stringify(jokes));
    }

    voteHandler(id, delta){
        this.setState(st =>({
            jokes: st.jokes.map(j =>
                j.id===id ? {...j, votes:j.votes + delta}: j
                )
        }))
    }

    render() {

        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />

                    <button className="JokeList-getMore">New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map((j) => (
                        <Joke
                            key={j.id}
                            votes={j.votes}
                            text={j.text}
                            upvote={() => this.voteHandler(j.id, 1)}
                            downvote={() => this.voteHandler(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeList;
