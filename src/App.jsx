import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "./components/ui/provider";
import Home from "./Pages/Home";
import MangaInfo from "./Pages/MangaInfo";
import { MangaProvider } from "./components/contexts/MangaProvider";
import SearchFeed from "./Pages/SearchFeed";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Provider>
      <MangaProvider>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="manga/:id" element={<MangaInfo />} />
            <Route path="/search/:searchterm" element={<SearchFeed />} />
          </Routes>
        </BrowserRouter>
      </MangaProvider>
    </Provider>
  );
}

export default App;
