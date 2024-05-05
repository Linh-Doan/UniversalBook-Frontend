

export const ImageCard = ( {source, children}) => {
  return (

    <figure className="relative mx-auto">
    <a href="#">
        <img className="h-[50vh] w-full object-cover" src={source} alt="image description"/>
    </a>
    <figcaption className="absolute h-[50vh] flex items-center justify-start w-full top-0 left-0 lg:left-1/4">
        <div className="text-left px-4">
            {children}
        </div>
    </figcaption>
</figure>





  )
}
