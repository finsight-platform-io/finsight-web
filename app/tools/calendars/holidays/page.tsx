"use client";

import { useState } from "react";
import Link from "next/link";

export default function HolidaysCalendar() {
  const [selectedYear, setSelectedYear] = useState(2026);

  // Market holidays for 2026 (NSE & BSE)
  const holidays2026 = [
    { date: "26-Jan-2026", day: "Monday", occasion: "Republic Day" },
    { date: "14-Feb-2026", day: "Saturday", occasion: "Maha Shivaratri" },
    { date: "14-Mar-2026", day: "Saturday", occasion: "Holi" },
    { date: "29-Mar-2026", day: "Sunday", occasion: "Id-Ul-Fitr (Ramadan Eid)" },
    { date: "02-Apr-2026", day: "Thursday", occasion: "Mahavir Jayanti" },
    { date: "10-Apr-2026", day: "Friday", occasion: "Good Friday" },
    { date: "14-Apr-2026", day: "Tuesday", occasion: "Dr. Baba Saheb Ambedkar Jayanti" },
    { date: "01-May-2026", day: "Friday", occasion: "Maharashtra Day" },
    { date: "05-Jun-2026", day: "Friday", occasion: "Id-Ul-Zuha (Bakri Eid)" },
    { date: "15-Aug-2026", day: "Saturday", occasion: "Independence Day" },
    { date: "16-Aug-2026", day: "Sunday", occasion: "Parsi New Year" },
    { date: "27-Aug-2026", day: "Thursday", occasion: "Ganesh Chaturthi" },
    { date: "02-Oct-2026", day: "Friday", occasion: "Mahatma Gandhi Jayanti" },
    { date: "21-Oct-2026", day: "Wednesday", occasion: "Dussehra" },
    { date: "09-Nov-2026", day: "Monday", occasion: "Diwali (Laxmi Pujan)" },
    { date: "10-Nov-2026", day: "Tuesday", occasion: "Diwali Balipratipada" },
    { date: "24-Nov-2026", day: "Tuesday", occasion: "Gurunanak Jayanti" },
    { date: "25-Dec-2026", day: "Friday", occasion: "Christmas" },
  ];

  const holidays2025 = [
    { date: "26-Jan-2025", day: "Sunday", occasion: "Republic Day" },
    { date: "26-Feb-2025", day: "Wednesday", occasion: "Maha Shivaratri" },
    { date: "14-Mar-2025", day: "Friday", occasion: "Holi" },
    { date: "31-Mar-2025", day: "Monday", occasion: "Id-Ul-Fitr (Ramadan Eid)" },
    { date: "10-Apr-2025", day: "Thursday", occasion: "Mahavir Jayanti" },
    { date: "14-Apr-2025", day: "Monday", occasion: "Dr. Baba Saheb Ambedkar Jayanti" },
    { date: "18-Apr-2025", day: "Friday", occasion: "Good Friday" },
    { date: "01-May-2025", day: "Thursday", occasion: "Maharashtra Day" },
    { date: "07-Jun-2025", day: "Saturday", occasion: "Id-Ul-Zuha (Bakri Eid)" },
    { date: "15-Aug-2025", day: "Friday", occasion: "Independence Day" },
    { date: "27-Aug-2025", day: "Wednesday", occasion: "Ganesh Chaturthi" },
    { date: "02-Oct-2025", day: "Thursday", occasion: "Mahatma Gandhi Jayanti" },
    { date: "02-Oct-2025", day: "Thursday", occasion: "Dussehra" },
    { date: "21-Oct-2025", day: "Tuesday", occasion: "Diwali (Laxmi Pujan)" },
    { date: "22-Oct-2025", day: "Wednesday", occasion: "Diwali Balipratipada" },
    { date: "05-Nov-2025", day: "Wednesday", occasion: "Gurunanak Jayanti" },
    { date: "25-Dec-2025", day: "Thursday", occasion: "Christmas" },
  ];

  const holidays = selectedYear === 2026 ? holidays2026 : holidays2025;

  const upcomingHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    const today = new Date();
    return holidayDate >= today;
  });

  const nextHoliday = upcomingHolidays[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Market Holidays</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📅 Market Holidays Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            NSE & BSE trading holidays for the year
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setSelectedYear(2025)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedYear === 2025
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              2025
            </button>
            <button
              onClick={() => setSelectedYear(2026)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedYear === 2026
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              2026
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Next Holiday Card */}
          {nextHoliday && (
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white sticky top-4">
                <h3 className="text-xl font-semibold mb-6">Next Holiday</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-purple-200 text-sm mb-1">Date</p>
                    <p className="text-3xl font-bold">{nextHoliday.date}</p>
                    <p className="text-purple-200 text-sm mt-1">{nextHoliday.day}</p>
                  </div>
                  <div className="border-t border-purple-400 pt-4">
                    <p className="text-purple-200 text-sm mb-1">Occasion</p>
                    <p className="text-xl font-semibold">{nextHoliday.occasion}</p>
                  </div>
                </div>
                <div className="mt-6 bg-purple-500/30 rounded-lg p-4">
                  <p className="text-sm text-purple-100">
                    ℹ️ Markets will remain closed on this day
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Holidays List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {selectedYear} Trading Holidays ({holidays.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {holidays.map((holiday, index) => (
                  <div
                    key={index}
                    className="px-6 py-4 hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {holiday.occasion}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {holiday.day}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-600 text-lg">
                          {holiday.date.split("-")[0]}
                        </p>
                        <p className="text-sm text-gray-500">
                          {holiday.date.split("-")[1]} {holiday.date.split("-")[2]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <span className="mr-2">💡</span>
                Important Notes
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>This calendar includes holidays for both NSE and BSE</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Muhurat trading may be conducted on Diwali (Laxmi Pujan)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Weekend trading is not available in Indian stock markets</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Dates are subject to change based on exchange notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trading Hours Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Regular Trading Hours
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Equity Segment
              </h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex justify-between">
                  <span>Pre-Open:</span>
                  <span className="font-semibold">9:00 AM - 9:15 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal Trading:</span>
                  <span className="font-semibold">9:15 AM - 3:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Post-Close:</span>
                  <span className="font-semibold">3:40 PM - 4:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                F&O Segment
              </h3>
              <div className="space-y-3 text-purple-800">
                <div className="flex justify-between">
                  <span>Pre-Open:</span>
                  <span className="font-semibold">9:00 AM - 9:15 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal Trading:</span>
                  <span className="font-semibold">9:15 AM - 3:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Post-Close:</span>
                  <span className="font-semibold">3:40 PM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Note:</strong> On special occasions like Muhurat Trading (Diwali), 
              markets may operate for a limited duration. Check exchange notifications for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}