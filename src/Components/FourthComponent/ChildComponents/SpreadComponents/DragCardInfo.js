import React, { useEffect, useState, useRef } from 'react'
import styled, {keyframes, css} from'styled-components';
import {motion} from 'framer-motion';
import Draggable from 'react-draggable';

let posX = 0;
let posY = 0;

// RotateFalse
const CardFlipAnimation1 = keyframes` 
    0%{
        transform: rotateY(0);
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
    100%{
        opacity: 1;
        transform: rotateY(360deg);
    }
`
// RotateTrue
const CardFlipAnimation2 = keyframes`
    0%{
        opacity: 1;
        transform: rotateX(0);
    }
    50%{
        opacity: 0;
    }
    100%{
        opacity: 1;
        transform: rotateX(360deg);
    }
`
const DragCardContainer = styled(motion.div)`
    width: ${(props) => props.selectedposinfo.width}px;
    height: ${(props) => props.selectedposinfo.height}px;
    //background-color: skyblue;
    background-image: url(${(props) => props.imgsrc});
    border-radius: 10px;
    background-size: 100% 100%;
    color: white;
    position: absolute;
    left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
    top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
    cursor: pointer;
    
`

const cardVariants = {
    rotateTrue : {
        rotateZ: -90,
        opacity: 1,
    },
    rotateFalse : {
        rotateZ: 0,
        opacity: 1,
    },
    hover: {
        scale: 1.1,
        //boxShadow: '0 0 10px 5px black',
    },
}
function DragCardInfo(props) {

    const [selectedPosInfo, setSelectedPosInfo] = useState({ x : 0, y : 0, width : 0, height : 0});
    const [position, setPosition] = useState({ x : 0, y : 0});
    let dragCardNumArr = props.dragCardNumArr;
    const [isRotate, setRotate] = useState(false);
    const { isInCount , setIsInCount } = props.isInCounter;
    const mainSpreadPosInfo = props.mainSpreadZonePosInfo;
    const cardRef = useRef();
    const horizontal = selectedPosInfo.x - mainSpreadPosInfo.x;
    const newDragArea = props.newDragArea;
    const optionBoxInfo = props.optionBoxInfo;
    let [thisCardZIndex, setThisCardZIndex] = useState(0);
    const [isInSpreadZone, setIsInSpreadZone] = useState(false);
    let _count = props.count;
    const imgnum = props.imgnum;

    const [isFliped, setIsFliped] = useState(false);
    let [isThisCardClicked, setIsThisCardClicked] = useState(false);
    let isThisCardClickedController ={
        isThisCardClicked,
        setIsThisCardClicked
    }
    const {indexCount, setIndexCount} = props.indexCountController;
    const [thisNewZIdx, setThisNewZIdx] = useState(0);
    useEffect(()=>{
        let temp = {
            x: props.selectedzoneposinfo.x,
            y: props.selectedzoneposinfo.y,
            width: props.selectedzoneposinfo.width,
            height: props.selectedzoneposinfo.height,
        };
        setSelectedPosInfo(temp);
    }, [])
    
    useEffect(()=>{
        let tempArr = props.childCardStateArrController.childCardStateArr;
        tempArr[_count] = {
            isThisCardClicked : isThisCardClicked,
            setIsThisCardClicked : setIsThisCardClicked,
            isFliped : isFliped,
            setIsFliped : setIsFliped,
            isInSpreadZone : isInSpreadZone,
        }
        props.childCardStateArrController.setChildCardStateArr(tempArr);
    }, [])
    const _zIdx = props.zIdx;
    
    const onRotateHandler = (e) => {
        e.preventDefault();
        if(isInSpreadZone === true){
            if(isRotate === false){
                setRotate(!isRotate)
            }else{ // true
                setRotate(!isRotate)
            }
        }
    }
    const trackPos = (data) => {
        setPosition({ x : data.x , y : data.y });
    }
    
    
    const onDragHandler = (e) =>{
        e.preventDefault();
        posX = e.clientX;
        posY = e.clientY;
        if(isInSpreadZone === false){
            if(posX > newDragArea.left
                && posX < newDragArea.right
                && posY > newDragArea.top
                && posY < newDragArea.bottom){
                    let temp = isInCount;
                    temp--;
                    setIsInCount(temp);
                    let tempIdx = indexCount;
                    tempIdx++;
                    setThisNewZIdx(tempIdx);
                    setIndexCount(tempIdx);
                    setIsInSpreadZone(true);

                    let tempArr = props.childCardStateArrController.childCardStateArr;
                    tempArr[_count] = {
                        isThisCardClicked : isThisCardClicked,
                        setIsThisCardClicked : setIsThisCardClicked,
                        isFliped : isFliped,
                        setIsFliped : setIsFliped,
                        isInSpreadZone : true,
                    }
                    props.childCardStateArrController.setChildCardStateArr(tempArr);
                }
        }
    }
    
  return (
    <>
        <Draggable nodeRef={cardRef} onDrag={(e, data) => {trackPos(data)}}>
            <DragCardContainer
                selectedposinfo={selectedPosInfo}
                mainspreadposinfo={mainSpreadPosInfo}
                horizontal={horizontal}
                ref={cardRef}
                imgsrc={isFliped === false 
                    ? `${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`
                    : `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${dragCardNumArr[_count]}.png`
                }
                variants={cardVariants}
                animate={
                    isRotate === false 
                    ? "rotateFalse"
                    : "rotateTrue"
                }
                whileDrag="hover"
                drag
                draggable="true"
                onDrag={e => onDragHandler(e)}
                dragSnapToOrigin={isInSpreadZone === false ? true : false}
                dragConstraints={isInSpreadZone === false ? props.refArr[0] : props.refArr[1]}
                dragPropagation={false}
                dragMomentum={false}
                // style={{
                //     zIndex: _zIdx,
                // }}
                style={isInSpreadZone === false
                    ? {zIndex: _zIdx,}
                    : {zIndex: thisNewZIdx,}
                }
                onDoubleClick={e => onRotateHandler(e)}
                custom={isRotate}
            >
                {_zIdx}
                {isInSpreadZone === true 
            ? <span> {imgnum} </span> 
            : null}
            </DragCardContainer>
        </Draggable>
    </>
  )
}

export default DragCardInfo