import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SkillBrowsePage } from "./pages/SkillBrowsePage";
import { PartnerDiscoveryPage } from "./pages/PartnerDiscoveryPage";
import { ChatPage } from "./pages/ChatPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ResumeBuilderPage } from "./pages/ResumeBuilderPage";
import { VideoCallPage } from "./pages/VideoCallPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "profile/:userId?", Component: ProfilePage },
      { path: "skills", Component: SkillBrowsePage },
      { path: "partners", Component: PartnerDiscoveryPage },
      { path: "chat/:partnerId?", Component: ChatPage },
      { path: "portfolio/:userId?", Component: PortfolioPage },
      { path: "resume", Component: ResumeBuilderPage },
      { path: "video-call/:partnerId", Component: VideoCallPage },
      { path: "admin", Component: AdminPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);