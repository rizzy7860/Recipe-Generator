// app/api/mealLookup/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the meal ID from the URL parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate the ID parameter
    if (!id) {
      return NextResponse.json(
        { error: 'Meal ID is required' },
        { status: 400 }
      );
    }

    // Fetch the meal data from themealdb
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600
        }
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch meal data' },
        { status: response.status }
      );
    }

    // Retrieve meal data
    const mealData = await response.json();

    // Meal data validation
    if (!mealData.meals) {
      return NextResponse.json(
        { error: 'Meal not found' },
        { status: 404 }
      );
    }

    // Return the successful response
    return NextResponse.json(mealData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('Error in meal lookup API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}