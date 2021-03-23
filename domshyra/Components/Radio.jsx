import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import RadioCard from "./RadioCard.jsx";
import PropTypes from "prop-types";
import CrossFadeMessage from "./CrossFadeMessage.jsx";

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


const RadioSkeleton = () => {
    return (
        <div className="row">
            <div className="col-12 col-xl-6">
                <RadioCard radio={null} />
            </div>
            <div className="col-12 col-xl-6">
                <RadioCard radio={null} />
            </div>
        </div>
    );

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
            );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <RadioSkeleton />;
    } else {
        return <Radios playlists={playlists} />;
    }
};


const pageTitle = "Radio stations";

const RadiosTitleDesktop = () => {
    /*global spotify*/
    /*eslint no-undef: "error"*/
    return (
        <div className="d-none d-xl-block">
            <section className="jumbotron text-center bg-light shadow-sm">
                <div className="container">
                    <h1 className="jumbotron-heading">{pageTitle}</h1>
                    <p className="lead text-muted mb-0">
                        Music is the oldest form of story telling and I&apos;ve always loved a good story
                    </p>
                    <p className="text-muted font-weight-light">
                        {spotify} playlists curated like radio stations
                    </p>
                    <small className="text-center font-weight-light"><b>Note:</b> Apple music is deprecated and the most up to date playlists are on <a href="https://open.spotify.com/user/domshyra">{spotify}</a></small>
                </div>
            </section>
        </div>
    );
};


const RadiosTitleMobile = () => {
    return (
        <div className="d-xl-none  mb-2 pb-2">
            <h2 className="pb-2">{pageTitle}</h2>
            <div className="row">
                <div className="col-12">
                    <div className="border bg-light rounded px-2 mb-1 shadow-sm">
                        <CrossFadeMessage />
                    </div>
                </div>
            </div>
        </div>
    );
};


const RadioPage = () => {
    return (
        <>
        <RadiosTitleDesktop />
        <RadiosTitleMobile />

        <RadioList />
        </>
    );
};

ReactDOM.render(<RadioPage />, document.getElementById("radio-content"));
