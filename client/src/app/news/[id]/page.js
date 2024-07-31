'use client';
import CustomNavBar from '@/components/navbar/page';
import Footer from '@/components/footer/page';
import { Image } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import PageFlip from 'react-pageflip';
import { Spinner } from '@nextui-org/react';

const NewsDetails = ({ params }) => {
  const [newsDetails, setNewsDetails] = useState({});
  const [pdfPages, setPdfPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchnewsDetails();
    }
  }, [params.id]);

  const fetchnewsDetails = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}news/${params.id}`);
    setNewsDetails(data);
    if (data.newsPDF) {
      await fetchPdfPages(data.newsPDF);
    }
    setLoading(false);
  };

  const fetchPdfPages = async (pdfFile) => {
    const pdfjsLib = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const pdf = await pdfjsLib.getDocument(`${process.env.NEXT_PUBLIC_API_URL}news-pdf/${pdfFile}`).promise;
    const pages = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      pages.push(canvas.toDataURL());
    }
    setPdfPages(pages);
  };

  return (
    <div>
      <CustomNavBar />
      {/* Banner Section */}
      <div className="relative w-full h-80 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}news-image/${newsDetails.newsImage}`}
            alt="News Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(60%)' }}
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        </div>
      </div>
      <div className="bg-white p-8 mx-auto max-w-3xl -mt-28 shadow-lg relative z-15">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:flex-grow">
                  <h2 className="text-3xl font-medium text-gray-900 title-font mb-2">{newsDetails?.newsHeading}</h2>
                  <p className="text-lg text-gray-900 title-font mb-4">{newsDetails?.newsIntro}</p>
                  <p className="text-sm text-gray-500 mb-2">{new Date(newsDetails?.newsDate).toLocaleDateString()}</p>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}news-image/${newsDetails.newsImage}`}
                    width="auto"
                    height="auto"
                    objectFit="cover"
                    className="w-full h-auto mb-4"
                    alt={newsDetails?.newsHeading}
                  />
                  <div className="leading-relaxed text-justify text-gray-800">
                    {newsDetails?.newsDescription && typeof newsDetails.newsDescription === 'string'
                      ? parse(newsDetails.newsDescription)
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {loading ? (
        <div className="flex justify-center mt-8 mb-8">
          <div className="flex flex-col items-center justify-center h-80">
            <Spinner size="lg" />
            <p className="text-center text-gray-600 mt-4">Loading Book...</p>
          </div>
        </div>
      ) : (
        pdfPages.length > 0 && (
          <div className="flex justify-center mt-8 mb-11">
            <div className="flipbook-container" style={{ width: '1200px', margin: '0 auto' }}>
              <PageFlip width={600} height={800} showCover={true} >
                {pdfPages.map((page, index) => (
                  <div key={index} className="page">
                    <img src={page} alt={`Page ${index + 1}`} className="w-full h-auto" />
                  </div>
                ))}
              </PageFlip>
            </div>
          </div>
        )
      )}
      <Footer/>
    </div>
  );
};

export default NewsDetails;
