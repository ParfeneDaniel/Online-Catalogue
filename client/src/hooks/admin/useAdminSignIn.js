import { useState } from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAdminSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUserAtom = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const signIn = (formData) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/api/admin/auth/signin", formData)
      .then((response) => {
        setUserAtom(response.data);
        navigate("/admin/secure/dashboard");
      })
      .catch((error) => {
        setError(error.response.data.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { loading, error, signIn };
};
