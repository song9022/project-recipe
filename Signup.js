import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignupPage,
  SignupForm,
  SignupInput,
  SignupButton,
  SignupContainer,
  SignupTitle,
} from "../styles/Signup";

const Signup = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    id: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 여기에 회원가입 로직을 추가합니다.
    fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("user saved:", data);
        // 저장 후 필요한 동작 수행
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error("Failed to save recipe:", err));
  };

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  console.log(user);

  return (
    <SignupPage>
      <SignupContainer>
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm onSubmit={handleSubmit}>
          <div>
            <label>아이디:</label>
            <SignupInput
              type="text"
              name="id"
              value={user.id}
              onChange={userChange}
              required
            />
          </div>
          <div>
            <label>닉네임:</label>
            <SignupInput
              type="text"
              name="username"
              value={user.username}
              onChange={userChange}
              required
            />
          </div>
          <div>
            <label>이메일:</label>
            <SignupInput
              type="email"
              name="email"
              value={user.email}
              onChange={userChange}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <SignupInput
              type="password"
              name="password"
              value={user.password}
              onChange={userChange}
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <SignupButton type="submit">회원가입</SignupButton>
        </SignupForm>
      </SignupContainer>
    </SignupPage>
  );
};

export default Signup;
