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
  const loginWithGoogleHanadler = async () => {
    const res = await loginWithGoogle();
    if (res.error) {
      alert("Google login failed: " + res.error.message);
    } else {
      console.log("Logged in with Google:", res);
    }
    navigate("/home");
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex justify-center my-16 w-full">
        <img
          className="w-full h-full object-cover"
          src={loginImage}
          alt="loginimage"
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col items-start space-y-4 mr-32">
          <h1 className="text-4xl font-normal">Log in to Exclusive</h1>
          <p>Enter your details below</p>
          {error && <p className="text-red-500 w-72">{error}</p>}
          <form
            className="flex flex-col w-96 space-y-4"
            onSubmit={loginHandler}
          >
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
            <div className="flex items-center space-x-32">
              <button
                type="submit"
                className="bg-red-500 text-white w-36 py-2 rounded px-8"
              >
                {loading ? "Loggin in..." : "Log in"}
              </button>
            </div>
            <button
              type="button"
              onClick={loginWithGoogleHanadler}
              className="flex items-center justify-center space-x-2 border rounded p-2 px-8"
            >
              <FcGoogle className="w-6 h-6" />
              <span>Signin with Google</span>
            </button>
          </form>
          {/* i can remove it and add it in mainnavigation */}
          <Link to="/signUp">Create new account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
