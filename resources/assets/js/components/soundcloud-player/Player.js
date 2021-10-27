import React, { useEffect, useMemo, useState } from 'react';
import { Translate } from 'react-i18nify';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

import Track from './Track';
import ActiveTrack from './ActiveTrack';
import { Loader } from '../Loader'
import axios from "axios";
import _ from 'lodash'
import {PER_PAGE} from '../../constants/pagination';

function Player () {
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [tracks, setTracks] = useState([])
  const [activeTrack, setActiveTrack] = useState(false)
  const [activeTag, setActiveTag] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setLoading(true)

    axios.get('api/soundcloud')
      .then(response => {
        const tracks = response.data?.collection?.flat() || [];
        setTracks(tracks.map((track) => {
          const tags = track.tag_list?.split(' ') || []
          tags.push('all');
          tags.push(track.genre);

          track.tags = tags.map((tag) => tag.toLowerCase()).filter(tag => tag.length && tag !== 'soundtrack');
          return track;
        }))

        setActiveTrack(tracks[0])

        const tags = _.uniq(tracks.map((track) => track.tags).flat());

        if (tags.length) {
          setTags(tags)
          setActiveTag(tags[0])
        }
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error);
      });
  }, [])

  const filteredTracks = useMemo(() => _.filter(tracks, (track) => {
    return !activeTag || ~track.tags.indexOf(activeTag);
  }), [tracks, activeTag]);

  const pageCount = useMemo(() => Math.ceil(Math.max(filteredTracks?.length, PER_PAGE) / PER_PAGE), [filteredTracks])

  const paginatedTracks = useMemo(() => _.take(_.drop(filteredTracks, PER_PAGE * currentPage), PER_PAGE), [filteredTracks, currentPage]);


  const handleChangeGenre = (selectedOption) => {
    setActiveTag(selectedOption.value);
    setCurrentPage(0);
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <ActiveTrack activeTrack={activeTrack} playing={playing} onTogglePlay={() => setPlaying(!playing)} />
      {
        tracks.length > 0 ?
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex align-items-center pb-3 hr">
                <p className="col-md-3 mb-0 p-0 text-uppercase font-weight-bold choose-genre">
                  <Translate value="pages.portfolio.chooseGenre"/>
                </p>
                <Select className="col-md-9 p-0"
                        classNamePrefix="select-genre"
                        onChange={handleChangeGenre}
                        isSearchable={false}
                        value={{ value: activeTag, label: activeTag }}
                        options={tags.map((tag) => {
                          return { value: tag, label: tag }
                        })}
                />
              </div>
              <div className="tracks d-flex pt-3 w-100">
                {paginatedTracks.map((track, index) =>
                  <Track
                    key={index}
                    track={track}
                    onSelectTrack={(track) => {
                      setPlaying(activeTrack.id !== track.id)
                      setActiveTrack(track)
                    }}
                    isPlaying={playing && activeTrack.id === track.id}
                  />
                )}
              </div>
              {pageCount > 1 &&
              <div className="col-12 d-flex align-items-end">
                <ReactPaginate
                  pageCount={pageCount}
                  pageRangeDisplayed={pageCount}
                  forcePage={currentPage}
                  onPageChange={({selected}) => setCurrentPage(selected)}
                  containerClassName={'pagination'}
                  nextLabel={'>'}
                  previousLabel={'<'}
                />
              </div>}
            </div>
          </div> :
          <div className="empty-portfolio">
            <Translate value="pages.portfolio.cantLoad"/>&nbsp;
            <a href="https://soundcloud.com/tony-cyclonez" target="_blank">
              <i className="fa fa-soundcloud">&nbsp;</i>
              Soundcloud
            </a>!
          </div>
      }
    </>
  );
}

export default Player
