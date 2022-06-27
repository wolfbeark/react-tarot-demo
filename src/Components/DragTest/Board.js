
import React from 'react'
import styled from 'styled-components';
import {motion, useDragControls} from 'framer-motion';

//import Card from './Card'

const BoardBox = styled(motion.div)`
    width: 20%;
    height: 80%;
    background-color: skyblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const CardBoxTest = styled(motion.div)`
    width: 100px;
    height: 50px;
    background-color: whitesmoke;
`

// function Card(props){
//     const dragControl = useDragControls();
//     const cardDragStart = e =>{
//         const target = e.target;
//         console.log(e);
//         e.dataTransfer.setData('card_id', target.id);
//         setTimeout(()=>{
//             //target.style.display = 'none';
//         }, 0)
//     }
//     const cardDragOver = e =>{
//         e.stopPropagation();
//     }
//     return(
        
//             <CardBoxTest
//                 drag
//                 dragControls={dragControl}
//                 id={props.id}
//                 className={props.className}
//                 draggable="true"
//                 onDrag={(e)=>{
//                     console.log(e);
//                 }}
//                 onDragStart={dragStart}
//                 onDragOver={dragOver}
//             >
//                 1
//             </CardBoxTest>
        
//     );
// }
function Board(props){
    const dragControl = useDragControls();
    const cardDragStart = e =>{
        const target = e.target;
        console.log(e);
        e.dataTransfer.setData('card_id', target.id);
        setTimeout(()=>{
            //target.style.display = 'none';
        }, 0)
    }
    const cardDragOver = e =>{
        e.stopPropagation();
    }
    const drop = (e) =>{
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id);
        //card.style.display = "block";

        e.target.appendChild(card);
    }
    const dragOver = e =>{
        e.preventDefault();

    }
    return(
        
            <BoardBox
                id={props.id}
                onDrop={drop}
                onDragOver={dragOver}
                className={props.className}
            >
                <CardBoxTest
                    drag
                    dragControls={dragControl}
                    id="card-1"
                    className="card_1"
                    draggable="true"
                    onDrag={(e)=>{
                        console.log(e);
                    }}
                    onDragStart={cardDragStart}
                    onDragOver={cardDragOver}
                >
                1
                </CardBoxTest>
            </BoardBox>
    
    );
}

export default Board