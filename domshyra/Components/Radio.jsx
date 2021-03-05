import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import RadioCard from "./RadioCard.jsx"
import PropTypes from "prop-types";

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

/*TODO get this to work as a promise too*/
const App = (props) => {
    const [playlists, setplaylists] = useState(null);

    async function fetchPlaylistData() {
        /*global radioURL*/
        /*eslint no-undef: "error"*/
        const response = await fetch(radioURL);
        setplaylists(await response.json());
    }

    useEffect(() => {
        fetchPlaylistData(props);
    }, [props]);

    if (!playlists) {
        return "loading...";
    }

    
    return (<Radios playlists={playlists} />);
}

/*global spotifyData*/
/*eslint no-undef: "error"*/
ReactDOM.render(<Radios playlists={spotifyData} />, document.getElementById("radio-content"));
