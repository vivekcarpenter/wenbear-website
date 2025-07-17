import { useNavigate } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/login")}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
      title="Login"
    >
      <RiUserLine size={24} />
    </button>
  );
};

export default LoginButton;
