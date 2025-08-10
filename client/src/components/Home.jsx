import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { useEffect } from 'react';


const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD336C"];

export const Home = () => {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(200% 170% at 50% 0%, var(--bg-light) 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
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
          <motion.div 
            initial={{opacity: 0, }}
            animate={{opacity: 1,  }}
            transition={{ duration: 2 }}
            className='packCard_group'>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
            <div className='card'></div>
            <div className='pack'></div>
          </motion.div>
        </div>
        <div className='text_container'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}>
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
              >Yugioh Card Simulator</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe earum pariatur voluptatum culpa veritatis iusto amet nesciunt natus voluptatibus odit ipsa quas modi maxime molestiae commodi quidem, facilis, exercitationem libero?
            </motion.p>
            <Link to="/shop">
             <motion.button 
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              style={{ border }} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className='home_btn'
            >
              Start
            </motion.button></Link>
           
          </motion.div>
        </div>
        
      </div>
    </motion.div>

  )
}
