import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LogoutPage() {
  useEffect(() => {
    Cookies.remove("userToken");
  }, []);

  return <div>Logging out...</div>;
}

export default LogoutPage;
