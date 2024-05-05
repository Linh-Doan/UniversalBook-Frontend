import FeaturedSlider from "../components/FeaturedSlider";
import Book1 from "../assets/book1.jpeg";
import Book2 from "../assets/book2.avif";
import Book3 from "../assets/book3.jpeg";

const genres = [
    {
        id: 1,
        heading: "Test Genre",
        imageUrl: Book1,
    },
    {
        id: 2,
        heading: "Test Genre",
        imageUrl: Book2,
    },
    {
        id: 3,
        heading: "Test Genre",
        imageUrl: Book3,
    },
    {
        id: 4,
        heading: "Test Genre",
        imageUrl: Book1,
    },
    {
        id: 5,
        heading: "Test Genre",
        imageUrl: Book2,
    },
    {
        id: 6,
        heading: "Test Genre",
        imageUrl: Book3,
    },
    {
        id: 7,
        heading: "Test genre",
        imageUrl: Book1,
    },
    {
        id: 8,
        heading: "Test Genre",
        imageUrl: Book2,
    },
    {
        id: 9,
        heading: "Test Genre",
        imageUrl: Book3,
    },
];

export const GenreList = () => {
    return (
        <main>
            <section className="bg-[#969fac] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Trending Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genres} />
            </section>
            <section className="bg-[#6f7588] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Top Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genres} />
            </section>
            <section className="bg-[#5c5d72] pb-8">
                <div className="flex justify-center items-center py-4" >
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        New Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genres} />
            </section>
            <section className="bg-[#6781a1] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Random Genres
                    </p>
                </div>
                <FeaturedSlider SliderItems={genres} />
            </section>
        </main>
    );
};