import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import Draggable from 'react-draggable'

const TestBox = styled(motion.div)`
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 101;
    background-color: green;
`

function Testele(props){
    const testRef = useRef();
    const [position, setPosition] = useState({ x : 0, y : 0});

    const trackPos = (data) => {
        setPosition({ x : data.x , y : data.y });
    }
    return(
        <>
        <Draggable nodeRef={testRef} onDrag={(e, data) => trackPos(data)}>
            <TestBox ref={testRef}
                drag
                draggable="true"
                dragConstraints={props.box}
                dragPropagation={false}
                dragMomentum={false}
                dragElastic={0}
            >

            </TestBox>
        </Draggable>
        </>
    );
}

export default Testele