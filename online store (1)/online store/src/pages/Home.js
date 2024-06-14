import React, { useRef } from 'react'
import Headers from '../components/Headers'
import img1 from "../assets/images/home1.jpg"
import img2 from "../assets/images/home2.jpg"
import img3 from "../assets/images/home3.jpeg"
import img4 from "../assets/images/home4.jpg"
import img5 from "../assets/images/home5.jpg"
import '../assets/css/home.css'
import Foooter from '../components/Foooter'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Home = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div>
        <Headers/>
        <div className='home'>
          <div className='homeLeft'>
            <img src={img1} alt='home image'/>
          </div>
          <div className='homeRight'>
            <div className='homeRight-1'>
              <img src={img2} alt='home image' className='homeimg1'/>
              <img src={img3} alt='home image'/>
            </div>
            <div className='homeRight-2'>
            <img src={img4} alt='home image'/>
              <img src={img5} alt='home image' className='homeimg1'/>
            </div>
          </div>
        </div>
      <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper homeslide"
>
    <SwiperSlide><img src={img1} alt='home-image'/> </SwiperSlide>
    <SwiperSlide><img src={img2} alt='home-image'/> </SwiperSlide>
    <SwiperSlide><img src={img3} alt='home-image'/> </SwiperSlide>
    <SwiperSlide><img src={img4} alt='home-image'/> </SwiperSlide>
    <SwiperSlide><img src={img5} alt='home-image'/> </SwiperSlide>
</Swiper>
        <Foooter/>
    </div>
  )
}

export default Home