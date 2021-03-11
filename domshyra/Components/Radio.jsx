import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import RadioCard from "./RadioCard.jsx"
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";


const Radios = (props) => {
    const playlists = props.playlists;
    const radioItems = playlists.map((radio) =>
        <div className="col-12 col-xl-6 mb-2" title={radio.Title} aria-label={radio.Title} id={radio.AnchorId} key={radio.Title}>
            <RadioCard radio={radio}  />
        </div>
    );
    

    return (
        <div className="row">
            {radioItems}
        </div>
    );
};
Radios.propTypes = {
    playlists: PropTypes.array
};

const RadioList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [playlists, setplaylists] = useState([]);

    useEffect(() => {
        /*global radioURL*/
        /*eslint no-undef: "error"*/
        fetch(radioURL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setplaylists(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <Skeleton count={3} />
    } else {
        return <Radios playlists={playlists} />;
    }
}

ReactDOM.render(<RadioList />, document.getElementById("radio-content"));
