import React from 'react';

function Messages ({message, errors}) {
  return (
    <>
      {message.length > 0 && <div className="message">{message}</div>}
      {errors.length > 0 && errors.map((error, index) => <div key={index}>{error}</div>)}
    </>
  )
}

export default Messages
