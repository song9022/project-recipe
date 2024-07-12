import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SignupPage,
  SignupForm,
  SignupInput,
  SignupButton,
  SignupContainer,
  SignupTitle
} from '../styles/Signup';
import { PiBreadBold } from "react-icons/pi";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 회원가입 로직을 추가합니다.
    console.log({ username, nickname, email, password, confirmPassword });
    navigate('/login');
  };

  return (
    <SignupPage>
      <SignupContainer>
        <PiBreadBold size={60} color='#DD6213' />
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm onSubmit={handleSubmit}>
          <div>
            <label>사용자명:</label>
            <SignupInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>닉네임:</label>
            <SignupInput
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>아이디:</label>
            <SignupInput
              type="id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <SignupInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호 확인:</label>
            <SignupInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <SignupButton type="submit">회원가입</SignupButton>
        </SignupForm>
      </SignupContainer>
    </SignupPage>
  );
};

export default Signup;
