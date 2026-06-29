// App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "../src/components/contexts/ThemeContext";
import { AuthProvider } from "./auth/AuthContext";
import "./theme.css";

console.log("📱 [App.tsx] Renderizando App...");

function App() {
    console.log("🏗️ [App] Renderizando com AuthProvider");
    return (
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <AppRoutes />
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

