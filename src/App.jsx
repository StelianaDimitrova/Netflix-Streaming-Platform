import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./presentation/layouts/MainLayout";
import ModalProvider from "./application/context/ModalProvider";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <MainLayout />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
