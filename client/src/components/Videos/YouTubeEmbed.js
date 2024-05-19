'use client';

import React from 'react';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="aspect-w-14 aspect-h-14 hover:scale-110 transition duration-500 cursor-pointer object-cover">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;