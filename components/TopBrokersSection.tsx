import Link from "next/link";

export default function TopBrokersSection() {
  const brokers = [
    {
      id: 1,
      name: "Zerodha",
      rating: 4.8,
      logo: "https://zerodha.com/static/images/logo.svg",
      features: ["Zero brokerage on equity delivery", "₹20 per order for intraday"],
      link: "https://zerodha.com",
    },
    {
      id: 2,
      name: "Upstox",
      rating: 4.6,
      logo: "https://upstox.com/app/themes/upstox/dist/img/logo/logo-dark.svg",
      features: ["₹20 per order", "Free account opening"],
      link: "https://upstox.com",
    },
    {
      id: 3,
      name: "Groww",
      rating: 4.7,
      logo: "https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/logo.8b1e2714.svg",
      features: ["Zero commission on delivery", "Simple interface"],
      link: "https://groww.in",
    },
    {
      id: 4,
      name: "Angel One",
      rating: 4.5,
      logo: "https://www.angelone.in/images/angelone-logo.svg",
      features: ["₹20 per order", "Comprehensive research"],
      link: "https://www.angelone.in",
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
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              {/* Broker Name & Logo */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {broker.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {broker.rating}
                </span>
                <div className="flex text-xl">{renderStars(broker.rating)}</div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                {broker.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="space-y-2">
                <a
                  href={broker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Open Account
                </a>
                <Link
                  href={`/brokers/${broker.name.toLowerCase()}`}
                  className="block w-full text-blue-600 text-center py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium border border-blue-200"
                >
                  Read Review
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-400 mt-4 text-center">
                External link - Not affiliated
              </p>
            </div>
          ))}
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
