import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";


export const FaultFixerApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
