import React, { useState } from "react";
import EmojiDisplay from "./EmojiDisplay";
import { EmojiMapping } from "./EmojiMapping";
import Feedback from "./Feedback";
import { FaExchangeAlt } from "react-icons/fa";
import { ReverseMapping } from "./ReverseMapping";
import { Link } from "react-router-dom";

function Home() {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [notice, setNotice] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [mode, setMode] = useState("text-to-emoji");

    const handleChange = (e) => {
    setText(e.target.value);
  };

    const handleTranslate = () => {
    if (isTranslated) {
      setText("");
      setEmoji("");
      setIsTranslated(false);
    } else {
      if (mode === "text-to-emoji") {
        // 🌟 Conversational Text → Emoji
        const translated = text
          .split(" ")
          .map((word) => {
            const cleanWord = word.toLowerCase().replace(/[.,!?]/g, "");

            // ✅ If the word exists in mapping
            if (EmojiMapping[cleanWord]) {
              // 🎲 Handle multiple emojis per word (if array)
              const emojiList = Array.isArray(EmojiMapping[cleanWord])
                ? EmojiMapping[cleanWord]
                : [EmojiMapping[cleanWord]];
              const randomEmoji =
                emojiList[Math.floor(Math.random() * emojiList.length)];

              // 🎯 Random chance to convert (50%) for conversational feel
              if (Math.random() > 0.1) {
                return `${word} ${randomEmoji}`;
              }
            }

            // If not replaced, return the word as-is
            return word;
          })
          .join(" ");

        setEmoji(translated);
      } else {
        // Emoji → Text
        let translated = text;

        // Sort keys by length descending (multi-char emojis first)
        const emojiKeys = Object.keys(ReverseMapping).sort((a, b) => b.length - a.length);

        emojiKeys.forEach((emojiKey) => {
          const regex = new RegExp(emojiKey, "g");
          translated = translated.replace(regex, ReverseMapping[emojiKey] + " ");
        });

        // Clean up extra spaces
        translated = translated.trim().replace(/\s+/g, " ");

        setEmoji(translated);
      }

      setIsTranslated(true);
    }
  };


  
  const handleCopy = () => {
    navigator.clipboard.writeText(emoji);
    setNotice("✅ Copied to clipboard!");
    setTimeout(() => setNotice(""), 3000);
  };

   const toggleMode = () => {
    setMode(mode === "text-to-emoji" ? "emoji-to-text" : "text-to-emoji");
    setText("");
    setEmoji("");
    setIsTranslated(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F0F8FF] relative p-4">

      {/* Quiz Button (Top Left Corner) */}
      <Link
       to="/sign-up"
      className="absolute left-2 top-6 bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-500 font-semibold animate-bounce">
      🧠 Play Game
      </Link>

      <div className="flex items-center justify-center space-x-3 mt-6 bg-black/40 px-3 py-2 rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-3xl font-bold text-white text-center">
          {mode === "text-to-emoji" ? "Text to Emoji" : "Emoji to Text"}
        </h1>
        <button
          onClick={toggleMode}
          className="text-white text-xl sm:text-2xl hover:text-yellow-300 transition"
          title="Switch mode"
        >
          <FaExchangeAlt />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-row items-center gap-3 mt-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Type a word..."
          value={text}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border-2 border-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md flex-grow"
        />
        <button
          onClick={handleTranslate}
          className={`${
            isTranslated
              ? "bg-red-400 hover:bg-red-500"
              : "bg-yellow-400 hover:bg-yellow-500"
          } text-black font-semibold px-4 py-2 rounded-lg shadow-md`}
        >
          {isTranslated ? "Clear" : "Translate"}
        </button>
      </div>


      <div className="relative min-h-screen">
      {emoji && (
        <div className="mt-6 p-4 border-2 border-yellow-300 bg-white/90 rounded-lg shadow-lg flex flex-col items-center space-y-3 max-w-[90%] sm:max-w-sm text-center">
          <EmojiDisplay emoji={emoji} />
          <button
            onClick={handleCopy}
            className="bg-green-400 hover:bg-green-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
          >
            Copy
          </button>
        </div>
      )}

      {notice && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] bg-black/70 text-white px-4 py-2 rounded-lg shadow-md">
          {notice}
        </div>
      )}
      </div>



      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-8 right-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Feedback
      </button>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            {/* Close button */}
            <button
              onClick={() => setShowFeedback(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ×
            </button>
            <Feedback onClose={() => setShowFeedback(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
