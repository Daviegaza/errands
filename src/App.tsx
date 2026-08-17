import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/navigation/AppShell";
import { ToastViewport } from "./components/ui";
import { ActivityDetailPage } from "./pages/requester/ActivityDetailPage";
import { ActivityPage } from "./pages/requester/ActivityPage";
import { NotificationsPage } from "./pages/requester/NotificationsPage";
import { OffersPage } from "./pages/requester/OffersPage";
import { PostErrand } from "./pages/requester/PostErrand";
import { ProfilePage } from "./pages/requester/ProfilePage";
import { RequesterHome } from "./pages/requester/RequesterHome";
import { RunnerProfilePage } from "./pages/requester/RunnerProfilePage";
import { SavedRunnersPage } from "./pages/requester/SavedRunnersPage";
import { TrackingPage } from "./pages/requester/TrackingPage";
import { EarningsPage } from "./pages/runner/EarningsPage";
import { NearbyErrandsPage } from "./pages/runner/NearbyErrandsPage";
import { PerformancePage } from "./pages/runner/PerformancePage";
import { RunnerHome } from "./pages/runner/RunnerHome";
import { RunnerJobDetailPage } from "./pages/runner/RunnerJobDetailPage";
import { RunnerJobsPage } from "./pages/runner/RunnerJobsPage";
import { RunnerProfileManagementPage } from "./pages/runner/RunnerProfileManagementPage";
import { MessagesPage } from "./pages/shared/MessagesPage";
import { useAppStore } from "./store/appStore";

function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{document.querySelector(".app-main")?.scrollTo({top:0,behavior:"instant"})},[pathname]);return null}

export default function App(){const {mode,setMode}=useAppStore();const location=useLocation();useEffect(()=>{if(location.pathname.startsWith("/runner")&&mode!=="runner")setMode("runner");else if(!location.pathname.startsWith("/runner")&&mode!=="requester")setMode("requester")},[location.pathname,mode,setMode]);return <><ScrollToTop/><AppShell><Routes><Route path="/" element={<RequesterHome/>}/><Route path="/post" element={<PostErrand/>}/><Route path="/activity" element={<ActivityPage/>}/><Route path="/activity/:id" element={<ActivityDetailPage/>}/><Route path="/offers/:id" element={<OffersPage/>}/><Route path="/tracking/:id" element={<TrackingPage/>}/><Route path="/messages" element={<MessagesPage/>}/><Route path="/messages/:id" element={<MessagesPage/>}/><Route path="/runners/:id" element={<RunnerProfilePage/>}/><Route path="/saved-runners" element={<SavedRunnersPage/>}/><Route path="/notifications" element={<NotificationsPage/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="/runner" element={<RunnerHome/>}/><Route path="/runner/nearby" element={<NearbyErrandsPage/>}/><Route path="/runner/jobs" element={<RunnerJobsPage/>}/><Route path="/runner/jobs/:id" element={<RunnerJobDetailPage/>}/><Route path="/runner/messages" element={<MessagesPage runnerMode/>}/><Route path="/runner/messages/:id" element={<MessagesPage runnerMode/>}/><Route path="/runner/earnings" element={<EarningsPage/>}/><Route path="/runner/performance" element={<PerformancePage/>}/><Route path="/runner/profile" element={<RunnerProfileManagementPage/>}/><Route path="*" element={<Navigate to={mode==="runner"?"/runner":"/"} replace/>}/></Routes></AppShell><ToastViewport/></>}
