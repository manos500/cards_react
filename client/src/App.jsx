import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {Home} from './components/Home'
import {Shop} from './components/Shop'
import {Collection} from './components/Collection'
import {Footer} from './components/Footer'
import { Filter } from "./components/Filter"
import './App.css'
import { OpenPack } from './components/OpenPack';
import { PackInfo } from './components/PackInfo';
import {PackProvider} from  './Contexts/PackContext';
import { FilterSortProvider } from './Contexts/FilterSortContext';


function App() {
  

  return (
    
    <BrowserRouter>
      <Navbar/>
      <FilterSortProvider>  
        <PackProvider>
          <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/shop" element = {<Shop/>}/>
            <Route path="/shop/buy" element={<OpenPack />} />
            <Route path="/shop/info" element={<PackInfo />} />
            <Route path="/collection" element = {<Collection/>}/>
            <Route path="/collection/filter" element = {<Filter/>}/>
          </Routes>
        </PackProvider>
      </FilterSortProvider> 
      <Footer/>
    </BrowserRouter>
    
  )
}

export default App
