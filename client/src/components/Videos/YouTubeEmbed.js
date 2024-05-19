'use client';

import React from 'react';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorde="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
}

export default YouTubeEmbed;