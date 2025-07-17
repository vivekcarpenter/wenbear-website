import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../store/services/authApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ token, password }).unwrap();
      toast.success("Password reset successfully");
      navigate("/login"); // or wherever you want
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
