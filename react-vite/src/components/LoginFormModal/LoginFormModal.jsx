import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const demoUserLogin = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      sessionActions.thunkLogin({ email: "demo@aa.io", password: "password" })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-modal">
      <h2 className="login-modal-header">Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Email
          <input
            className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="login-error">{errors.email}</p>}
        <label className="login-label">
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="login-error">{errors.password}</p>}
        <button className="login-button" type="submit">
          Log In
        </button>
      </form>
      <button className="demo-button" onClick={demoUserLogin}>
        Log In as Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
