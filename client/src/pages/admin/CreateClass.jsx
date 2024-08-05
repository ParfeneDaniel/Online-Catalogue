import { useState } from "react";
import { useAdminGetTeachers } from "../../hooks/admin/useAdminGetTeachers";

const CreateClass = () => {
  const { teachers, error } = useAdminGetTeachers();
  const [teacher, setTeacher] = useState("");
  const [suggestions, setSuggestions] = useState({})
  const handleChange = (e) => {
    setTeacher(e.target.value)
  }
  return (
    <div className="backgroundCreateClass">
      <p>Name</p>
      <input type="text" placeholder="Name" id="name"/>
      <p>Category:</p>
      <select>
        <option value={0}>Mate-info</option>
        <option value={1}>Stiinte</option>
        <option value={2}>Filo</option>
      </select>
      <p>Class Master:</p>
      <input type="text" placeholder="Class master" id="classMaster" onChange={handleChange} />
      <div>
        {}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateClass;
