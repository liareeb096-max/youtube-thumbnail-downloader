// File: src/App.jsx
import { useState } from 'react';
import AdBanner from './AdBanner'; // Naya component import kar liya

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const extractVideoID = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleGenerate = () => {
    setError('');
    setThumbnailUrl(null);
    const videoId = extractVideoID(videoUrl);
    
    if (videoId) {
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    } else {
      setError('Bhai, valid YouTube link daal pehle!');
    }
  };

  const downloadThumbnail = async () => {
    setIsDownloading(true);
    let success = false;
    const proxies = [
      `https://wsrv.nl/?url=${thumbnailUrl}&output=jpg`,
      `https://api.codetabs.com/v1/proxy?quest=${thumbnailUrl}`,
      `https://corsproxy.io/?${encodeURIComponent(thumbnailUrl)}`
    ];

    for (let i = 0; i < proxies.length; i++) {
      try {
        const response = await fetch(proxies[i]);
        if (!response.ok) continue; 
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'HD-YT-Thumbnail.jpg'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        success = true;
        break; 
      } catch (error) {
        console.warn(`Proxy failed, trying next...`);
      }
    }

    if (!success) {
      const link = document.createElement('a');
      link.href = thumbnailUrl;
      link.target = '_blank';
      link.download = 'HD-YT-Thumbnail.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans p-4 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="text-center py-8 relative z-10 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          YT ThumbNail Downloader
        </h1>
        <p className="text-gray-400 mt-3 text-sm md:text-base max-w-xl mx-auto font-medium">
          Premium tool for HD YouTube Thumbnails.
        </p>
      </header>

      {/* TOP ADSTERRA BANNER (728x90) */}
      <div className="max-w-6xl mx-auto mb-8 bg-white/[0.02] border border-white/10 h-[100px] flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg relative z-10 overflow-hidden">
        {/* API KEY YAHA DALNA */}
        <AdBanner dataKey="bdf04c47681a60d80aefcb1f54f45f94" width={728} height={90} />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* LEFT COLUMN: THE VVIP TOOL */}
        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] h-fit">
          
          <h2 className="text-xl font-bold text-white mb-6">🖼️ Thumbnail Grabber</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-gray-600 transition-all duration-300 shadow-inner"
              placeholder="Paste YouTube Link Here..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 transform hover:-translate-y-1 transition-all duration-300 rounded-2xl font-bold text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 whitespace-nowrap"
            >
              Fetch Media
            </button>
          </div>
          
          {error && <p className="text-pink-400 mt-4 text-sm font-medium text-center animate-pulse">{error}</p>}

          {/* THUMBNAIL RESULT */}
          {thumbnailUrl && (
            <div className="mt-10 animate-fade-in transition-all duration-500">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img src={thumbnailUrl} alt="HD Thumbnail" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={downloadThumbnail}
                  disabled={isDownloading}
                  className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transform hover:-translate-y-1 transition-all duration-300 rounded-2xl font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95"
                >
                  {isDownloading ? 'Downloading...' : '⬇ Download High-Res Image'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR ADS */}
        <div className="flex flex-col gap-6 w-full items-center lg:items-end">
          <div className="w-full max-w-[300px] bg-white/[0.02] border border-white/10 h-[260px] flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg overflow-hidden">
             {/* 1st 300x250 KEY YAHA DALNA */}
             <AdBanner dataKey="af9a728243773602c92881a2f8bb0f00" width={300} height={250} />
          </div>
          <div className="w-full max-w-[300px] bg-white/[0.02] border border-white/10 h-[260px] flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg hidden sm:flex overflow-hidden">
             {/* 2nd 300x250 KEY YAHA DALNA */}
             <AdBanner dataKey="bdf04c47681a60d80aefcb1f54f45f94" width={300} height={250} />
          </div>
        </div>

      </div>

      {/* BOTTOM ADSTERRA BANNER (728x90) */}
      <div className="max-w-6xl mx-auto mt-10 mb-8 bg-white/[0.02] border border-white/10 h-[100px] flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg relative z-10 overflow-hidden">
        {/* BOTTOM 728x90 KEY YAHA DALNA */}
        <AdBanner dataKey="bdf04c47681a60d80aefcb1f54f45f94" width={728} height={90} />
      </div>

      <article className="max-w-6xl mx-auto mb-10 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] text-gray-400 relative z-10 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 border-b border-white/10 pb-4">Ultimate YouTube Thumbnail Downloader</h2>
        <p className="leading-relaxed text-sm mb-4">
          Download high-definition (HD, 4K) YouTube video thumbnails instantly. Designed for creators, developers, and designers needing rapid access to YouTube media assets.
        </p>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li>100% Free and unlimited downloads.</li>
          <li>Extracts the maximum resolution image directly from YouTube servers.</li>
          <li>One-click secure download functionality.</li>
        </ul>
      </article>
      {/* BOTTOM ADSTERRA BANNER (728x90) */}
      <div className="max-w-6xl mx-auto mt-10 mb-8 bg-white/[0.02] border border-white/10 h-[100px] flex items-center justify-center rounded-2xl backdrop-blur-md shadow-lg relative z-10 overflow-hidden">
        {/* BOTTOM 728x90 KEY YAHA DALNA */}
        <AdBanner dataKey="bdf04c47681a60d80aefcb1f54f45f94" width={728} height={90} />
      </div>
    </div>
  );
}

export default App;