
import Image from "next/image";
import pic from "../../../../public/image.png"
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { HyperText } from "@/components/magicui/hyper-text";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
// import { BlurFade } from "@/components/magicui/blur-fade";


const Introduction = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-between mx-[25%]">
      <div>
        {/* <BlurFade delay={0.25} inView> */}
          <Image src={pic} alt="Rashedul's Image" className="rounded-full"/>
        {/* </BlurFade> */}
      </div>
          <div>
              <h1 className=" text-5xl">
                  <HyperText duration={1000} animateOnHover={false}>
                  Hi, I&apos;m Rashedul Islam Rajib
              </HyperText>
              </h1>
        <span
          className=" text-3xl"
        
        >
                  <TypingAnimation>    
                  A passionate web developer
                  </TypingAnimation>
              </span>
      </div>
    </div>
  );
}

export default Introduction
