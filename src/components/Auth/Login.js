import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/loginImage.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { loginUser, loginWithGoogle } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setUser } from "../../store/authSlice";
import { mergeCart } from "../../services/cartApi";
import { replaceCart } from "../../store/cartSlice";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const userData = await loginUser(email, password);
      dispatch(setUser(userData));
      const mergeCartData = await mergeCart(userData.email);
      dispatch(replaceCart(mergeCartData));
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        dispatch(
          setError(
            "Too many failed login attempts. Please wait a few minutes before trying again."
          )
        );
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        dispatch(setError("Incorrect email or password. Please try again."));
      } else {
        dispatch(setError("Something went wrong. Please try again later."));
      }
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
        <div className="flex flex-col items-start space-y-4 w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-normal">Log in to Exclusive</h1>
          <p>Enter your details below</p>
          {error && <p className="text-red-500 w-full">{error}</p>}

          <form className="flex flex-col w-full space-y-4" onSubmit={loginHandler}>
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

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <button
                type="submit"
                className="bg-red-500 text-white w-full md:w-auto py-2 rounded px-12"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>

            <button
              type="button"
              onClick={loginWithGoogleHandler}
              disabled={googleLoading}
              className="flex items-center justify-center space-x-2 border rounded p-2 px-8 w-full"
            >
              <FcGoogle className="w-6 h-6" />
              <span>{googleLoading ? "Signing in..." : "Sign in with Google"}</span>
            </button>
          </form>

          <Link to="/signUp" className="mt-2 text-sm underline">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;