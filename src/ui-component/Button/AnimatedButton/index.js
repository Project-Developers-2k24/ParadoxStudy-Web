import { Suspense, useState } from 'react';
import { motion, MotionConfig, useMotionValue } from 'framer-motion';
import { Shapes } from './Shapes';
import { transition } from './setting';
import useMeasure from 'react-use-measure';
const styles = `
button {
  --purple: #db07d1;
  --pink: #f2056f;
  --blue: #61dafb;

  appearance: none;
  border: none;
  cursor: pointer;
  background-color: #acc7ed;
  color: #fff;
  border-radius: 60px;
  outline: none;
//   margin: 0;
//   padding: 12px 25px;
  font-family: "Poppins";
  font-size: 48px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -1px;
  position: relative;
  text-align: center;
  display: flex;
  widht:100px;
  align-items: center;
}

.shapes {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 60px;
  background: linear-gradient(
    60deg,
    var(--blue) 0%,
    #d6cbf6 30%,
    var(--pink) 70%
  );
}

.blush {
  position: absolute;
  bottom: -15px;
  width: 100px;
  height: 30px;
  filter: blur(20px);
}

.blush.pink {
  right: 20px;
  background: var(--purple);
}

.blush.blue {
  left: 20px;
  background: var(--blue);
}

.shapes .container {
  position: absolute;
  top: -100px;
  bottom: -100px;
  left: -100px;
  right: -100px;
  width: calc(100% + 200px);
  pointer-events: none;
}

.shapes canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}

.label {
font-size:35px;
  width: 180px;
  padding: 20px 0;
  transform: translateZ(0);
  font-weight: 700;
  z-index: 1;
}

.default {
  display: block;
}

.number {
  padding: 20px 0;
  width: 88px;
  position: relative;
  transform: translateZ(0);
}

.number:before {
  content: "";
  position: absolute;
  left: 0;
  top: 1px;
  bottom: 1px;
  width: 1px;
  background-color: #35373f;
}

.current {
  color: #8a8d9b;
  opacity: 1;
  display: block;
}

.new {
  color: #fbfaaa;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  display: block;
}

.add {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateY(38px);
  pointer-events: none;
  color: #d0d0db;
  display: block;
}
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
export default function AnimatedButton() {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionConfig transition={transition} className="button">
      <motion.button
        ref={ref}
        initial={false}
        animate={isHover ? 'hover' : 'rest'}
        whileTap="press"
        variants={{
          rest: { scale: 0.7 },
          hover: { scale: 0.8 },
          press: { scale: 0.9 }
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <motion.div
          className="shapes"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
        >
          <div className="pink blush" />
          <div className="blue blush" />
          <div className="container">
            <Suspense fallback={null}>
              <Shapes isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
            </Suspense>
          </div>
        </motion.div>
        <motion.div variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }} className="label">
          Explore
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
}
