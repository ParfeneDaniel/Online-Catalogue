import React, { useState } from "react";
import { useTeacherSignIn } from "../../hooks/teacher/useTeacherSignIn";

const TeacherSignIn = () => {
  const { loading, error, signIn } = useTeacherSignIn();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    signIn(formData);
  };
  return (
    <div className="backgroundTeacherSignIn">
      <p>Username:</p>
      <input
        type="text"
        placeholder="username"
        id="username"
        onChange={handleChange}
      />
      <p>Password:</p>
      <input
        type="password"
        placeholder="password"
        id="password"
        onChange={handleChange}
      />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default TeacherSignIn;
