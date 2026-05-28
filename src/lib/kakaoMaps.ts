declare global {
  interface Window {
    kakao: any
  }
}

const API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY as string

if (!API_KEY) {
  console.error('[kakaoMaps] VITE_KAKAO_MAP_API_KEY가 설정되지 않았습니다. .env.local을 확인하고 dev 서버를 재시작하세요.')
}

let loadPromise: Promise<void> | null = null

export function loadKakaoMaps(): Promise<void> {
  if (window.kakao?.maps) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => resolve())
    }
    script.onerror = () => {
      loadPromise = null
      reject(new Error('Kakao Maps SDK 로드 실패. API 키와 등록 도메인을 확인하세요.'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}
