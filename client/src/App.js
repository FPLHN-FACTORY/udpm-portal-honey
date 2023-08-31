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
import Index from "./pages/teacher/changepoint/Index";
import ChangePoint from "./pages/teacher/changepoint/ChangePoint";
import ApprovalPoint from "./pages/censor/approvalpoint/ApprovalPoint";
import DashboardAuthUser from "./layout/censor/DashboardCensor";
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
            {/* <Route
              path="/censor/category"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Index />
                  </DashboardCensor>
                </AuthGuard>
              }
            /> */}

            <Route
              path="/censor/approval-point"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ApprovalPoint />
                  </DashboardCensor>
                </AuthGuard>
              }
            />

            {/* Màn teacher */}
            <Route
              path="/teacher/change-point"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <Index />
                    <ChangePoint></ChangePoint>
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
