import React, { useState } from 'react';
import Modal from '../components/modal/Modal';
import {
  MyPageContainer,
  TabMenu,
  TabButton,
  Content,
  CenterImage,
  RegisterButton,
  NicknameContainer,
  NicknameInput,
  SaveButton
} from '../styles/MyPage';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [imagePreview, setImagePreview] = useState('');
  const [nickname, setNickname] = useState('사용자 닉네임');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveNickname = () => {
    setIsEditing(false);
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
        <CenterImage src={image} alt="profile" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <NicknameContainer>
          {isEditing ? (
            <NicknameInput
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
          ) : (
            <h2>{nickname}</h2>
          )}
          {isEditing ? (
            <SaveButton onClick={saveNickname}>저장</SaveButton>
          ) : (
            <SaveButton onClick={toggleEditing}>닉네임 수정</SaveButton>
          )}
        </NicknameContainer>
        <p>자랑하고 싶은 나만의 레시피! 공유하고 싶은 멋진 레시피를 올려 주세요.</p>
        <RegisterButton to="/write" id=''>레시피 등록하기</RegisterButton>
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
