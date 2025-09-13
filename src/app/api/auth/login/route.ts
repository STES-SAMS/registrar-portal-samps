import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API Route: Received login request:', { usernameOrEmail: body.usernameOrEmail });
    
    // Forward the request to the external API
    const response = await fetch('https://ursmartmonitoring.ur.ac.rw/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    console.log('API Route: External API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Route: External API error:', errorText);
      return NextResponse.json(
        { error: `External API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('API Route: External API success response');
    
    // Return the response from the external API
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
