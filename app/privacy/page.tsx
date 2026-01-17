export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">
            Last updated: January 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            Welcome to Finsight. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our 
            platform and tell you about your privacy rights.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect the following information:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Account Information:</strong> Name and email address when you sign in with Google</li>
            <li><strong>Portfolio Data:</strong> Stock symbols, quantities, and purchase prices you add to your portfolio</li>
            <li><strong>Watchlist Data:</strong> Stocks you save to your watchlist</li>
            <li><strong>Usage Data:</strong> Information about how you use our platform</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Provide and maintain our service</li>
            <li>Notify you about changes to our service</li>
            <li>Allow you to participate in interactive features</li>
            <li>Provide customer support</li>
            <li>Monitor the usage of our service</li>
            <li>Detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Data Security</h2>
          <p className="text-gray-700 mb-6">
            The security of your data is important to us. We use industry-standard security measures to protect 
            your personal information. Your portfolio and watchlist data is stored securely in our database and 
            is only accessible to you when you're signed in.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Third-Party Services</h2>
          <p className="text-gray-700 mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Google OAuth:</strong> For secure authentication</li>
            <li><strong>Yahoo Finance:</strong> For stock market data</li>
            <li><strong>Vercel:</strong> For hosting and deployment</li>
            <li><strong>Neon:</strong> For database storage</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request transfer of your data</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Cookies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar tracking technologies to track activity on our service and store certain 
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy, please contact us through our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
