import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../store/services/authApi";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const ProfileAdmin = () => {
  const userId = localStorage.getItem("userId");

  const {
    data: profile,
    isLoading,
    refetch,
  } = useGetProfileQuery(userId, {
    skip: !userId,
  });

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  //Password modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); //  Hold token here
  const [step, setStep] = useState(1); // Step 1 = Forgot | Step 2 = Reset

  // Fetch user data
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile?.data?.name || "",
        email: profile?.data?.email || "",
        profileImage: profile?.data?.profileImage || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userId,formData).unwrap();
      await refetch();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // Handle Forgot
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res?.message || "Reset link sent");
      console.log("Forgot response:", res);
      if (res?.data?.token) {
        setToken(res.data?.token);
        setStep(2); // Switch to reset form
        setEmail("");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  //Handle Reset
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Missing token");

    try {
      const res = await resetPassword({ token, password }).unwrap();
      toast.success(res?.message || "Password reset successfully");

      // Reset state
      setShowForgotModal(false);
      setStep(1);
      setToken("");
      setPassword("");
    } catch (err) {
      toast.error(err?.data?.message || "Reset failed");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mt-15 px-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center mb-4">
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full shadow"
              />
              <h5 className="mt-4 text-lg font-semibold">{formData.name}</h5>
              <p className="text-gray-500">{formData.email}</p>
              <button
                className="text-blue-600 underline text-sm mt-2"
                onClick={() => {
                  setShowForgotModal(true);
                  setStep(1);
                }}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <h5 className="text-lg font-semibold mb-4">Edit Profile</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    value={formData.email}
                    readOnly
                  />
                </div>
              </div>
              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        open={showForgotModal} 
        onClose={() => {
          setShowForgotModal(false);
          setEmail("");
          setPassword("");
          setStep(1);
          setToken("");
        }}
        title={step === 1 ? "Forgot Password" : "Reset Password"}
      >
        {step === 1 ? (
          <form onSubmit={handleForgotSubmit} className="space-y-4 p-2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4 p-2">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter new password"
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
        )}
      </Modal>
    </div>
  );
};

export default ProfileAdmin;
