import React from 'react';
import {ImageWithPlaceholder} from '../ImageWithPlaceholder';

function Track ({ track, isPlaying, onSelectTrack }) {
  if (!track) {
    return null
  }
  return (
    <div className="track text-center d-flex">
      <div className="track-content d-flex flex-column">
        <div className="artwork" onClick={() => onSelectTrack(track)}>
          <ImageWithPlaceholder src={track.cover}
                                alt={track.title}/>
          <div className="artwork-button">
            {
              isPlaying ?
                <button className="play-button">
                  <svg className="pause" viewBox="0 0 30 30">
                    <path d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z "></path>
                  </svg>
                </button> :
                <button className="play-button">
                  <svg className="play" viewBox="0 0 30 30">
                    <path d="M4 4 L28 16 L4 28 z "></path>
                  </svg>
                </button>
            }
          </div>
        </div>
        <div className="info mt-3 d-flex flex-column align-items-center">
          <p className="text-uppercase font-weight-bold mb-3">{track.title}</p>
        </div>
      </div>
    </div>
  );
}

export default Track;
