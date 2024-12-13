// api.js
import axios from 'axios';

const BASE_URL = 'https://api.vworld.kr/req/wms';
const API_KEY = '0B140A68-072C-3083-AE15-FA3F265E63F8';

export const getFireStationArea = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        service: 'WMS',
        request: 'GetMap',
        layers: 'lt_c_usfsffb',
        key: API_KEY,
        crs: 'EPSG:4326',
        bbox: '126.8,37.4,127.2,37.7',
        width: 256,
        height: 256,
        format: 'image/png',
      },
    });
    console.log('Image URL:', response.config.url);
    return response.config.url; // 반환된 지도 이미지 URL
  } catch (error) {
    console.error('Error fetching fire station area:', error);
    throw error;
  }
};

export const getFireStations = async () => {
  try {
    const response = await axios.get('https://example.com/api/firestations', {
      params: { key: API_KEY },
    });
    return response.data; // 소방서 데이터 반환
  } catch (error) {
    console.error('Error fetching fire stations:', error);
    throw error;
  }
};
