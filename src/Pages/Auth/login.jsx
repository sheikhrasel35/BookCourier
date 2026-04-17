import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaUserShield } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Demo credentials
  const demoCredentials = {
    user: { email: "user@demo.com", password: "User1234" },
    admin: { email: "admin@demo.com", password: "Admin1234" },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInUser(email, password);
      toast.success("✅ Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill and login demo
  const handleDemoLogin = async (type) => {
    setError("");
    setLoading(true);
    const { email, password } = demoCredentials[type];
    try {
      await signInUser(email, password);
      toast.success(`✅ Logged in as ${type}`);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("✅ Signed in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <title>SkillSwap | LogIn</title>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">
          Welcome Back!
        </h1>

        {/* Demo Login Buttons */}
        <div className="flex gap-4 mb-4 justify-center">
          <button
            onClick={() => handleDemoLogin("user")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            <FaUser /> Demo User
          </button>
          <button
            onClick={() => handleDemoLogin("admin")}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <FaUserShield /> Demo Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 pr-20 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-2 px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4 text-right">
            <Link
              to="/forgot-password"
              className="text-green-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full btn-primary font-semibold py-2 rounded-md transition-colors duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}

          <h3 className="text-center font-semibold mt-2 text-primary">or</h3>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-white text-black border w-full flex items-center justify-center py-2 mt-2 gap-2 rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>
        </form>

        <div className="bg-white shadow-md rounded-lg p-4 mt-2 flex justify-center">
          <h3>
            New Here?{" "}
            <Link to="/signup" className="text-primary underline">
              Create an account
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
