'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Copy, Link, ExternalLink, Check } from 'lucide-react';
import axios from 'axios';

interface ShortenResponse {
  shortUrl: string;
  originalUrl: string;
}

export default function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setCopied(false);

    try {
      const response = await axios.post<ShortenResponse>('/api/shorten', {
        url: url.trim()
      });
      
      setShortUrl(response.data.shortUrl);
      setOriginalUrl(url.trim()); // Store the original URL
      setUrl(''); // Clear the input field for new URL
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setUrl('');
    setShortUrl('');
    setOriginalUrl('');
    setError('');
    setCopied(false);
  };


  return (
    <div className="w-full max-w-2xl mx-auto p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Link className="w-12 h-12 text-blue-600 dark:text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Linkly
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Shorten your URLs instantly and for free
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your long URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-12 text-base"
              disabled={loading}
            />
             <Button 
               type="submit" 
               disabled={loading || !url.trim()}
               className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
             >
               {loading ? (
                 <div className="flex items-center gap-2">
                   <Spinner className="w-4 h-4 text-white" />
                   Shortening...
                 </div>
               ) : (
                 'Shorten'
               )}
             </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {shortUrl && (
          <div className="space-y-4">
             <div className="p-4 dark:bg-green-900/20 border  dark:border-green-800 rounded-lg">
               <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-4">
                 Your shortened URL is ready!
               </p>
               
               {/* Original URL */}
               <div className="mb-3">
                 <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Original URL:</p>
                 <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                   <p className="text-gray-700 dark:text-gray-300 font-mono text-sm break-all">
                     {originalUrl}
                   </p>
                 </div>
               </div>

               {/* Shortened URL */}
               <div className="mb-3">
                 <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Shortened URL:</p>
                 <div className="flex flex-col sm:flex-row gap-3">
                   <div className="flex-1 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                     <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                       {shortUrl}
                     </p>
                   </div>
                   <div className="flex gap-2 flex-wrap">
                   <Button
                     type="button"
                     onClick={handleCopy}
                     variant="outline"
                     size="sm"
                     className="h-10 px-4"
                   >
                       {copied ? (
                         <>
                           <Check className="w-4 h-4 mr-2" />
                           Copied!
                         </>
                       ) : (
                         <>
                           <Copy className="w-4 h-4 mr-2" />
                           Copy
                         </>
                       )}
                     </Button>
                   <Button
                     type="button"
                     onClick={() => window.open(shortUrl, '_blank')}
                     variant="outline"
                     size="sm"
                     className="h-10 px-4"
                   >
                       <ExternalLink className="w-4 h-4 mr-2" />
                       Visit
                     </Button>
                   </div>
                 </div>
               </div>
             </div>
            
            <div className="text-center">
              <Button
                onClick={handleReset}
                variant="ghost"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Shorten another URL
              </Button>
            </div>
          </div>
        )}
      </form>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto">
            <Link className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Free Forever</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No registration required, completely free to use
          </p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto">
            <ExternalLink className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Instant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get your shortened URL in seconds
          </p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto">
            <Copy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Easy Share</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Copy and share your links anywhere
          </p>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-32 max-w-6xl mx-auto px-4">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Free URL Shortener - Linkly
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Linkly is a completely free URL shortener service that helps you shorten long URLs instantly. 
            Our free link shortener is perfect for social media, email marketing, and sharing links online. 
            No registration required - just paste your long URL and get a short link in seconds.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Why Choose Our Free URL Shortener?
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>Completely free forever - no hidden costs</li>
            <li>No registration or signup required</li>
            <li>Fast and reliable URL shortening</li>
            <li>Works on all devices and browsers</li>
            <li>Perfect alternative to bit.ly and tinyurl</li>
            <li>Ideal for social media marketing</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Best Free URL Shortener Features
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our URL shortener provides instant link shortening with advanced features including 
            copy to clipboard, direct link visiting, and mobile-responsive design. Perfect for 
            businesses, marketers, and individuals who need reliable link management.
          </p>
        </div>
      </div>

      {/* Hidden Keywords for SEO */}
      <div className="opacity-0 text-[0px] absolute -left-[9999px]">
        URL shortener, link shortener, free URL shortener, shorten links, tiny URL, 
        bit.ly alternative, free link shortener, url compressor, link management, 
        short links, url reducer, free link management, custom short links, 
        url analytics, link tracking, free url service, professional url shortener, 
        business link shortener, social media links, marketing links, 
        affiliate link shortener, branded short links, QR code generator, 
        bulk url shortener, API url shortener, free forever url shortener,
        best url shortener 2024, url shortener no signup, instant url shortener,
        fast url shortener, reliable url shortener, secure url shortener,
        mobile url shortener, responsive url shortener, modern url shortener,
        clean url shortener, simple url shortener, easy url shortener,
        quick url shortener, efficient url shortener, effective url shortener,
        powerful url shortener, advanced url shortener, premium url shortener,
        enterprise url shortener, custom url shortener, branded url shortener,
        white label url shortener, unlimited url shortener, infinite url shortener,
        endless url shortener, forever url shortener, lifetime url shortener,
        permanent url shortener, stable url shortener, consistent url shortener,
        trustworthy url shortener, safe url shortener, secure url shortener,
        protected url shortener, encrypted url shortener, private url shortener,
        anonymous url shortener, no tracking url shortener, privacy focused url shortener,
        gdpr compliant url shortener, secure link shortener, safe link shortener,
        protected link shortener, encrypted link shortener, private link shortener,
        anonymous link shortener, no tracking link shortener, privacy focused link shortener,
        gdpr compliant link shortener, free link shortener no registration,
        url shortener without signup, instant link shortener, fast link shortener,
        reliable link shortener, secure link shortener, mobile link shortener,
        responsive link shortener, modern link shortener, clean link shortener,
        simple link shortener, easy link shortener, quick link shortener,
        efficient link shortener, effective link shortener, powerful link shortener,
        advanced link shortener, premium link shortener, professional link shortener,
        enterprise link shortener, custom link shortener, branded link shortener,
        white label link shortener, unlimited link shortener, infinite link shortener,
        endless link shortener, forever link shortener, lifetime link shortener,
        permanent link shortener, stable link shortener, consistent link shortener,
        trustworthy link shortener, safe link shortener, secure link shortener,
        protected link shortener, encrypted link shortener, private link shortener,
        anonymous link shortener, no tracking link shortener, privacy focused link shortener,
        gdpr compliant link shortener
      </div>
      
    </div>
    
  );
}
