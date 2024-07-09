import React from 'react';

const Signup = () => {
  return (
    <div>
      <h2>회원가입 페이지</h2>
      <form>
        <div>
          <label>이름:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>이메일:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
