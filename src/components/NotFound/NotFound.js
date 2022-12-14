/* eslint-disable no-plusplus */
import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import Page from '../Page/Page';
import './notFound.scss';

function NotFound() {
  // const navigate = useNavigate();
  // const [xPosition, setXposition] = useState(0);
  // const [color, setColor] = useState('#A2FF33');
  // const [isGoal, setIsGoal] = useState(false);
  // const changeBackground = (currentColor) => setColor(currentColor);
  // const colorArray = [
  //   '#E66B1C',
  //   '#0BBCD8',
  //   '#5F0BD8',
  //   '#8CAF16',
  //   '#F407FB',
  // ];
  // let index = 0;
  // useEffect(() => {
  //   const changeColor = setInterval(() => {
  //     index++;
  //     if (index === colorArray.length - 1) {
  //       index = 0;
  //     }
  //     changeBackground(colorArray[index]);
  //     return () => {
  //       clearInterval(changeColor);
  //     };
  //   }, 300);
  // }, []);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setXposition(Math.floor((Math.random() - 0.5) * ((2000 - (-2000) + 1) + -2000)));
  //   }, 2000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [xPosition]);
  // useEffect(() => () => {
  //   setIsGoal(false);
  // }, []);
  // const handleClick = () => {
  //   setIsGoal(true);
  //   setTimeout(() => {
  //     navigate('/');
  //   }, 4500);
  // };
  return (
    <Page>
      <div
        className="container-notFound"
      >
        <div className="parallax">
          <motion.p
            animate={{
              x: [0, 90, 0],
              rotate: [0, 360, 0],
              transition: { duration: 1, delay: 0.2 },
            }}
          >4
          </motion.p>
          <motion.p
            animate={{
              x: [0, 90, 0],
              rotate: [0, 360, 0],
              transition: { duration: 1, delay: 0.2 },
            }}
          >0
          </motion.p>
          <motion.p
            animate={{
              x: [0, 90, 0],
              rotate: [0, 360, 0],
              transition: { duration: 1, delay: 0.2 },
            }}
          >4
          </motion.p>

        </div>
        <div className="subtitle">
          Carrot not found
        </div>
        {/* {isGoal && (
          <motion.div
            className="goal"
            initial={{ scale: 0 }}
            animate={{ background: color, scale: 1 }}
            transition={{
              scale: { duration: 0.5 },
            }}
          >
            <motion.p
              initial={{ scale: 0 }}
              animate={{
                rotate: [0, 360],
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
            >
              GOAL !!!!!
            </motion.p>
          </motion.div>
        )} */}
        {/* {!isGoal && (

          <section>
            <ParallaxText className="paraOne" baseVelocity={4}>-CARROT NOT FOUND</ParallaxText>
            <motion.div
              className="container-rabbit"
              key="rabbit"
              initial={{ y: 300 }}
              animate={{ y: [300, 40, 300], x: xPosition }}
              transition={{ repeat: Infinity, repeatDelay: 1, duration: 2.5 }}
              onClick={handleClick}
            >
              <motion.p
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
              >
                knock out!
              </motion.p>
              <div
                className="rabbit"
              >
                <div className="face" />
                <div className="ear left" />
                <div className="ear right" />
                <div className="eye left">
                  <div className="iris" />
                </div>
                <div className="eye right">
                  <div className="iris" />
                </div>
                <div className="nose" />
                <div className="mouth" />
                <div className="teeth" />
                <div className="hairs">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </motion.div>
          </section>
        )} */}
      </div>
    </Page>
  );
}

export default NotFound;
