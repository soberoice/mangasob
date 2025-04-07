import PopularManga from "./components/PopularManga";
import { MangaProvider } from "./components/ui/contexts/MangaProvider";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <>
      <Provider>
        <MangaProvider>
          <PopularManga />
        </MangaProvider>
      </Provider>
    </>
  );
}

export default App;
