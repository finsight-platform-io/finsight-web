export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">
            Last updated: January 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using Finsight, you agree to be bound by these Terms of Service and all applicable 
            laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Use of Service</h2>
          <p className="text-gray-700 mb-4">Finsight provides:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Real-time stock market data for NSE and BSE</li>
            <li>Personal portfolio tracking tools</li>
            <li>Watchlist management features</li>
            <li>Market news and insights</li>
            <li>Interactive stock charts and analytics</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">User Accounts</h2>
          <p className="text-gray-700 mb-4">To use certain features, you must:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Create an account using Google OAuth</li>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Acceptable Use</h2>
          <p className="text-gray-700 mb-4">You agree NOT to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the service</li>
            <li>Use automated systems to access the service without permission</li>
            <li>Reproduce, duplicate, or copy material without authorization</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Investment Disclaimer</h2>
          <p className="text-gray-700 mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <strong>Important:</strong> Finsight is an information platform only. We do NOT provide investment 
            advice, recommendations, or endorsements. All investment decisions are your own responsibility. 
            Past performance does not guarantee future results. Please consult with a qualified financial advisor 
            before making investment decisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Data Accuracy</h2>
          <p className="text-gray-700 mb-6">
            While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, 
            completeness, or timeliness of any data displayed on our platform. Stock prices and market data are 
            provided by third-party sources and may be delayed.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            The service and its original content, features, and functionality are owned by Finsight and are 
            protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            Finsight shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use or inability to use the service, including any investment losses.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Changes to Terms</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify these terms at any time. We will notify users of any material changes 
            by posting the new Terms of Service on this page with an updated "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Termination</h2>
          <p className="text-gray-700 mb-6">
            We may terminate or suspend your account and access to the service immediately, without prior notice, 
            for any breach of these Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard 
            to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms of Service, please contact us through our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
