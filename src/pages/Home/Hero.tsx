import heroImage from '../../assets/hero-image.webp'; // Adjust the path as necessary

const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Discover the Latest Trends
            <br className="hidden lg:inline-block" />
            Shop Now at Z-Store
          </h1>
          <p className="mb-8 leading-relaxed">
            Stay ahead of the trends with our exclusive collection of fashion, electronics, and home goods. From the
            latest tech gadgets to stylish apparel, Z-Store has everything you need to upgrade your lifestyle. Enjoy
            unbeatable prices and special offers, with free shipping on select items.
          </p>
          <div className="flex justify-center">
            <a href={'#categories'}>
              <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded text-lg">
                Shop Now
              </button>
            </a>

            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              Learn More
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src={heroImage} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
