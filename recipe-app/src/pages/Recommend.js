import React from 'react';
import Slider from 'react-slick';
import '../styles/Recommend.css';

const getYoutubeThumbnail = (url) => {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const getSNSImageThumbnail = (url) => {
  // SNS 링크에서 썸네일 이미지를 가져오는 로직을 구현합니다.
  // 현재 예시로는 단순히 대체 이미지를 반환합니다.
  return 'https://via.placeholder.com/800x400'; // 실제로는 각 SNS API에서 썸네일을 가져오는 로직을 구현해야 합니다.
};

function Recommend() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  const youtubeLinks = [
    'https://www.youtube.com/watch?v=HOfHK1c9RUU',
    'https://www.youtube.com/watch?v=NLQAEkuxqO4',
    'https://www.youtube.com/watch?v=sxMQViwIEUQ',
    'https://www.youtube.com/watch?v=DOzvFg3RvT0',
    'https://www.youtube.com/watch?v=HT7DA-M9yKc',
    'https://www.youtube.com/watch?v=6Mo36RUunhk',
    'https://www.youtube.com/watch?v=k3rpJlK8z9o'
  ];

  const snsLinks = [
    'https://www.tiktok.com/@dasol2__/video/7219599689212038401?is_from_webapp=1&sender_device=pc' ,
    'https://example.com/2' ,
    'https://example.com/3' ,
    'https://example.com/4' ,
    'https://example.com/5' ,
    'https://example.com/6' ,
    'https://example.com/7'
  ];

  return (
    <div>
      <h2>🍳 레시피샵이 추천하는 요리법</h2>
      <div>
        <h4>🥞 레시피샵의 추천 레시피</h4>
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
        <h4>🥂 유튜브 인기 레시피</h4>
      </div>
      <Slider {...settings} className="slider">
        {youtubeLinks.map((link, index) => (
          <div key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img
                src={getYoutubeThumbnail(link)}
                alt={`Slide ${index + 1}`}
              />
            </a>
          </div>
        ))}
      </Slider>

      <div>
        <h4>🥗 SNS 인기 레시피</h4>
      </div>
      <Slider {...settings} className="slider">
        {snsLinks.map((link, index) => (
          <div key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img
                src={getSNSImageThumbnail(link)}
                alt={`Slide ${index + 1}`}
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Recommend;
