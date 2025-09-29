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
    console.log(email);
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
      <div className="flex justify-center my-16">
        <img src={loginImage} alt="loginimage" />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col items-start  w-96">
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4 mr-36 w-full" onSubmit={signUpHandler}>
            <h1 className="text-4xl font-normal ">Create an account</h1>
            <p>Enter your details below</p>
            <div className="flex flex-col w-full space-y-4">
              <input
                className="input-bottom"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                onFocus={() => dispatch(setError(null))}
              />
              <input
                className="input-bottom"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => dispatch(setError(null))}
              />
              <input
                className="input-bottom"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => dispatch(setError(null))}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="bg-red-500 text-white p-2 rounded px-8"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
              <button
                type="button"
                onClick={loginWithGoogleHandler}
                disabled={googleLoading}
                className="flex items-center justify-center space-x-2 border rounded p-2 px-8"
              >
                <FcGoogle className="w-6 h-6" />
                <span>
                  {googleLoading ? "Signing in..." : "Sign in with Google"}
                </span>
              </button>
              \
            </div>
            <div className="flex space-x-16">
              <p>Already have account?</p>
              <Link className="border-b-2 border-slate-950" to="/login">
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
