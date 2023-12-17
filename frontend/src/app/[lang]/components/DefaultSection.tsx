import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}
interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface DefaultSectionProps {
  data:{
    id: string;
    sectionClass: string;
    sectionTitle: string;
    sectionSubtitle: string;
    defaultsectionContent: string;
    isReversed: boolean;
    picture : Picture;
    buttons: Button[];

  }
  
}


export default function DefaultSection({ data }: DefaultSectionProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  return (
    <section className={`dark:bg-black dark:text-gray-100 bg-[#FAFAFA] m:py-12  lg:py-24 ${data.sectionClass}` }>
      {data.sectionTitle || data.sectionSubtitle ? <div className="2xl:container xs:container  mx-auto px-0 sm:px-6 py-4 space-y-2 text-center">
        <h2 className="sectionTitle">{data.sectionTitle}</h2>
        <p className="sectionSubTitle">{data.sectionSubtitle}</p>
        <hr className="sectionTitleHr" />

      </div> : ''}

      <div className="2xl:container sm:container  mx-auto px-0 sm:px-6 relative  ">
        <div className="grid gap-4 grid-cols-12 ">
          <div className={`lg:col-span-6 col-span-12 my-auto ${data.isReversed? 'order-2' : 'order-1'}`}>
            <div className="imgContainer">
            <Image
              src={imgUrl || ""}
              alt={
                data.picture.data.attributes.alternativeText || "none provided"
              }
              className=""
              width={500}
              height={500}
            />
            </div>
          
          </div>
          <div className={`lg:col-span-6 col-span-12 my-auto ${data.isReversed? 'order-1' : 'order-2'}`}>
                <div className="relative">
                  <div dangerouslySetInnerHTML={{ __html: data.defaultsectionContent }} />

                </div>

              <div className="section-btn">
              {data.buttons.map((button: Button, index: number) => (
                <Link
                  key={index}
                  href={button.url}
                  target={button.newTab ? "_blank" : "_self"}
                  className={button.type}
                >
                  {button.text}
                </Link>
              ))}
              </div>
          
          </div>
        </div>

      </div>

    </section>
  );
}
