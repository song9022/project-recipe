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
  const [activeTab, setActiveTab] = useState('레시피');
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [imagePreview, setImagePreview] = useState('');
  const [nickname, setNickname] = useState('사용자 닉네임');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recipes = [
    { id: 1, title: 'Delicious Spaghetti', description: 'A delightful spaghetti recipe' },
    { id: 2, title: 'Tasty Chicken Curry', description: 'A flavorful chicken curry' },
    // 더 많은 레시피 추가
  ];

  const reviews = [
    { id: 1, title: 'Great Recipe!', content: 'I tried this recipe and it was amazing!' },
    { id: 2, title: 'Not Bad', content: 'The recipe was okay, but I had to adjust the seasoning.' },
    // 더 많은 요리 후기 추가
  ];

  const comments = [
    { id: 1, author: 'User1', content: 'This looks delicious!' },
    { id: 2, author: 'User2', content: 'Can’t wait to try this recipe.' },
    // 더 많은 댓글 추가
  ];

  const bookmarks = [
    { id: 1, title: 'Bookmark 1', description: 'A bookmarked recipe.' },
    { id: 2, title: 'Bookmark 2', description: 'Another bookmarked recipe.' },
    // 더 많은 북마크 추가
  ];

  const openModal = (tab) => {
    setActiveTab(tab);
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
        <TabButton onClick={() => openModal('레시피')} active={activeTab === '레시피'}>
          레시피
        </TabButton>
        <TabButton onClick={() => openModal('요리후기')} active={activeTab === '요리후기'}>
          요리후기
        </TabButton>
        <TabButton onClick={() => openModal('댓글')} active={activeTab === '댓글'}>
          댓글
        </TabButton>
        <TabButton onClick={() => openModal('북마크')} active={activeTab === '북마크'}>
          북마크
        </TabButton>
      </TabMenu>

      <Content>
        <CenterImage src={image} alt="profile" />
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
        <RegisterButton to="/write">레시피 등록하기</RegisterButton>
      </Content>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {activeTab === '레시피' && (
          <div>
            <h2>내가 작성한 레시피</h2>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === '요리후기' && (
          <div>
            <h2>내가 작성한 요리후기</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === '댓글' && (
          <div>
            <h2>내가 작성한 댓글</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p><strong>{comment.author}</strong>: {comment.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === '북마크' && (
          <div>
            <h2>내가 북마크한 레시피</h2>
            <ul>
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id}>
                  <h3>{bookmark.title}</h3>
                  <p>{bookmark.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </MyPageContainer>
  );
};

export default MyPage;
