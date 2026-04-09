import { createBrowserRouter } from "react-router";
import { HomePage } from "@/app/pages/HomePage";
import { LoginPage } from "@/app/pages/LoginPage";
import { SignupPage } from "@/app/pages/SignupPage";
import { TripPlannerPage } from "@/app/pages/TripPlannerPage";
import { ItineraryPage } from "@/app/pages/ItineraryPage";
import { DashboardPage } from "@/app/pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/planner",
    Component: TripPlannerPage,
  },
  {
    path: "/itinerary/:id",
    Component: ItineraryPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
]);
