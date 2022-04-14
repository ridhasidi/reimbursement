import SideBar from "../components/SideBar";
import Table from "../components/Table";

export default function HomePage() {
  // const user = localStorage.getItem("role")
  // const user = "employee";
  return (
    <section className="flex flex-row items-center justify-center min-h-screen bg-sky-300 items-stretch">
      <SideBar />
      <div className="grow flex flex-col bg-sky-50 min-h-full w-full px-16 py-10">
        <div>
          <h1 className="text-center text-3xl font-bold text-sky-700">Dashboard</h1>
        </div>
        <div className="grow flex flex-col mt-3 justify-center bg-white px-8 drop-shadow-lg rounded-md">
          <Table />
        </div>
        {/* {}
         */}
      </div>
    </section>
  );
}
