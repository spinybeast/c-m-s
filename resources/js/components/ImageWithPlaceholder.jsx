import React, { useState } from 'react';

export const ImageWithPlaceholder = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded || !src ? (
        <img className="img-fluid" src='/img/track-placeholder.png' alt={alt}/>
      ) : null}
      {src && <img
        className="img-fluid"
        src={src}
        alt={alt}
        style={!loaded ? { display: 'none' } : {}}
        onLoad={() => setLoaded(true)}
      />}
    </>
  );
}
