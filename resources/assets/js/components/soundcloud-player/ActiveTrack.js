import React, { useEffect, useRef, useState } from 'react';

function ActiveTrack ({ activeTrack, onTogglePlay, playing }) {
  const [firstPlay, setFirstPlay] = useState(true)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const audio = useRef(null)

  useEffect(() => {
    if (audio.current && activeTrack?.audio) {
      if (!playing && firstPlay) {
        audio.current.load()
        audio.current.addEventListener('canplaythrough', () => {
          console.log('loaded audio');
        });
        setFirstPlay(false)
      } else {
        playing ? audio.current.play() : audio.current.pause()
      }
    }
  }, [playing, activeTrack?.audio])

  const seekCoordinates = (e) => e.nativeEvent.offsetX / e.target.offsetWidth || (e.nativeEvent.layerX - e.target.offsetLeft) / e.target.offsetWidth

  const seek = (e) => audio.current.currentTime = seekCoordinates(e) * audio.current.duration || 0

  const seekVolume = (e) => audio.current.volume = seekCoordinates(e)

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.round(time - minutes * 60);

    if (seconds.toString().length === 1) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  if (!activeTrack) {
    return null
  }

  return (
    <div className="player">
      <div className="container">
        <div className="row d-flex flex-row justify-content-between align-items-center">
          <div className="col-2 col-sm-1">
            <button onClick={onTogglePlay} className="play-button">
              {
                playing ?
                  <svg className="pause" viewBox="0 0 30 30">
                    <path d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z "></path>
                  </svg>
                  :
                  <svg className="play" viewBox="0 0 30 30">
                    <path d="M4 4 L28 16 L4 28 z "></path>
                  </svg>

              }
            </button>
          </div>
          <div className="col-6 col-sm-7">
            <div className="title">{activeTrack.title}</div>
            <progress
              onClick={seek}
              value={activeTrack.id ? (currentTime / duration) : ''}>
            </progress>
          </div>
          <div className="col-1 pl-sm-0">
            <span>{activeTrack.id ? formatTime(currentTime) : ''}</span>
            <span className="d-none d-sm-inline">
                                &nbsp;/&nbsp;
              {activeTrack.id ? formatTime(duration) : ''}
                            </span>
          </div>
          <div className="col-3 d-flex flex-row align-items-center pl-sm-4">
            <i className="fa fa-volume-up"></i>
            <progress value={volume || 0.5}
                      onClick={seekVolume}>
            </progress>
          </div>
        </div>
        {activeTrack.id &&
        <audio id="audio"
               ref={audio}
               src={activeTrack.audio}
               onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
               onVolumeChange={(e) => setVolume(e.target.volume)}
               onLoadedMetadata={(e) => setDuration(e.target.duration)}
        >
        </audio>
        }
      </div>
    </div>
  );

}

export default ActiveTrack;
