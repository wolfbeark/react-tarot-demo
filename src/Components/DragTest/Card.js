import React from 'react'
import styled from 'styled-components';
import {motion, useDragControls} from 'framer-motion';


const CardBoxTest = styled(motion.div)`
    width: 100px;
    height: 50px;
    background-color: whitesmoke;
`

function Card(props){
    const dragControl = useDragControls();
    const dragStart = e =>{
        const target = e.target;
        console.log(e);
        e.dataTransfer.setData('card_id', target.id);
        setTimeout(()=>{
            //target.style.display = 'none';
        }, 0)
    }
    const dragOver = e =>{
        e.stopPropagation();
    }
    return(
        
            <CardBoxTest
                drag
                dragControls={dragControl}
                id={props.id}
                className={props.className}
                draggable="true"
                onDrag={(e)=>{
                    console.log(e);
                }}
                onDragStart={dragStart}
                onDragOver={dragOver}
            >
                1
            </CardBoxTest>
        
    );
}

export default Card