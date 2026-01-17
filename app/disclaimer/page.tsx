export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
          <p className="text-gray-600 mt-2">
            Last updated: January 17, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose max-w-none">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-red-900 mb-3">⚠️ Important Notice</h2>
            <p className="text-red-800 text-lg font-medium">
              Finsight is an information platform only and does NOT provide investment advice, 
              recommendations, or endorsements of any kind.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Investment Advice</h2>
          <p className="text-gray-700 mb-6">
            The information provided on Finsight is for informational and educational purposes only. Nothing on 
            this platform should be construed as investment advice, financial advice, trading advice, or any other 
            sort of advice. You should not treat any of the platform's content as such.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Do Your Own Research</h2>
          <p className="text-gray-700 mb-6">
            Finsight does not recommend that any stock, security, or investment strategy is suitable for any 
            specific person. We are not responsible for any investment decisions you make. You should conduct 
            your own research and due diligence before making any investment decisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Consult Professional Advisors</h2>
          <p className="text-gray-700 mb-6">
            Before making any financial decisions, you should seek advice from a qualified and registered financial 
            advisor, tax professional, or legal advisor who understands your specific financial situation and needs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Market Risks</h2>
          <p className="text-gray-700 mb-4">
            All investments involve risk, including the possible loss of principal. You should be aware that:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Past performance does not guarantee future results</li>
            <li>Stock prices can be volatile and may decline</li>
            <li>Market conditions can change rapidly</li>
            <li>There are no guarantees of profit</li>
            <li>You may lose some or all of your investment</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Data Accuracy</h2>
          <p className="text-gray-700 mb-6">
            While we strive to provide accurate and timely information, we make no representations or warranties 
            of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the 
            information displayed on our platform. Stock prices and market data are sourced from third-party providers 
            and may be delayed or contain errors.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Third-Party Data</h2>
          <p className="text-gray-700 mb-6">
            Stock market data is provided by Yahoo Finance and other third-party sources. We are not responsible 
            for the accuracy or completeness of this data. Data may be delayed by 15 minutes or more depending on 
            the source and market.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Portfolio Tracking</h2>
          <p className="text-gray-700 mb-6">
            The portfolio tracking and P&L calculations are provided as a convenience tool only. These calculations 
            are based on the data you enter and current market prices. We are not responsible for any errors in 
            your portfolio data or calculations. You should verify all information independently.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">No Guarantee of Availability</h2>
          <p className="text-gray-700 mb-6">
            We do not guarantee that our service will be available at all times or that it will be error-free. 
            The service may be subject to limitations, delays, and other problems inherent in the use of the internet 
            and electronic communications.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Tax Implications</h2>
          <p className="text-gray-700 mb-6">
            We do not provide tax advice. Investment transactions may have tax implications. You should consult 
            with a qualified tax professional regarding the tax treatment of your investments and transactions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Regulatory Compliance</h2>
          <p className="text-gray-700 mb-6">
            Finsight is an information platform and is not registered as a broker-dealer, investment advisor, or 
            any other regulated financial service provider. We do not execute trades or manage investments on behalf 
            of users.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Your Responsibility</h2>
          <p className="text-gray-700 mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <strong>By using Finsight, you acknowledge that:</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>You are solely responsible for your investment decisions</li>
            <li>You understand the risks involved in investing</li>
            <li>You will not hold Finsight liable for any investment losses</li>
            <li>You will conduct your own research and due diligence</li>
            <li>You will consult with qualified professionals before investing</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Changes to Disclaimer</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon 
            posting to the platform with an updated "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Contact</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this disclaimer, please contact us through our platform.
          </p>
        </div>
      </div>
    </div>
  );
}
