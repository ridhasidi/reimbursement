import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { createData, setDataError, createDataSuccess } from "../store/actionCreators/dataActions";
export default function CreateReimbursement() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [file, setFile] = useState("");

  const readDate = (e) => {
    const { value } = e.target;
    setDateOfPurchase(value);
  };
  const readDesc = (e) => {
    const { value } = e.target;
    setDescription(value);
  };
  const readAmount = (e) => {
    const { value } = e.target;
    setAmount(value);
  };
  const readFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const create = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dateOfPurchase", dateOfPurchase);
    formData.append("description", description);
    formData.append("amount", +amount);
    formData.append("receipt", file);
    try {
      setLoading(true);
      const { data } = await createData(formData, localStorage.getItem("access_token"));
      dispatch(createDataSuccess(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      dispatch(setDataError(error.data.message));
    }
  };
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="md:w-3/4 lg:w-1/2 xl:w-1/3">
      <div className="mt-7">
        <h1 className="text-center text-xl font-semibold">Create Reimbursement</h1>
      </div>
      <form className="grow w-full mt-3" encType="multipart/form-data" onSubmit={create}>
        <div className="mb-2">
          <label>Date of Purchase</label>
          <input type="date" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" value={dateOfPurchase} onChange={readDate} />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" value={description} onChange={readDesc}></textarea>
        </div>
        <div className="mb-2">
          <label>Amount</label>
          <input type="number" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" value={amount} onChange={readAmount} />
        </div>
        <div className="mb-2">
          <label>Receipt</label>
          <input type="file" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-300" onChange={readFile} />
        </div>
        <div className="flex items-baseline justify-end">
          <button className="px-6 py-2 mt-4 text-white bg-sky-500 rounded-md hover:bg-sky-600">CREATE</button>
        </div>
      </form>
    </div>
  );
}
