﻿import React from "react";
import PropTypes from "prop-types";

const RadioCard = (props) => {
    return (
        <>
            <CardElementDesktop radio={props} />
            <CardElementMobile radio={props} />
        </>
    );
};

export default RadioCard;



const CrossFade = () => {
    const crossFadeText = "For best radio experience use "
    return (
        <footer><small className="text-muted font-weight-light">
            {crossFadeText} 
            <a href='https://support.spotify.com/us/article/crossfade-feature/'
                title='Crossfade recommened at 6 seconds or more'
                aria-label='Crossfade from spotify recommened at 6 seconds or more'
                data-toggle='tooltip' data-placement='bottom'>
                Spotiy's crossfade feature
            </a>.
        </small>
        </footer>
          
    )
}

const CardElementDesktop = (props) => {
    const radio = props.radio.radio;
    return (
        <div className="d-none d-xl-block">
            <div className="card mb-2">
                <div className="row no-gutters">
                    <div className="col-6">
                        <img src={radio.ImageURL} className="card-img px-2 py-2 playlist-img" alt="..." />
                    </div>
                </div>
                <div className="col-md-8 col-6">
                    <CardBody details={radio} />
                </div>
            </div>
        </div>
    );
}
CardElementDesktop.propTypes = {
    ImageURL: PropTypes.string,
    radio: PropTypes.object
};
const CardElementMobile = (props) => {
    const radio = props.radio.radio;
    return (
        <div className="d-xl-none">
            <div className="card mb-3 ">
                <img src={props.ImageURL} className="card-img-top px-3 pt-3" alt="..." />
                <CardBody details={props} />
            </div>
        </div>
    );
}
CardElementMobile.propTypes = {
    ImageURL: PropTypes.string,
    radio: PropTypes.object
};


const CardBody = (props) => {
    const details = props.details;
    return (
        <div className="card-body">
            <h5 className="card-title font-weight-bold">{details.Title}</h5>
            <p className="card-text">{details.Description}</p>
            <blockquote className="mb-0">
                <p className="mb-0 font-weight-light">{details.TrackAndFollowerText}</p>
                <CrossFade />
            </blockquote>

        </div>
    );
}

CardBody.propTypes = {
    Description: PropTypes.string,
    details: PropTypes.object,
    Title: PropTypes.string,
    TrackAndFollowerText: PropTypes.string,
    CrossFadeText: PropTypes.string
};