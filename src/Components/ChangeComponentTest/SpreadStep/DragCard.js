import React, {useRef, useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {motion} from 'framer-motion'
import Draggable from 'react-draggable'

let posX = 0;
let posY = 0;

const DragCardContainer = styled(motion.div)`
    width: ${(props) => props.selectedposinfo.width}px;
    height: ${(props) => props.selectedposinfo.height}px;
    background-color: skyblue;
    background-image: url(${(props) => props.imgsrc});
    border-radius: 10px;
    background-size: 100% 100%;
    color: white;
    position: absolute;
    left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
    top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
    cursor: pointer;
    left: 0;
    top: 0;
    
`
const DragCardContainer2 = styled(motion.div)`

    width: ${(props) => props.selectedposinfo.width}px;
    height: ${(props) => props.selectedposinfo.height}px;
    ${(props)=>{
        if(props.modenumber === 0){
            return css`
                left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                
            `
        }
        else if(props.modenumber !== 0){
            if(props.count < props.usersetnumber){
                return css`
                    left: calc(50% - ${props => props.selectedposinfo.width/2}px + ${props => props.modetempx});
                    top: calc(50% - ${props => props.selectedposinfo.height/2}px + ${props => props.modetempy});
                `
            }
            else if(props.count >= props.usersetnumber){
                return css`
                    left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                    top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                `
            }
        }
    }}
    ${(props) =>{
        if(props.modeNumber === 2
            && props.count === 8){
            return css`
                transform: rotateZ(-90deg);
            `
        }
    }}
    
    //width: 20%;
    //height: 25%;
    background-color: skyblue;
    background-image: url(${(props) => props.imgsrc});
    border-radius: 10px;
    background-size: 100% 100%;
    color: white;
    position: absolute;
    //left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
    //top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
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

function DragCard(props) {
    const modeNumber = props.modeNumber;
    const userSetNumber = props.userSetNumber;
    const [selectedPosInfo, setSelectedPosInfo] = useState({ x : 0, y : 0, width : 0, height : 0});
    const [position, setPosition] = useState({ x : 0, y : 0});
    let dragCardNumArr = props.dragCardNumArr;
    
    const cardRef = useRef();
    const mainSpreadPosInfo = props.mainSpreadZonePosInfo;

    const _zIdx = props.zIdx;
    const newIdxNum = props.newIdxNum;
    const imgnum = props.imgnum;

    const {indexCount, setIndexCount} = props.indexCountController;
    const newDragArea = props.newDragArea;
    const [isInSpreadZone, setIsInSpreadZone] = useState(false);
    const { isInCount , setIsInCount } = props.isInCounter;
    const [thisNewZIdx, setThisNewZIdx] = useState(0);
    let _count = props.count;
    let [isThisCardClicked, setIsThisCardClicked] = useState(false);
    let isThisCardClickedController ={
        isThisCardClicked,
        setIsThisCardClicked
    }
    const [isFliped, setIsFliped] = useState(false);
    const [isRotate, setRotate] = useState(false);
    let {findCardImage, setCardImage} = props.findCardControl;
    let { whatMode, setWhatMode } = props.whatModeControl;
    const [thiscount, setThisCount] = useState();
    let _tempThreeX = [
        "+15%",
        "0%",
        "-15%",
    ]
    
    let _tempThreeY = [
        "0%",
        "0%",
        "0%",
    ]

    let tempHexaX = [
        "0%",
        "+20%",
        "-20%",
        "0%",
        "-20%",
        "20%",
        "0%"
    ]
    let tempHexaY = [
        "0%", // 7
        "-15%", // 6
        "-15%", // 5
        "+30%", // 4
        "+20%", // 3
        "+20%", // 2
        "-30%" // 1
    ]

    let tempCelcticX = [
        "+40%",
        "+40%",
        "+40%",
        "+40%",
        "+20%",
        "0%",
        "-20%",
        "0%",
        "0%",
        "+5%",
        "-5%",
    ]

    
    let tempCelcticY = [
        "-35%",
        "-12%",
        "+12%",
        "+35%",
        "0%",
        "-35%",
        "0%",
        "+35%",
        "0%",
        "0%",
        "0%"
    ]

    const [threeCardPosArr, setThreeCardPosArr] = useState(_tempThreeX);
    const [modetempx, setModeTempX] = useState();
    const [modetempy, setModeTempY] = useState();

    
    useEffect(()=>{
        setThisCount(_count);
    }, [])
    useEffect(()=>{
        if(modeNumber !== 0){
            if(_count < userSetNumber){
                setIsInSpreadZone(true);
                let tempNum = userSetNumber;
                let tempNumArr = new Array(userSetNumber);
                for(let i = 0; i < userSetNumber; i++){
                    tempNum--;
                    tempNumArr[i] = tempNum;
                }
                let _temp = tempNumArr[_count] + indexCount;
                //_temp++;
                setThisNewZIdx(_temp);
                setIndexCount(_temp);
                setIsInSpreadZone(true);
            }
        }
    }, [])
    
    useEffect(()=>{
        if(modeNumber !== 0){
            //setIsInSpreadZone(true);
            switch(modeNumber){
                case 1:
                    if(_count < userSetNumber){
                        setModeTempX(_tempThreeX[_count]);
                        setModeTempY(_tempThreeY[_count]);
                    }
                break;
                case 2:
                    if(_count < userSetNumber){
                        setModeTempX(tempHexaX[_count]);
                        setModeTempY(tempHexaY[_count]);
                    }
                break;
                case 3:
                    if(_count === 8){
                        setRotate(true);
                    }
                    if(_count < userSetNumber){
                        setModeTempX(tempCelcticX[_count]);
                        setModeTempY(tempCelcticY[_count]);
                    }
                break;
                default:

                break;
            }
        }
    }, [])


    
    //console.log(props.selectedPosInfo)
    useEffect(()=>{
        let temp = {
            x: props.selectedZonePosInfo.x,
            y: props.selectedZonePosInfo.y,
            width: props.selectedZonePosInfo.width,
            height: props.selectedZonePosInfo.height,
        };
        setSelectedPosInfo(temp);
    }, []);

    useEffect(()=>{
        if(modeNumber === 0){
            let tempArr = props.childCardStateArrController.childCardStateArr;
            tempArr[_count] = {
                isThisCardClicked : isThisCardClicked,
                setIsThisCardClicked : setIsThisCardClicked,
                isFliped : isFliped,
                setIsFliped : setIsFliped,
                isInSpreadZone : isInSpreadZone, // 스프레드 존 안에 없음.
            }
            props.childCardStateArrController.setChildCardStateArr(tempArr);
        }
        else if(modeNumber !== 0){
            let tempArr = props.childCardStateArrController.childCardStateArr;
            tempArr[_count] = {
                isThisCardClicked : isThisCardClicked,
                setIsThisCardClicked : setIsThisCardClicked,
                isFliped : isFliped,
                setIsFliped : setIsFliped,
                isInSpreadZone : true, // 스프레드 존 안에 있음
            }
            props.childCardStateArrController.setChildCardStateArr(tempArr);
        }
    }, [])
    
    

    const trackPos = (data) => {
        setPosition({ x : data.x , y : data.y });
    }
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
                    if(modeNumber !== 0){
                        let tempIdx = userSetNumber + indexCount + 10;
                        tempIdx++;
                        setThisNewZIdx(tempIdx);
                        setIndexCount(tempIdx);
                        setIsInSpreadZone(true);
                    }
                    else{
                        let tempIdx = indexCount;
                        tempIdx++;
                        setThisNewZIdx(tempIdx);
                        setIndexCount(tempIdx);
                        setIsInSpreadZone(true);
                    }
                    
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
    const zoomHandler = () =>{
        if(props.isClickedFind === true){
            let _str = props.cardNameArr[imgnum];
            props.setFindCardName(_str);
            setCardImage(imgnum);
            setWhatMode(false);
        }
    }
  return (
    <Draggable nodeRef={cardRef} onDrag={(e, data) => {trackPos(data)}}>
        <DragCardContainer2
            usersetnumber={userSetNumber}
            threecardposarr={threeCardPosArr}
            modenumber={modeNumber}
            drag
            modetempx={modetempx}
            modetempy={modetempy}
            count={thiscount}
            ref={cardRef}
            selectedposinfo={selectedPosInfo}
            mainspreadposinfo={mainSpreadPosInfo}
            imgsrc={isFliped === false 
                ? `${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`
                : `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${dragCardNumArr[_count]}.png`
            }
            style={isInSpreadZone === false
                ? {zIndex: _zIdx,}
                : {zIndex: thisNewZIdx,}
            }
            dragSnapToOrigin={isInSpreadZone === false ? true : false}
            dragConstraints={isInSpreadZone === false ? props.refArr[0] : props.refArr[1]}
            dragMomentum={false}
            onDrag={e => onDragHandler(e)}
            variants={cardVariants}
            animate={
                isRotate === false 
                ? "rotateFalse"
                : "rotateTrue"
            }
            whileDrag="hover"
            onDoubleClick={e => onRotateHandler(e)}
            onClick={()=>{
                if(isInSpreadZone === true && isFliped === true){
                    zoomHandler();
                }
            }}

        >
            {/* {imgnum}
            {_zIdx} */}
        </DragCardContainer2>
    </Draggable>
  )
}

export default DragCard