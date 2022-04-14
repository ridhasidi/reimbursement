import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import { setDataError } from "../store/actionCreators/dataActions";
import { readUser, updateSuccess, updateUser } from "../store/actionCreators/userActions";
export default function EditProfileForm() {
  const { user, error } = useSelector((state) => state.usersReducers);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [bankAccount, setBankAccount] = useState(user.bankAccount);
  const dispatch = useDispatch();
  const readName = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const readBankAccount = (e) => {
    const { value } = e.target;
    setBankAccount(value);
  };

  useEffect(() => {
    dispatch(readUser(localStorage.getItem("id"), localStorage.getItem("access_token")));
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    const input = {
      name,
      bankAccount,
    };
    try {
      setLoading(true);
      const { data } = await updateUser(localStorage.getItem("id"), localStorage.getItem("access_token"), input);
      dispatch(updateSuccess(data));
      dispatch(readUser(localStorage.getItem("id"), localStorage.getItem("access_token")));
      setLoading(false);
    } catch (error) {
      dispatch(setDataError(error));
    }
  };

  if (error) {
    return <ErrorPage error={error.message} />;
  } else if (loading || !user) {
    return <LoadingPage />;
  } else {
    return (
      <div className=" lg:w-3/4 xl:w-1/3">
        <div className="mt-7">
          <h1 className="text-center text-xl font-semibold">Profile</h1>
        </div>
        <form className="grow w-full mt-3" onSubmit={submit}>
          <div className="mb-2">
            <label>Name</label>
            <input className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" type="text" value={name} onChange={readName} />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" type="email" disabled value={email} />
          </div>
          <div className="mb-2">
            <label>Bank Account</label>
            <input className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" type="text" value={bankAccount} onChange={readBankAccount} />
          </div>
          <div className="flex items-baseline justify-end">
            <button className="px-6 py-2 mt-4 text-white bg-sky-500 rounded-md hover:bg-sky-600">UPDATE</button>
          </div>
        </form>
      </div>
    );
  }
}
