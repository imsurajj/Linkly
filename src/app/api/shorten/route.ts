import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Use TinyURL API (free service)
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      
      if (response.data && response.data.startsWith('http')) {
        return NextResponse.json({
          shortUrl: response.data,
          originalUrl: url
        });
      } else {
        throw new Error('Invalid response from TinyURL');
      }
    } catch (error) {
      console.error('TinyURL API error:', error);
      
      // Fallback: Use is.gd API
      try {
        const fallbackResponse = await axios.get(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
        
        if (fallbackResponse.data && fallbackResponse.data.startsWith('http')) {
          return NextResponse.json({
            shortUrl: fallbackResponse.data,
            originalUrl: url
          });
        } else {
          throw new Error('Invalid response from is.gd');
        }
      } catch (fallbackError) {
        console.error('is.gd API error:', fallbackError);
        
        // Final fallback: Use v.gd API
        try {
          const finalResponse = await axios.get(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
          
          if (finalResponse.data && finalResponse.data.startsWith('http')) {
            return NextResponse.json({
              shortUrl: finalResponse.data,
              originalUrl: url
            });
          } else {
            throw new Error('All URL shortening services failed');
          }
        } catch (finalError) {
          console.error('v.gd API error:', finalError);
          return NextResponse.json(
            { error: 'Unable to shorten URL. Please try again later.' },
            { status: 500 }
          );
        }
      }
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
