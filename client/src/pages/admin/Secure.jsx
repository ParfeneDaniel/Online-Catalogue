import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const Secure = () => {
  const userAtomValue = useRecoilValue(userAtom);
  return userAtomValue ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default Secure;
