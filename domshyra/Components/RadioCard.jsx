import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const cardHeight = 20;
const imgSkeletonHeight = `${cardHeight - 2}vh`;
const descriptionHeight = `${cardHeight - (cardHeight / 2)}vh`;

const RadioCard = (props) => {
    return (
        <>
            <CardElementDesktop radio={props.radio} />
            <CardElementMobile radio={props.radio} />
        </>
    );
};
RadioCard.propTypes = {
    radio: PropTypes.object
};
export default RadioCard;


const CardElementDesktop = (props) => {
    const radio = props.radio;
    const image = radio != null ? <img src={radio.ImageURL} className="card-img playlist-img" alt="..." /> : <Skeleton height={imgSkeletonHeight} />;

    return (
        <div className="d-none d-xl-block">
            <div className="card mb-2 shadow-sm">
                <div className="row no-gutters">
                    <div className="col-4">
                        <div className="px-2 py-2" style={{ height: `${cardHeight}vh` } }>
                            {image}
                        </div>
                    </div>
                    <div className="col-8" style={{ height: `${cardHeight}vh`}}>
                        <CardBody details={radio} />
                    </div>
                </div>
                <CardFooter details={radio} />
            </div>
        </div>
    );
}
CardElementDesktop.propTypes = {
    ImageURL: PropTypes.string,
    radio: PropTypes.object
};

const CardElementMobile = (props) => {
    const radio = props.radio;
    const image = radio != null ? <img src={radio.ImageURL} className="card-img-top" alt="..." /> : <Skeleton height={imgSkeletonHeight} />;

    return (
        <div className="d-xl-none">
            <div className="card mb-3 shadow-sm">
                <div className="px-3 pt-3" style={{ height: { imgSkeletonHeight } }}>
                    {image}
                </div>
                <CardBody details={radio} />
                <CardFooter details={radio} />
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
    const title = details != null ? details.Title : <Skeleton />;
    const description = details != null ? details.Description : <Skeleton count={3} />;
    const followerText = details != null ? details.TrackAndFollowerText : <Skeleton width={50} />;

    return (
        <div className="card-body" style={{ height: "auto" } }>
            <h5 className="card-title font-weight-bold">{title}</h5>
            <p className="card-text">{description}</p>
            <blockquote className="mb-0">
                <p className="mb-0 font-weight-light ">{followerText}</p>
                <CrossFadeMessage />
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

const CardFooter = (props) => {
    const details = props.details;
    if (details == null) {
        return (null);
    }
    return (
        <div className="card-footer">
            <div className="row">
                <div className="col-6">
                    <MusicFooterLink direction="left" title="Spotify" icon="fa-spotify" link={details.SpotifyMusicLink} />
                </div>
                <div className="col-6">
                    <ShowAppleMusic info={details} />
                </div>
            </div>
        </div>
    );
}
CardFooter.propTypes = {
    details: PropTypes.object
};

const MusicFooterLink = (props) => {
    const titleText = `Open in ${props.title}`;
    const imgClassName = `card-icon fab ${props.icon}`;
    const linkClassName = `float-${props.direction} text-decoration-none`;
    return (
        <a className={linkClassName} href={props.link} title={titleText}
            aria-label={titleText} data-toggle="tooltip" data-placement="bottom">
            {props.title} <i className={`${imgClassName}`}></i>
        </a>
    );
}
MusicFooterLink.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string,
    direction: PropTypes.string,
};

const ShowAppleMusic = (props) => {
    const showAppleMusic = props.info.AppleMusicLink != null;
    if (showAppleMusic) {
        return (<MusicFooterLink direction="right" title="Apple Music" icon="fa-itunes-note" link={props.info.AppleMusicLink} />);
    }
    return (null);
}
ShowAppleMusic.propTypes = {
    info: PropTypes.object
};

const CrossFadeMessage = () => {
    const crossFadeText = "For best radio experience use ";
    const crossFadeLabel = "Crossfade recommend at 6 seconds or more";
    const spotifyText = "Spotify's crossfade feature";
    return (
        <footer>
            <small className="text-muted font-weight-light">
                {crossFadeText}
                <a className="text-decoration-none"
                    href='https://support.spotify.com/us/article/crossfade-feature/'
                    title={crossFadeLabel}
                    aria-label={crossFadeLabel}
                    data-toggle='tooltip'
                    data-placement='bottom'>
                    {spotifyText}
                </a>.
            </small>
        </footer>
    )
}