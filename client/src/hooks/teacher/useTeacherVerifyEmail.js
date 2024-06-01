import axios from "axios";
import { useEffect, useState } from "react";

export const useTeacherVerifyEmail = (emailToken) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const verifyEmail = () => {
      setLoading(true);
      axios
        .post(
          `http://localhost:8080/api/teacher/auth/verifyEmail/${emailToken}`
        )
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          setError(error.response.data.errors);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    verifyEmail();
  }, []);
  return { loading, message, error };
};
