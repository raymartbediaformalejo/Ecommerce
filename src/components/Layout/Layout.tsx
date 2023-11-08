import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const pathname = useLocation().pathname.split("/");
  const isSingleProduct = pathname[1] === "product" || pathname[1] === "cart";
  const isCheckout = pathname[1] === "checkout";

  return (
    <div>
      <Header isCheckout={isCheckout} />
      <main>
        <Outlet />
      </main>
      {!isSingleProduct && <Footer isCheckout={isCheckout} />}
    </div>
  );
};

export default Layout;
