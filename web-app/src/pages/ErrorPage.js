export default function ErrorPage({ error }) {
  return (
    <div className="grow flex flex-col mt-3 justify-center items-center bg-white px-8 drop-shadow-lg rounded-md">
      <p>Ooops.....</p>
      <p>Something went wrong</p>
      <p className="text-sm">Error: {error}</p>
    </div>
  );
}
