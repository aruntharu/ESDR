
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
];

const Videos = () => {
  return (
    <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
  <div class="text-center mb-20">
  <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Videos</h1>
  <div class="flex mt-6 justify-center">
  <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
  </div>
      </div>
    <div class="flex flex-wrap -mx-4 -mb-10">
      <div class="sm:w-1/2 mb-10 px-4">
        <div class="rounded-lg h-64 overflow-hidden">
        <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/watch?v=2QCdaxAKW60&t=85s`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
        </div>
        <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Video Topic</h2>
        <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
        
      </div>
      <div class="sm:w-1/2 mb-10 px-4">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src="https://dummyimage.com/1202x502"/>
        </div>
        <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Video Topic</h2>
        <p class="leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
       
      </div>
    </div>
  </div>
</section>
  );
}

export default Videos;