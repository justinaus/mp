import type { NextApiRequest, NextApiResponse } from 'next';
import queryString from 'query-string';

import { LatLng } from '@/components/shared/map/types';

// abbrAddress: '정자동 66-11 1층';
// address: '경기도 성남시 분당구 정자동 66-11 1층';
// bizhourInfo: '영업 종료';
// businessStatus: breakTime: '202311221430~202311221700';
// businessHours: '202311221100~202311222140';
// lastOrder: '202311222100';
// requestTime: '202311222351';
// status: code: 6;
// description: '영업종료';
// detailInfo: '21:40에 영업종료';
// emphasis: true;
// text: '영업 종료';
// category: ['한식', '육류,고기요리'];
// display: '효원식당 분당정자점';
// distance: '405.34';
// homePage: 'https://blog.naver.com/ruinian';
// id: '1047302610';
// marker: 'nres://marker/00079-00162';
// markerId: '220733';
// markerSelected: 'nres://marker/00079-00326';
// menuInfo: '매운등갈비찜 (포장 -2,000원) 16,000 | 곤드레나물밥 (2인분) 6,000 | 메밀전 2,000 | 막걸리 (1+1 EVENT) 5,000 | 사리 추가 2,000 | 밀떡 2,000 | 라면/당면 2,000 | 간장등갈비(포장 -2,000원) 16,000';
// michelinGuide: null;
// michelinGuide: {year: "2023", type: "plate", starCount: 0}
// microReview: '["입에 착착붙는 매콤 등갈비찜 맛집", "분당 맛집 한정판매로 꼭 먹어야하는 팔덕식당 등갈비찜", "분당 맛집 팔덕식당에서 매운 양푼등갈비 곤드레밥",…]';
// name: '효원식당 분당정자점';
// naverBookingUrl: 'https://booking.naver.com/booking/6/bizes/417748';
// placeReviewCount: 2252;
// rank: '1';
// reviewCount: 2336;
// roadAddress: '경기도 성남시 분당구 느티로69번길 6-3 1층';
// thumUrl: 'https://ldb-phinf.pstatic.net/20210210_227/16129467345886TMvb_JPEG/XGIsKCofQIHiAODeArFvIYRV.jpeg.jpg';
// thumUrls: [
//   'https://ldb-phinf.pstatic.net/20210210_227/16129467345886TMvb_JPEG/XGIsKCofQIHiAODeArFvIYRV.jpeg.jpg',
//   'https://ldb-phinf.pstatic.net/20211127_187/1637979881209LrWR5_JPEG/5EED16DE-F2A5-4690-B866-D077DF3B4F11.jpeg',
//   'https://ldb-phinf.pstatic.net/20211127_173/1637979881122eEo3q_JPEG/E1496663-9933-47B2-8335-044650F57E9C.jpeg',
// ];

// x: '127.1127202';
// y: '37.3690628';

// "text": "영업 종료",
//                             "emphasis": true,
//                             "description": "영업종료",
//                             "detailInfo": "16:30에 영업종료"

// "context": [
//   "근고기",
//   "삼겹살",
//   "연탄구이",
//   "김치찌개",
//   "흑돼지"
// ],

// "text": "오늘 휴무",
//                             "emphasis": true,
//                             "description": "정기휴무일 휴무",
//                             "detailInfo": "매주 화요일 휴무"

export type NaverPlace = {
  // category: ['한식', '육류,고기요리'];
  id: string;
  michelinGuide: {
    year: string;
    type: string;
    starCount: number;
  } | null;
  name: string;
  // naverBookingUrl: 'https://booking.naver.com/booking/6/bizes/417748';
  // hasNaverBooking: boolean;
  rank: string;
  // thumUrl: 'https://ldb-phinf.pstatic.net/20210210_227/16129467345886TMvb_JPEG/XGIsKCofQIHiAODeArFvIYRV.jpeg.jpg';
  latLng: LatLng;
  address: string;
  homePage: string;
  microReview: string[];
  businessStatus: {
    status: {
      text: string; // '영업 중';
      detailInfo: string; // "22:00에 라스트오더"
    };
    businessHours: string; // "202311281700~202311282300",
    breakTime: string;
    lastOrder: string; // "202311282200"
  };
  thumUrls: string[];
  context: string[];

  emoji: string; // TODO.
};

export type NaverAllSearchResponse = {
  data?: NaverPlace[];
  success: boolean;
  message?: string;
  pagination?: {
    totalCount: number;
    page: number;
    totalPage: number;
    hasMore: boolean;
  };
};

const COUNT_PER_PAGE = 20;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NaverAllSearchResponse>,
) {
  //   query: 음식점
  // type: all
  // searchCoord: 127.10845479999955;37.367722699999945
  // boundary:

  const response = await fetch(
    `https://map.naver.com/p/api/search/allSearch?${queryString.stringify(
      req.query,
    )}`,
  );

  if (!response.ok) {
    res.status(response.status).json({
      success: false,
      message: response.statusText,
    });
  }

  try {
    const jsonData = await response.json();

    const data = jsonData.result.place.list.map(
      (item: any, index): NaverPlace =>
        ({
          id: item.id,
          michelinGuide: item.michelinGuide,
          name: item.name,
          rank: item.rank,
          latLng: {
            lat: item.y,
            lng: item.x,
          },
          address: item.address,
          homePage: item.homePage,
          microReview: item.microReview,
          businessStatus: {
            status: {
              text: item.businessStatus.status.text,
              detailInfo: item.businessStatus.status.detailInfo,
            },
            businessHours: item.businessStatus.businessHours,
            breakTime: item.businessStatus.breakTime,
            lastOrder: item.businessStatus.lastOrder,
          },
          thumUrls: item.thumUrls,
          context: item.context,
          emoji: (Number(req.query.page) - 1) * COUNT_PER_PAGE + index + 1, // TODO.
        }) as NaverPlace,
    );

    const { totalCount, page } = jsonData.result.place;
    const totalPage = Math.ceil(totalCount / COUNT_PER_PAGE);

    res.status(200).json({
      success: true,
      data: data,
      pagination: {
        totalCount: totalCount,
        page: page,
        totalPage: totalPage,
        hasMore: totalPage > page,
      },
    });
  } catch (err) {
    res.status(response.status).json({
      success: false,
      message: '파싱 에러',
    });
  }
}
