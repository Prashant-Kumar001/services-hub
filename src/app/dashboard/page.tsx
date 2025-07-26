import DashboardPage from "@/components/navLink/dashboard/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | UtiliHub",
  description:
    "Explore productivity, security, dev and text tools in one place",
};

export default function Dashboard() {
  return <DashboardPage />;
}
