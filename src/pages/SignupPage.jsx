import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const [ submitting, setSubmitting ] = useState(false)

  const { username, password, passwordConf } = formData;

  function handleChange(event){
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }


  async function handleSubmit(event){
    event.preventDefault();
    try {
      setSubmitting(true)
      await signUp(formData);
      navigate('/sign-in')
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false)
    }
  }

  function isFormInvalid(){
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="page narrow-page">
      <div className="page-title"> 
      <h1>Sign Up</h1>
      </div>
      {error && <p className="error-box">{error}</p>}
      <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-row sign-button">
          <button className="button main-button" disabled={isFormInvalid() || submitting}>{submitting ? 'Signing up...' : 'Sign Up'}</button>
          <button className="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
      </div>
    </main>
  );
}
export default Signup;
