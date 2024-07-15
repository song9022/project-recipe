import styled from 'styled-components';
import Slider from 'react-slick';

export const SliderContainer = styled(Slider)`
  width: 80%;
  margin: 20px auto;

  img {
    width: 90%;
    height: auto;
    border-radius: 10px;
  }
`;

export const RecommendWrapper = styled.div`
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

export const SubTitle = styled.h4`
  margin-top: 20px;
`;