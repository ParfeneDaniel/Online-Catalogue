import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="backgroundDashboard">
      <Link to="/admin/secure/addTeacher">
        <button>Add teachers</button>
      </Link>
      <Link to="/admin/secure/createClass">
        <button>Create a class</button>
      </Link>
    </div>
  );
};

export default Dashboard;
