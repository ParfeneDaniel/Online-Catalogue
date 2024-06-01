import { useState } from "react";
import { useAdminSignIn } from "../../hooks/admin/useAdminSignIn";

const AdminSignIn = () => {
  const { loading, error, signIn } = useAdminSignIn();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    signIn(formData);
  }
  return (
    <div className="backgroundAdminSignUp">
      <p>Username:</p>
      <input
        type="text"
        placeholder="Username..."
        id="username"
        onChange={handleChange}
      />
      <p>Password:</p>
      <input
        type="password"
        placeholder="Password..."
        id="password"
        onChange={handleChange}
      />
      <button disabled={loading} onClick={handleClick}>{loading == true ? "Loading..." : "Submit"}</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminSignIn;
