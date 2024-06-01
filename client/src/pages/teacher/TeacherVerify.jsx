import { Link, useParams } from "react-router-dom";
import { useTeacherVerifyEmail } from "../../hooks/teacher/useTeacherVerifyEmail";

const TeacherVerify = () => {
  const { emailToken } = useParams();
  const { loading, message, error } = useTeacherVerifyEmail(emailToken);
  return (
    <div>
      {loading && <p>Wait for verification</p>}
      {message && <p>{message} <Link to="/teacher/signin">signin</Link></p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TeacherVerify;
