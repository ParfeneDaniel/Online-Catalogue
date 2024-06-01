import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const TeacherSecure = () => {
  const userAtomValue = useRecoilValue(userAtom);
  return userAtomValue ? <Outlet /> : <Navigate to="/teacher/signin" />;
};

export default TeacherSecure;
