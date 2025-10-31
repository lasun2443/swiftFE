import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-gray-400 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}