import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "../src/components/contexts/ThemeContext";
import "./theme.css";

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
