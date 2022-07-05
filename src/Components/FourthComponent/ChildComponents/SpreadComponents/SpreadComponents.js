import React, { useEffect, useState, useRef } from 'react'
import styled from'styled-components';
import {motion} from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import {useNavigate} from 'react-router-dom';


import SpreadCurtain from './SpreadCurtain';
import MainSpreadZone from './MainSpreadZone';
import MakeExtraDeck from './MakeExtraDeck';
import Find from './Find';
import { setReset } from '../../../../redux/actions/gameManager_action';

const SpreadContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    background-color: beige;
    padding: 0 2%;

    position: relative;
`
const MainSpreadBox = styled(motion.div)`
    width: 80%;
    height: 95%;
    background-color: rgba(0, 0, 139, 0.7);
    border-radius: 10px;
    padding: 1%;
    & > div{
        width: 100%;
        height: 100%;
        background-color: darkblue;
        border-radius: 10px;
    }
    position: relative;
`
const OptionSpreadBox = styled(motion.div)`
    width: 18%;
    height: 95%;
    background-color: red;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
`
const ExtraCardBox = styled(motion.div)`
    background-image: url(${(props) => props.imgsrc});
    border-radius: 10px;
    background-size: 100% 100%;
    opacity: 1;
    
`
const OptionSpreadDeckBox = styled(motion.div)`
    width: 95%;
    height: 25%;
    
    background-color: tomato;
    border-radius: 10px;
    
    padding: 1%;
`

const OptionSpreadDragBox = styled(motion.div)`
    width: 40%;
    height: 90%;
    background-color: skyblue;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    

    position: relative;
    
    ${ExtraCardBox}{
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 10px;
        background-size: 100% 100%;
    }
    
`
const DeckZone = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: tomato;
    border-radius: 10px;

    
`

const OptionSpreadCount = styled(motion.div)`
    width: 95%;
    height: 20%;
    background-color: tomato;
    border-radius: 10px;
    padding: 2%;
    
    & > div{
        width: 100%;
        height: 100%;
        background-color: royalblue;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 0 2%;
        & div{
            width: 100%;
            height: 45%;
            background-color: skyblue;
            border-radius: 10px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            & span{
                font-family: "Jua";
                font-size: 1em;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
            }
            & > span{
                width: 70%;
                height: 100%;
                //background-color: gray;
            }
            & span:last-child{
                width: 25%;
                height: 80%;
                background-color: white;
            }
        }
    }
`
const OptionSpreadBtnBox = styled(motion.div)`
    width: 95%;
    height: 55%;
    background-color: tomato;
    border-radius: 10px;
    padding: 2%;
    & > div{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-color: royalblue;
        border-radius: 10px;
        padding: 2%;
    }
`
const OptionBtn = styled(motion.div)`
    width: 100%;
    height: 20%;
    background-color: #123456;
    border-radius: 10px;
    padding: 2%;
    & > button{
        width: 100%;
        height: 100%;
        outline: unset;
        border: none;
        border-radius: 10px;
        background-color: skyblue;
        font-family: "Jua";
        font-size: 1.5em;
        font-weight: 600;

    }
`
const optionBtnVariants = {
    hover: {
        scale: 1.05,
        boxShadow: '0 0 5px 2px #123456'
    },
    click: {
        scale: 1.0,
    },
    activeFalse:{

    }
}
const extraBtnVariants = {
    deactivate: {
        opacity: 0.5,
    },
    activate:{
        opacity: 1,
    }

}
const OptionFadeCurtain = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`
const optionFadeVariants = {
    initial:{
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    fadeIn:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        transition:{
            duration: 2,
        }
    },
    fadeOut:{
        backgroundColor: 'rgba'
    }
}


const OptionContainer = styled(motion.div)`
    width: 45%;
    height: 40%;
    position: absolute;
    z-index: 50;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius: 10px;

    background-color: gray;
    & > span{
        width: 100%;
        height: 30%;
        font-family: "Jua";
        text-align: center;
        font-size: 2em;
    }
    & > div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        height: 30%;
    }
`
const YesOrNoBox = styled(motion.div)`
    background-color: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;

    width: 40%;
    height: 80%;

    font-family: "Jua";
    text-align: center;
    font-size: 2em;
`
const yesOrNoOptionVariants ={
    initial:{
        boxShadow: 'none',
    },
    hover:{
        scale: 1.1,
        boxShadow: '0 0 10px 5px skyblue, 0 0 2px 1px white inset',
    },
    click:{
        scale: 1
    }
}
const SelectCardBox = styled(motion.div)`

    width: 70%;
    height: 80%;
    position: absolute;
    background-color: gray;
    
    z-index: 501;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    border-radius: 10px;
   
    
`
const SelectMenuBox = styled(motion.div)`
    width: 15%;
    height: 90%;
    background-color: beige;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 1% 0;
    border-radius: inherit;
`

const SelectOptionMenuBox = styled(motion.div)`
    width: 35%;
    height: 90%;
    background-color: beige;
    border-radius: inherit;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    & > div:nth-child(2){
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 45%;
    }
    
`
const SelectOptionImageBox = styled(motion.div)`
    width: 45%;
    height: 100%;
    border-radius: 10px;
    background-color: lemonchiffon;
    background-image: url(${(props) => props.imgsrc});
    background-size: 100% 100%; 
    box-shadow: 0 0 10px 5px gray;
    
`
const SelectCardTypeBtn = styled(motion.button)`
    outline: unset;
    border: none;
    width: 80%;
    height: 15%;
    background-color: gray;

    margin-bottom: 2%;
    font-family: "Jua";
    font-weight: 600;
    font-size: 1.5em;
    border-radius: 10px;

    cursor: pointer;
`
const SelectSemiTypeBox = styled(motion.div)`
    width: 40%;
    height: 90%;
    background-color: beige;
    border-radius: inherit;


    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 1% 0;
    scroll-behavior: auto;
    overflow: overlay;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 1vw;
    }
    ::-webkit-scrollbar-thumb {
        background-color: hsla(0, 0%, 42%, 0.49);
        border-radius: 100px;
    
    }
    // & ${SelectCardTypeBtn}{
    //     width: 80%;
    //     font-size: 1.2em;
    //     margin-bottom: 5%;
    // }
`
const SemiTypeBtn = styled(motion.button)`
    outline: unset;
    border: none;
    width: 80%;
    height: 40%;
    background-color: gray;

    margin-bottom: 5%;
    font-family: "Jua";
    font-weight: 600;
    font-size: 1.5em;
    border-radius: 10px;

    cursor: pointer;
`
const selectCardTypeVar = {
    hover:{
        scale: 1.1,
        boxShadow: '0 0 10px 5px gray',
    },
    click:{
        scale: 1.0,
    }
}
const SelectOptionBtnBox = styled(motion.div)`
    width: 100%;
    height: 35%;
    //background-color: seagreen;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
const SelectOptionBtn = styled(motion.button)`

    width: 90%;
    height: 40%;
    background-color: burlywood;
    outline: unset;
    border: none;
    border-radius: 10px;
    font-family: "Jua";
    font-size: 1.5em;
    font-weight: 600;
    
    transition: opacity 0.5s ease-in-out;
`
const optionBtnVar = {
    hover:{
        scale: 1.05,
        boxShadow: '0 0 10px 5px burlywood',
    },
    click:{
        scale: 0.9,
    }
}
const OptionPreviewChoiceSpanBox = styled(motion.div)`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    & span{
        font-family: "Jua";
        font-size: 1.5em;
        font-weight: 600;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 45%;
    }
`


function SpreadComponents() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const _totalSelectedNumArr = useSelector((state) => state.gameManager.totalSelectedNumArr);
    const _selectedCardCount = useSelector((state) => state.gameManager.selectedCardCount);
    const defaultTempObjData ={
        x : 0, 
        y : 0, 
        width : 0,
        height : 0, 
        left : 0, 
        top : 0, 
        right : 0, 
        bottom : 0,
    }
    let [isActiveCurtain, setActiveCurtain] = useState(true);
    let [dragCardNumArr, setDragCardNumArr] = useState(new Array(_selectedCardCount));
    const [selectedZonePosInfo, setSelectedZonePosInfo] = useState(defaultTempObjData);
    const [optionBoxInfo, setOptionBoxInfo] = useState(defaultTempObjData);
    const [isInCount, setIsInCount] = useState(_selectedCardCount); // 남은 카드 수량
    const [totalCount, setTotalCount] = useState(_selectedCardCount); // 총 카드 수량
    const isInCounter = {
        isInCount,
        setIsInCount
    }
    const totalCounter = {
        totalCount,
        setTotalCount
    }
    // Optional Control
    const [isActiveOptionCurtain, setIsActiveOptionCurtain] = useState(false);
    //const [isClickedExtra, setIsClickedExtra] = useState(false);
    const [optionType, setOptionType] = useState(0); // 0 : none, 1 : restart, 2 : Extra, 3 : Capture 4: Find
    // 플립버튼 컨트롤
    //const [flipCount, setFlipCount] = useState(0);
    const [activeFlipBtn, setActiveFlipBtn] = useState(true);

    // 새로운 z인덱스 컨트롤
    const [indexCount, setIndexCount] = useState(10);
    const indexCountController = {
        indexCount,
        setIndexCount,
    }
    // find & zoom
    const [isClickedFind, setClickedFind] = useState(false);
    const [findStateArr, setFindStateArr] = useState(null);
    const [findCardImage, setCardImage] = useState(100);
    const [whatMode, setWhatMode] = useState(false); // false: zoom, true: find

    const [selectFindImageNum, setSelectFindImageNum] = useState(100);
    const [selectFindCardName, setSelectFindCardName] = useState(null);
    const findCardControl = {
        findCardImage,
        setCardImage
    }
    const whatModeControl = {
        whatMode,
        setWhatMode,
    }
    const cardNameArr = [
        "THE FOOL",
        "THE MAGICIAN",
        "THE HIGH PRIESTESS",
        "THE EMPRESS",
        "THE EMPEROR",
        "THE HIEROPHANT",
        "THE LOVERS",
        "THE CHARIOT",
        "STRENGTH",
        "THE HERMIT",
        "THE WHEEL OF FORTUNE",
        "JUSTICE",
        "THE HANGED MAN",
        "DEATH",
        "TEMPERANCE",
        "THE DEVIL",
        "THE TOWER",
        "THE STAR",
        "THE MOON",
        "THE SUN",
        "JUDGEMENT",
        "THE WORLD",
        "WAND 1",
        "WAND 2",
        "WAND 3",
        "WAND 4",
        "WAND 5",
        "WAND 6",
        "WAND 7",
        "WAND 8",
        "WAND 9",
        "WAND 10",
        "PAGE OF WANDS",
        "KNIGHT OF WANDS",
        "QUEEN OF WANDS",
        "KING OF WANDS",
        "SWORD 1",
        "SWORD 2",
        "SWORD 3",
        "SWORD 4",
        "SWORD 5",
        "SWORD 6",
        "SWORD 7",
        "SWORD 8",
        "SWORD 9",
        "SWORD 10",
        "PAGE OF SWORDS",
        "KNIGHT OF SWORDS",
        "QUEEN OF SWORDS",
        "KING OF SWORDS",
        "CUP 1",
        "CUP 2",
        "CUP 3",
        "CUP 4",
        "CUP 5",
        "CUP 6",
        "CUP 7",
        "CUP 8",
        "CUP 9",
        "CUP 10",
        "PAGE OF CUPS",
        "KNIGHT OF CUPS",
        "QUEEN OF CUPS",
        "KING OF CUPS",
        "PENTACLE 1",
        "PENTACLE 2",
        "PENTACLE 3",
        "PENTACLE 4",
        "PENTACLE 5",
        "PENTACLE 6",
        "PENTACLE 7",
        "PENTACLE 8",
        "PENTACLE 9",
        "PENTACLE 10",
        "PAGE OF PENTACLES",
        "KNIGHT OF PENTACLES",
        "QUEEN OF PENTACLES",
        "KING OF PENTACLES",
    ]
    const [findCardName, setFindCardName] = useState();
    const [findCardType, setFindCardType] = useState(10);
    const [selectedTypeArr, setSelectedTypeArr] = useState([]);

    const [isSemiHover, setSemiHover] = useState(false);
    const [isSemiHoverNum, setIsSemiHoverNum] = useState(100);
    const [choiceSemiNumClick, setChoiceSemiNumClick] = useState(100);
    // 캡쳐
    const [isClickedCapture, setClickedCapture] = useState(false);

    const mainBox = useRef(MainSpreadBox);
    const selectedDeckZoneRef = useRef(null);
    let [newDragArea, setNewDragArea] = useState();
    const allContainer = useRef();
    const optionBox = useRef(null);
    const [refArr, setRefArr] = useState([allContainer, mainBox]);
    let _tempChildClickArr = new Array(_selectedCardCount);
    _tempChildClickArr.fill({
        isThisCardClicked : false,
        setIsThisCardClicked : null,
        isFliped : false,
        setIsFliped : null,
        isInSpreadZone : false,
        currentCardState : "rotateFalse",
    });
    let [childCardStateArr, setChildCardStateArr] = useState(_tempChildClickArr);

    let childCardStateArrController ={
        childCardStateArr,
        setChildCardStateArr
    }


    useEffect(()=>{
        const temp = optionBox.current.getBoundingClientRect();
        const _temp = {
            width: temp.width,
            height: temp.height,
        }
        setOptionBoxInfo(_temp);
    }, [])
    useEffect(()=>{ // 번호세팅
        let _dragCardNumArr = new Array(_selectedCardCount);
        for(let i = 0; i < _dragCardNumArr.length; i++){
            _dragCardNumArr[i] = _totalSelectedNumArr[i];
        }
        let tempArr = _dragCardNumArr.reverse();
        setDragCardNumArr(tempArr); 
    }, [_selectedCardCount, _totalSelectedNumArr])
    useEffect(()=>{ // 오프닝 커튼
        setTimeout(()=>{
            setActiveCurtain(false);
        }, 3000);
    }, [])
    useEffect(()=>{
        let tempArea = mainBox.current.getBoundingClientRect();
        const _newDragArea = {
            left : tempArea.left,
            width : tempArea.width,
            top : tempArea.top,
            hegiht : tempArea.height,
            x : tempArea.x,
            y : tempArea.y,
            right : tempArea.right,
            bottom : tempArea.bottom,
        }
        setNewDragArea(_newDragArea);
        // 전체 박스 ref, selectedDeckZone 크기 구하는거 필요
        // selectedDeckZone 크기
        const _tempSelectedZone = selectedDeckZoneRef.current.getBoundingClientRect();
        const _selectedZone ={
            x : _tempSelectedZone.x,
            y : _tempSelectedZone.y,
            width : _tempSelectedZone.width,
            height : _tempSelectedZone.height,
            left : _tempSelectedZone.left,
            top : _tempSelectedZone.top,
            right : _tempSelectedZone.right,
            bottom : _tempSelectedZone.bottom
        }
        setSelectedZonePosInfo(_selectedZone);

     }, [])
    
    
    
    const cardFlipHandler_test = () => {
        // for(let i = (childCardStateArr.length - 1); i >= isInCount; i--){
        //         // isInSpreadZone
        //     if(childCardStateArr[i].isInSpreadZone === false){
        //         continue;
        //     }
        //     else if(childCardStateArr[i].isInSpreadZone === true){
        //         childCardStateArr[i].setIsFliped(true);                    
        //         // if(test === childCardStateArr.length){
        //         //     setActiveFlipBtn(false)
        //         // }
        //         // else if(test !== childCardStateArr.length){
        //         //     setActiveFlipBtn(true);
        //         // }
        //     }
        // }
        for(let i = 0; i < childCardStateArr.length; i++){
            if(childCardStateArr[i].isInSpreadZone === false){
                continue;
            }
            else if(childCardStateArr[i].isInSpreadZone === true){
                childCardStateArr[i].setIsFliped(true);                    
                // if(test === childCardStateArr.length){
                //     setActiveFlipBtn(false)
                // }
                // else if(test !== childCardStateArr.length){
                //     setActiveFlipBtn(true);
                // }
            }
        }
        
    }
    
    const onCaptureHandler = (e) =>{
        e.preventDefault();
        //console.log('capture test');
        html2canvas(document.getElementById('spreadContainer'))
        .then( canvas =>{
            onSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
        });
        setOptionType(0);
        setIsActiveOptionCurtain(false);
    }
    const onSaveAs = (uri, filename) =>{
        //console.log('onSaveAs');
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.href = uri;
        link.download = filename;
        //link.style.zIndex = "1000";
        //link.style.position = "absolute";
        //console.dir(link);
        link.click();
        document.body.removeChild(link);
        //window.location.reload();
    }

    const selectedTypeHandler = (type) =>{
        let tempArr = [];
        switch(type){
            case 0:
                for(let i = 0; i < 22; i++){ // Major
                    tempArr.push(cardNameArr[i]);
                }
                setSelectedTypeArr(tempArr);
                setFindCardType(0);
            break;
            case 1:
                for(let i = 22; i < 36; i++){ // Wand
                    tempArr.push(cardNameArr[i]);
                }
                setSelectedTypeArr(tempArr);
                setFindCardType(1);
            break;
            case 2:
                for(let i = 36; i < 50; i++){ // Sword
                    tempArr.push(cardNameArr[i]);
                }
                setSelectedTypeArr(tempArr);
                setFindCardType(2);
            break;
            case 3:
                for(let i = 50; i < 64; i++){ // Cup
                    tempArr.push(cardNameArr[i]);
                }
                setSelectedTypeArr(tempArr);
                setFindCardType(3);
            break;
            case 4:
                for(let i = 64; i < 78; i++){ // Pentacle
                    tempArr.push(cardNameArr[i]);
                }
                setSelectedTypeArr(tempArr);
                setFindCardType(4);
            break;
            default:
                return;
        }
    }

    
  return (
    <>
        <SpreadContainer
            id="spreadContainer"
            ref={allContainer}
            onDrop={(e)=>{
                //console.log('ondrop')
                let data = e.currentTarget.dataTransfer.getData("Text");
                e.target.appendChild(document.getElementById(data));
            }}
            onDragOver={(e)=>{
                //console.log('ondragOver')
                e.preventDefault();
            }}    
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
            }}>
            <MainSpreadBox
                className='spreadZone'
                ref={mainBox}
                layoutId="spread"
            >
                <MainSpreadZone
                    selectedZonePosInfo={selectedZonePosInfo}
                    dragCardNumArr={dragCardNumArr}
                    childCardStateArrController={childCardStateArrController}
                    optionBoxInfo={optionBoxInfo}
                    newDragArea={newDragArea}
                    refArr={refArr}
                    isInCounter={isInCounter}
                    totalSelectedNumArr={_totalSelectedNumArr}
                    indexCountController={indexCountController}
                    isClickedFind={isClickedFind}
                    findCardControl={findCardControl}
                    cardNameArr={cardNameArr}
                    setFindCardName={setFindCardName}
                    whatModeControl={whatModeControl}
                >

                </MainSpreadZone>
                
                
            </MainSpreadBox>
            <OptionSpreadBox
                ref={optionBox}
            >
                <OptionSpreadDeckBox>
                    <DeckZone>
                        <OptionSpreadDragBox 
                            ref={selectedDeckZoneRef}
                        >
                                    {/* <>
                                    {dragCardNumArr.map((a, i) =>{
                                            return(
                                                <DragCardInfo  
                                                    className="item"
                                                    key={i}
                                                    count={i} 
                                                    zIdx={10+i}
                                                    imgnum={a} 
                                                    mainBox={mainBox}
                                                    optionBox={optionBox}
                                                    allContainer={allContainer}
                                                    newDragArea={newDragArea}
                                                    childCardStateArrController={childCardStateArrController}
                                                >
                                                </DragCardInfo>
                                            );
                                    })}
                                    </> */}
                                
                            
                        </OptionSpreadDragBox>
                        <OptionSpreadDragBox
                        >
                            <ExtraCardBox
                                imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`}
                                variants={extraBtnVariants}
                                animate={isInCount !== 0 ? 'deactivate' : 'activate'}
                                style={isInCount !== 0 
                                    ? {cursor: 'auto'}
                                    : {cursor: 'pointer'}
                                }
                                onClick={()=>{
                                    if(isInCount === 0){
                                        setIsActiveOptionCurtain(true);
                                        setTimeout(()=>{
                                            setOptionType(2);
                                        }, 2000);
                                    }
                                    
                                }}
                            >

                            </ExtraCardBox>
                        </OptionSpreadDragBox>
                    </DeckZone>
                </OptionSpreadDeckBox>
                <OptionSpreadCount>
                    <div>
                        <div>
                            <span>
                                카드 전체 수
                            </span>
                            <span>
                                {totalCount}
                            </span>
                        </div>
                        <div>
                            <span>
                                남은 카드 수
                            </span>
                            <span>
                                {isInCount}
                            </span>
                        </div>
                    </div>
                </OptionSpreadCount>
                <OptionSpreadBtnBox>
                    <div>
                        <OptionBtn
                            variants={optionBtnVariants}
                            whileHover={isInCount === 0 ? "hover" : ""}
                            whileTap={isInCount === 0 ? "click" : ""}
                            style={isInCount === 0 
                                ?{
                                    opacity: 1,
                                    transition: `opacity 1s ease-in-out`,
                                    cursor: 'pointer',
                                } 
                                :{
                                    opacity: 0.5,
                                    transition: `opacity 1s ease-in-out`,
                                    cursor: 'auto',
                                }}
                        >
                            <button
                                style={isInCount === 0 
                                    ?{
                                        opacity: 1,
                                        transition: `opacity 1s ease-in-out`,
                                        cursor: 'pointer',
                                    } 
                                    :{
                                        opacity: 0.5,
                                        transition: `opacity 1s ease-in-out`,
                                        cursor: 'auto',
                                    }}
                                onClick={()=>{
                                    if(isInCount === 0){
                                        setIsActiveOptionCurtain(true);
                                        setTimeout(()=>{
                                            setOptionType(1);
                                        }, 2000);
                                    }
                                }}
                            >
                                Restart
                            </button>
                        </OptionBtn>
                        <OptionBtn
                            variants={optionBtnVariants}
                            whileHover="hover"
                            whileTap="click"
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <button
                                onClick={()=>{
                                    setClickedFind(!isClickedFind)
                                }}
                                style={{
                                    cursor: 'pointer'
                                }}
                            >
                                Find & Zoom
                            </button>
                        </OptionBtn>
                        <OptionBtn
                            variants={optionBtnVariants}
                            whileHover={activeFlipBtn === true && isInCount !== totalCount ? "hover" : ""}
                            whileTap={activeFlipBtn === true && isInCount !== totalCount ? "click" : ""}
                            style={activeFlipBtn === true && isInCount !== totalCount
                                ?{
                                    opacity: 1,
                                    transition: `opacity 1s ease-in-out`,
                                    cursor: 'pointer',
                                } 
                                :{
                                    opacity: 0.5,
                                    transition: `opacity 1s ease-in-out`,
                                    cursor: 'auto',
                                }}
                        >
                            <button
                                onClick={()=>{
                                    if(activeFlipBtn === true) //&& isInCount !== totalCount)
                                    {
                                        cardFlipHandler_test()
                                    }
                                }}
                                style={activeFlipBtn === true && isInCount !== totalCount
                                    ?{
                                        opacity: 1,
                                        transition: `opacity 1s ease-in-out`,
                                        cursor: 'pointer',
                                    } 
                                    :{
                                        opacity: 0.5,
                                        transition: `opacity 1s ease-in-out`,
                                        cursor: 'auto',
                                    }}
                            >
                                Flip
                            </button>
                        </OptionBtn>
                        <OptionBtn
                            variants={optionBtnVariants}
                            whileHover={isClickedCapture !== true ? "hover" : ""}
                            whileTap={isClickedCapture !== true ? "click" : ""}
                            style={isClickedCapture !== true
                                ?{
                                    opacity: 1,
                                    transition: `opacity 1s ease-in-out`,
                                    cursor: 'pointer',
                                } 
                                :{
                                    opacity: 0.5,
                                    transition: `opacity 1s ease-in-out`,
                                    cursor: 'auto',
                                }}
                            
                        >
                            <button
                                onClick={()=>{
                                        setIsActiveOptionCurtain(true);
                                        setClickedFind(false);
                                        setTimeout(()=>{
                                            setOptionType(3);
                                        }, 2000);
                                    
                                }}
                                style={isClickedCapture !== true
                                    ?{
                                        opacity: 1,
                                        transition: `opacity 1s ease-in-out`,
                                        cursor: 'pointer',
                                    } 
                                    :{
                                        opacity: 0.5,
                                        transition: `opacity 1s ease-in-out`,
                                        cursor: 'auto',
                                    }}
                            >
                                Capture
                            </button>
                        </OptionBtn>
                    </div>
                </OptionSpreadBtnBox>
            </OptionSpreadBox>
            

            {isActiveCurtain === true // curtain
            ? <SpreadCurtain />
            : null
        }    
            </div>
            {
                    isClickedFind === true
                    ?
                    <Find
                        refArr={refArr}
                        findStateArr={findStateArr}
                        setFindStateArr={setFindStateArr}
                        findCardImage={findCardImage}
                        findCardName={findCardName}
                        whatModeControl={whatModeControl}
                        setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                        isActiveOptionCurtain={isActiveOptionCurtain}
                        setOptionType={setOptionType}
                        selectFindImageNum={selectFindImageNum}
                        selectFindCardName={selectFindCardName}
                    >

                    </Find>
                    : null
                }
        </SpreadContainer>
        <>
        
        {
        isActiveOptionCurtain === true 
            ? 
            <OptionFadeCurtain
                variants={optionFadeVariants}
                animate={isActiveOptionCurtain === true ? "fadeIn" : ""}
            >
                <>
                    {
                    optionType === 2 // Extra
                        ? 
                        <MakeExtraDeck
                            setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                            setOptionType={setOptionType}
                            setDragCardNumArr={setDragCardNumArr}
                            dragCardNumArr={dragCardNumArr}
                            isInCounter={isInCounter}
                            totalCounter={totalCounter}
                        >

                        </MakeExtraDeck>
                        : null
                    }
                    {
                    optionType === 1 // Restart
                    ?
                    <OptionContainer>
                        <span>현재 타로를 중단하고 새로 시작하시겠습니까?</span>
                        <div>
                            <YesOrNoBox
                                variants={yesOrNoOptionVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="click"
                                onClick={()=>{
                                    dispatch(setReset());
                                    //navigate('/');
                                }}
                            >
                                Yes
                            </YesOrNoBox>
                            <YesOrNoBox
                                variants={yesOrNoOptionVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="click"
                                onClick={()=>{
                                    setIsActiveOptionCurtain(false);
                                    setOptionType(0);
                                }}
                            >
                                No
                            </YesOrNoBox>
                        </div>
                    </OptionContainer>
                    : null
                    }
                    {
                    optionType === 3 // Capture
                    ?
                    <OptionContainer>
                        <span>현재 스프레드를 저장하시겠습니까?</span>
                        <div>
                            <YesOrNoBox
                                variants={yesOrNoOptionVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="click"
                                onClick={(e)=>{
                                    
                                    if(isClickedCapture === false){
                                        setClickedCapture(true);
                                        onCaptureHandler(e);
                                    }
                                }}
                            >
                                Yes
                            </YesOrNoBox>
                            <YesOrNoBox
                                variants={yesOrNoOptionVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="click"
                                onClick={()=>{
                                    setIsActiveOptionCurtain(false);
                                    setOptionType(0);
                                }}
                            >
                                No
                            </YesOrNoBox>
                        </div>
                    </OptionContainer>
                    : null
                    }
                    {
                        optionType === 4
                        ?
                        <SelectCardBox>
                            <SelectMenuBox>
                                <SelectCardTypeBtn
                                    variants={selectCardTypeVar}
                                    whileHover="hover"
                                    whileTap="click"
                                    onClick={()=>{
                                        selectedTypeHandler(0);
                                    }}
                                >
                                    MAJOR
                                </SelectCardTypeBtn>
                                <SelectCardTypeBtn
                                    variants={selectCardTypeVar}
                                    whileHover="hover"
                                    whileTap="click"
                                    onClick={()=>{
                                        selectedTypeHandler(1);
                                    }}
                                >
                                    WAND
                                </SelectCardTypeBtn>
                                <SelectCardTypeBtn
                                    variants={selectCardTypeVar}
                                    whileHover="hover"
                                    whileTap="click"
                                    onClick={()=>{
                                        selectedTypeHandler(2);
                                    }}
                                >
                                    SWORD
                                </SelectCardTypeBtn>
                                <SelectCardTypeBtn
                                    variants={selectCardTypeVar}
                                    whileHover="hover"
                                    whileTap="click"
                                    onClick={()=>{
                                        selectedTypeHandler(3);
                                    }}
                                >
                                    CUP
                                </SelectCardTypeBtn>
                                <SelectCardTypeBtn
                                    variants={selectCardTypeVar}
                                    whileHover="hover"
                                    whileTap="click"
                                    onClick={()=>{
                                        selectedTypeHandler(4);
                                    }}
                                >
                                    PENTACLE
                                </SelectCardTypeBtn>
                            </SelectMenuBox>
                            <SelectSemiTypeBox>
                                {
                                    findCardType !== 10
                                    ?
                                    selectedTypeArr.map((a, i) =>{

                                        let tempNum = 0;
                                        switch(findCardType){
                                            case 0:
                                                tempNum = i;
                                            break;
                                            case 1:
                                                tempNum = 22 + i;
                                            break;
                                            case 2:
                                                tempNum = 36 + i;
                                            break;
                                            case 3:
                                                tempNum = 50 + i;
                                            break;
                                            case 4:
                                                tempNum = 64 + i;
                                            break;
                                            default:

                                            break;
                                        }
                                        return(
                                            <SemiTypeBtn
                                                key={i}
                                                imgnum={tempNum}
                                                variants={selectCardTypeVar}
                                                whileHover="hover"
                                                whileTap="click"
                                                onClick={()=>{
                                                    setChoiceSemiNumClick(tempNum);
                                                }}
                                                onHoverStart={()=>{
                                                    setSemiHover(true);
                                                    setIsSemiHoverNum(tempNum);
                                                }}
                                                onHoverEnd={()=>{
                                                    setSemiHover(false)
                                                    setIsSemiHoverNum(100);
                                                }}
                                            >
                                                {a}
                                            </SemiTypeBtn>
                                        );
                                    })
                                    : null
                                }
                            </SelectSemiTypeBox>
                            <SelectOptionMenuBox>
                                <OptionPreviewChoiceSpanBox>
                                    <span>Preview</span>
                                    <span>Your Choice</span>
                                </OptionPreviewChoiceSpanBox>
                                <div>
                                    <SelectOptionImageBox 
                                        imgsrc={
                                            isSemiHover !== false
                                            ? `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${isSemiHoverNum}.png`
                                            : ""
                                        }
                                    />
                                    <SelectOptionImageBox
                                        imgsrc={
                                            choiceSemiNumClick !== 100
                                            ? `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${choiceSemiNumClick}.png`
                                            : ""
                                        }
                                    />
                                </div>
                                
                                <SelectOptionBtnBox>
                                    <SelectOptionBtn
                                        variants={optionBtnVar}
                                        whileHover={choiceSemiNumClick !== 100 
                                            ? "hover"
                                            : ""
                                        }
                                        whileTap={choiceSemiNumClick !== 100
                                            ? "click"
                                            : ""
                                        }
                                        style={
                                            choiceSemiNumClick === 100
                                            ?
                                            {
                                                cursor: 'auto',
                                                opacity: 0.5,
                                            }
                                            :
                                            {
                                                cursor: 'pointer',
                                                opacity: 1,
                                            }
                                        }
                                        onClick={()=>{
                                            if(choiceSemiNumClick !== 100){
                                                let temp = choiceSemiNumClick;
                                                setSelectFindImageNum(temp);
                                                setSelectFindCardName(cardNameArr[temp]);
                                                setOptionType(0);
                                                setIsActiveOptionCurtain(false);
                                                setChoiceSemiNumClick(100);
                                                setSelectedTypeArr([]);
                                                setFindCardType(10);
                                                setWhatMode(true);
                                            }
                                        }}
                                    >
                                        CHOICE
                                    </SelectOptionBtn>
                                    <SelectOptionBtn
                                        variants={optionBtnVar}
                                        whileHover="hover"
                                        whileTap="click"
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={()=>{
                                            setOptionType(0);
                                            setIsActiveOptionCurtain(false);
                                            setChoiceSemiNumClick(100);
                                            setSelectedTypeArr([]);
                                            setFindCardType(10);
                                        }}
                                    >
                                        BACK
                                    </SelectOptionBtn>
                                </SelectOptionBtnBox>
                            </SelectOptionMenuBox>
                        </SelectCardBox>
                        : null
                    }
                </>
            </OptionFadeCurtain>
            : null
        }
        </>
            
    </>
  )
}

export default SpreadComponents