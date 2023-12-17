'use client'
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface FeaturesProps {
  data: {
    sectionClass: string;
    heading: string;
    description: string;
    feature: Feature[];
    isSlider: boolean;
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

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media: Picture;
}

function Feature({ title, description, showLink, newTab, url, text, media }: Feature) {
  let ftImgUrl = getStrapiMedia(media.data.attributes.url);
  return (
    <div className="flex flex-col items-center card-content p-4">
      <Image src={ftImgUrl || ""} alt="" width={80} height={80} />
      <div className="card-body">
        <hr className="featurehr" />
        <h3 className="mb-3 text-[20px]">{title}</h3>
        <div className="my-6">
          <p className="feature-text">{description}</p>
        </div>
        {showLink && url && text && (
          <div>
            <Link
              href={url}
              target={newTab ? "_blank" : "_self"}
              className="inline-block text-[#3C0000]"
            >
              {text}
            </Link>
          </div>
        )}{/*  */}
      </div>

    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className={`dark:bg-black dark:text-gray-100 m:py-12 lg:py-24 ${data.sectionClass}`}>
      {data.heading || data.description ? <div className="2xl:container  mx-auto px-0 sm:px-6 py-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">{data.heading}</h2>
        <p className="dark:text-gray-400">{data.description}</p>
      </div> : ''}

      <div className="2xl:container  mx-auto px-0 sm:px-6 relative">
        <div className="container-bg ">
          {data.isSlider ? <Slider {...settings}>
            {data.feature.map((feature: Feature, index: number) => (
              <div className="my-6 grid card-container justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <Feature key={index} {...feature} />

              </div>

            ))}

          </Slider> :
            <>
              <div className="my-6 grid card-container justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.feature.map((feature: Feature, index: number) => (
                  <Feature key={index} {...feature} />
                ))}

              </div>
            </>


          }



        </div>

      </div>

    </section>
  );
}
