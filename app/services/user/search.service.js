/**
 * @file app/sevices/user/search.service.js
 * @description search Service
 * 251219 N init
 */

import axios from "axios";

async function location({keyword, page}) {
  // 1. 카카오맵에 주소 요청
  const result = await axios.get(
    process.env.KAKAO_API_URL_SEARCH_KEYWORD,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.SOCIAL_KAKAO_REST_API_KEY}`
      },
      params: {
        query: keyword,
        page: page
      }
    }
  )
  console.log('service-result: ', result.data.meta)
  // 2. 필요한 데이터만 추출 : '대구'로 시작 -> 번지주소, 도로명주소
  const locationList = result.data.documents
    .filter(item => item.address_name.startsWith('대구'))
    .map(item => ({
      address_name: item.address_name,
      road_address_name: item.road_address_name,
    }
  ));

  // 3. 중복 주소 제거 address_name 기준
  const uniqueList = locationList.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.address_name === item.address_name && t.road_address_name === item.road_address_name
    ))
  );

  return {
    list: uniqueList,
    isEnd: result.data.meta.is_end,
  }
    
}

export default {
  location,

}