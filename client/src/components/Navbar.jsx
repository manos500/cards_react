import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/navbar.css'
import { yugiohLogo, menu, close } from '../assets/index.js'

export const Navbar = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 630);
  const [LinksMenuToggle, SetLinksMenuToggle] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setIsScreenSmall(newWidth < 630);

      if (newWidth > 630) {
        SetLinksMenuToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  return (
    <div className='navbar_container'>
      <div className='logo_container'>
        <img src={yugiohLogo} alt="yugioh"/>
      </div>
      <div className='links_container'>{!isScreenSmall ? (<>
        <Link to="/" className='hover-underline-animation'>Home</Link>
        <Link to="/shop" className='hover-underline-animation'>Shop</Link>
        <Link to="/collection" className='hover-underline-animation'>Collection</Link>
      
      </>) : (<>
        <img src={LinksMenuToggle ? close : menu} alt="" onClick = {() => {SetLinksMenuToggle(!LinksMenuToggle)}} className = "menu-icon"/>
        <div>{LinksMenuToggle && (
          <div className='hidden_menu_container'>
            <div className='hidden_links_container'>
              <Link to="/" className='hover-underline-animation' onClick={() => SetLinksMenuToggle(false)}>Home</Link>
              <Link to="/shop" className='hover-underline-animation' onClick={() => SetLinksMenuToggle(false)}>Shop</Link>
              <Link to="/collection" className='hover-underline-animation' onClick={() => SetLinksMenuToggle(false)}>Collection</Link>
            </div>
          </div>
        )}</div>
      </>)}
      </div>
       
    </div>
  )
}
