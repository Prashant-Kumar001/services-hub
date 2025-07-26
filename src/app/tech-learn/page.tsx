import dynamic from "next/dynamic";

const TechLearnPage = dynamic(
  () => import("@/components/navLink/tech-learn/page"),
  {
    ssr: true,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
      </div>
    ),
  }
);

export const metadata = {
  title: "Tech Learn | UtiliHub",
  description:
    "Explore productivity, security, dev and text tools in one place",
};

export default function ToolsPage() {
  return <TechLearnPage />;
}
