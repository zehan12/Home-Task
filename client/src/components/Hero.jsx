import { Fragment } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

const Hero = () => {

    const isDesktop = useMediaQuery('(min-width: 640px)');

    return (

        <Fragment>
            <section className="h-[100vh] w-full relative">
                <picture>
                    <img src={isDesktop ? "https://home.llc/assets/images/banner.png" : "https://home.llc/assets/images/mob/banner.png"} />
                </picture>
                <div className="absolute top-[13%] text-center  md:left-[16%] md:top-[13%]  lg:left-[13%] lg:top-[32%]">
                    <h2 className="text-3xl lg:(text-6xl) md:text-6xl  text-white font-bold">ACHIEVE YOUR HOME OWNERSHIP GOALS</h2>
                    <div className="flex flex-col lg:text-xl md:text-xl mt-60 gap-4 md:flex-row lg:flex-row lg:justify-center md:justify-start lg:gap-6 md:gap-10 md:mt-20 lg:mt-40">
                        <button class="bg-[#ED5272] hover:bg-[#f1768e] text-white font-bold w-[70%] lg:w-74 md:w-80 py-3 md:py-4 md:px-4 lg:py-4 lg:px-20 rounded ml-14 lg:ml-0 md:ml-7">
                            Text with us
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-black font-bold w-[70%] py-3  rounded ml-14 lg:( w-80 py-4 px-20 ) md:( w-80 w-74 py-3 px-4 )">
                            Schedule a call
                        </button>
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default Hero;