import type { NextApiRequest, NextApiResponse } from 'next';

// "locationBias": {
//   "circle": {
//     "center": {
//       "latitude": 37.7937,
//       "longitude": -122.3965
//     },
//     "radius": 500.0
//   }
// }

export type GooglePlaceSearchTextRequest = {
  textQuery: string;
  lat?: string;
  lng?: string;
};

export type GooglePlace = {
  id: string;
  displayName: string;
  rating: number;
  userRatingCount: number;
};

export type GooglePlaceSearchTextResponse = {
  data?: GooglePlace;
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GooglePlaceSearchTextResponse>,
) {
  // const response = await fetch(
  //   `https://map.naver.com/p/api/search/allSearch?${queryString.stringify(
  //     req.query,
  //   )}`,
  // );

  const { textQuery, lat, lng } =
    req.query as unknown as GooglePlaceSearchTextRequest;

  const locationBias =
    lat && lng
      ? {
          circle: {
            center: {
              latitude: Number(lat),
              longitude: Number(lng),
            },
            // "radius": 500.0
          },
        }
      : undefined;

  const response = await fetch(
    `https://places.googleapis.com/v1/places:searchText`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_PLATFORM_API_KEY!,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({
        textQuery: textQuery,
        languageCode: 'ko',
        locationBias: locationBias,
        maxResultCount: 3,
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
    res.status(200).json({
      success: true,
      data: {
        id: 'aa',
        displayName: '스타벅스 정자역',
        rating: 4.5,
        userRatingCount: 1234,
      }, // TODO.
    });
  } catch (err) {
    res.status(response.status).json({
      success: false,
      message: '파싱 에러',
    });
  }
}
