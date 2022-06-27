import React from 'react'
import styled from'styled-components';
import {motion} from 'framer-motion';

const SpreadCurtainBox = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
    opacity: 1;
    z-index: 99;

    position: absolute;
`
const spreadCurtainVariants = {
    start:{
        opacity: 0,
        transition:{
            duration: 3,
        }
    }
}
function SpreadCurtain() {
  return (
    <>
        <SpreadCurtainBox variants={spreadCurtainVariants} animate="start"/>
    </>
  )
}

export default SpreadCurtain