import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {Home} from './components/Home'
import {Shop} from './components/Shop'
import {Collection} from './components/Collection'
import { Filter } from "./components/Filter"
import { Login } from './components/Login';
import { Register } from './components/Register';
import './App.css'
import { OpenPack } from './components/OpenPack';
import { PackInfo } from './components/PackInfo';
import {PackProvider} from  './Contexts/PackContext';
import { FilterSortProvider } from './Contexts/FilterSortContext';


function App() {
  

  return (
    
  <BrowserRouter>
    <FilterSortProvider>  
      <PackProvider>
        <Routes>

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/buy" element={<OpenPack />} />
                  <Route path="/shop/info" element={<PackInfo />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/collection/filter" element={<Filter />} />
                </Routes>
               
              </>
            }
          />
        </Routes>
      </PackProvider>
    </FilterSortProvider>
  </BrowserRouter>
    
  )
}

export default App
