import React, { useEffect, useState } from 'react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ImageWithPlaceholder } from "../components/ImageWithPlaceholder";

const Video = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get('api/video')
      .then(response => {
        const videos = response?.data || [];
        setVideos(videos)
      })
      .catch(error => {
        console.log('error', error);
      })
  }, [])

  return (
    <>
      <div className="wrapper video-page">
        <Header/>
        <main>
          <div className="container">
            <div className="videos d-flex pt-3 w-100">
              {
                videos?.map(video => (
                  <div className="video text-center d-flex" id={video.id} key={video.id}>
                    <div className="video-content d-flex flex-column">
                      <div className="d-flex flex-column align-items-center">
                        <div className="video-container" dangerouslySetInnerHTML={{ __html: video.url }}></div>
                        <p className="text-uppercase font-weight-bold mt-2 mb-0">{video.title}</p>
                        <p className="mt-0 mb-2">{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}


export default Video;