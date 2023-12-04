import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(
    // `https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=${process.env.GOOGLE_MAPS_PLATFORM_API_KEY}&languageCode=ko`,
    `https://places.googleapis.com/v1/places:searchText`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_PLATFORM_API_KEY!,
        // 'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount',
        'X-Goog-FieldMask':
          'places.displayName,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({
        textQuery: '스타벅스 정자역',
        languageCode: 'ko',
      }),
    },
  );

  if (!response.ok) {
    res.status(response.status).json({
      success: false,
      message: response.statusText,
    });
  }

  try {
    const jsonData = await response.json();

    console.log(jsonData);

    console.log(jsonData.error.details[0].fieldViolations);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(response.status).json({
      success: false,
      message: '파싱 에러',
    });
  }
}
