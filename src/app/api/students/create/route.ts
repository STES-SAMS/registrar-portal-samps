import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');
    
    console.log('Creating student with data:', JSON.stringify(body, null, 2));
    console.log('Auth header:', authHeader);
    console.log('Bearer token present:', authHeader?.startsWith('Bearer '));
    
    const response = await fetch('https://ursmartmonitoring.ur.ac.rw/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { 'Authorization': authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    console.log('Student creation response status:', response.status);
    console.log('Student creation response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Student creation failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to create student', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Student created successfully:', JSON.stringify(data, null, 2));
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Student creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
