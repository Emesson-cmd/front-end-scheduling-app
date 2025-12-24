import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation' },
      { status: 500 }
    );
  }
}
