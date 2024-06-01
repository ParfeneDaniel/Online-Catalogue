import { useRef, useState } from "react";
import { useAdminCreateTeacher } from "../../hooks/admin/useAdminCreateTeacher";

const AddTeacher = () => {
  const { loading, error, message, createTeacher } = useAdminCreateTeacher();
  const [formData, setFormData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const ref = useRef();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const updateData = { ...formData, subjects };
    createTeacher(updateData);
  };
  const handleAddSubject = (e) => {
    setSubjects([...subjects, ref.current.value]);
    ref.current.value = "";
  };
  return (
    <div className="backgroundAddTeacher">
      <input
        type="text"
        placeholder="firstName"
        id="firstName"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="lastName"
        id="lastName"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Username"
        id="username"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="email"
        id="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        id="password"
        onChange={handleChange}
      />
      <div className="subject">
        <input type="text" placeholder="subject" id="classes" ref={ref} />
        <button onClick={handleAddSubject}>Add subject</button>
      </div>
      <button onClick={handleClick}>{loading ? "Loading..." : "Submit"}</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTeacher;
