import { useState } from "react";

// Hook for handling navigation between grid and detail
export default function useMenuNavigation(initialPage = "grid") {
  const [page, setPage] = useState(initialPage);
  const [selected, setSelected] = useState(null);

  const goToDetail = (idx) => {
    setSelected(idx);
    setPage("detail");
  };
  const goToGrid = () => {
    setSelected(null);
    setPage("grid");
  };

  return { page, selected, goToDetail, goToGrid };
}
