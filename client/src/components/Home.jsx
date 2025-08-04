import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import '../styles/home.css'
import { useEffect } from 'react';

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD336C"];

export const Home = () => {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(200% 170% at 50% 0%, var(--bg-light) 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color})`;
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, []);

  if (user) {
    console.log("Ο χρήστης είναι συνδεδεμένος ως:", user.username);
  }else{
    console.log("Ο χρήστης δεν είναι συνδεδεμένος ως:");
  }
  return (
    <motion.div style={{
      backgroundImage,
    }}>
      <div className='home_container'>
        <div className='homeLogo_container'>
          <div className='packCard_group'>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
          </div>
          
        </div>
        <div className='text_container'>
          <div >
            <h1>Yugioh Card Simulator</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe earum pariatur voluptatum culpa veritatis iusto amet nesciunt natus voluptatibus odit ipsa quas modi maxime molestiae commodi quidem, facilis, exercitationem libero?
            </p>
            <motion.button 
            whileHover={{scale: 1.015}}
            whileTap={{scale: 0.985}}
            style={{border,}} 
            className='home_btn'>Start</motion.button>
          </div>
        </div>
        
      </div>
    </motion.div>

  )
}
