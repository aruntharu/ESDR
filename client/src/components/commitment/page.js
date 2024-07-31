"use client";
import React from "react";

const Commitment = () => {
  return (
    <div className="relative w-full h-auto flex justify-center mt-10 mb-40">
      {/* Background section */}
      <div className="bg-[#175459] text-white p-8 w-7/10 max-w-5xl relative">
        <h2 className="text-3xl font-bold mb-2">Our Commitment</h2>
        <div className="w-3/4 text-justify">
          <p className="text-lg leading-relaxed">
            This year’s ESDR Program is committed to nurturing an environment of
            respect, equality, and intellectual rigor connecting south to south.
            We believe that by bringing together diverse voices and
            perspectives, we can challenge the status quo and contribute to
            meaningful change in the realm of law and justice.
          </p>
        </div>
        {/* Image section */}
        <div className="relative mt-4">
          <img
            src="/upload/yubaraj.jpg"
            alt="Herald College Kathmandu"
            className="w-64 h-auto object-cover border-4 border-white shadow-lg absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/4"
          />
        </div>
      </div>
    </div>
  );
};

export default Commitment;
