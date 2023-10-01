import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const pathname = useLocation().pathname.split("/");
  const isSingleProduct = pathname[1] === "product" || pathname[1] === "cart";
  console.log(pathname);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {!isSingleProduct && <Footer />}
    </div>
  );
};

export default Layout;
