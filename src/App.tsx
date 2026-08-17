import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/navigation/AppShell";
import { Skeleton, ToastViewport } from "./components/ui";
import { useAppStore } from "./store/appStore";

const ActivityDetailPage = lazy(() => import("./pages/requester/ActivityDetailPage").then((m) => ({ default: m.ActivityDetailPage })));
const ActivityPage = lazy(() => import("./pages/requester/ActivityPage").then((m) => ({ default: m.ActivityPage })));
const NotificationsPage = lazy(() => import("./pages/requester/NotificationsPage").then((m) => ({ default: m.NotificationsPage })));
const OffersPage = lazy(() => import("./pages/requester/OffersPage").then((m) => ({ default: m.OffersPage })));
const PostErrand = lazy(() => import("./pages/requester/PostErrand").then((m) => ({ default: m.PostErrand })));
const ProfilePage = lazy(() => import("./pages/requester/ProfilePage").then((m) => ({ default: m.ProfilePage })));
const RequesterHome = lazy(() => import("./pages/requester/RequesterHome").then((m) => ({ default: m.RequesterHome })));
const RunnerProfilePage = lazy(() => import("./pages/requester/RunnerProfilePage").then((m) => ({ default: m.RunnerProfilePage })));
const SavedRunnersPage = lazy(() => import("./pages/requester/SavedRunnersPage").then((m) => ({ default: m.SavedRunnersPage })));
const TrackingPage = lazy(() => import("./pages/requester/TrackingPage").then((m) => ({ default: m.TrackingPage })));
const EarningsPage = lazy(() => import("./pages/runner/EarningsPage").then((m) => ({ default: m.EarningsPage })));
const NearbyErrandsPage = lazy(() => import("./pages/runner/NearbyErrandsPage").then((m) => ({ default: m.NearbyErrandsPage })));
const PerformancePage = lazy(() => import("./pages/runner/PerformancePage").then((m) => ({ default: m.PerformancePage })));
const RunnerHome = lazy(() => import("./pages/runner/RunnerHome").then((m) => ({ default: m.RunnerHome })));
const RunnerJobDetailPage = lazy(() => import("./pages/runner/RunnerJobDetailPage").then((m) => ({ default: m.RunnerJobDetailPage })));
const RunnerJobsPage = lazy(() => import("./pages/runner/RunnerJobsPage").then((m) => ({ default: m.RunnerJobsPage })));
const RunnerProfileManagementPage = lazy(() => import("./pages/runner/RunnerProfileManagementPage").then((m) => ({ default: m.RunnerProfileManagementPage })));
const MessagesPage = lazy(() => import("./pages/shared/MessagesPage").then((m) => ({ default: m.MessagesPage })));

function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{document.querySelector(".app-main")?.scrollTo({top:0,behavior:"instant"})},[pathname]);return null}

function RouteFallback(){return <div className="standard-page" style={{display:"flex",flexDirection:"column",gap:12}}><Skeleton style={{height:120,borderRadius:20}}/><Skeleton style={{height:220,borderRadius:20}}/><Skeleton style={{height:80,borderRadius:20}}/></div>}


export default function App(){const {mode,setMode}=useAppStore();const location=useLocation();useEffect(()=>{const isRunner=location.pathname==="/runner"||location.pathname.startsWith("/runner/");if(isRunner&&mode!=="runner")setMode("runner");else if(!isRunner&&mode!=="requester")setMode("requester")},[location.pathname,mode,setMode]);return <><ScrollToTop/><AppShell><Suspense fallback={<RouteFallback/>}><Routes><Route path="/" element={<RequesterHome/>}/><Route path="/post" element={<PostErrand/>}/><Route path="/activity" element={<ActivityPage/>}/><Route path="/activity/:id" element={<ActivityDetailPage/>}/><Route path="/offers/:id" element={<OffersPage/>}/><Route path="/tracking/:id" element={<TrackingPage/>}/><Route path="/messages" element={<MessagesPage/>}/><Route path="/messages/:id" element={<MessagesPage/>}/><Route path="/runners/:id" element={<RunnerProfilePage/>}/><Route path="/saved-runners" element={<SavedRunnersPage/>}/><Route path="/notifications" element={<NotificationsPage/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="/runner" element={<RunnerHome/>}/><Route path="/runner/nearby" element={<NearbyErrandsPage/>}/><Route path="/runner/jobs" element={<RunnerJobsPage/>}/><Route path="/runner/jobs/:id" element={<RunnerJobDetailPage/>}/><Route path="/runner/messages" element={<MessagesPage runnerMode/>}/><Route path="/runner/messages/:id" element={<MessagesPage runnerMode/>}/><Route path="/runner/earnings" element={<EarningsPage/>}/><Route path="/runner/performance" element={<PerformancePage/>}/><Route path="/runner/profile" element={<RunnerProfileManagementPage/>}/><Route path="*" element={<Navigate to={mode==="runner"?"/runner":"/"} replace/>}/></Routes></Suspense></AppShell><ToastViewport/></>}
