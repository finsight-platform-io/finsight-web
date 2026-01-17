"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface AddToWatchlistProps {
  symbol: string;
  name: string;
}

export default function AddToWatchlist({ symbol, name }: AddToWatchlistProps) {
  const { data: session } = useSession();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!session) {
      alert("Please sign in to add stocks to watchlist");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol, name }),
      });

      const data = await response.json();

      if (data.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
      } else {
        alert(data.error || "Failed to add to watchlist");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("Failed to add to watchlist");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null; // Don't show button if not signed in
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading || added}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        added
          ? "bg-green-600 text-white"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } disabled:opacity-50`}
    >
      {added ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Added!</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span>{loading ? "Adding..." : "Add to Watchlist"}</span>
        </>
      )}
    </button>
  );
}
