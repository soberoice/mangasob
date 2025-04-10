import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Provider } from "./components/ui/provider";
import Home from "./Pages/Home";
import MangaInfo from "./Pages/MangaInfo";
import { MangaProvider } from "./components/contexts/MangaProvider";
import SearchFeed from "./Pages/SearchFeed";
import Navbar from "./components/Navbar";
import MangaView from "./Pages/MangaView";
import TagFeed from "./Pages/TagFeed";
import PopularMangaFeed from "./Pages/PopularMangaFeed";
import { useEffect } from "react";

const ScroleToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
function App() {
  return (
    <Provider>
      <MangaProvider>
        <BrowserRouter>
          <Navbar />
          <ScroleToTop />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="manga/:id" element={<MangaInfo />} />
            <Route path="/search/:searchterm" element={<SearchFeed />} />
            <Route
              path="/read/:mangaid/:id/:chapter/:title"
              element={<MangaView />}
            />
            <Route path="/tag/:name/:id" element={<TagFeed />} />
            <Route path="/popular" element={<PopularMangaFeed />} />
          </Routes>
        </BrowserRouter>
      </MangaProvider>
    </Provider>
  );
}

export default App;
