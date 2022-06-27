
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import Draggable from 'react-draggable'


const FindContainer = styled(motion.div)`

    width: 13%;
    height: 45%;
    background-color: gray;
    left: 65%;
    top: 6%;

    position: absolute;
    z-index: 1000;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    padding: 1%;
`
const ImgBox = styled(motion.div)`
    width: 100%;
    height: 80%;
    background-color: yellow;
`
function Find(props) {

    const [position, setPosition] = useState({ x : 0, y : 0});
    const trackPos = (data) => {
        setPosition({ x : data.x , y : data.y });
    }
    const findRef = useRef();
  return (
    <>
    <Draggable nodeRef={findRef} onDrag={(e, data) => {trackPos(data)}}>
        <FindContainer
            ref={findRef}
            drag
            dragConstraints={props.refArr[1]}
            dragMomentum={false}
            dragPropagation={false}
        >
            <ImgBox></ImgBox>
        </FindContainer>
    </Draggable>

    </>
  )
}

export default Find