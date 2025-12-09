import React from "react";
import { motion } from "framer-motion";

const emojis = [
  "😀", "😂", "😎", "🥳", "🤯", "👻", "🎃", "🐶", "🍕",
  "😡", "❤️", "🤗", "😩", "😴", "🔥", "❤️‍🩹", "💫", "🍰"
];

function GameStart() {
  // Generate animated floating emojis
  const renderEmojis = () => {
    return emojis.map((emoji, index) => {
      const top = Math.random() * 80 + "%";
      const left = Math.random() * 80 + "%";
      const duration = Math.random() * 6 + 4; // 4–10s float
      return (
        <motion.div
          key={index}
          className="absolute text-5xl md:text-6xl select-none"
          style={{ top, left }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      );
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 overflow-hidden">
      {/* Floating background emojis */}
      {renderEmojis()}

      {/* Gradient overlay for glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300/40 via-transparent to-blue-300/40 backdrop-blur-sm"></div>

      {/* Title */}
      <h1 className="absolute top-20 text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 drop-shadow-lg">
        🎮 Emoji Adventure
      </h1>

      {/* Play Button */}
      <motion.button
        className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-4 rounded-full text-white text-2xl font-bold shadow-xl hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Play
      </motion.button>

      {/* Sparkle effect */}
      <div className="absolute bottom-10 text-yellow-400 text-5xl animate-pulse">✨</div>
    </div>
  );
}

export default GameStart;
