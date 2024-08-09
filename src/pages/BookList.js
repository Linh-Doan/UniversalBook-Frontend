import FeaturedSlider from "../components/FeaturedSlider";

const books = [
    {
        book_id: "1",
        heading: "Book 1",
        book_image_url: "/img/book1.jpeg",
    },
    {
        book_id: "2",
        heading: "Book 2",
        book_image_url: "/img/book2.jpeg",
    },
    {
        book_id: "3",
        heading: "Book 3",
        book_image_url: "/img/book3.jpeg",
    },
    {
        book_id: "4",
        heading: "Book 4",
        book_image_url: "/img/book4.jpeg",
    },
    {
        book_id: "5",
        heading: "Book 5",
        book_image_url: "/img/book5.jpeg",
    },
    {
        book_id: "6",
        heading: "Book 6",
        book_image_url: "/img/book6.jpeg",
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
