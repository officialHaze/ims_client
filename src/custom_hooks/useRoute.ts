import { useLocation } from "react-router-dom";

export default function useRoute() {
  const location = useLocation();
  return location.pathname;
}
