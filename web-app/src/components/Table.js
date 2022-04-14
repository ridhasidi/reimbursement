import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/actionCreators/dataActions";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

export default function Table() {
  const { data, loading, error } = useSelector((state) => state.dataReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjQ5ODYxNjA4fQ.XaOAO_dBE_lzQ87Jmui7VduuGHlx7_0UOp8Mr3CqKfM"));
  }, [dispatch]);
  // const user = localStorage.getItem("role")
  // const user = "employee";
  console.log(data, loading, error);
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage error={error.message} />;
  }
  return (
    <>
      <div className="mt-7">
        <h1 className="text-center text-xl font-semibold">Reimbursements</h1>
      </div>
      <div className="grow w-full mt-3">
        <table className="w-full text-center border-collapse border border-slate-300">
          <thead className="bg-sky-600 text-amber-50">
            <tr>
              <th className="py-1 border border-slate-300">No</th>
              <th className="py-1 border border-slate-300">Date of Purchase</th>
              <th className="py-1 border border-slate-300">Description</th>
              <th className="py-1 border border-slate-300">Amount</th>
              <th className="py-1 border border-slate-300">Receipt</th>
              <th className="py-1 border border-slate-300">Employee</th>
              <th className="py-1 border border-slate-300">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" border border-slate-300">1</td>
              <td className=" border border-slate-300">11-02-2022</td>
              <td className=" border border-slate-300">Pembayaran A</td>
              <td className=" border border-slate-300">150000</td>
              <td className=" border border-slate-300">
                <button className="bg-blue-300 px-2 rounded text-sm">Show</button>
              </td>
              <td className=" border border-slate-300">David S</td>
              <td className=" border border-slate-300">Submitted</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
