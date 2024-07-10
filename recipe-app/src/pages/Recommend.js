import React from 'react';
import Slider from 'react-slick';
import '../styles/Recommend.css';

function Main() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <div>
      <h2>추천 페이지</h2>
        <div>
          <h4>10분 아침메뉴 추천</h4>
        </div>
      <Slider {...settings} className="slider">
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 3" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 4" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 5" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 6" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 7" />
        </div>
      </Slider>

      <div>
          <h4>점심메뉴 추천</h4>
        </div>
      <Slider {...settings} className="slider">
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 3" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 4" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 5" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 6" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 7" />
        </div>
      </Slider>

      <div>
          <h4>저녁메뉴 추천</h4>
        </div>
      <Slider {...settings} className="slider">
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 3" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 4" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 5" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 6" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 7" />
        </div>
      </Slider>

      <p>환영합니다! 여기는 추천 페이지입니다.</p>
    </div>
  );
};

export default Main;
