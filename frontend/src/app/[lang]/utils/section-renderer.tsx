import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import Cta from "../components/Cta";
import DefaultSection from "../components/DefaultSection";
import Counter from "../components/Counter";

export function sectionRenderer(section: any, index: number) {
  
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.counters":
      console.log(section);
      return <Counter key={index} data={section} />;
    case "sections.default-section":
     
      return <DefaultSection key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;

    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.call-to-action":
      return <Cta key={index} data={section} />;
    default:
      return null;
  }
}
