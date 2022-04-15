import { useLocation } from "react-router-dom";
export default function Receipt() {
  const { state } = useLocation();
  return (
    <div>
      <img className="max-h-screen my-2" src={state.receipt.replace(".pdf", ".jpg")} alt={`receipt-${state.id}`} />
    </div>
  );
}
