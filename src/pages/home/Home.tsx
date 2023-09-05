import useViewportHeight from "../../hooks/useViewportHeight";
import Brands from "./components/Brands";
import Collections from "./components/Collections";
import Hero from "./components/Hero";
import OpenFashion from "./components/OpenFashion";
import Recommendations from "./components/Recommendations";
import TrendingProducts from "./components/TrendingProducts";

const Home = () => {
  const viewportHeight = useViewportHeight();

  console.log(viewportHeight);

  return (
    <>
      <Hero />
      <TrendingProducts />
      <Brands />
      <Collections />
      <Recommendations />
      <OpenFashion />
    </>
  );
};

export default Home;
