import { useAuth } from "./providers/AuthProvider.jsx";
import PublicRouter from "./route-controllers/PublicRouter.jsx";
import PrivateRouter from "./route-controllers/PrivateRouter.jsx";
import { useEffect } from "react";
import WebFont from "webfontloader";
import { ToastContainer } from "react-toastify";
import VideoApp from "./VideoApp.jsx";
// import { googleFonts } from "./fonts.js";

const App = () => {
  const { getCurrentUser, loading, getCustomUser } = useAuth();
  <ToastContainer
    toastClassName={() =>
      "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
    }
    bodyClassName={() => "text-black text-base font-normal"}
    position="bottom-left"
    autoClose={4000}
    hideProgressBar={true}
    newestOnTop={false}
    closeButton={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />;
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       // families: googleFonts,
  //     },
  //   });
  // }, []);

  if (loading) return null;

  if (!getCurrentUser() || !getCustomUser()) {
    return <PublicRouter />;
  } else {
    return <PrivateRouter />;
  }
  
};

export default App;
