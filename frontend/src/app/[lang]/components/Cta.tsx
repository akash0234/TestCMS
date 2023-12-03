import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CtaProps {
  data: {
    CtaText: string;
  };
}

export default function RichText({ data }: CtaProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
     <div>{data.CtaText}</div>
    </section>
  );
}
