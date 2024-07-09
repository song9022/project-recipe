import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import {
  MyPageContainer,
  TabMenu,
  TabButton,
  SubTabMenu,
  SortOptions,
  Content,
  CenterImage,
  RegisterButton,
  SearchContainer,
  SearchInput,
  SearchButton
} from '../styles/MyPageStyles';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recipes = [
    { id: 1, title: 'Delicious Spaghetti', description: 'A delightful spaghetti recipe' },
    { id: 2, title: 'Tasty Chicken Curry', description: 'A flavorful chicken curry' },
    // 더 많은 레시피 추가
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MyPageContainer>
      <TabMenu>
        <TabButton onClick={openModal} active>
          레시피
        </TabButton>
        <TabButton>요리후기</TabButton>
        <TabButton>댓글</TabButton>
        <TabButton>북마크</TabButton>
      </TabMenu>

      <Content>
        <CenterImage src="https://via.placeholder.com/150" alt="cupcake" />
        <h2>레시피를 직접 올려보세요!</h2>
        <p>자랑하고 싶은 나만의 레시피! 공유하고 싶은 멋진 레시피를 올려 주세요.</p>
        <RegisterButton to="/write">레시피 등록하기</RegisterButton>

      </Content>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>내가 작성한 레시피</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </MyPageContainer>
  );
};

export default MyPage;
