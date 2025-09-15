import { NextResponse } from 'next/server';

// This is a catch-all proxy route that forwards requests to the real backend API
// It handles dynamic routes like /api/proxy/academics/academic-years

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://your-backend-url.com/api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await params for Next.js 15 compatibility
    const { path } = await params;
    
    // Reconstruct the path from the dynamic route
    const apiPath = Array.isArray(path) ? path.join('/') : path;
    const url = new URL(request.url);
    const queryString = url.search;
    
    // Build the backend URL
    const backendUrl = `${BACKEND_BASE_URL}/${apiPath}${queryString}`;
    
    console.log('🔄 Proxy: Forwarding GET request to:', backendUrl);
    
    // Get the authorization header from the original request
    const authHeader = request.headers.get('authorization');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    // Forward the request to the backend
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      console.error('🚨 Proxy: Backend responded with error:', response.status, response.statusText);
      return NextResponse.json(
        { 
          error: 'Backend API error', 
          status: response.status,
          statusText: response.statusText,
          url: backendUrl
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('✅ Proxy: Successfully forwarded request, got response:', {
      status: response.status,
      dataKeys: Object.keys(data),
      url: backendUrl
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('💥 Proxy: Error forwarding request:', error);
    return NextResponse.json(
      { 
        error: 'Proxy server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        backendUrl: BACKEND_BASE_URL
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const apiPath = Array.isArray(path) ? path.join('/') : path;
    const url = new URL(request.url);
    const queryString = url.search;
    
    const backendUrl = `${BACKEND_BASE_URL}/${apiPath}${queryString}`;
    
    console.log('🔄 Proxy: Forwarding POST request to:', backendUrl);
    
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      console.error('🚨 Proxy: Backend responded with error:', response.status, response.statusText);
      return NextResponse.json(
        { 
          error: 'Backend API error', 
          status: response.status,
          statusText: response.statusText,
          url: backendUrl
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('✅ Proxy: Successfully forwarded POST request');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('💥 Proxy: Error forwarding POST request:', error);
    return NextResponse.json(
      { 
        error: 'Proxy server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const apiPath = Array.isArray(path) ? path.join('/') : path;
    const url = new URL(request.url);
    const queryString = url.search;
    
    const backendUrl = `${BACKEND_BASE_URL}/${apiPath}${queryString}`;
    
    console.log('🔄 Proxy: Forwarding PUT request to:', backendUrl);
    
    const body = await request.json();
    const authHeader = request.headers.get('authorization');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('💥 Proxy: Error forwarding PUT request:', error);
    return NextResponse.json(
      { error: 'Proxy server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const apiPath = Array.isArray(path) ? path.join('/') : path;
    const url = new URL(request.url);
    const queryString = url.search;
    
    const backendUrl = `${BACKEND_BASE_URL}/${apiPath}${queryString}`;
    
    console.log('🔄 Proxy: Forwarding DELETE request to:', backendUrl);
    
    const authHeader = request.headers.get('authorization');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('💥 Proxy: Error forwarding DELETE request:', error);
    return NextResponse.json(
      { error: 'Proxy server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}