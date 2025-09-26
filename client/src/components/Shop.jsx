import { Loader } from "./Loader"
import { Error } from "./Error";
import { Pack } from "./Pack"
import '../styles/shop.css'
import { useContext } from "react"
import { PackContext } from "../Contexts/PackContext"
import {useQuery} from "@tanstack/react-query"
import { fetchPacks } from "../services/apiClient.js"


export const Shop = () => {
  const {setSelectedPack} = useContext(PackContext);
  
  const {data: packs, isLoading, isError} = useQuery({
    queryKey: ["packs"],
    queryFn: fetchPacks,
  })

  if (isLoading) { return (
     <div className="loader_container">
      <Loader />
    </div>
    );
  }
   
  if (isError) {
    return (
      <div className="error_container">
        <Error />
      </div>
    )
  }


  const grouped = packs.reduce((acc, pack) => {
    if (!acc[pack.packYear]) acc[pack.packYear] = [];
    acc[pack.packYear].push(pack);
    return acc;
  }, {});

 

  return (
    <div className="shop_container ">
    <h1 className="shop_title">Yugioh Booster Packs</h1>

    {Object.entries(grouped).map(([year, packs]) => (
      <div key={year} className="year_section">
        <h2>{year}</h2>
        <div className="packs_grid">
          {packs.map((pack) => (
            <Pack key={pack.packID} data={pack} onSelect={() => setSelectedPack(pack)} />
          ))}
        </div>
      </div>
    ))}
  </div>

   
  )
}
