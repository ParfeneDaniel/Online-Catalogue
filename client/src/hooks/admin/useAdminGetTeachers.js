import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

export const useAdminGetTeachers = () => {
  const [teachers, setTeachers] = useState({});
  const [error, setErrors] = useState(null);
  const userAtomValue = useRecoilValue(userAtom);
  useEffect(() => {
    const getTeachers = () => {
      axios
        .get("http://localhost:8080/api/admin/task/teachers", {
          headers: {
            Authorization: `Bearer ${userAtomValue.accessToken}`,
          },
        })
        .then((response) => {
          setTeachers(response.data.teachers);
          console.log(response.data.teachers)
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    };
    getTeachers();
  }, []);
  return { teachers, error };
};
