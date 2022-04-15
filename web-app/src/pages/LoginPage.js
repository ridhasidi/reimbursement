import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login, loginSuccess, setLoginError } from "../store/actionCreators/userActions";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const readEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const readPassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const submit = async (e) => {
    e.preventDefault();
    const input = { email, password };
    try {
      const { data } = await login(input);
      localStorage.setItem("access_token", data["access_token"]);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(setLoginError(error));
    }
  };

  if (localStorage.getItem("access_token")) {
    return <Navigate to="/" />;
  }
  return (
    <section className="flex min-h-screen bg-gray-200 justify-center items-center">
      <div className="p-4 bg-white  rounded-md md:w-1/3 lg:w-1/4 drop-shadow-lg">
        <h1 className="text-sky-800 text-center text-2xl mb-5">LOG IN</h1>
        <form onSubmit={submit}>
          <div className="mb-2">
            <input type="text" placeholder="Email" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" value={email} onChange={readEmail} />
          </div>
          <div className="mb-2">
            <input type="password" placeholder="Password" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" value={password} onChange={readPassword} />
          </div>
          <div className="flex items-baseline justify-end">
            <button className="px-6 py-2 mt-4 text-white bg-sky-500 rounded-md hover:bg-sky-600">LOG IN</button>
          </div>
        </form>
      </div>
    </section>
  );
}
