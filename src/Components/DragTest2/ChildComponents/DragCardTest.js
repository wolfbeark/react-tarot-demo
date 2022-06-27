import React, { useEffect, useState, useRef } from 'react'
import styled, {css} from 'styled-components'
import {motion} from 'framer-motion'
import Draggable from "react-draggable";


let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;

const CardContainer = styled(motion.div)`
    width: ${(props) => props.selecteddeckzoneinfo.width || 10}px;
    height: ${(props) => props.selecteddeckzoneinfo.height || 100}px;
    background-color: blue;

    position: absolute;
    
    left: ${(props) => props.testposx }px;
    

    color: white;
    &:active{
        box-shadow: 0 0 10px 5px white
    }
`
const cardVariants = {
    rotateTrue:{
        rotate: '-90deg',
    },
    rotateFalse:{
        rotate: 0,
    },
    hover:{
        scale: 1.2,
    }
}
function DragCardTest(props) {

    const [position, setPosition] = useState({x : 0, y : 0});
    const thisCard = useRef(null);
    
    const trackPos = (data) =>{
        setPosition({x : data.x , y : data.y});
    }
    
    const [isInSpreadZone, setIsInSpreadZone] = useState(false);
    const [isRotate, setRotate] = useState(false);
    const _subContainerInfo = props.subcontainerinfo;
    const _selectedDeckZoneInfo = props.selecteddeckzoneinfo;
    const _spreadZoneInfo = props.spreadzone;
    const cardnum = props.cardnum;
    const {cardInCount , setCardInCount} = props.cardCountController;

    const testPosX = (_selectedDeckZoneInfo.x - _spreadZoneInfo.x);
    const testPosY = _spreadZoneInfo.y;

    const {
        currentCard,
        setCurrentCard
    } = props.currentCardController 
    useEffect(()=>{

    }, [isRotate])
    const selectCurrentCard = (e) =>{
        e.preventDefault();
        if(isInSpreadZone === true){
            const tempData = {
                isRotate,
                setRotate,
                isInSpreadZone
            }
            setCurrentCard(tempData);
        }
    }
    const checkIsInSpreadZone = (e) => {
        e.preventDefault();
        e.stopPropagation()
        if(isInSpreadZone === false){
            posX = e.clientX;
            posY = e.clientY;
            if(posX > _spreadZoneInfo.left &&
                posX < _spreadZoneInfo.right &&
                posY > _spreadZoneInfo.top &&
                posY < _spreadZoneInfo.bottom){
                    setIsInSpreadZone(true);
                }
        }
        console.log(e)
        // e.target.style.left= `${e.target.offsetLeft + e.clientX - posX}px`;
        // e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    }
    const onDragStartTest = (event) =>{
        event.dataTransfer.setData('text/plain', null)
    }
    const onDragTest = (e) =>{
        e.stopPropagation()
        //e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
        //e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
        posX = e.clientX;
        posY = e.clientY;
        if(isInSpreadZone === false){
            // const posX = e.clientX;
            // const posY = e.clientY;
            if(posX > _spreadZoneInfo.left &&
                posX < _spreadZoneInfo.right &&
                posY > _spreadZoneInfo.top &&
                posY < _spreadZoneInfo.bottom){
                    let tempCount = cardInCount;
                    tempCount++;
                    setCardInCount(tempCount);
                    setIsInSpreadZone(true);
                }
        }
    }
    
    return (
        <Draggable nodeRef={thisCard} onDrag={ (e, data) => {trackPos(data)}}>
            <CardContainer
                ref={thisCard}
                testposx={testPosX}
                testposy={testPosY}
                drag
                isinspreadzone={isInSpreadZone === false ? "false" : "true"}
                variants={cardVariants}
                animate={isRotate === false ? "rotateFalse" : "rotateTrue"}
                subcontainerinfo={_subContainerInfo}
                selecteddeckzoneinfo={_selectedDeckZoneInfo}
                
                //  dragSnapToOrigin={
                //      isInSpreadZone === false
                //      ? true
                //      : false
                //  }
                dragMomentum={false}
                dragConstraints={
                    isInSpreadZone === false
                    ? props.spreadRefArr[0]
                    : props.spreadRefArr[1]
                }
                //onDragStart={onDragStartTest}
                onDoubleClick={(e) =>{
                    setRotate(!isRotate);
                }}
                onDrag={e => onDragTest(e)}
                //onDragEnd={e => checkIsInSpreadZone(e)}
                //onClick={(e) => selectCurrentCard(e)}
                whileDrag="hover"
            >
                <span>{props.cardnum}</span>
            </CardContainer>
        </Draggable>
  )
}

export default React.memo(DragCardTest)