import { useGetCategoriesQuery } from '../../third-party/redux/fakestoreApi';
import { capitalizeEachWord } from '../../utils';
import Shimmer from '../../components/Shimmer';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  if (isLoading) {
    return (
      <div className="flex-wrap container flex justify-center m-auto py-24">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Categories</h2>
        </div>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div className="p-4 md:w-1/3" key={index}>
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <Shimmer />
              <div className="flex-grow mt-4">
                <Shimmer />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <section className="text-gray-600 body-font" id="categories">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Categories</h2>
        </div>
        <div className="flex flex-wrap -m-4">
          {categories?.map((category) => (
            <div className="p-4 md:w-1/3" key={category}>
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <h2 className="text-gray-900 text-lg title-font font-medium">{capitalizeEachWord(category)}</h2>
                </div>
                <div className="flex-grow">
                  <Link to={`/categories/${category}`} className="mt-3 text-primary inline-flex items-center">
                    Explore
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
