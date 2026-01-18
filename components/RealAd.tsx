export default function RealAd({ 
  type = "banner" 
}: { 
  type?: "banner" | "sidebar" | "square" 
}) {
  
  if (type === "banner") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-white text-4xl">✨</div>
              <div>
                <p className="text-white font-bold text-base">Try Google Gemini - Advanced AI Assistant</p>
                <p className="text-blue-100 text-sm">Get help with market analysis, research, and insights powered by AI</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
              Try Gemini →
            </button>
          </div>
        </a>
      </div>
    );
  }

  if (type === "square") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-sm">
        <a href="https://www.meta.ai" target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
            <div className="flex justify-center mb-3">
              <div className="text-white font-bold text-xl">Meta AI</div>
            </div>
            <h3 className="text-white font-bold text-center text-lg mb-2">Chat with Meta AI</h3>
            <p className="text-blue-100 text-sm text-center mb-4">Ask anything, create images, get instant answers with Llama</p>
            <button className="w-full bg-white text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors">Try Meta AI</button>
            <p className="text-xs text-blue-100 text-center mt-3">Ad</p>
          </div>
        </a>
      </div>
    );
  }

  return null;
}