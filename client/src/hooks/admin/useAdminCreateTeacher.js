import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

export const useAdminCreateTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const userAtomValue = useRecoilValue(userAtom);
  const createTeacher = (formData) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    axios
      .post("http://localhost:8080/api/admin/task/teacher", formData, {
        headers: {
          Authorization: `Bearer ${userAtomValue.accessToken}`,
        },
      })
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
  return { loading, error, message, createTeacher };
};
