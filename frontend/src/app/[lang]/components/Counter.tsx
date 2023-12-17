'use client'
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CountersProps {
  data: {
    sectionTitle: string;
    sectionSubTitle: string;
    counter: Counter[];
  };
}
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

interface Counter {
  id: string;
  picture: Picture;
  count: number;
  text: string;


}

function Counter({ count, text, picture }: Counter) {
  let ftImgUrl = getStrapiMedia(picture.data.attributes.url);
  return (
    <div className="flex flex-col items-center card-content p-4">
      <Image src={ftImgUrl || ""} alt="" width={80} height={80} />
      <div className="card-body">

        
        <div className="mt-[20px]">
          <p className="feature-text">{count} +</p>
          <h3 className="">{text}</h3>
        </div>

      </div>

    </div>
  );
}

export default function Counters({ data }: CountersProps) {
  console.log(data)
  return (
    <section className={`dark:bg-black dark:text-gray-100 m:py-12 lg:py-24  counter`}>
      {data.sectionTitle || data.sectionSubTitle ? <div className="2xl:container  mx-auto px-0 sm:px-6 py-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">{data.sectionTitle}</h2>
        <p className="dark:text-gray-400">{data.sectionSubTitle}</p>
      </div> : ''}

      <div className="2xl:container  mx-auto px-0 sm:px-6 relative">
        <div className="container-bg ">
          <div className="my-6 grid card-container justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.counter.map((counter: Counter, index: number) => (
              <Counter key={index} {...counter} />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
