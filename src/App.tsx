import { Button } from "./components/ui/Button";
import { styles } from "./App.styles";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AccountsProvider, useAccounts } from "./contexts/AccountsContext";
import { AppLayout } from "./layouts/AppLayout";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FolderPage } from "./pages/FolderPage";
function SessionGate() {
  const { initial, initialError, restore } = useAccounts();
  if (initial)
    return (
      <div className={styles["splash"]} role="status">
        Organizando seu espaço…
      </div>
    );
  if (initialError)
    return (
      <div className={styles["splash"]}>
        <p role="alert">{initialError}</p>
        <Button variant="primary" onClick={() => void restore()}>
          Tentar novamente
        </Button>
      </div>
    );
  return <Outlet />;
}
function Protected() {
  const { user } = useAccounts();
  return user ? <AppLayout /> : <Navigate to="/login" replace />;
}
function Guest({ register = false }: { register?: boolean }) {
  const { user } = useAccounts();
  return user ? (
    <Navigate to="/contas" replace />
  ) : (
    <AuthPage key={String(register)} register={register} />
  );
}
export function App() {
  return (
    <BrowserRouter>
      <AccountsProvider>
        <Routes>
          <Route element={<SessionGate />}>
            <Route path="/login" element={<Guest />} />
            <Route path="/cadastro" element={<Guest register />} />
            <Route element={<Protected />}>
              <Route path="/contas" element={<DashboardPage />} />
              <Route path="/contas/:id" element={<FolderPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/contas" replace />} />
          </Route>
        </Routes>
      </AccountsProvider>
    </BrowserRouter>
  );
}
