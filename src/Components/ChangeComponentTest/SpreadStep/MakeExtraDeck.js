import React, { useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import SelectDeck from './SelectDeck';

const MakeExtraContainer = styled(motion.div)`
    width: 70%;
    height: 80%;
    background-color: #123456;
    border-radius: 10px;

    padding: 1%;
`
const MakeExtraInContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: royalblue;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items : center;
    position: relative;
`
const SelectedDeckPannel = styled(motion.div)`
    
    width: 75%;
    height: 100%;
    background-color: royalblue;
    //border-radius: 10px;
    
    display: grid;
    grid-template-columns : repeat(5, minmax(18%, auto));
    grid-template-rows: repeat(2, minmax(100px, auto));
    column-gap: 2%;
    row-gap: 2%;
    align-items: center;
    // & div{
    //     width: 100%;
    //     height: 100%;
    //     background-color: black;
    // }
    padding: 0 1%;
`
const OptionContainer = styled(motion.div)` 

    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    background-color: #123456;
    box-sizing: border-box;

    
`
const OptionSelectedList = styled(motion.div)`

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    
    background-color: royalblue;
    width: 90%;
    height: 50%;
    padding: 2%;
    box-sizing: border-box;
`
const OptionSelectedInList = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: skyblue;
    border-radius: 10px;
`
const SelectedList = styled(motion.ul)`
    color: red;
    width: 100%;
    height: 100%;
    list-style: none;
    padding-left: 5%;
    & li{
        color: red;
        font-family: "Jua";
        font-size: 0.8em;
        width: 100%;
        height: auto;
    }
`
const OptionBoxContainer = styled(motion.div)`
    background-color: royalblue;
    width: 90%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
`
const OptionBtnBox = styled(motion.div)`

    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.setwidth ? props.setwidth+'%;' : '100%;'}
    height: ${(props) => props.setheight ? props.setheight+'%;' : '100%;'}
    background-color: skyblue;
    border-radius: 10px;
    padding: 2%;
    & > button{
        font-family: "Jua";
        font-size: 1.5em;
        width: 100%;
        height: 100%;
        outline: unset;
        border: none;
        color: wheat;
        border-radius: inherit;
        background-color: ${(props) => props.btncolor ? props.btncolor : 'blue'};
        
    }
`
const ExtraNoticeBox = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 100;
`
const ExtraNoticePanel = styled(motion.div)`
    width: 50%;
    height: 70%;
    background-color: gray;
    background-color: rgba(128, 128, 128, 0.95);
    border-radius: 10px;
    
    
    font-size: 2em;
    font-family: "Jua";
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;

    //box-shadow: 0 0 10px 5px rgba(128, 128, 128, 0.95);
`
const ExtraSetNumberBox = styled(motion.div)`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(128, 128, 128, 0);
    border-radius: inherit;
    
    & label,
    & input,
    & span{
        width: 95%;
        height: 15%;
        //background-color: skyblue;

        font-family: "Jua";
        font-size: 0.6em;
        border: none;
        outline: unset;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1% 0 0 0;

    }
    & span{
        color: rgba(0, 0, 0, 0.7);
        height: 10%;
        margin: 0 0 1% 0;
    }
    & input{
        width: 80%;
        border-radius: 10px;
        transition: all 0.2s ease-in-out;
        font-weight: 600;
        margin: 2% 0;
        &:focus{
            box-shadow: 0 0 10px 5px skyblue;
        }
        border: solid 5px skyblue;
    }
`
const ExtraSetNumberBtnBox = styled(motion.div)`
    
    width: 100%;
    height: 20%;
    //background-color: whitesmoke;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 3% 0 0 0;
    ${OptionBtnBox}{
        width: ${(props) => props.setwidth ? props.setwidth+'%;' : '100%;'}
        height: ${(props) => props.setheight ? props.setheight+'%;' : '100%;'}
        display: flex;
        justify-content: center;
        align-items: center;
        & > button{
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Jua";
            font-size: 0.6em;
            font-weight: 600;
            width: 100%;
            height: 100%;
            outline: unset;
            border: none;
            color: wheat;
            border-radius: inherit;
            background-color: ${(props) => props.btncolor ? props.btncolor : 'blue'};
        }
    }
`
const extraNoticeVariants = {
    initial:{
        width: 0,
        height: 0,
        color: 'rgba(0, 0, 0, 0)',
    },
    start:{
        width: '50%',
        height: '70%',
        color: 'rgba(0, 0, 0, 255)',
        transition:{
            delay: 0.5,
            duration: 0.2,
            color:{
                delay: 0.7,
            }
        }
    }
}
const extraNoticeBoxVariants={
    initial:{
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    start:{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        transition:{
            duration: 0.5
        }
    }
}
const extraSetNumberBoxVariants ={
    initial:{
        opacity: 0,
        width: 0,
        height: 0,
        color: 'rgba(0, 0, 0, 0)',
        boxShadow: 'none',
    },
    start:{
        opacity: 1,
        width: '100%',
        height: '100%',
        color: 'rgba(0, 0, 0, 255)',
        boxShadow: '0 0 10px 5px rgba(128, 128, 128, 0.95)',
        transition: {
            delay: 0.5,
            duration: 0.2,
            color:{
                delay: 0.7,
            },
            opacity:{
                delay: 0.8,
            },
            boxShadow:{
                delay: 0.8,
            }
        }
    },
}
const optionBtnVariants = {
    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1.0
    },
    totalClicked:{
        backgroundColor: 'rgba(255, 255, 0, 1)',
    },
    totalUnclicked:{
        backgroundColor: 'rgba(135, 206, 235, 1)',
    },
    makeExtraNumBtnFalse:{
        opacity: 0.5,
        cursor: 'auto',
    },
    makeExtraNumBtnTrue:{
        opacity: 1,
        cursor: 'pointer',
    }
}
const OptionLoading = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 80%;
    height: 90%;
    background-color: rgba(128, 128, 128, 0.8);
    border-radius: 10px;

`
const OptionSpan = styled(motion.span)`
    font-family: "Jua";
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80%;
`

const optionSpanVariants = {
    start:{
        ease: "ease",
        scale: 1.2,
        opacity: 0.6,
        transition:{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
        }
    }
}

function MakeExtraDeck(props){

    const [isClickedMake, setIsClickedMake] = useState(false);
    const [canMakeExtraCard, setCanMakeExtraCard] = useState(false);
    const [makeMessage, setMakeMessage] = useState("");
    const [listSelectArr, setListSelectArr] = useState([]);
    const listSelectController ={
        listSelectArr,
        setListSelectArr
    }
    const [selectDeckControlArr, setSelectDeckControlArr] = useState(new Array(10));
    const selectDeckController ={
        selectDeckControlArr,
        setSelectDeckControlArr
    }
    let {totalCount, setTotalCount} = props.totalCounter;
    let {isInCount, setIsInCount} = props.isInCounter;
    let setIsActiveOptionCurtain = props.setIsActiveOptionCurtain
    let setDragCardNumArr = props.setDragCardNumArr;
    let setOptionType = props.setOptionType;
    const [isThereTotal, setIsThereTotal] = useState(false);
    const [isClickedMinor, setIsClickedMinor] = useState(false);
    const [isClickedMajor, setIsClickedMajor] = useState(false);
    const [deckClickCount, setDeckClickCount] = useState(0);
    const [makeExtraNumber, setMakeExtraNumber] = useState("");
    const onChangeHandler = (e) => {
        e.preventDefault();
        let test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setMakeExtraNumber(test);
    }
    const [extraSendMessage, setExtraSendMessage] = useState("");
    const [activeMessageBox, setActiveMessageBox] = useState(false);

    const messageArr = [
        "?????? ?????? ???????????? ????????????",
        "????????? ????????? ????????????",

    ]

    const majorControl ={
        isClickedMajor,
        setIsClickedMajor
    }
    const minorControl ={
        isClickedMinor,
        setIsClickedMinor
    }
    const clickCountControl ={
        deckClickCount,
        setDeckClickCount
    }
    const totalControl ={
        isThereTotal,
        setIsThereTotal
    }
    
    const DeckNameArr = [
        "Major",
        "Wand",
        "Sword",
        "Cup",
        "Pentacle",
        "Minor",
        `Wand Palace`,
        "Sword Palace",
        "Cup Palace",
        "Pentacle Palace"
    ]
    const DeckImgNumArr = [
        0, // Major
        22, // Wand
        36, // Sword
        50, // Cup
        64, // Pentacle
        73, // Minor
        35, // Wand Palace
        49, // Sword Palace
        63, // Cup Palace
        77, // Pentacle Palace

    ]
    const DeckNumberArr = [
        {// Major
            startNum : 0,
            endNum : 21,
        },
        {// Wand
            startNum : 22,
            endNum : 31,
        },
        {// Sword
            startNum : 36,
            endNum : 45,
        },
        {// Cup
            startNum : 50,
            endNum : 59,
        },
        {// Pentacle
            startNum : 64,
            endNum : 73,
        },
        {// Minor
            startNum : 22,
            endNum : 77,
        },
        {// Wand Palace
            startNum : 32,
            endNum : 35,
        },
        {// Sword Palace
            startNum : 46,
            endNum : 49,
        },
        {// Cup Palace
            startNum : 60,
            endNum : 63,
        },
        {// Pentacle Palace
            startNum : 74,
            endNum : 77,
        },
    ]

    const onTotalClickedHandler = () =>{
        if(isThereTotal === false){
            let tempArr = selectDeckControlArr;
            for(let i = 0; i < selectDeckControlArr.length; i++){
                tempArr[i].isClicked = false;
                selectDeckControlArr[i].setIsClicked(false);
            }
            setSelectDeckControlArr(tempArr);
            setListSelectArr([{
                name: "Total",
                type: -1
            }]);
            setDeckClickCount(1);
            setIsThereTotal(true);
            if(isClickedMinor === true){
                setIsClickedMinor(!isClickedMinor);
            }
            if(isClickedMajor === true){
                setIsClickedMajor(!isClickedMajor);
            }
            return;
        }
        else if(isThereTotal === true){
            let tempArr = selectDeckControlArr;
            for(let i = 0; i < selectDeckControlArr.length; i++){
                tempArr[i].isClicked = false;
                selectDeckControlArr[i].setIsClicked(false);
            }
            if(isClickedMinor === true){
                setIsClickedMinor(!isClickedMinor);
            }
            if(isClickedMajor === true){
                setIsClickedMajor(!isClickedMajor);
            }
            setSelectDeckControlArr(tempArr);
            setListSelectArr([]);
            setDeckClickCount(0);
            setIsThereTotal(false);
        }
    }
    const onBackHandler = () =>{
        // ?????? ????????????
        // ??????
        setOptionType(0);
        setIsActiveOptionCurtain(false);
    }

    const onMakeClickHandler = () =>{
        if(isThereTotal === false){
            // listSelectArr ????????? ?????? ????????? ?????? ?????? ??????
            // deckClickCount ???????
            if(deckClickCount === 0){
                setMakeMessage("????????? ??? ?????? ????????? ????????? 0 ?????????!");
                setTimeout(()=>{
                    setIsClickedMake(false);
                }, 2000);
            }
            else {
                setMakeMessage("????????? ??????");
                setCanMakeExtraCard(true);
                // setTimeout(()=>{
                // setIsClickedMake(false);
                // }, 2000);    
            }
            
        }
        else if(isThereTotal === true){
            let tempArr = selectDeckControlArr;
            let _temp1 = tempArr.slice(1, 5);
            let _temp2 = tempArr.slice(6);
            let isMinorAllTrue = true;
            // console.log(_temp1);
            // console.log(_temp2);
            let _tempArr = [
                ..._temp1,
                ..._temp2,
            ]
            // console.log(_tempArr);
            for(let i = 0; i < _tempArr.length; i++){
                if(_tempArr[i].isClicked === false){
                    isMinorAllTrue = false;
                    break;
                }
                else if(_tempArr[i].isClicked === true){
                    continue;
                }
            }

            if((isClickedMajor === true
                && isClickedMinor === true) ||
                (isClickedMajor === true
                && isMinorAllTrue === true)){
                    setMakeMessage("????????? ??? ?????? ????????? ????????? 0 ?????????!");
                    setTimeout(()=>{
                        setIsClickedMake(false);
                    }, 2000);
            }
            else{
                setMakeMessage("????????? ??????");
                setCanMakeExtraCard(true);
                // setTimeout(()=>{
                //     setIsClickedMake(false);
                // }, 2000);
            }
            
        }
    }
    const onExtraNumberSubmit = (e) => {
        e.preventDefault();
        const tempNum = parseInt(makeExtraNumber);
        let _listTempArr = []; // ????????? ??? ?????? ??????
        let _tempAllNumArr = []; // ????????? ?????? ?????? ??????
        let _ranIdxNumArr = []; // ???????????? ????????? ??????(????????? ????????? ??????) ?????? 
        let _selectedImgNumArr = []; // ?????? ????????? ?????? ??????

        let modifiedArr = [];


        let firstFlag = false;
        let secondFlag = false;
        let totalMinusLength;
        let minusAllArr = new Array(78);

        let allOverArr = props.dragCardNumArr;
        let reverse;
        let modifiedTotalNum;
        let modifiedCount;

        for(let i = 0; i < minusAllArr.length; i++){
            minusAllArr[i] = i;
        }

        // isClickedMajor??? isClickedMinor??? ???????????????
        
        if(tempNum > 0 && tempNum <= 78){
            //console.log('1??? ?????? ??????');
            firstFlag = true;
        }
        else if(tempNum <= 0 || tempNum > 78){
            //console.log('1??? ?????? ??????'); // ??????
            setExtraSendMessage(messageArr[0]);
            setActiveMessageBox(true);
            setTimeout(()=>{
                setActiveMessageBox(false);
                setMakeExtraNumber("");
            }, 3000);
        }

        if(firstFlag && isThereTotal === false){ // 2??? ?????? ?????? ??? ?????? ??????, ????????????
            // listSelectArr
            for(let i = 0; i < listSelectArr.length; i++){
                _listTempArr.push(listSelectArr[i].type); // ?????? ????????????
            }
            for(let i = 0; i < _listTempArr.length; i++){
                let type = _listTempArr[i];
                for(let j = DeckNumberArr[type].startNum; j <= DeckNumberArr[type].endNum; j++){
                    _tempAllNumArr.push(j);
                }
            }
            //console.log(_tempAllNumArr);
            if(tempNum > _tempAllNumArr.length){
                //console.log('?????? ??? ???????????? ??? ????????? ??? ???'); // ??????
                setActiveMessageBox(true);
                setTimeout(()=>{
                    setActiveMessageBox(false);
                    setMakeExtraNumber("");
                }, 3000);
            }
            else if(tempNum <= _tempAllNumArr.length){
                //console.log('2??? ?????? ??????');
                secondFlag = true;
            }

            if(secondFlag){
                    // ????????? ???????????? ?????? ????????? ???????????? ????????? ???????????? ??????
                for(let i = 0; i < tempNum; i++){
                    let _temp = Math.floor((Math.random() * (_tempAllNumArr.length)));
                    _ranIdxNumArr[i] = _temp;
                    for(let j = 0; j < i; j++){
                        if(_ranIdxNumArr[j] === _ranIdxNumArr[i]){
                            i--;
                            break;
                        }
                    }
                }
                // ????????? ???????????? ?????? ????????? ????????????
                for(let i = 0; i < _ranIdxNumArr.length; i++){
                    _selectedImgNumArr[i] = _tempAllNumArr[_ranIdxNumArr[i]];
                }
                //console.log(_selectedImgNumArr);
                reverse = _selectedImgNumArr.reverse();
                for(let i = 0; i < reverse.length; i++){
                    allOverArr.push(reverse[i]);
                }
                setExtraSendMessage(messageArr[1]);
                setActiveMessageBox(true);

                modifiedTotalNum = totalCount + tempNum;
                modifiedCount = tempNum;

                setTimeout(()=>{
                    setDragCardNumArr(allOverArr);
                    setActiveMessageBox(false);
                    setIsClickedMake(false);
                    setIsActiveOptionCurtain(false);
                    setOptionType(0);
                    setTotalCount(modifiedTotalNum);
                    setIsInCount(modifiedCount);
                    setMakeExtraNumber("");
                }, 3000);
                //console.log("?????? ????????? :" + _ranIdxNumArr);
                //console.log("????????? ?????? ????????? ?????? :" + _selectedImgNumArr);
            }
        }
        else if(firstFlag && isThereTotal === true){ // 2??? ?????? ?????? ??? ?????? ??????, ????????? (?????? - ??????)
            // listSelectArr??? ????????? ????????? ?????? ????????? ??????.
            // ?????? ????????? ???????????? ????????? ??????
            // ?????? ???????????? ?????? ????????? ??????
            // ?????? ?????? ???????????? ????????? 1?????? ????????????????????? ?????? ?????? ???????????????
            if(listSelectArr.length === 1){ // ????????? ????????? ??????
                //console.log('??????');
                // ?????? ????????? 1??? ????????? ??????(?????? ?????? ?????? ????????? ??????)?????? 
                // ?????? ???????????? ????????????
                for(let i = 0; i < tempNum; i++){
                    let _temp = Math.floor((Math.random() * 78));
                    _ranIdxNumArr[i] = _temp;
                    for(let j = 0; j < i; j++){
                        if(_ranIdxNumArr[j] === _ranIdxNumArr[i]){
                            i--;
                            break;
                        }
                    }
                }
                for(let i = 0; i < _ranIdxNumArr.length; i++){
                    _selectedImgNumArr[i] = minusAllArr[_ranIdxNumArr[i]];
                }
                //console.log(_selectedImgNumArr);
                reverse = _selectedImgNumArr.reverse();

                for(let i = 0; i < reverse.length; i++){
                    allOverArr.push(reverse[i])
                }

                setExtraSendMessage(messageArr[1]);
                setActiveMessageBox(true);
                
                modifiedTotalNum = totalCount + tempNum;
                modifiedCount = tempNum;
                
                setTimeout(()=>{
                    setDragCardNumArr(allOverArr);
                    setActiveMessageBox(false);
                    setIsClickedMake(false);
                    setIsActiveOptionCurtain(false);
                    setOptionType(0);
                    setTotalCount(modifiedTotalNum);
                    setIsInCount(modifiedCount);
                    setMakeExtraNumber("");
                }, 3000);
            }
            else if(listSelectArr.length > 1){
                //console.log('?????? ????????????');
                // ????????? ?????? ?????? ?????????

                for(let i = 0; i < listSelectArr.length; i++){
                    _listTempArr.push(listSelectArr[i].type);
                }
                _listTempArr.shift(); // ?????? ?????? ??????
                
                for(let i = 0; i < _listTempArr.length; i++){
                    let type = _listTempArr[i];
                    for(let j = DeckNumberArr[type].startNum; j <= DeckNumberArr[type].endNum; j++){
                        _tempAllNumArr.push(j); // ?????? - ?????? : ?????????????????? _tempAllNumArr??? ???????????? ??????.
                    }
                }
                // ?????? - ???????????? = ??????????????????
                totalMinusLength = (78 - _tempAllNumArr.length);

                if(tempNum > totalMinusLength){
                    //console.log('?????? ??? ???????????? ??? ????????? ??? ???'); // ??????
                    setActiveMessageBox(true);
                    setTimeout(()=>{
                        setActiveMessageBox(false);
                        setMakeExtraNumber("");
                    }, 3000);
                }
                else if(tempNum <= totalMinusLength){
                    //console.log('2??? ?????? ??????');
                    secondFlag = true;
                }

                if(secondFlag){
                    
                    for(let i = 0; i < minusAllArr.length; i++){
                        let _temp = minusAllArr[i];
                        for(let j = 0; j < _tempAllNumArr.length; j++){
                            if(_tempAllNumArr[j] === _temp){
                                minusAllArr[i] = null;
                                break;
                            }
                        }
                        if(minusAllArr[i] !== null){
                            modifiedArr.push(minusAllArr[i]);
                        }
                    }
                    
                    for(let i = 0; i < tempNum; i++){
                        let _temp = Math.floor((Math.random() * (modifiedArr.length)));
                        _ranIdxNumArr[i] = _temp;
                        for(let j = 0; j < i; j++){
                            if(_ranIdxNumArr[j] === _ranIdxNumArr[i]){
                                i--;
                                break;
                            }
                        }
                    }
                    for(let i = 0; i < tempNum; i++){
                        _selectedImgNumArr[i] = modifiedArr[_ranIdxNumArr[i]];
                    }
                    //console.log(_selectedImgNumArr);
                    reverse = _selectedImgNumArr.reverse();
                    for(let i = 0; i < reverse.length; i++){
                        allOverArr.push(reverse[i]);
                    }
                    // console.log(modifiedArr);
                    // console.log(_ranIdxNumArr);
                    // console.log(_selectedImgNumArr);
                    setExtraSendMessage(messageArr[1]);
                    setActiveMessageBox(true);
                    modifiedTotalNum = totalCount + tempNum;
                    modifiedCount = tempNum;
                    setTimeout(()=>{
                        setDragCardNumArr(allOverArr);
                        setActiveMessageBox(false);
                        setIsClickedMake(false);
                        setIsActiveOptionCurtain(false);
                        setTotalCount(modifiedTotalNum);
                        setIsInCount(modifiedCount);
                        setOptionType(0);
                        setMakeExtraNumber("");
                    }, 3000);
                }
            }

        }
    }

    return(
    <>
    <MakeExtraContainer>
        <MakeExtraInContainer>
            <SelectedDeckPannel>
                {DeckNameArr.map((a, i) =>{
                    
                    return(
                        <SelectDeck 
                            key={i} 
                            deckType={i} 
                            deckName={a} 
                            imgNum={DeckImgNumArr[i]}
                            selectDeckController={selectDeckController}
                            listSelectController={listSelectController}
                            totalControl={totalControl}
                            clickCountControl={clickCountControl}
                            minorControl={minorControl}
                            majorControl={majorControl}
                        />
                    );
                })}
            </SelectedDeckPannel>
            <OptionContainer>
                <OptionSelectedList>
                    <OptionSelectedInList>
                        <SelectedList>
                            <>
                            {
                            deckClickCount === 0 
                            ?
                                <li>Select Deck Or Total</li> 
                            :
                                listSelectArr.map((a, i) => {
                                return(
                                    <li key={i}>{a.name}</li>
                                );
                            })}
                            </>
                        </SelectedList>
                    </OptionSelectedInList>
                </OptionSelectedList>
                <OptionBoxContainer>
                    <OptionBtnBox setwidth={85} setheight={20}
                        variants={optionBtnVariants} // Total Btn
                        animate={isThereTotal === false ? "totalUnclicked" : "totalClicked"}
                        whileHover="hover"
                        whileTap="click"
                        btncolor="#123456"
                    >
                        <button
                            onClick={onTotalClickedHandler}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            Total
                        </button>
                    </OptionBtnBox>
                    <OptionBtnBox setwidth={85} setheight={20}
                        variants={optionBtnVariants} // Clear Btn
                        whileHover='hover'
                        whileTap='click'
                        btncolor="#123456"
                    >
                        <button
                            onClick={(e)=>{
                                e.preventDefault();
                                if(deckClickCount > 0){
                                    setDeckClickCount(0);
                                    setListSelectArr([]);
                                    setIsClickedMinor(false);
                                    let tempArr = selectDeckControlArr;
                                    for(let i = 0; i < selectDeckControlArr.length; i++){
                                        selectDeckControlArr[i].setIsClicked(false);
                                        tempArr[i].isClicked = false;
                                    }
                                    setSelectDeckControlArr(tempArr);
                                    setIsClickedMajor(false);                               
                                    setIsThereTotal(false);
                                }      
                            }}
                            style={
                                deckClickCount > 0
                                ?{
                                    cursor: 'pointer',
                                    pointerEvents : 'auto',
                                }
                                :{
                                    cursor: 'auto',
                                    pointerEvents : "none",
                                }
                            }
                        >
                            Clear
                        </button>
                    </OptionBtnBox>
                    <OptionBtnBox setwidth={85} setheight={20}
                        variants={optionBtnVariants} // Make Btn
                        whileHover="hover"
                        whileTap="click"
                        btncolor="#123456"
                    >
                        <button
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={()=>{
                                if(isClickedMake === false){
                                    setIsClickedMake(true)
                                    onMakeClickHandler()
                                }
                            }}
                        >Make</button>
                    </OptionBtnBox>
                    <OptionBtnBox setwidth={85} setheight={20}
                        variants={optionBtnVariants}
                        whileHover="hover"
                        whileTap="click"
                        btncolor="#123456"
                    >
                        <button
                            onClick={onBackHandler}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            Back
                        </button>
                    </OptionBtnBox>
                </OptionBoxContainer>
            </OptionContainer>
            {
                isClickedMake === true
                ? 
                <ExtraNoticeBox
                    variants={extraNoticeBoxVariants}
                    initial="initial"
                    animate="start"    
                >
                    <ExtraNoticePanel
                        variants={extraNoticeVariants}
                        initial="initial"
                        animate="start"
                    >
                        {canMakeExtraCard === false ? makeMessage : null}
                        {
                        canMakeExtraCard === true
                        ? 
                        <ExtraSetNumberBox
                            variants={extraSetNumberBoxVariants}
                            initial="initial"
                            animate="start"
                        >
                            <label htmlFor='writeExtraNumber'>
                                ????????? ????????? ??? ?????? ?????????????????????????
                            </label>
                            <span htmlFor='writeExtraNumber'>
                                (?????? ??? ????????? ?????? ??? ????????????)
                            </span>
                            <input id='writeExtraNumber'
                                placeholder='0'
                                maxLength={2}
                                autoComplete='off'
                                value={makeExtraNumber}
                                onChange={(e)=>{
                                    onChangeHandler(e);
                                }}
                            />
                            <ExtraSetNumberBtnBox
                                setwidth={30} 
                                setheight={90}
                            >
                                <OptionBtnBox 
                                    variants={optionBtnVariants}
                                    whileHover={makeExtraNumber.length <= 0 ? "" : "hover" }
                                    whileTap={makeExtraNumber.length <= 0 ? "" : "click" }
                                    animate={makeExtraNumber.length <= 0 ? "makeExtraNumBtnFalse" : "makeExtraNumBtnTrue" }
                                    style={{
                                        backgroundColor: '#123456',
                                        padding:'1%',
                                    }}
                                >
                                    <button
                                        style={
                                            makeExtraNumber.length <= 0
                                            ? {
                                                cursor: 'auto',
                                                backgroundColor: 'royalblue',
                                            }
                                            : {
                                                cursor: 'pointer',
                                                backgroundColor: 'royalblue',
                                            }
                                        }
                                        onClick={(e)=>{
                                            if(makeExtraNumber.length > 0){
                                                onExtraNumberSubmit(e);
                                            }
                                        }}
                                    >MAKE</button>
                                </OptionBtnBox>
                                <OptionBtnBox 
                                    variants={optionBtnVariants}
                                    whileHover="hover"
                                    whileTap="click"
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: '#123456',
                                        padding:'1%',
                                    }}
                                >
                                    <button
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: 'royalblue',
                                        }}
                                        onClick={()=>{
                                            setCanMakeExtraCard(false);
                                            setIsClickedMake(false);
                                            setMakeExtraNumber("");
                                        }}
                                    >
                                        BACK
                                    </button>
                                </OptionBtnBox>
                            </ExtraSetNumberBtnBox>
                        </ExtraSetNumberBox>
                        : null
                        }
                    </ExtraNoticePanel>
                    {
                        activeMessageBox === true
                        ?
                        <OptionLoading>
                            <OptionSpan
                                variants={optionSpanVariants}
                                initial="initial"
                                animate="start"
                            >
                            {extraSendMessage}
                            </OptionSpan>
                        </OptionLoading>
                        : null    
                    }
                </ExtraNoticeBox>
                : null
            }
        </MakeExtraInContainer>
    </MakeExtraContainer>    
    </>
    );
}

export default MakeExtraDeck;