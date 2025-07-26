
import { Metadata } from "next";
import { toolMetadata } from "./toolMeta";
import toolMap from "./toolMap";


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



export async function generateStaticParams() {
  const params = [];
  for (const [category, tools] of Object.entries(toolMap)) {
    for (const slug of Object.keys(tools)) {
      params.push({
        category,
        slug,
      });
    }
  }

  return params;
}

