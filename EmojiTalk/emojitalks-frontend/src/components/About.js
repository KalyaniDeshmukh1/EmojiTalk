import React from "react";

function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 bg-[#F0F8FF]">
      <div className="max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">
          About Emoji Talk
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Emoji Talk is a fun web app that transforms your words into emojis instantly. 
          Whether you’re chatting with friends, writing posts, or just playing around, 
          Emoji Talk makes communication more expressive and exciting.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          With a simple interface, you can type any text, get its emoji version, 
          and copy/share it anywhere. Our goal is to bring a little extra fun to the way we talk online.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Made with ❤️ for emoji lovers everywhere.
        </p>
      </div>
    </div>
  );
}

export default About;
