import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/actionCreators/dataActions";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

export default function Table() {
  const { data, loading, error } = useSelector((state) => state.dataReducer);
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(access_token));
  }, [dispatch, access_token]);
  const convertCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
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
            {data.map((e, index) => {
              return (
                <tr key={e.id}>
                  <td className=" border border-slate-300">{index + 1}</td>
                  <td className=" border border-slate-300">{e.dateOfPurchase.split("T")[0]}</td>
                  <td className=" border border-slate-300">{e.description}</td>
                  <td className=" border border-slate-300">{convertCurrency(e.amount)}</td>
                  <td className=" border border-slate-300">
                    <button className="bg-blue-300 px-2 rounded text-sm">Show</button>
                  </td>
                  <td className=" border border-slate-300">{e.User.name}</td>
                  <td className=" border border-slate-300">{e.Status.name}</td>
                </tr>
              );
            })}
            {/* <tr>
              <td className=" border border-slate-300">1</td>
              <td className=" border border-slate-300">11-02-2022</td>
              <td className=" border border-slate-300">Pembayaran A</td>
              <td className=" border border-slate-300">150000</td>
              <td className=" border border-slate-300">
                <button className="bg-blue-300 px-2 rounded text-sm">Show</button>
              </td>
              <td className=" border border-slate-300">David S</td>
              <td className=" border border-slate-300">Submitted</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
