import dynamic from "next/dynamic";
import ToolLoader from "@/components/ui/loader";
import { Metadata } from "next";
import toolMap from "@/config/toolMap";
import { toolMetadata } from "@/config/toolMeta";

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;

  const toolMeta = toolMetadata[category]?.[slug];

  if (!toolMeta) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
    };
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: toolMeta.title,
    description: toolMeta.description,
    keywords: toolMeta.keywords,
    // openGraph: {
    //   title: toolMeta.title,
    //   description: toolMeta.description,
    //   type: "website",
    //   siteName: "Your Tool Site",
    //   images: [
    //     {
    //       url: "http://googleusercontent.com/image_generation_content/0",
    //       width: 1200,
    //       height: 630,
    //       alt: toolMeta.title,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: toolMeta.title,
    //   description: toolMeta.description,
    //   images: [""],
    // },
    // robots: {
    //   index: true,
    //   follow: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //     "max-video-preview": -1,
    //     "max-image-preview": "large",
    //     "max-snippet": -1,
    //   },
    // },
    // alternates: {
    //   canonical: `/tools/${category}/${slug}`,
    // },
    category: categoryName,
  };
}


export default async function ToolPage({ params }: Props) {
  const { category, slug } = await params;

  const ToolComponent = toolMap?.[category]?.[slug];

  if (!ToolComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-red-200 max-w-md">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Tool Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn't find the tool you're looking for.
          </p>
          <code className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
            {category}/{slug}
          </code>
          <div className="mt-6">
            <a
              href="/tools"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 inline-block"
            >
              Browse All Tools
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <ToolComponent />;
}
