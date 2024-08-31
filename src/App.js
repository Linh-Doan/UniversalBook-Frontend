import './App.css';
import { Header, Footer } from "./components/"
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
    <div className="App max-w-full overflow-x-hidden">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
