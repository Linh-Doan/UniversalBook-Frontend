import FeaturedSlider from "../components/FeaturedSlider";
import Book1 from "../assets/book1.jpeg";
import Book2 from "../assets/book2.avif";
import Book3 from "../assets/book3.jpeg";

const books = [
    {
        id: 1,
        heading: "Book 1",
        imageUrl: Book1,
    },
    {
        id: 2,
        heading: "Book 2",
        imageUrl: Book2,
    },
    {
        id: 3,
        heading: "Book 3",
        imageUrl: Book3,
    },
    {
        id: 4,
        heading: "Book 4",
        imageUrl: Book1,
    },
    {
        id: 5,
        heading: "Book 5",
        imageUrl: Book2,
    },
    {
        id: 6,
        heading: "Book 6",
        imageUrl: Book3,
    },
];

export const BookList = () => {
    return (
        <main>
            <section className="bg-[#969fac] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Trending Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={books} />
            </section>
            <section className="bg-[#6f7588] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Top Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={books} />
            </section>
            <section className="bg-[#5c5d72] pb-8">
                <div className="flex justify-center items-center py-4" >
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        New Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={books} />
            </section>
            <section className="bg-[#6781a1] pb-8">
                <div className="flex justify-center items-center py-4">
                    <p className="text-white text-xl font-semibold px-3 py-1 rounded">
                        Discover Books
                    </p>
                </div>
                <FeaturedSlider SliderItems={books} />
            </section>
        </main>
    );
};
