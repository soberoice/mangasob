import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "./components/ui/provider";
import Home from "./Pages/Home";
import MangaInfo from "./Pages/MangaInfo";
import { MangaProvider } from "./components/contexts/MangaProvider";

function App() {
  return (
    <Provider>
      <MangaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="manga/:id" exact element={<MangaInfo />} />
          </Routes>
        </BrowserRouter>
      </MangaProvider>
    </Provider>
  );
}

export default App;
