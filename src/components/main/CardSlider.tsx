import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import type { FixedLocation } from '../../constants/locations'
import LocationCard from './LocationCard'
import styles from './CardSlider.module.css'

type Props = {
  locations: FixedLocation[]
}

export default function CardSlider({ locations }: Props) {
  return (
    <div className={styles.wrapper}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.35}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 180,
          modifier: 2.2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className={styles.swiper}
      >
        {locations.map(location => (
          <SwiperSlide key={location.id}>
            <LocationCard location={location} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
