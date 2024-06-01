import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import AdminSignIn from "../pages/admin/AdminSignIn";
import Secure from "../pages/admin/Secure";
import Dashboard from "../pages/admin/Dashboard";
import AddTeacher from "../pages/admin/AddTeacher";
import Teacher from "../pages/teacher/Teacher";
import TeacherSignIn from "../pages/teacher/TeacherSignIn";
import TeacherSecure from "../pages/teacher/TeacherSecure";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherVerify from "../pages/teacher/TeacherVerify";
import CreateClass from "../pages/admin/CreateClass";

export const router = createBrowserRouter([
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "signin",
        element: <AdminSignIn />,
      },
      {
        path: "secure",
        element: <Secure />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "addTeacher",
            element: <AddTeacher />,
          },
          {
            path: "createClass",
            element: <CreateClass />
          }
        ],
      },
    ],
  },
  {
    path: "teacher",
    element: <Teacher />,
    children: [
      {
        path: "signin",
        element: <TeacherSignIn />,
      },
      {
        path: "verify/:emailToken",
        element: <TeacherVerify />,
      },
      {
        path: "secure",
        element: <TeacherSecure />,
        children: [
          {
            path: "dashboard",
            element: <TeacherDashboard />,
          },
        ],
      },
    ],
  },
]);
