import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import { Suspense } from "react";
import NotFound from "./pages/404";
import NotAuthorized from "./pages/401";
import AuthGuard from "./guard/AuthGuard";
import DashboardCensor from "./layout/censor/DashboardCensor";
import GlobalLoading from "./components/global-loading/GlobalLoading";
import DashboardAuthUser from "./layout/censor/DashboardCensor";
import Index from "./pages/censor/category";
import AddPoint from "./pages/teacher/addpoint/AddPoint";
import HistoryAddPoint from "./pages/teacher/addpoint/HistoryAddPoint";

function App() {
  return (
    <div className="App scroll-smooth md:scroll-auto font-sans">
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/layout-guard-roles" element={<NotAuthorized />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            {/* Màn censor */}
            <Route
              path=""
              element={
                <AuthGuard>
                  <DashboardCensor></DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/category"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Index />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            {/* Màn teacher */}
            <Route
              path="/teacher/add-point"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <AddPoint />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/teacher/add-point/history"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <HistoryAddPoint />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
