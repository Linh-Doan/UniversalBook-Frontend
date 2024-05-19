import FeaturedSlider from "../components/FeaturedSlider";
import Book1 from "../assets/book1.jpeg";
import Book2 from "../assets/book2.avif";
import Book3 from "../assets/book3.jpeg";

const chapters = [
    {
        id: 1,
        heading: "test chapter",
        imageUrl: Book1,
    },
    {
        id: 2,
        heading: "test chapter",
        imageUrl: Book2,
    },
    {
        id: 3,
        heading: "test chapter",
        imageUrl: Book3,
    },
    {
        id: 4,
        heading: "test chapter",
        imageUrl: Book1,
    },
    {
        id: 5,
        heading: "test chapter",
        imageUrl: Book2,
    },
    {
        id: 6,
        heading: "test chapter",
        imageUrl: Book3,
    },
];

export const ChapterList = () => {
    return (
        <main>
            <section className="bg-[#969fac] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Trending Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chapters} />
            </section>
            <section className="bg-[#6f7588] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Top Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chapters} />
            </section>
            <section className="bg-[#5c5d72] pb-8">
                <div className="flex justify-center items-center py-4" >
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        New Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chapters} />
            </section>
            <section className="bg-[#6781a1] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Discover Chapters
                    </p>
                </div>
                <FeaturedSlider SliderItems={chapters} />
            </section>
        </main>
    );
};
