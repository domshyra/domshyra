import React from "react";
import ReactDOM from "react-dom";
import RadioCard from "./RadioCard.jsx"

const testData = [{
    AnchorId: "ambient-album-radio",
    AppleMusicLink: "https://music.apple.com/us/playlist/equanimity-radio/pl.u-GgN8RCbo4Mrl",
    CrossFadeText: "For best radio experience use <a href='https://support.spotify.com/us/article/crossfade-feature/' title='Crossfade recommened at 6 seconds or more' aria-label='Crossfade from spotify recommened at 6 seconds or more' data-toggle='tooltip' data-placement='bottom'>Spotiy's crossfade feature</a>",
    Description: "great background music. (afro beats, french pop, sahara psychedelic blues, jazz, soul, funk, instrumental rock, world)",
    FollowerCount: 0,
    ImageURL: "https://i.scdn.co/image/ab67706c0000bebb2bec5f2c5a3c4635d43c34f9",
    SpotifyId: "5IUjuF00hzonDk6MzuanBs",
    SpotifyMusicLink: "https://open.spotify.com/playlist/5IUjuF00hzonDk6MzuanBs",
    Title: "Ambient Album Radio",
    TrackAndFollowerText: "787 tracks",
    TrackCount: 787
}];

const Radios = (props) => {


    const radioItems = props.playlists.map((radio) =>
        <RadioCard radio={radio} key={radio.AnchorId} />
    );
    

    return (radioItems);
};

ReactDOM.render(<Radios playlists={testData} />, document.getElementById("radio-content"));




/*
 
 import React from "react";
import ReactDOM from "react-dom";
import RadioCard from "./RadioCard.jsx"



const Radios = (props) => {
    global radioURL 
eslint no-undef: "error"




return (
    fetch(radioURL)
        .then(response => response.json())
        .then(spotifyPlaylists =>
            spotifyPlaylists.map((radio) =>
                console.log(radio)
            )
        )
);
};

ReactDOM.render(<Radios />, document.getElementById("radio-content"));


 */