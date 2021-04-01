import React from 'react';

const CrossFadeMessage = () => {
    const crossFadeText = 'For best radio experience use ';
    const crossFadeLabel = 'Crossfade recommend at 6 seconds or more';
    /*global spotify*/
    /*eslint no-undef: "error"*/
    const spotifyText = `${spotify}'s crossfade feature`;
    return (
        <footer className="mt-1">
            <small className="text-muted font-weight-light">
                {crossFadeText}
                <a
                    className="text-decoration-none"
                    href="https://support.spotify.com/us/article/crossfade-feature/"
                    title={crossFadeLabel}
                    aria-label={crossFadeLabel}
                    data-toggle="tooltip"
                    data-placement="bottom">
                    {spotifyText}
                </a>
                .
            </small>
        </footer>
    );
};
export default CrossFadeMessage;
