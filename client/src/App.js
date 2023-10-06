import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import { Suspense, useEffect } from "react";
import NotFound from "./pages/404";
import NotAuthorized from "./pages/401";
import AuthGuard from "./guard/AuthGuard";
import DashboardCensor from "./layout/censor/DashboardCensor";
import GlobalLoading from "./components/global-loading/GlobalLoading";
import DashboardAuthUser from "./layout/student/auth/DashboardAuthUser";
import Index from "./pages/censor/category";
import AddPoint from "./pages/teacher/addpoint/AddPoint";
import HistoryAddPoint from "./pages/teacher/addpoint/HistoryAddPoint";
import AddPointCensor from "./pages/censor/addPoin/AddPoint";
import HistoryAddPointCensor from "./pages/censor/addPoin/HistoryAddPoint";
import Club from "./pages/censor/club/indexClub";
import ListRequestAddPoint from "./pages/teacher/addpoint/ListRequestAddPoint";
import RequestAddPoint from "./pages/censor/requestmanager/RequestAddPoint";
import RequestManager from "./pages/censor/requestmanager/RequestManager";
import RequestManagerDetail from "./pages/censor/requestmanager/RequestManagerDetail";
import Semester from "./pages/censor/semester";
import ConversionHome from "./pages/censor/convertion/convertionHome";
import IndexGift from "./pages/censor/gift/indexGift";
import AddRequestConversion from "./pages/student/RequestConversion/AddRequestConversion";
import AddRequestConversionHistory from "./pages/student/RequestConversion/AddRequestConversionHistory";
import TransactionPage from "./pages/student/transaction/TransactionPage";
import RequestTransaction from "./pages/censor/requestmanager/RequestTransaction";
import DashboardTeacher from "./layout/teacher/DashboardTeacher";
import MyProfile from "./pages/student/profile/MyProfile";
import ConvertionHoney from "./pages/teacher/convertion-honey/Index";
import GiftStudent from "./pages/teacher/giftstudent/GiftStudent";
import StArchive from "./pages/student/archive/StArchive";
import RandomAddPoint from "./pages/censor/randomaddpoint/RandomAddPoint";
import RequestConversionHistory from "./pages/censor/requestmanager/RequestConversionHistory";
import ChestGift from "./pages/censor/chest-gift/ChestGift";
import AuctionMangement from "./pages/censor/auction-management/AuctionManagement";
import TestTransaction from "./pages/student/transaction/TestTransaction";
import { getToken, setToken } from "./helper/userToken";
import { connectStompClient } from "./helper/stomp-client/config";
import StudentChest from "./pages/student/chest/studentChest";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0Y2YyMWY0LWYzZTAtNDkwZS1iMWNjLTA4ZGJiNzQzZGQ3ZCIsIm5hbWUiOiJUcmlldSBWYW4gVHVvbmcgUEggMiA2IDEgNCA5IiwiZW1haWwiOiJ0dW9uZ3R2cGgyNjE0OUBmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0dW9uZ3R2cGgyNjE0OSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMU0hTd1cxb3B2ZVRzTjI4RGdHS0pLSWNYekpsY3hJd090c0VfbGZsZjk4SXc9czk2LWMiLCJpZFRyYWluaW5nRmFjaWxpdHkiOiI3OTZhNGZhNC04YWFiLTQyYzQtOWYzNS04NzBiYjAwMDVhZjEiLCJsb2NhbEhvc3QiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgiLCJyb2xlIjoiQURNSU4iLCJyb2xlTmFtZXMiOiJRdeG6o24gdHLhu4sgdmnDqm4iLCJuYmYiOjE2OTUwMzA5NjksImV4cCI6MTc2ODY0Mzc2OSwiaWF0IjoxNjk1MDMwOTY5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ5MDUzIn0.Zxmp3Ax5QVp2PK3b5BNfhcgs7c9bbWCYGF6R0QExd5s";
  if (!getToken()) {
    setToken(token);
  }
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
            <Route
              path="/censor/request-conversion/history"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestConversionHistory />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/semester"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Semester />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/conversion"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ConversionHome />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/gift"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <IndexGift />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/add-point"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddPointCensor />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/add-point/history"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <HistoryAddPointCensor />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/club"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Club />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/request-manager"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestManager />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/request-manager/add-point"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestAddPoint />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/request-manager/transaction"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestTransaction />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/request-manager/detail/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestManagerDetail />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/chest"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ChestGift />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/request-manager/random-add-point"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RandomAddPoint />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            {/* Màn teacher */}
            <Route
              path="/teacher/add-point"
              element={
                <AuthGuard>
                  <DashboardTeacher>
                    <AddPoint />
                  </DashboardTeacher>
                </AuthGuard>
              }
            />
            <Route
              path="/teacher/add-point/history"
              element={
                <AuthGuard>
                  <DashboardTeacher>
                    <HistoryAddPoint />
                  </DashboardTeacher>
                </AuthGuard>
              }
            />
            <Route
              path="/teacher/add-point/list-request"
              element={
                <AuthGuard>
                  <DashboardTeacher>
                    <ListRequestAddPoint />
                  </DashboardTeacher>
                </AuthGuard>
              }
            />
            <Route
              path="/teacher/convertion-honey"
              element={
                <AuthGuard>
                  <DashboardTeacher>
                    <ConvertionHoney />
                  </DashboardTeacher>
                </AuthGuard>
              }
            />
            <Route
              path="/teacher/list-students"
              element={
                <AuthGuard>
                  <DashboardTeacher>
                    <GiftStudent />
                  </DashboardTeacher>
                </AuthGuard>
              }
            />
            {/* Màn sinh viên */}
            <Route
              path="/student/"
              element={
                <AuthGuard>
                  <DashboardAuthUser></DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/create-conversion/history"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <AddRequestConversionHistory />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/transaction"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <TestTransaction />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/create-conversion"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <AddRequestConversion />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/transaction/create"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <TransactionPage />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/chest"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentChest />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/profile"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <MyProfile />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/archive"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StArchive />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/auction-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AuctionMangement />
                  </DashboardCensor>
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
