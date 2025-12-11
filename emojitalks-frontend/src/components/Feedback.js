// Feedback.js
import React, { useState } from "react";

function Feedback({ onClose }) {
  const [feature, setFeature] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
    setError("");
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating!");
      return;
    }

    const feedbackData = {
      feature,
      comments,
      rating,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFeature("");
        setComments("");
        setRating(0);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };


  return (
    <div className="relative flex items-center justify-center bg-gray-100 max-w-2xl bg-white shadow-lg rounded-2xl p-8">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-gray-600 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>

      {submitted ? (
            <div className="flex flex-col items-center justify-center text-center p-4 font-bold">
        <p className="text-lg">
            Thank you for your feedback! Our team will be{"  "}
            <span role="img" aria-label="eyes">
            👀
            </span>{"  "}
            into this!
        </p>
        <span role="img" aria-label="happy emojis" className="text-6xl pt-4">
            😊
        </span>
        </div>

      ) : (
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-semibold mb-2">
            Please let us know what you like and what we can improve
          </label>

          <input
            type="text"
            placeholder="Feature"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="What do you like or dislike"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-1">Rate us:</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full py-2 px-4 rounded text-white font-semibold ${
              rating === 0
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Feedback;
