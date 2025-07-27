import { PACKS } from "../packs"
import { Pack } from "./Pack"
import '../styles/shop.css'
import { useContext } from "react"
import { PackContext } from "../Contexts/PackContext"


export const Shop = () => {
  const {setSelectedPack} = useContext(PackContext);
  

  const grouped = PACKS.reduce((acc, pack) => {
    if (!acc[pack.packYear]) acc[pack.packYear] = [];
    acc[pack.packYear].push(pack);
    return acc;
  }, {});
  return (
    <div className="shop_container">
    <h1 className="shop_title">Yugioh Booster Packs</h1>

    {Object.entries(grouped).map(([year, packs]) => (
      <div key={year} className="year_section">
        <h2>{year}</h2>
        <div className="packs_grid">
          {packs.map((pack) => (
            <Pack key={pack.id} data={pack} onSelect={() => setSelectedPack(pack)} />
          ))}
        </div>
      </div>
    ))}
  </div>

   
  )
}
