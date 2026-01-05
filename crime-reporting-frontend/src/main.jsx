import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { RoleProvider } from "./Context/RoleContext.jsx";
import { MissingPersonsProvider } from "./Context/MissingContext.jsx";
import { CrimeProvider } from "./Context/CrimeContext.jsx";
import { EvidenceProvider } from "./Context/EvidenceContext.jsx";
import { AdminProvider } from "./Context/AdminContext.jsx";
import { PoliceProvider } from "./Context/PoliceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <CrimeProvider>
            <MissingPersonsProvider>
              <EvidenceProvider>
                  <PoliceProvider>
                    <App />
                  </PoliceProvider>
              </EvidenceProvider>
            </MissingPersonsProvider>
          </CrimeProvider>
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
