import { Fragment } from "react"

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const Features = () => {
    const features = [
        "https://home.llc/assets/images/clients/2.png",
    ]
    return (
        <Fragment>
            <section className="bg-blue-100 mt-[-58px]">
                <h2 className="uppercase text-center pt-20 text-5xl font-bold">As Featured In</h2>
                <div className="flex flex-wrap justify-center items-center gap-2 mx-6">
                    {
                        arr.map((img) => (
                            <img className="w-[260px] lg:(py-10)" src={`https://home.llc/assets/images/clients/${img}.png`} />))
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Features;


