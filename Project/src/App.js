import {Routes, Route} from 'react-router-dom';
import './App.css';
import { Header } from './Component/Header';
import MainContainer from './Component/MainContainer';
import CreateContainer from './Component/CreateContainer';

function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-slate-100">
        <Header></Header>
        <main className="mt-16 md:mt-24 p-8 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer/>} />
            <Route path="/createItem" element={<CreateContainer/>} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
