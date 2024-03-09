import { useAuth } from "./providers/AuthProvider.jsx";
import PublicRouter from "./route-controllers/PublicRouter.jsx";
import PrivateRouter from "./route-controllers/PrivateRouter.jsx";
import { useEffect } from "react";
import WebFont from "webfontloader";
import { googleFonts } from "./fonts.js";

const App = () => {
  const { getCurrentUser, loading, getCustomUser } = useAuth();

  useEffect(() => {
    WebFont.load({
      google: {
        families: googleFonts,
      },
    });
  }, []);

  if (loading) return null;

  if (!getCurrentUser() || !getCustomUser()) {
    return <PublicRouter />;
  } else {
    return <PrivateRouter />;
  }
};

export default App;
