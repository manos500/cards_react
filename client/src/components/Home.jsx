import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { useEffect } from 'react';


export const Home = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

 
  if (user) {
    console.log("Ο χρήστης είναι συνδεδεμένος ως:", user.username);
  }else{
    console.log("Ο χρήστης δεν είναι συνδεδεμένος ως:");
  }
  return (
    <div>
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
              whileHover={{ background: 'hsl(0, 0%, 75%)',transition: { duration: 0} }}
              whileTap={{ scale: 0.985 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='home_btn light'
            >
              Start
            </motion.button></Link>
           
          </motion.div>
        </div>
        
      </div>
    </div>

  )
}
