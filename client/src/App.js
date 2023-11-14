import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import { Suspense, useEffect, useState } from "react";
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
import ListRequestAddPoint from "./pages/teacher/addpoint/ListRequestAddPoint";
import RequestAddPoint from "./pages/censor/requestmanager/RequestAddPoint";
import RequestManagerDetail from "./pages/censor/requestmanager/RequestManagerDetail";
import Semester from "./pages/censor/semester";
import ConversionHome from "./pages/censor/convertion/convertionHome";
import IndexGift from "./pages/censor/gift/indexGift";
import AddRequestConversion from "./pages/student/RequestConversion/AddRequestConversion";
import TransactionPage from "./pages/student/transaction/TransactionPage";
import DashboardTeacher from "./layout/teacher/DashboardTeacher";
import MyProfile from "./pages/student/profile/MyProfile";
import StArchive from "./pages/student/archive/StArchive";
import RandomAddPoint from "./pages/censor/randomaddpoint/RandomAddPoint";
// import RequestConversionHistory from "./pages/censor/requestmanager/RequestConversionHistory";
import ChestGift from "./pages/censor/chest-gift/ChestGift";
import AuctionMangement from "./pages/censor/auction-management/AuctionManagement";
import TestTransaction from "./pages/student/transaction/TestTransaction";
import { deleteToken, getToken, setToken } from "./helper/userToken";
import ListDataImport from "./pages/censor/randomaddpoint/ListDataImport";
import UpgradeHoney from "./pages/student/upgradeHoney/UpgradeHoney";
import ConvertionHoney from "./pages/teacher/convertion-honey/RequestConversion";
import TeacherRequestConversionHistory from "./pages/teacher/convertion-honey/RequestConversionHistory";
import LetterDetail from "./pages/student/letters/LetterDetail";
import Letter from "./pages/student/letters/letter";
import UpgradeRate from "./pages/censor/upgrade-rate/upgrade-rate";
import Shop from "./pages/student/shop/Shop";
import StudentAuctionRoomNew from "./pages/student/auction/StudentAuctionRoomNew";
import ChestIndex from "./pages/student/chest/ChestIndex";
import UpgrateHoneyIndex from "./pages/student/upgradeHoney/UpgrateHoneyIndex";
import StudentHistory from "./pages/student/history/StudentHistory";
import StudentRequest from "./pages/student/history/StudentRequest";
import TabsRequest from "./pages/censor/requestmanager/TabsRequest";
import ListHistory from "./pages/censor/requestmanager/ListHistory";
import DashboardPresident from "./layout/president/DashboardPresident";
import AddItem from "./pages/president/add-item/AddItem";
import HonorsStudent from "./pages/student/honors/HonorsStudent";
import TopStudent from "./pages/student/honors/TopStudent";
import { SelectLoading } from "./app/reducers/loading/loading.reducer";
import { useAppSelector } from "./app/hooks";
import Login from "./pages/login/Login";
import AuthorSwitch from "./pages/login/AuthorSwitch";

function App() {
  const data = useAppSelector(SelectLoading);
  return (
    <div className="App scroll-smooth md:scroll-auto font-sans">
      {data && <GlobalLoading />}

      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/layout-guard-roles" element={<NotAuthorized />} />
            <Route
              path="/"
              element={<Navigate replace to="/author-switch" />}
            />
            {/* Chọn quyền */}
            <Route
              path="/author-switch"
              element={
                  <AuthorSwitch></AuthorSwitch>
              }
            />
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
            {/* <Route
              path="/censor/request-buy-gift/history"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <RequestConversionHistory />
                  </DashboardCensor>
                </AuthGuard>
              }
            /> */}
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
              path="/censor/request-manager"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <TabsRequest />
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
                    <ListHistory />
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
            <Route
              path="/censor/upgrade-rate"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <UpgradeRate />
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
              path="/teacher/request-conversion/history"
              element={
                <AuthGuard>
                  <DashboardTeacher>
                    <TeacherRequestConversionHistory />
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
                    <StudentHistory />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/history"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentHistory />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/request"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentRequest />
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
              path="/student/buy-gift"
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
                    <ChestIndex />
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
              path="/student/auction-new"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <StudentAuctionRoomNew />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/upgrade-honey"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <UpgrateHoneyIndex />
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
              path="/student/letter/detail/:id"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <LetterDetail />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/shop"
              element={
                <AuthGuard>
                  <DashboardAuthUser>
                    <Shop />
                  </DashboardAuthUser>
                </AuthGuard>
              }
            />
            <Route
              path="/student/honor-student"
              element={
                <AuthGuard>
                  {/* <DashboardAuthUser> */}
                  <HonorsStudent />
                  {/* </DashboardAuthUser> */}
                </AuthGuard>
              }
            />
            <Route
              path="/student/top-student"
              element={
                <AuthGuard>
                  {/* <DashboardAuthUser> */}
                  <TopStudent />
                  {/* </DashboardAuthUser> */}
                </AuthGuard>
              }
            />
            {/* Màn president */}
            <Route
              path="/president/add-item"
              element={
                <AuthGuard>
                  <DashboardPresident>
                    <AddItem />
                  </DashboardPresident>
                </AuthGuard>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
