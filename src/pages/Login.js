import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginPage,
  LoginForm,
  LoginInput,
  LoginButton,
  LoginContainer,
  LoginTitle
} from '../styles/Login';

const Login = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState({
    userID: "",
    userPW: ""
  });
  const [userCheck, setUserCheck] = useState([]);
  const navigate = useNavigate();

  // 가입된 정보가 있는지 확인
  const userInfoCheck = () => {
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      // 아이디 중복 검사
      .then((data) => {
        setUserCheck(data._embedded.users);
      })

      .catch((error) => {
        console.error("Error fetching recipes:", error);
      })
  }

  useEffect(() => {
    userInfoCheck();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isUserID = userCheck.some((UC) => UC.userID === user.userID);
    if (!isUserID) {
      alert("없는 아이디입니다.");
      return;
    }

    const isPassword = userCheck.some((UC) => UC.userID === user.userID && UC.password === user.userPW)
    if(!isPassword) {
      alert("비밀번호가 틀렸습니다.");
      return;
    }

    setIsLoggedIn(true);
    navigate('/');
  };

  const userInfoChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  return (
    <LoginPage>
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <div>
            <label>아이디:</label>
            <LoginInput
              type="text"
              name='userID'
              value={user.userID}
              onChange={userInfoChange}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <LoginInput
              type="password"
              name='userPW'
              value={user.userPW}
              onChange={userInfoChange}
              required
            />
          </div>
          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>
      </LoginContainer>
    </LoginPage>
  );
};

export default Login;
