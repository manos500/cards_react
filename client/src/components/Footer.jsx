
import { instagramIcon, githubIcon } from '../assets';
import '../styles/footer.css'

export const Footer = () => {
  return (
      <div className='footer_container'>
        <div className="socials">
          <img src={instagramIcon} alt="" />
          <img src={githubIcon} alt="" />
        </div>
        <div className="footer_bottom">
          <p>copyright &copy;2024 manos</p>
        </div>
      </div>
  )
}
