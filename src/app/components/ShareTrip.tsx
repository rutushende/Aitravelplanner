import { useState } from 'react';
import { Share2, Link as LinkIcon, Mail, Download, Check } from 'lucide-react';

export function ShareTrip({ tripId, destination }: { tripId: string; destination: string }) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/itinerary/${tripId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Mock PDF download - would integrate with a PDF generation library
    alert('PDF download functionality will generate a detailed itinerary PDF');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out my ${destination} trip itinerary!`);
    const body = encodeURIComponent(`I've planned an amazing trip to ${destination}! View the full itinerary here: ${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShare(!showShare)}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center gap-2"
      >
        <Share2 className="w-5 h-5" />
        Share Trip
      </button>

      {showShare && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-10">
          <h3 className="font-bold text-lg mb-4">Share Your Itinerary</h3>

          <div className="space-y-3">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <LinkIcon className="w-5 h-5 text-indigo-600" />
              )}
              <div className="flex-1 text-left">
                <p className="font-semibold">{copied ? 'Link Copied!' : 'Copy Link'}</p>
                <p className="text-sm text-gray-600">Share via any platform</p>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={handleEmailShare}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <div className="flex-1 text-left">
                <p className="font-semibold">Email</p>
                <p className="text-sm text-gray-600">Send via email</p>
              </div>
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
            >
              <Download className="w-5 h-5 text-green-600" />
              <div className="flex-1 text-left">
                <p className="font-semibold">Download PDF</p>
                <p className="text-sm text-gray-600">Save for offline use</p>
              </div>
            </button>
          </div>

          {/* Share URL Display */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Share URL:</p>
            <p className="text-sm font-mono text-gray-800 break-all">{shareUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
}
