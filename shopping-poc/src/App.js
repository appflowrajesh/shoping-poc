import RoutesComponent from "./routes";
import StoreProvider from "./context";

function App() {
  return (
    <>
      <StoreProvider>
        <RoutesComponent />
      </StoreProvider>
    </>
  );
}
export default App;
