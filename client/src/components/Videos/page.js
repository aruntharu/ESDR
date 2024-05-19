import YouTubeEmbed from "./YouTubeEmbed";



const videos = [
  { id: '2QCdaxAKW60' },
  { id: '7krSnSKOXEc' },
  { id: 'r_3jQyDWbn8' },
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