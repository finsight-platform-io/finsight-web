"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface AddHoldingFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddHoldingForm({ onClose, onSuccess }: AddHoldingFormProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const [formData, setFormData] = useState({
    quantity: "",
    buy_price: "",
    buy_date: new Date().toISOString().split("T")[0], // Today's date
  });

  const searchStocks = async (query: string) => {
    if (query.length < 1) {
      setSearchResults([]);
      return;
    }

    try {
      setSearching(true);
      const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setSearchResults(data.results || []);
      }
    } catch (error) {
      console.error("Error searching stocks:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleStockSelect = (stock: any) => {
    setSelectedStock(stock);
    setSearchQuery(stock.name);
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStock) {
      alert("Please select a stock");
      return;
    }

    if (!formData.quantity || !formData.buy_price || !formData.buy_date) {
      alert("Please fill in all fields");
      return;
    }

    if (parseFloat(formData.quantity) <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    if (parseFloat(formData.buy_price) <= 0) {
      alert("Buy price must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: selectedStock.symbol,
          name: selectedStock.name,
          quantity: parseFloat(formData.quantity),
          buy_price: parseFloat(formData.buy_price),
          buy_date: formData.buy_date,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        alert(data.error || "Failed to add holding");
      }
    } catch (error) {
      console.error("Error adding holding:", error);
      alert("Failed to add holding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Add Holding</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stock Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Stock *
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchStocks(e.target.value);
                  if (selectedStock) setSelectedStock(null);
                }}
                placeholder="Search by name or symbol..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              {searching && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && !selectedStock && (
              <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                {searchResults.map((stock) => (
                  <button
                    key={stock.symbol}
                    type="button"
                    onClick={() => handleStockSelect(stock)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{stock.name}</p>
                    <p className="text-sm text-gray-500">{stock.symbol}</p>
                  </button>
                ))}
              </div>
            )}

            {selectedStock && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">{selectedStock.name}</p>
                <p className="text-sm text-blue-600">{selectedStock.symbol}</p>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              step="0.0001"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Number of shares"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Buy Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buy Price (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.buy_price}
              onChange={(e) => setFormData({ ...formData, buy_price: e.target.value })}
              placeholder="Price per share"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Buy Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buy Date *
            </label>
            <input
              type="date"
              value={formData.buy_date}
              onChange={(e) => setFormData({ ...formData, buy_date: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Investment Preview */}
          {formData.quantity && formData.buy_price && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Investment</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{(parseFloat(formData.quantity) * parseFloat(formData.buy_price)).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedStock}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Holding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
