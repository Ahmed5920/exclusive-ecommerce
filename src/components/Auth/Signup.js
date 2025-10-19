import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/loginImage.png";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setUser } from "../../store/authSlice";
import { useState } from "react";
import { loginWithGoogle, signupUser } from "../../services/authApi";

const Signup = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const userData = await signupUser(name, email, password);
      dispatch(setUser(userData));
      navigate("/home");
    } catch (error) {
      console.error("Signup Error:", error);
      let friendlyMessage = "Something went wrong. Please try again later.";
      switch (error.code) {
        case "auth/email-already-in-use":
          friendlyMessage =
            "This email is already registered. Try logging in instead.";
          break;
        case "auth/invalid-email":
          friendlyMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          friendlyMessage =
            "Your password is too weak. Use at least 6 characters.";
          break;
        case "auth/operation-not-allowed":
          friendlyMessage =
            "Sign-up is currently disabled. Please contact support.";
          break;
        default:
          friendlyMessage = "Could not create account. Please try again.";
      }
      dispatch(setError(friendlyMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginWithGoogleHandler = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const res = await loginWithGoogle();
      if (res.error) {
        if (res.error.code === "auth/popup-closed-by-user") {
          console.log("Google login cancelled by user.");
        } else {
          alert("Google login failed: " + res.error.message);
        }
      } else {
        console.log("Logged in with Google:", res);
        navigate("/home");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Image */}
      <div className="w-full h-64 md:h-auto">
        <img
          className="w-full h-full object-cover"
          src={loginImage}
          alt="loginimage"
        />
      </div>

      {/* Form */}
      <div className="flex justify-center items-center w-full px-4 md:px-16 py-10">
        <div className="flex flex-col items-start w-full max-w-md space-y-4">
          {error && <p className="text-red-500 w-full">{error}</p>}

          <form className="w-full space-y-4" onSubmit={signUpHandler}>
            <h1 className="text-3xl md:text-4xl font-normal">Create an account</h1>
            <p>Enter your details below</p>

            <div className="flex flex-col w-full space-y-4">
              <input
                className="input-bottom w-full"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                onFocus={() => dispatch(setError(null))}
              />
              <input
                className="input-bottom w-full"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => dispatch(setError(null))}
              />
              <input
                className="input-bottom w-full"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => dispatch(setError(null))}
              />
            </div>

            <div className="flex flex-col space-y-4 w-full">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 rounded w-full"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
              <button
                type="button"
                onClick={loginWithGoogleHandler}
                disabled={googleLoading}
                className="flex items-center justify-center space-x-2 border rounded p-2 w-full"
              >
                <FcGoogle className="w-6 h-6" />
                <span>{googleLoading ? "Signing in..." : "Sign in with Google"}</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full mt-4">
              <p>Already have account?</p>
              <Link className="border-b-2 border-slate-950 mt-2 md:mt-0" to="/login">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;