import dynamic from "next/dynamic";

const UtiliHubToolsPage = dynamic(
  () => import("@/components/navLink/tool/page"),
  {
    ssr: true,
    loading: () => <p className="text-center">Loading...</p>,
  }
);

export const metadata = {
  title: "All Tools | UtiliHub",
  description:
    "Explore productivity, security, dev and text tools in one place",
};

export default function ToolsPage() {
  return <UtiliHubToolsPage />;
}
