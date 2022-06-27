
import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';



import MainComponent from './Components/MainComponent/MainComponent';
import FourthComponent from './Components/FourthComponent/FourthComponent';
import DragTest from './Components/DragTest/DragTest';
import DragTest2 from './Components/DragTest2/DragTest2';

const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  return (
      // <div className="App" >
      //   <Routes>
      //     <Route exact path='/' element={<MainComponent />}/>
          
      //     <Route exact path='/fourth' element={<FourthComponent />} />
      //     <Route exact path='/drag' element={<DragTest />} />
      //     <Route exact path='/drag2' element={<DragTest2 />} />
      //   </Routes>
      // </div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path='/' element={<MainComponent />}/>
          
          <Route exact path='/fourth' element={<FourthComponent />} />
          <Route exact path='/drag' element={<DragTest />} />
          <Route exact path='/drag2' element={<DragTest2 />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
