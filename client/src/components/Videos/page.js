
const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="aspect-w-14 aspect-h-14 hover:scale-110 transition duration-500 cursor-pointer object-cover">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
}


const videos = [
  { id: 'Bvlm8M5nUxU' },
  { id: 'K2GcmuMzhxQ' },
  { id: '0FC3uS3h_2s' },
];

const Videos = () => {
  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <YouTubeEmbed key={video.id} videoId={video.id} />
        ))}
      </div>
    </div>
  );
}

export default Videos;