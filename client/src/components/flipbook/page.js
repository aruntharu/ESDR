'use client';
import React, { useEffect, useState } from 'react';
import PageFlip from 'react-pageflip';
import axios from 'axios';

const FlipBook = () => {
  const [pdfPages, setPdfPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPdfPages();
  }, []);

  const fetchPdfPages = async () => {
    const pdfjsLib = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    const pdf = await pdfjsLib.getDocument('/upload/conceptnote.pdf').promise;
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
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      {loading ? (
        <div className="flex justify-center mt-8 mb-8">
          <div className="flex flex-col items-center justify-center h-80">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden"></span>
            </div>
            <p className="text-center text-gray-600 mt-4">Loading Book...</p>
          </div>
        </div>
      ) : (
        pdfPages.length > 0 && (
          <div className="flex justify-center mt-8 mb-11">
            <div className="flipbook-container" style={{ width: '1200px', margin: '0 auto' }}>
              <PageFlip width={600} height={800}>
                {pdfPages.map((page, index) => (
                  <div key={index} className="page">
                    {/* Show only one page for the cover and end page */}
                    {index === 0 || index === pdfPages.length - 1 ? (
                      <div className="single-page">
                        <img src={page} alt={`Page ${index + 1}`} className="w-full h-auto" />
                      </div>
                    ) : (
                      <div className="double-page">
                        {/* Ensure a spread for all other pages */}
                        <img src={page} alt={`Page ${index + 1}`} className="w-full h-auto" />
                      </div>
                    )}
                  </div>
                ))}
              </PageFlip>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FlipBook;
