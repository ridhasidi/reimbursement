import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setDataLoading, setUpdateStatusError, updateStatus } from "../store/actionCreators/dataActions";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import { Link } from "react-router-dom";

export default function Table() {
  const { data, loading, error, errorUpdate } = useSelector((state) => state.dataReducer);
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
  const role = localStorage.getItem("role");
  const accept = async (id, StatusId) => {
    if (StatusId === 3) {
      dispatch(setUpdateStatusError("Status is already 'Completed'"));
    } else if (StatusId === 4) {
      dispatch(setUpdateStatusError("Status is already 'Rejected'"));
    } else if (StatusId === 2) {
      dispatch(setUpdateStatusError("Status is already 'On Progress'"));
    } else {
      try {
        dispatch(setDataLoading(true));
        await updateStatus({
          id,
          StatusId: 2,
          access_token,
        });
        dispatch(fetchData(access_token));
      } catch (error) {
        dispatch(setUpdateStatusError(error.data.message));
      }
    }
  };

  const reject = async (id, StatusId) => {
    if (StatusId === 3) {
      dispatch(setUpdateStatusError("Status is already 'Completed'"));
    } else if (StatusId === 4) {
      dispatch(setUpdateStatusError("Status is already 'Rejected'"));
    } else {
      try {
        dispatch(setDataLoading(true));
        await updateStatus({
          id,
          StatusId: 4,
          access_token,
        });
        dispatch(fetchData(access_token));
      } catch (error) {
        dispatch(setUpdateStatusError(error.data.message));
      }
    }
  };

  const complete = async (id, StatusId) => {
    if (StatusId !== 2) {
      dispatch(setUpdateStatusError("Status must be 'On Progress'"));
    } else {
      try {
        dispatch(setDataLoading(true));
        await updateStatus({
          id,
          StatusId: 3,
          access_token,
        });
        dispatch(fetchData(access_token));
      } catch (error) {
        dispatch(setUpdateStatusError(error.data.message));
      }
    }
  };

  if (errorUpdate) {
    console.log(errorUpdate);
  }
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
              {role === "admin" ? (
                <>
                  <th className="py-1 border border-slate-300">Accept</th>
                  <th className="py-1 border border-slate-300">Reject</th>
                  <th className="py-1 border border-slate-300">Completed</th>
                </>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((e, index) => {
              return (
                <tr key={e.id}>
                  <td className="p-1 border border-slate-300">{index + 1}</td>
                  <td className="p-1 border border-slate-300">{e.dateOfPurchase.split("T")[0]}</td>
                  <td className="p-1 border border-slate-300">{e.description}</td>
                  <td className="p-1 border border-slate-300">{convertCurrency(e.amount)}</td>
                  <td className="p-1 border border-slate-300">
                    <Link to={`receipt/${e.id}`} state={e} className="bg-blue-300 hover:bg-blue-400 py-1 px-2 my-1 rounded text-sm">
                      Show
                    </Link>
                  </td>
                  <td className="p-1  border border-slate-300">{e.User.name}</td>
                  <td className="p-1  border border-slate-300">{e.Status.name}</td>
                  {role === "admin" ? (
                    <>
                      <td className="py-1 px-1 border border-slate-300">
                        {" "}
                        <button className="bg-green-300 hover:bg-green-400 py-1 px-2 rounded text-sm" onClick={() => accept(e.id, e.StatusId)}>
                          Accept
                        </button>
                      </td>
                      <td className="py-1 px-1 border border-slate-300">
                        <button className="bg-rose-300 hover:bg-rose-400 py-1 px-2 rounded text-sm" onClick={() => reject(e.id, e.StatusId)}>
                          Reject
                        </button>
                      </td>
                      <td className="py-1 px-1 border border-slate-300">
                        <button className="bg-violet-300 hover:bg-violet-400 py-1 px-2 rounded text-sm" onClick={() => complete(e.id, e.StatusId)}>
                          Completed
                        </button>
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
