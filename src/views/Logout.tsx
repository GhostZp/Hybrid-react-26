import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login", { replace: true });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
