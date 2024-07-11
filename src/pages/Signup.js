import React, { useEffect, useState } from "react";
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
  const [userDuple, setUserDuple] = useState([]);
  const [user, setUser] = useState({
    username: "",
    userID: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  // 회원 가입 정보를 데이터베이스에 저장하기 전에 중복 확인
  const fetchDuple = () => {
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      // 아이디 중복 검사
      .then((data) => {
        setUserDuple(data._embedded.users);
      })

      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  useEffect(() => {
    fetchDuple();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    else if (user.password === confirmPassword) {
      setErrorMessage("")
    }

    fetchDuple();

    const isUserID = userDuple.some((UD) => UD.userID === user.userID);
    if (isUserID) {
      alert("이미 있는 아이디입니다.");
      return; // 중복이면 여기서 함수 종료
    }

    const isUsername = userDuple.some((UD) => UD.username === user.username);
    if (isUsername) {
      alert("이미 있는 이름입니다.");
      return; // 중복이면 여기서 함수 종료
    }

    const isEmail = userDuple.some((UD) => UD.email === user.email);
    if (isEmail) {
      alert("이미 있는 이메일입니다.");
      return; // 중복이면 여기서 함수 종료
    }
    if (!isUserID && !isUsername && !isEmail) {
      navigate("/login");
    }

    // 여기에 회원가입 로직을 추가합니다.
    fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // 저장 후 필요한 동작 수행
      })
      .catch((err) => console.error("Failed to save recipe:", err));

    // if(DupleCheck === false) {
    //   navigate("/login");
    // }
  };

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  return (
    <SignupPage>
      <SignupContainer>
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm onSubmit={handleSubmit}>
          <div>
            <label>아이디:</label>
            <SignupInput
              type="text"
              name="userID"
              value={user.userID}
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
