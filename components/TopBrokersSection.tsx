import Link from "next/link";
import Image from "next/image";

export default function TopBrokersSection() {
  const brokers = [
    {
      id: 1,
      name: "Zerodha",
      rating: 4.8,
      logo: "/brokers/zerodha.svg",
      bgColor: "bg-blue-50",
      features: ["Zero brokerage on equity delivery", "₹20 per order for intraday"],
      link: "https://zerodha.com/open-account",
      reviewLink: "https://www.trustpilot.com/review/zerodha.com",
    },
    {
      id: 2,
      name: "Upstox",
      rating: 4.6,
      logo: "/brokers/upstox.svg",
      bgColor: "bg-purple-50",
      features: ["₹20 per order", "Free account opening"],
      link: "https://upstox.com/open-demat-account",
      reviewLink: "https://play.google.com/store/apps/details?id=com.upstox.pro&hl=en_IN",
    },
    {
      id: 3,
      name: "Groww",
      rating: 4.7,
      logo: "/brokers/groww.svg",
      bgColor: "bg-green-50",
      features: ["Zero commission on delivery", "Simple interface"],
      link: "https://groww.in/open-demat-account",
      reviewLink: "https://www.trustpilot.com/review/groww.in",
    },
    {
      id: 4,
      name: "Angel One",
      rating: 4.5,
      logo: "/brokers/angelone.png",
      bgColor: "bg-red-50",
      features: ["₹20 per order", "Comprehensive research"],
      link: "https://www.angelone.in/open-demat-account",
      reviewLink: "https://play.google.com/store/apps/details?id=com.msf.angelmobile&hl=en_IN",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Top Indian Brokers
          </h2>
          <p className="text-gray-600">
            Start your investment journey with India's most trusted brokers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105 flex flex-col"
            >
              {/* Logo Section - No colored box */}
              <div className="mb-4 flex items-center justify-center h-20">
                <img
                  src={broker.logo}
                  alt={`${broker.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const text = document.createElement('span');
                      text.className = 'text-2xl font-bold text-gray-900';
                      text.textContent = broker.name;
                      parent.appendChild(text);
                    }
                  }}
                />
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {broker.rating}
                </span>
                <div className="flex text-xl">{renderStars(broker.rating)}</div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 text-sm text-gray-600 flex-grow">
                {broker.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div>
                <a
                  href={broker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Open Account
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://www.5paisa.com/stock-broker-in-india"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Compare More Brokers →
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ⚠️ Disclaimer: Finsight is not affiliated with these brokers. Links
            are provided for convenience only. Always do your own research
            before investing.
          </p>
        </div>
      </div>
    </div>
  );
}
