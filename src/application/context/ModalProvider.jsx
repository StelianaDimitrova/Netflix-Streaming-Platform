import { useState } from "react";
import { ModalContext } from "./ModalContext";
import MediaModal from "../../presentation/components/modal/MediaModal";

export default function ModalProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  function openModal(movie) {
    console.log("Opening modal for movie:", movie);
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  return (
    <ModalContext.Provider value={{ selectedMovie, openModal, closeModal }}>
      {children}
      <MediaModal />
    </ModalContext.Provider>
  );
}
