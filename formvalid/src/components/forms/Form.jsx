import { useState, useEffect } from "react";
import "./Form.css";
import toast from "react-hot-toast";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(username, password));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(username, password);
      toast.success("Signed in successfully");
    }
  }, [formErrors, isSubmit, username, password]);

  const validate = (username, password) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!username) {
      errors.username = "Username is required!";
    } else if (!regex.test(username)) {
      errors.username = "This is not a valid username!";
    }
    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(formErrors, undefined, 2)}</pre>

      <form onSubmit={handleSubmit}>
        <div className="ui form">
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={usernameChangeHandler}
              placeholder="Enter your name"
              type="text"
            />
          </div>
          <p>{formErrors.username}</p>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              id="password"
              type="password"
              onChange={passwordChangeHandler}
              placeholder="Enter your password"
            />
          </div>
          <p>{formErrors.password}</p>

          <div>
            <button className="fluid ui button blue" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;