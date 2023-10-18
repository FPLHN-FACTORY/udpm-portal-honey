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
import AddPointCensor from "./pages/censor/addPoin/AddPoint";
import HistoryAddPoint from "./pages/teacher/addpoint/HistoryAddPoint";
import HistoryAddPointCensor from "./pages/censor/addPoin/HistoryAddPoint";
import Club from "./pages/censor/club/Club";
import DetailClub from "./pages/censor/club/DetailGiftClub";
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
import StArchive from "./pages/student/archive/StArchive";
import RandomAddPoint from "./pages/censor/randomaddpoint/RandomAddPoint";
import RequestConversionHistory from "./pages/censor/requestmanager/RequestConversionHistory";
import ChestGift from "./pages/censor/chest-gift/ChestGift";
import AuctionMangement from "./pages/censor/auction-management/AuctionManagement";
import TestTransaction from "./pages/student/transaction/TestTransaction";
import { getToken, setToken } from "./helper/userToken";
import StudentChest from "./pages/student/chest/studentChest";
import ListDataImport from "./pages/censor/randomaddpoint/ListDataImport";
import UpgradeHoney from "./pages/student/upgradeHoney/UpgradeHoney";
import StudentAuctionRoom from "./pages/student/auction/StudentAuctionRoom";
import StudentAuction from "./pages/student/auction/StudentAuction";
import StudentAuctionRoomInside from "./pages/student/auction/StudentAuctionRoomInside";
import RequestApprovedHistory from "./pages/censor/requestmanager/ApproveHistory";
import ListRequest from "./pages/censor/requestmanager/ListRequest";
import LetterDetail from "./pages/student/letters/LetterDetail";
import Letter from "./pages/student/letters/letter";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5YjlmYjdlLTkwNjUtNDEwMi1mMDNjLTA4ZGJjZTY5ZTU5NCIsIm5hbWUiOiJ0xrDhu59uZyBoaWhpIiwiZW1haWwiOiJ0dW9uZ3R2cGgyNjE0OUBmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0xrDhu59uZyBoaWhpIiwicGljdHVyZSI6IkltYWdlcy9EZWZhdWx0LnBuZyIsImlkVHJhaW5pbmdGYWNpbGl0eSI6Ijc5NmE0ZmE0LThhYWItNDJjNC05ZjM1LTg3MGJiMDAwNWFmMSIsImxvY2FsSG9zdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODg4OCIsInJvbGUiOlsiVEVBQ0hFUiIsIlNUVURFTlQiLCJBRE1JTiJdLCJyb2xlTmFtZXMiOlsiR2nhuqNuZyB2acOqbiIsIlNpbmggdmnDqm4iLCJRdeG6o24gdHLhu4sgdmnDqm4iXSwibmJmIjoxNjk3NTUwODY5LCJleHAiOjE3MDAxNDI4NjksImlhdCI6MTY5NzU1MDg2OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDkwNTMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyJ9.zjVKrdOUc5joBysdG2q8TWAppjZEQSCv4M3dz5I-SnU";
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
            {/* <Route
              path="/censor/semester"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Semester />
                  </DashboardCensor>
                </AuthGuard>
              }
            /> */}
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
              path="/censor/club/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DetailClub />
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
              path="/censor/request-manager/approved-history"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestApprovedHistory />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/censor/request-manager/list-request"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ListRequest />
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
            <Route
              path="/censor/preview-import"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ListDataImport />
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
              path="/student/auction-room"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentAuctionRoom />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />

            <Route
              path="/student/auction-room-inside"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentAuctionRoomInside />
                  </DashboardAuthUser>
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
              path="/student/auction"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentAuction />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/upgrade-honey"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <UpgradeHoney />
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
            <Route
              path="/student/letter"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <Letter />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/letter/detail"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <LetterDetail />
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
