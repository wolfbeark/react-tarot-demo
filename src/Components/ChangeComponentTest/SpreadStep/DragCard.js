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
            if(props.count < props.usersetnumber){
                return css`
                    left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                    top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                `
            }
            else if(props.count >= props.usersetnumber){
                if(props.isclickedlenormandtotal === "false"){
                    return css`
                        left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                        top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                    `
                }
                else if(props.isclickedlenormandtotal === "true"){
                    if(props.count >= props.lenormandtotalidx[0]
                        && props.count <= props.lenormandtotalidx[35])
                        {
                            return css`
                                left: calc(50% - ${props => props.selectedposinfo.width/2}px + ${props => props.modetempx});
                                top: calc(50% - ${props => props.selectedposinfo.height/2}px + ${props => props.modetempy});
                            `
                        }
                    else{
                        return css`
                            left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                            top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                        `
                    }
                }
            }
            
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
                if(props.isclickedlenormandtotal === "false"){
                    return css`
                        left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                        top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                    `
                }
                else if(props.isclickedlenormandtotal === 'true'){
                    if(props.count >= props.lenormandtotalidx[0]
                        && props.count <= props.lenormandtotalidx[35])
                        {
                            return css`
                                left: calc(50% - ${props => props.selectedposinfo.width/2}px + ${props => props.modetempx});
                                top: calc(50% - ${props => props.selectedposinfo.height/2}px + ${props => props.modetempy});
                            `
                        }
                    else{
                        return css`
                            left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
                            top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
                        `
                    }
                    
                }
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
    //background-color: skyblue;
    background-image: url(${(props) => props.imgsrc});
    border-radius: 10px;
    background-size: 100% 100%;
    color: white;
    position: absolute;
    //left: ${(props) => props.selectedposinfo.x - props.mainspreadposinfo.x}px;
    //top : ${(props) => props.selectedposinfo.y - props.mainspreadposinfo.y}px;
    cursor: pointer;
    
    ${(props) =>{
        if(props.isthiscardhide === 'true'){
            return css`
                display: none;
            `
        }
        else if(props.isthiscardhide === 'false'){
            return css`
                display: flex;
            `
        }
    }}
    
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
    const [isInSpreadZone, setIsInSpreadZone] = useState(false); // 컴포넌트 7번
    const { isInCount , setIsInCount } = props.isInCounter;
    const [thisNewZIdx, setThisNewZIdx] = useState(0);
    let _count = props.count;
    
    let [isThisCardClicked, setIsThisCardClicked] = useState(false);
    let isThisCardClickedController ={
        isThisCardClicked,
        setIsThisCardClicked
    }
    let {
        isClickedLenormandTotal,
        setIsClickedLenormandTotal
    } = props.isClickedLenormandTotalController;

    let lenormandTotalIdx = props.lenormandTotalIdx;

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
        "-30%",
        "-20%",
        "-40%",
        "-30%",
        "-40%",
        "-20%",
        "-30%"
    ]
    let tempHexaY = [
        "-10%", // 7
        "-20%", // 6
        "-20%", // 5
        "+15%", // 4
        "+5%", // 3
        "+5%", // 2
        "-35%" // 1
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
    let lenormandTotalX = [ // 야 이것도 역순이다 35 -> 0
        "25%",
        "15%",
        "5%",
        "-5%",
        "-15%",

        "-25%",
        "45%",
        "35%",
        "25%",
        "15%",

        "5%",
        "-5%",
        "-15%",
        "-25%",
        "-35%",

        "-45%",
        "45%",
        "35%",
        "25%",
        "15%",

        "5%",
        "-5%",
        "-15%",
        "-25%",
        "-35%",

        "-45%", // 11

        "45%", // 10
        "35%",
        "25%",
        "15%",

        "5%",
        "-5%",
        "-15%",
        "-25%",
        "-35%",
        "-45%", // 1

    ]
    let lenormandTotalY = [
        "38%",
        "38%",
        "38%",
        "38%",
        "38%",

        "38%",
        "13%",
        "13%",
        "13%",
        "13%",

        "13%",
        "13%",
        "13%",
        "13%",
        "13%",

        "13%",
        "-12%", // 20
        "-12%",
        "-12%",
        "-12%",

        "-12%",
        "-12%",
        "-12%",
        "-12%",
        "-12%",

        "-12%", // 11

        "-37%", // 10
        "-37%",
        "-37%",
        "-37%",

        "-37%",
        "-37%",
        "-37%",
        "-37%",
        "-37%",
        "-37%",

    ]

    const [threeCardPosArr, setThreeCardPosArr] = useState(_tempThreeX);
    const [modetempx, setModeTempX] = useState();
    const [modetempy, setModeTempY] = useState();

    let { imgTypeArr, setImgTypeArr } = props.imgTypeControler;
    let setFindImageType = props.setFindImageType;
    const [imgRoute, setImgRoute] = useState();

    const [isThisCardHide, setIsThisCardHide] = useState(false);
    const [thisCardLenorTotal, setThisCardLenorTotal] = useState(false);
    const [lenormandIdxNum, setLenormandIdxNum] = useState(0);

    useEffect(()=>{
        setThisCount(_count);
    }, [])
    
    // Lenormand Total Test
    useEffect(()=>{ // idx 번호 캐치 // 레노토탈 테스트중
        if(isClickedLenormandTotal === true){
             let _firstIdx = lenormandTotalIdx[0];
             let _lastIdx = lenormandTotalIdx[35];
            if(_count >= _firstIdx
                && _count <= _lastIdx)
            {
                for(let i = 0; i < lenormandTotalIdx.length; i++)
                {
                    if(lenormandTotalIdx[i] === _count)
                    {
                        setLenormandIdxNum(i);
                        setModeTempX(lenormandTotalX[i]);
                        //console.log('tjtjtjtj') 여기 작동함
                        setModeTempY(lenormandTotalY[i]);
                        setThisCardLenorTotal(true);
                        break;
                    } 
                }
                //setIsInSpreadZone(true); // 추가 이후로 포지션 제대로 못잡음 // 22.08.04
                // ExtraLenormand에서 reverse한 것도 있음.
                // 테스트 결과 리버스와 상관없이. setIsInSpreadZone(true); 추가로
                // 포지셔닝이 안되는 것을 확인함.
            }
        }
    }, [isClickedLenormandTotal])


    // imgTypeArr Test
    useEffect(() =>{
        let _tempTypeArr = imgTypeArr;
        switch(_tempTypeArr[_count]){
            case "T":
            setImgRoute(
                `/images/ArcanaOfCard/DefaultImages/TotalImages/Default${dragCardNumArr[_count]}.png` // thiscount 원래 _count였음
            );
            break;
            case "L":
            setImgRoute(
                `/images/Lenormand/DefaultImages/Default_Lenormand${dragCardNumArr[_count]}.png`
            );
            // thiscardimgType = useState()
            // setthiscardimgtype("L")
            // 는 어떨까?
            break;
            case "I":
            setImgRoute(
                `/images/IChing/iching${dragCardNumArr[_count]}.png`
            )
            break;
            default :

            break;
        }
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
                //setIsInSpreadZone(true);
            }
            else if(_count >= lenormandTotalIdx[0]
                && _count <= lenormandTotalIdx[35]
                && isClickedLenormandTotal === true){
                setIsInSpreadZone(true);
                let tempIdx = userSetNumber + indexCount + 10;
                tempIdx++;
                setThisNewZIdx(tempIdx);
                setIndexCount(tempIdx);
            }
        }
        else if(modeNumber === 0){
            if(_count >= lenormandTotalIdx[0]
                && _count <= lenormandTotalIdx[35]
                && isClickedLenormandTotal === true){
                setIsInSpreadZone(true);
                let tempIdx = userSetNumber + indexCount + 10;
                tempIdx++;
                setThisNewZIdx(tempIdx);
                setIndexCount(tempIdx);
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
            if(isClickedLenormandTotal === false){
                let tempArr = props.childCardStateArrController.childCardStateArr;
                tempArr[_count] = {
                    isThisCardClicked : isThisCardClicked,
                    setIsThisCardClicked : setIsThisCardClicked,
                    isFliped : isFliped,
                    setIsFliped : setIsFliped,
                    isInSpreadZone : isInSpreadZone, // 스프레드 존 안에 없음.
                    isThisCardHide : isThisCardHide, // Hide 테스트
                    setIsThisCardHide : setIsThisCardHide // Hide 테스트
                }
                props.childCardStateArrController.setChildCardStateArr(tempArr);
            }
            else if(isClickedLenormandTotal === true){
                if( _count >= lenormandTotalIdx[0]
                    && _count <= lenormandTotalIdx[35]
                    //&& thisCardLenorTotal === true
                ){
                    let tempArr = props.childCardStateArrController.childCardStateArr;
                        tempArr[_count] = {
                            isThisCardClicked : isThisCardClicked,
                            setIsThisCardClicked : setIsThisCardClicked,
                            isFliped : isFliped,
                            setIsFliped : setIsFliped,
                            isInSpreadZone : true, // 스프레드 존 안에 있음
                            isThisCardHide : isThisCardHide, // Hide 테스트
                            setIsThisCardHide : setIsThisCardHide // Hide 테스트
                    }
                    props.childCardStateArrController.setChildCardStateArr(tempArr);
                }
                else{
                    let tempArr = props.childCardStateArrController.childCardStateArr;
                        tempArr[_count] = {
                            isThisCardClicked : isThisCardClicked,
                            setIsThisCardClicked : setIsThisCardClicked,
                            isFliped : isFliped,
                            setIsFliped : setIsFliped,
                            isInSpreadZone : isInSpreadZone, // 스프레드 존 안에 없음
                            isThisCardHide : isThisCardHide, // Hide 테스트
                            setIsThisCardHide : setIsThisCardHide // Hide 테스트
                        }
                        props.childCardStateArrController.setChildCardStateArr(tempArr);
                }
            }
            
        }
        else if(modeNumber !== 0){
            if(_count < userSetNumber){
                let tempArr = props.childCardStateArrController.childCardStateArr;
                tempArr[_count] = {
                    isThisCardClicked : isThisCardClicked,
                    setIsThisCardClicked : setIsThisCardClicked,
                    isFliped : isFliped,
                    setIsFliped : setIsFliped,
                    isInSpreadZone : true, // 스프레드 존 안에 있음
                    isThisCardHide : isThisCardHide, // Hide 테스트
                    setIsThisCardHide : setIsThisCardHide // Hide 테스트
                }
                props.childCardStateArrController.setChildCardStateArr(tempArr);

            }
            else if(_count >= userSetNumber ){
                if(isClickedLenormandTotal === false)
                {
                    let tempArr = props.childCardStateArrController.childCardStateArr;
                    tempArr[_count] = {
                        isThisCardClicked : isThisCardClicked,
                        setIsThisCardClicked : setIsThisCardClicked,
                        isFliped : isFliped,
                        setIsFliped : setIsFliped,
                        isInSpreadZone : isInSpreadZone, // 스프레드 존 안에 없음
                        isThisCardHide : isThisCardHide, // Hide 테스트
                        setIsThisCardHide : setIsThisCardHide // Hide 테스트
                    }
                    props.childCardStateArrController.setChildCardStateArr(tempArr);

                }
                else if(isClickedLenormandTotal === true)
                {
                    if( _count >= lenormandTotalIdx[0]
                        && _count <= lenormandTotalIdx[35]
                        //&& thisCardLenorTotal === true
                    )
                    {
                        let tempArr = props.childCardStateArrController.childCardStateArr;
                        tempArr[_count] = {
                            isThisCardClicked : isThisCardClicked,
                            setIsThisCardClicked : setIsThisCardClicked,
                            isFliped : isFliped,
                            setIsFliped : setIsFliped,
                            isInSpreadZone : true, // 스프레드 존 안에 있음
                            isThisCardHide : isThisCardHide, // Hide 테스트
                            setIsThisCardHide : setIsThisCardHide // Hide 테스트
                        }
                        props.childCardStateArrController.setChildCardStateArr(tempArr);
                    }
                    else{
                        let tempArr = props.childCardStateArrController.childCardStateArr;
                        tempArr[_count] = {
                            isThisCardClicked : isThisCardClicked,
                            setIsThisCardClicked : setIsThisCardClicked,
                            isFliped : isFliped,
                            setIsFliped : setIsFliped,
                            isInSpreadZone : isInSpreadZone, // 스프레드 존 안에 없음
                            isThisCardHide : isThisCardHide, // Hide 테스트
                            setIsThisCardHide : setIsThisCardHide // Hide 테스트
                        }
                        props.childCardStateArrController.setChildCardStateArr(tempArr);
                    }
                }
                
            }
            
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
                        isThisCardHide : isThisCardHide, // Hide 테스트
                        setIsThisCardHide : setIsThisCardHide // Hide 테스트
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
    const newZoomHandler = () =>{
        if(props.isClickedFind === true){
            // lenormandNameArr
            let _str;
            let flag = imgTypeArr[_count];
            //console.log(imgTypeArr[_count]) // 정상
            switch(flag){
                case "T":
                    _str = props.cardNameArr[imgnum];
                break;
                case "L":
                    _str = props.lenormandNameArr[imgnum];
                break;
                case "I":
                    _str = props.ichingNameArr[imgnum];
                break;
                default:

                break;
            }
            setFindImageType(flag);
            props.setFindCardName(_str);
            setCardImage(imgnum);
            setWhatMode(false);

        }
    } 
  return (
    <Draggable nodeRef={cardRef} 
        onDrag={(e, data) => {
            if(isThisCardHide === false){
                trackPos(data)
            }
        }}>
        <DragCardContainer2
            usersetnumber={userSetNumber}
            isclickedlenormandtotal={isClickedLenormandTotal === false ? "false" : "true"}
            lenormandtotalidx={lenormandTotalIdx}
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
                : `${process.env.PUBLIC_URL}${imgRoute}`
            }
            style={isInSpreadZone === false
                ? {
                    zIndex: _zIdx,
                }
                : {
                    zIndex: thisNewZIdx,
                    transition: 'background-image 0.5s ease-in-out',
                }
            }
            dragSnapToOrigin={isInSpreadZone === false ? true : false}
            dragConstraints={isInSpreadZone === false ? props.refArr[0] : props.refArr[1]}
            dragMomentum={false}
            onDrag={(e) =>{
                if(isThisCardHide === false){
                    onDragHandler(e)
                }
            }}
            variants={cardVariants}
            animate={
                isRotate === false 
                ? "rotateFalse"
                : "rotateTrue"
            }
            whileDrag="hover"
            onDoubleClick={(e) =>{
                if(isThisCardHide === false){
                    onRotateHandler(e)
                }
            }}
            onClick={()=>{
                if(isInSpreadZone === true 
                    && isFliped === true
                    && isThisCardHide === false){
                    //zoomHandler();
                    newZoomHandler();
                }
            }}
            isthiscardhide={isThisCardHide === true ? 'true' : 'false'}

        >
            {/* {imgnum}
            {_zIdx} */}
        </DragCardContainer2>
    </Draggable>
  )
}

export default DragCard