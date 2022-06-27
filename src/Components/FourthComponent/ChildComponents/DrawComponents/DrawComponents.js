
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';


import DrawCardTemp from './DrawCardTemp'
import { useSelector, useDispatch } from 'react-redux';

import { setChangeSelectNum, setIsOverDraw } from '../../../../redux/actions/gameManager_action';



const DrawContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: beige;
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
const DrawInfoBox = styled(motion.div)`

    width: 80%;
    height: 13%;
    background-color: olive;

    display: flex;
    justify-content: center;
    align-items: center;


    & div{
        width: 98%;
        height: 80%;
        font-family: "Jua";
        font-size: 2em;
        font-weight: 600;
        text-align: center;
        background-color: green;
        background-color: rgba(255, 255, 255, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
`

const DrawControlContainer = styled(motion.div)`
    
    width: 95%;
    height: 75%;
    background-color: brown;

    border-radius: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1%;
    
`
const DrawScrollBox = styled(motion.div)`
    width: 75%;
    height: 100%;
    background-color: red;
    border-radius: 20px;

    margin-right: 1%;
    padding: 1%;
`
const DrawControlBtnBox = styled(motion.div)`

    width: 25%;
    height: 100%;
    background-color: gray;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 20px;

`
// 컨트롤 버튼


const DrawControlBtn = styled(motion.div)`

    width: 80%;
    height: 13%;
    background-color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1%;

    border-radius: 10px;

    margin: 2% 0%;
    will-change: auto;
    cursor: pointer;

    & button{
        width: 95%;
        height: 85%;
        background-color: salmon;
        outline: unset;
        border: none;

        font-family: "Jua";
        font-weight: 600;
        font-size: 1.5em;

        border-radius: 10px;
        cursor: pointer;
    }
    
`
const drawControlBtnVariants ={
    hover:{
        scale: 1.1,
        transform: "rotate(.001deg)",
    },
    click:{
        scale: 1,
        transform: "rotate(.001deg)",
    },
    
}

// 숫자알림판 + 숫자 부모 박스
const CountInfoBox = styled(motion.div)`
    width: 95%;
    height: 15%;
    background-color: tomato;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 2% 0;

    border-radius: 10px;
    
`
// 숫자알림판
const CountingClass = styled(motion.div)`
    width: 70%;
    height: 100%;
    background-color: royalblue;
    display:flex;
    justify-content: center;
    align-items: center;

    padding: 1%;
    border-radius: 20px;
    
    & span{
        background-color: blue;
        margin: 1%;
        width: 100%;
        height: 50%;

        font-family: "Jua";
        font-size: 1.5em;
        text-align: start;

        display: flex;
        justify-content: left;
        aling-items: center;
    }
`
// 숫자
const CountingNotice = styled(motion.div)` 
    width: 20%;
    height: 80%;
    background-color: whitesmoke;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    margin: 1%;
    & span{
        height: 50%;
        width: 100%;
        font-family: "Jua";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        font-weight: 600;
    }
`
const CardSelectPannel = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: cornflowerblue;
    border-radius: 5px;

    padding: 1.5%;

   
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(13%, 1fr));
    grid-template-rows: repeat(auto-fit, minMax(40%, 1fr));
    
    grid-auto-columns: 13%;
    grid-auto-rows: 40%;

    grid-gap: 3%;

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
}
`
const QuestionModal = styled(motion.div)`

  position: absolute;
  width: 40%;
  height: 50%;
  background-color: pink;

  z-index: 30;
  transform: translate(35%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  top: 30%;

  & span, div{
    width: 80%;
    height: 30%;
    margin: 2% 0;
    font-family: "Jua";
    font-weight: 600;
    font-size: 2em;
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  & > div{
      
    justify-content: space-evenly;
    & div{
        background-color: gray;
        width: 40%;
        height: 60%;
        font-size: 1em;
      }
  }
`
const YesOrNoBox = styled(motion.div)`
    background-color: gray;
    width: 40%;
    height: 60%;
    font-size: 1em;

    cursor: pointer;
`
const yesOrNoVariants = {
    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1,
    }
}
const yesOrNoOptionVariants ={
    initial:{
        boxShadow: 'none',
    },
    hover:{
        scale: 1.1,
        boxShadow: '0 0 10px 5px blue, 0 0 2px 1px white inset',
    },
    click:{
        scale: 1
    }
}
const Curtain = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: beige;
    z-index: 50;
    position: absolute;
`
const curtainVariant = {
    initial:{
        opacity: 1
    },
    start:{
        opacity: 0,
        transition:{
            duration: 2
        }
    }
}

const OptionContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 50;

    display: flex;
    justify-content: center;
    align-items: center;
`
const optionContainerVariants ={
    initial:{
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    start:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition:{
            duration: 0.2
        }
    }
}
const OptionQuestionBox = styled(motion.div)`
    width: 40%;
    height: 50%;
    background-color: rgba(128, 128, 128, 0.8);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
`
const OptionQuestionActiveBox = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: inherit;

    & > span,
    & > div{
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Jua";
        font-size: 1.7em;
        font-weight: 600;
    }
    & > div{
        justify-content: space-evenly;
        margin-top: 5%;
    }
    & ${YesOrNoBox}{
        background-color: blue;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;

        width: 30%;
        height: 60%;
    }
`
const OptionLoading = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;

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
const OptionModifyBox = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    padding: 5%;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
    & span,
    & input{
        display: flex;
        justify-content: center;
        align-items: center;
        
        width: 100%;
        height: 20%;
        text-align: center;
        
        font-family: "Jua";
        font-size: 1em;

    }
    & > span{
        flex-direction: column;
        font-size: 2em;
        margin-top: 5%;
    }
    & > input{
        outline: unset;
        border: none;
        width: 80%;
        border-radius: 20px;
        font-size: 1.3em;
        color: rgba(0, 0, 0, 0.8);
        transition: all 0.3s ease-in-out;
        &:hover,
        &:focus{
            box-shadow: 0 0 10px 5px whitesmoke;
        }
    }
    & > div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 30%;

        & ${YesOrNoBox}{
            font-family: "Jua";
            font-size: 1.5em;
            background-color: rgba(135, 206, 235, 1);
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
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
const Modal = styled(motion.div)`
        width: 10%;
        height: 5%;
        background-color: gray;
        z-index: 99;
        translate: (0, 0);
        position: fixed;
        opacity: 1;
        border-radius: 10px;

        display: flex;
        justify-content : center;
        align-items: center;
        flex-direction: column;
        box-shadow: 0 0 2px 0.5px white inset; 

        & > span {
            display: flex;
            justify-content : center;
            align-items: center;
            flex-direction: column;

            font-family: "Jua";
            width: 80%;
            height: 50%;
            font-size: 10px;
        }
    `
const modalVariant = {
    start:{
        scale: 4
    },
    exit :{
        scale : 0.1
    },
    transition: {
        type: "spring",
        ease: "easeInOut",
        duration: 1,
    }
}
function SelectModal(props){

    const _clickedCardNumber = props.clickedcardnumber;
    const {isThisCardClicked, setThisCardClicked, cardnum, testFunc, setThisCardIndexNumber} = props.tempChildAttr;
    // yes, no 버튼 생성, 테스트용으로 콘솔사용
    const {selectedNumberStateArr, setSelectedNumberStateArr} = props.selectedNumStateArrController
    const {selectedNumberArr, setSelectedNumberArr} = props.selectedNumArrController;
    let {clickAndSelectCount ,setClickAndSelectCount} = props.clickCounterController;

    const clickedYesOrNoHandler = (flag) => {
        if(flag === 'true'){ // Yes버튼
            if(isThisCardClicked === false){ // 선택안된 상태인데 Yes가 눌리면
                testFunc(true); // 눌렸다고 해주고
                console.log(cardnum); // 테스트용 숫자 출력
                // 선택하겠다 부분이기 때문에 배열에서 번호를 찾아서 추가하는 명령 필요
                // 한 장이라도 선택이 된다면 셔플버튼을 잠그는 명령필요 clickcount 라는 변수를 만들어서 사용해보자
                
                // 선택된 배열 관리
                let _tempArr = [...selectedNumberArr];
                for(let i = 0; i < _tempArr.length; i++){
                    if(_tempArr[i] === 100){
                        _tempArr[i] = cardnum;
                        setThisCardIndexNumber(i);
                        setSelectedNumberArr(_tempArr);
                        break;
                    }
                }
                
                // click count increase
                let _clickCount = clickAndSelectCount;
                _clickCount++;
                setClickAndSelectCount(_clickCount);
                
                // 선택된 number의 state관리
                let tempNumState = { cardnum, isThisCardClicked, setThisCardClicked};
                let tempNumStateArr = [...selectedNumberStateArr];
                
                for(let i = 0; tempNumStateArr.length; i++){
                    if(tempNumStateArr[i].cardnum === 100){
                        tempNumStateArr[i] = tempNumState;
                        break;
                    }
                }
                
                //tempNumStateArr.push(tempNumState);
                setSelectedNumberStateArr(tempNumStateArr);

                // for(let i = 0; i < tempNumStateArr.length; i++){
                //     //if(tempNumStateArr[i])
                //     console.log(tempNumStateArr[i].keys());
                // }
                

            }
            else if(isThisCardClicked === true){ // 선택된 적이 있으면 취소인데 Yes가 눌리면,
                testFunc(false);
                console.log(cardnum);
                // 취소하겠다 부분이기 때문에 배열에서 번호를 찾아서 제거하는 명령 필요

                let _tempArr = [...selectedNumberArr];
                for(let i = 0; i < _tempArr.length; i++){
                    if(_tempArr[i] === cardnum){
                        _tempArr[i] = 100;
                        setThisCardIndexNumber(100);
                        setSelectedNumberArr(_tempArr);
                        break;
                    }
                }

                let tempStateNum = cardnum;
                let tempStateNumArr = selectedNumberStateArr;

                //let cancelIndex;
                for(let i = 0; i < tempStateNumArr.length; i++){
                    if(tempStateNumArr[i].cardnum === tempStateNum){
                        tempStateNumArr[i] = {cardnum : 100};
                        break;
                    }
                }
                //tempStateNumArr[cancelIndex] = {cardnum: 100};

                // 기존 제거 배열
                // for(let i = 0; i < tempStateNumArr.length; i++){
                //     if(tempStateNumArr[i].cardnum === tempStateNum){
                //         tempStateNumArr[i] = null;
                //         break;
                //     }
                // }
                setSelectedNumberStateArr(tempStateNumArr);

                let _clickCount = clickAndSelectCount;
                _clickCount--;
                setClickAndSelectCount(_clickCount);
            } 
        }
        else if(flag === 'false'){ // No 버튼
            if(isThisCardClicked === false){ // 선택안된 상태인데 no라면.
                // 선택안하겠다.
                testFunc(false);
            }
            else if(isThisCardClicked === true){ // 선택된 상태인데 no라면
                // 취소를 안하겠다.
                testFunc(true);
            }
        }
        props.setCardClicked(false);
    }
    return(
        <>
            <QuestionModal>
                <span>
                    {props.tempChildAttr.isThisCardClicked === false 
                        ? `${_clickedCardNumber + 1} 번의 카드를 선택하시겠습니까?`
                        : `${_clickedCardNumber + 1} 번의 카드를 취소하시겠습니까?`
                    }
                </span>
                <div>
                    <YesOrNoBox 
                        variants={yesOrNoVariants}
                        whileHover="hover"
                        whileTap="click"
                        onClick={()=>{
                            clickedYesOrNoHandler("true")
                        }}
                    >Y E S</YesOrNoBox>
                    <YesOrNoBox
                        variants={yesOrNoVariants}
                        whileHover="hover"
                        whileTap="click"
                        onClick={()=>{
                            clickedYesOrNoHandler("false")
                        }}
                    >N O</YesOrNoBox>
                </div>
            </QuestionModal>
        </>
    );
}

function OptionState(props){
    //const btnType = ["auto", "shuffle", "modify", "reset", "next"]
    //const btnType = ["auto", "shuffle", "modify", "reset", "next"]
    const _dispatch = props.dispatch;
    const _selectedCardCount = props.selectedCardCount;
    const {
        activeOptionContainer, 
        setActiveOptionContainer,
        optionType,
        setOptionType
    } = props.optionController;
    const { selectedNumberArr, setSelectedNumberArr} = props.selectedNumArrController;
    const { selectedNumberStateArr, setSelectedNumberStateArr }= props.selectedNumStateArrController;
    const {
        clickAndSelectCount,
        setClickAndSelectCount
    } = props.clickCounterController; 
    const { totalChildStateArr, setTotalChildStateArr } = props.totalChildStateArrController;
    
    let [optionStage, setOptionStage] = useState(0); // 옵션진행상황
    const questionArr = [
        "자동으로 카드를 선택하시겠습니까?", // auto
        "카드를 다시 섞으시겠습니까?", // shuffle
        "선택할 카드 수량을 바꾸시겠습니까?", // Modify
        "선택한 카드들을 모두 취소하시겠습니까?", // reset
        "카드를 펼쳐서 타로와 대화하시겠습니까?", // next
    ]
    const { drawRanNumArr, setDrawRanNumArr } = props.drawRanNumArrController;

    let [value, setValue] = useState('');
    let [isModifyNumAlright, setModifyNumAlright] = useState(false);
    let [tempString, setTempString] = useState('');
    
    const setModifyNumAlrightHanler = (type, tempNum) =>{
        if(_selectedCardCount === tempNum){
            setTempString('입력값이 기존과 동일합니다.');
        } else{
            setTempString('입력에 실패하셨습니다.');
        }
        setModifyNumAlright(true);
        setValue('');
        setTimeout(()=>{
            setModifyNumAlright(type);
        }, 1000)
    }
    const onOptionActiveHandler = (e) => {
        e.preventDefault();
        let timer = () =>{
                setTimeout(() => {
                    setOptionStage(0);
                    setActiveOptionContainer(false);
                    setOptionType('');
                }, 3000);
        }
        switch(optionType){
            case 0: // auto
                setClickAndSelectCount(_selectedCardCount);
                let _totalChildStateArr = totalChildStateArr;
                let ranNumArr = new Array(_selectedCardCount);

                let _selectedNumberArr = selectedNumberArr;
                let _selectedNumStateArr = selectedNumberStateArr; 
                // 랜덤번호 추출 - 수정. 순서대로 삽입
                for(let i = 0; i < ranNumArr.length; i++){
                    ranNumArr[i] = i;

                    // 이하 코드는 기존 코드. 랜덤 선택 코드
                    // let tempNum = Math.floor((Math.random() * (78)));
                    // ranNumArr[i] = tempNum;
                    // for(let j = 0; j < i; j++){
                    //     if(ranNumArr[i] === ranNumArr[j]){
                    //         i--;
                    //         break;
                    //     }
                    // }
                }
                // 추출된 번호(인덱스의 카드 state 수정)
                for(let i = 0; i < ranNumArr.length; i++){
                    totalChildStateArr[ranNumArr[i]].setThisCardClicked(true);
                    totalChildStateArr[ranNumArr[i]].setThisCardIndexNumber(i);
                    _selectedNumberArr[i] = totalChildStateArr[ranNumArr[i]].cardnum;
                    _selectedNumStateArr[i] = totalChildStateArr[ranNumArr[i]];
                }
                // 단순 번호 세팅
                
                // 추출된 번호의 state 세팅
                
                /*for(let i = 0; i < ranNumArr.length; i++){
                    totalChildStateArr[ranNumArr[i]].setThisCardClicked(true);
                    totalChildStateArr[ranNumArr[i]].setThisCardIndexNumber(i);
                }
                // 단순 번호 세팅
                for(let i = 0; i < _selectedNumberArr.length; i++){
                    _selectedNumberArr[i] = totalChildStateArr[ranNumArr[i]].cardnum;
                }
                // 추출된 번호의 state 세팅
                for(let i = 0; i < selectedNumberStateArr.length; i++){
                    _selectedNumStateArr[i] = totalChildStateArr[ranNumArr[i]];
                } */
                console.log('ranNumArr : ' + ranNumArr.length);
                console.log('_selectedNumberArr : ' + _selectedNumberArr.length);
                console.log('selectedNumberStateArr :' + selectedNumberStateArr.length);
                setSelectedNumberArr(_selectedNumberArr);
                //setTotalChildStateArr(_selectedNumStateArr);
                timer();
                
                console.log('auto over');
            break;
            case 1: // shuffle
                let tempDrawRanNumArr = new Array(78);
                for(let i = 0; i < tempDrawRanNumArr.length; i++){
                    let tempNum = Math.floor((Math.random() * (78)));
                    tempDrawRanNumArr[i] = tempNum;
                    for(let j = 0; j < i; j++){
                        if(tempDrawRanNumArr[i] === tempDrawRanNumArr[j]){
                            i--;
                            break;
                        }
                    }
                }
                setDrawRanNumArr(tempDrawRanNumArr);
                timer();
                console.log('shuffle over');
            break;
            case 2: // modify
                setOptionStage(2);
                console.log('modify number question');
            break;
            case 3: // reset
                // 선택된 여부 리셋
                let tempStateNumArr = new Array(selectedNumberArr.length); // 번호배열
                tempStateNumArr.fill({cardnum : 100});
                for(let i = 0; i < selectedNumberStateArr.length; i++){
                    if(selectedNumberStateArr[i].cardnum === 100){
                        continue;
                    }
                    selectedNumberStateArr[i].setThisCardClicked(false); // 선택해제
                }
                setSelectedNumberStateArr(tempStateNumArr);
                
                // 단순번호 리셋
                let tempNumArr = [...selectedNumberArr];
                tempNumArr.fill(100);
                setSelectedNumberArr(tempNumArr);
                setClickAndSelectCount(0);
                timer();

                console.log('reset over');
            break;
            case 4: // next
                let totalSelectedNumArr = new Array(selectedNumberArr.length);
                for(let i = 0; i < totalSelectedNumArr.length; i++){
                    totalSelectedNumArr[i] = drawRanNumArr[selectedNumberArr[i]];
                }
                let drawReturnInfo = {
                    isOverDraw: true,
                    totalSelectedNumArr,
                }
                timer();
                setTimeout(()=>{
                        setOptionStage(0);
                        setActiveOptionContainer(false);
                        setOptionType('');
                        _dispatch(setIsOverDraw({drawReturnInfo}));
                }, 3000)
                console.log('next over');
            break;
            default:
                console.log('type err');
            break;
        }
    }
    const onChangeHandler = (e) =>{
        let test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setValue(test);
    }
    const onButtonHandler = (e, type) =>{
        e.preventDefault();
        let timer = () =>{
            setTimeout(() => {
                setOptionStage(0);
                setActiveOptionContainer(false);
                setOptionType('');
            }, 3000);
        }
        if(type === 'yes'){
            let tempNum = parseInt(value);
            if(tempNum <= 0 || tempNum > 78){
                console.log('fail');
                setModifyNumAlrightHanler(false, tempNum);
            }
            else if(tempNum > 0 && tempNum <= 78){
                if(_selectedCardCount === tempNum){
                    setModifyNumAlrightHanler(false, tempNum);
                } else if(_selectedCardCount !== tempNum){
                    console.log('success');
                    // dispatch 하는거 넣자.
                    props.setUserSelectCount(tempNum); // 카운터 넘버 수정
                    // 일반 넘버 배열, 스테이트 배열의 길이 재설정하는 코드 필요
                    let tempNumArr = new Array(tempNum);
                    let tempNumStateArr = new Array(tempNum);
                    tempNumArr.fill(100);
                    tempNumStateArr.fill({cardnum : 100});
                    setSelectedNumberArr(tempNumArr);
                    setSelectedNumberStateArr(tempNumStateArr);
                    _dispatch(setChangeSelectNum({changedSelectNum : tempNum}));                    
                    setOptionStage(1);
                    timer();
                } 
            }
        }else if(type === 'no'){
            console.log('back');
            setValue('');
            setOptionStage(0);
            setActiveOptionContainer(false);
            setOptionType('');
        }
    }
    return(
        <>
            <OptionContainer
                variants={optionContainerVariants}
                initial="initial"
                animate="start"
            >
                <OptionQuestionBox> 
                    {optionStage === 0 // 처음 질문
                        ? 
                        <>
                            <OptionQuestionActiveBox>
                                <span>{questionArr[optionType]}</span>
                                <div>
                                    <YesOrNoBox
                                        variants={yesOrNoOptionVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        whileTap="click"
                                        onTap={(e)=>{
                                            e.preventDefault();
                                            setOptionStage(1);
                                            onOptionActiveHandler(e);
                                        }}
                                        >
                                            Y E S
                                    </YesOrNoBox>
                                    <YesOrNoBox
                                        variants={yesOrNoOptionVariants}
                            
                                        whileHover="hover"
                                        whileTap="click"
                                        onTap={(e)=>{
                                            e.preventDefault();
                                            setOptionType('');
                                            setActiveOptionContainer(false);
                                        }}
                                    >N O</YesOrNoBox>
                                </div>
                            </OptionQuestionActiveBox>
                        </>
                        : null
                    }
                    { // Loading
                        optionStage === 1 // Yes . auto, shuffle, reset, next
                        ?
                        <>
                            <OptionLoading>
                                <OptionSpan
                                    variants={optionSpanVariants}
                                    initial="initial"
                                    animate="start"
                                >잠시만 기다려 주십시오...
                                </OptionSpan>
                            </OptionLoading>
                        </>
                        : null
                    }
                    { // Modify
                        optionStage === 2 // Modify screen
                        ?
                        <>
                            <OptionModifyBox>
                                <span>몇 장을 선택할지 입력하세요</span>
                                <input 
                                    placeholder='20장 미만을 추천드립니다( 1 ~ 78 )'
                                    value={value} 
                                    onChange={(e)=>{
                                        onChangeHandler(e);
                                    }}
                                    maxLength={2}
                                />
                                <div>
                                    <YesOrNoBox
                                        initial={{
                                            backgroundColor: 'rgba(135, 206, 235, 0.5)',
                                        }}
                                        animate={
                                            value === ''
                                            ?   
                                                {
                                                    pointerEvents: 'none',
                                                    cursor: 'auto',
                                                    backgroundColor: 'rgba(135, 206, 235, 0.5)',
                                                }
                                            :
                                                {
                                                    pointerEvents: 'auto',
                                                    cursor: 'pointer',
                                                    backgroundColor: 'rgba(135, 206, 235, 1)',
                                                }
                                        }
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: '0 0 10px 5px skyblue',
                                        }}
                                        whileTap={{
                                            scale: 1,
                                        }}
                                        onTap={(e)=>{
                                            if(isModifyNumAlright === false){
                                                onButtonHandler(e, 'yes');
                                            }
                                        }}
                                    >
                                        Done !
                                    </YesOrNoBox>
                                    <YesOrNoBox
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: '0 0 10px 5px skyblue',
                                        }}
                                        whileTap={{
                                            scale: 1,
                                        }}
                                        onTap={(e)=>{
                                            if(isModifyNumAlright === false){
                                                onButtonHandler(e, 'no');
                                            }
                                        }}
                                    >
                                        Back
                                    </YesOrNoBox>
                                </div>
                            </OptionModifyBox>
                            {
                                isModifyNumAlright === true
                                ?
                                <>
                                    <Modal
                                        variants={modalVariant}
                                        animate="start"
                                    >
                                        <span>
                                            {tempString}
                                        </span>
                                    </Modal>
                                </>
                                : null
                            }
                        </>
                        : null
                    }

                    
                </OptionQuestionBox>
            </OptionContainer>
        </>
    );
}

function DrawComponents() {
    let _selectedCardCount = useSelector((state) => state.gameManager.selectedCardCount);
    let dispatch = useDispatch(); 
    let [userSelectCount, setUserSelectCount] = useState(_selectedCardCount);
    
    let [clickAndSelectCount, setClickAndSelectCount] = useState(0); // 유저가 클릭한 횟수
    let clickCounterController ={
        clickAndSelectCount,
        setClickAndSelectCount
    };
    let selectedArr = new Array(_selectedCardCount);
    selectedArr.fill(100);

    // 선택된 번호를 저장할 배열
    let [selectedNumberArr, setSelectedNumberArr] = useState(selectedArr);
    const selectedNumArrController = { selectedNumberArr, setSelectedNumberArr};

    // 선택된 번호들의 state를 담을 배열
    let tempNumStateArr = new Array(_selectedCardCount);
    tempNumStateArr.fill({cardnum : 100});
    let [selectedNumberStateArr, setSelectedNumberStateArr] = useState(tempNumStateArr);
    const selectedNumStateArrController = {selectedNumberStateArr, setSelectedNumberStateArr};

    let [isStartOver, setStartOver] = useState(false);
    let [drawRanNumArr, setDrawRanNumArr] = useState([]);
    let drawRanNumArrController = {drawRanNumArr, setDrawRanNumArr};
    
    let [isCardClicked, setCardClicked] = useState(false); // 단순클릭여부, 모달창 플래그
    let [clickedCardNumber, setClickedCardNumber] = useState('');
    
    let [tempChildAttr, setTempChildAttr] = useState({});

    // 옵션 온오프
    let [activeOptionContainer, setActiveOptionContainer] = useState(false);
    let [optionType, setOptionType] = useState('');
    const optionController = {
        activeOptionContainer, 
        setActiveOptionContainer,
        optionType,
        setOptionType
    };

    // 처음에 가져오는 자식들의 모든 스테이트
    let [totalChildStateArr, setTotalChildStateArr] = useState(new Array(78));
    let totalChildStateArrController = {totalChildStateArr, setTotalChildStateArr};

    const pannel = useRef();
    useEffect(()=>{

    }, [])    
    useEffect(()=>{
        let tempRanNumArr = new Array(78);
        for(let i = 0; i < tempRanNumArr.length; i++){
            let tempRanNum = Math.floor((Math.random() * (78)));
            tempRanNumArr[i] = tempRanNum;
            for(let j = 0; j < i; j++){
                if(tempRanNumArr[i] === tempRanNumArr[j]){
                    i--;
                    break;
                }
            }
        }
        
        setDrawRanNumArr(tempRanNumArr);
    }, [])
    useEffect(()=>{
        setTimeout(() => {
            setStartOver(true);
        }, 2000);
    }, [])
    // let testchild = [];
    // console.log(React.Children.count(pannel));
    // // testchild = React.Children.map(pannel, (a)=>{
    //     testchild.push(a);
    // })
    // console.log(testchild);

    const onAutoHandler = (e) => {
        e.preventDefault();
        if(clickAndSelectCount <= 0){
            console.log('auto');
            setActiveOptionContainer(true);
            setOptionType(0);
        }
    }

    const onShuffleHandler = (e) => {
        e.preventDefault();
        if(clickAndSelectCount <= 0){
            console.log('shuffle');
            // 여기서 옵션창 오픈 스테이트 추가
            setActiveOptionContainer(true);
            setOptionType(1);
        }
        
    }
    const onModifyHandler = (e) => {
        e.preventDefault();
        if(clickAndSelectCount <= 0){
            console.log('modify');
            setActiveOptionContainer(true);
            setOptionType(2);
        }
    }
    const onResetHandler = (e) => {
        e.preventDefault();
        if(clickAndSelectCount > 0 ){
            console.log('reset');
            setActiveOptionContainer(true);
            setOptionType(3);
        }
    }
    const onNextHandler = (e) => {
        e.preventDefault();
        if(clickAndSelectCount > 0 && clickAndSelectCount === userSelectCount){
            console.log('next');
            setActiveOptionContainer(true);
            setOptionType(4);
        }
    }
  return (
    <>
        <DrawContainer>
            <DrawInfoBox>
                <div>
                    원하시는 카드를 선택하여 주십시오
                </div>
            </DrawInfoBox>
            <DrawControlContainer>
                <DrawScrollBox>
                    <CardSelectPannel ref={pannel}>
                        
                        {drawRanNumArr.map((a, i) =>{
                                
                                return(
                                    <DrawCardTemp 
                                        key={i} 
                                        cardnum={i}
                                        iscardclicked={isCardClicked}
                                        setcardclicked={setCardClicked}
                                        clickedcardnumber={clickedCardNumber}
                                        setClickedCardNumber={setClickedCardNumber}
                                        setTempChildAttr={setTempChildAttr}
                                        userSelectCount={userSelectCount}
                                        clickAndSelectCount={clickAndSelectCount}
                                        selectedNumStateArrController={selectedNumStateArrController}
                                        totalChildStateArrController={totalChildStateArrController}
                                    >
                                    </DrawCardTemp>
                                );
                        })}
                        {
                            isCardClicked === true
                            ?
                            <>
                                <SelectModal
                                    clickedcardnumber={clickedCardNumber}
                                    setCardClicked={setCardClicked}
                                    tempChildAttr={tempChildAttr}
                                    clickCounterController={clickCounterController}
                                    selectedNumArrController={selectedNumArrController}
                                    selectedNumStateArrController={selectedNumStateArrController}
                                />
                            </> 
                            : null
                        }
                    </CardSelectPannel>
                </DrawScrollBox>
                <DrawControlBtnBox>
                    <CountInfoBox>
                        <CountingClass>
                            <span>선택 가능 수량</span>
                        </CountingClass>
                        <CountingNotice>
                            <span>{userSelectCount}</span>
                        </CountingNotice>
                    </CountInfoBox>
                    <CountInfoBox style={{
                        marginBottom: '5%',
                    }}>
                        <CountingClass>
                            <span>현재 선택한 수량</span>
                        </CountingClass>
                        <CountingNotice>
                            <span>{clickAndSelectCount}</span>
                        </CountingNotice>
                    </CountInfoBox>
                    <>
                    <DrawControlBtn // Auto Btn
                        variants={drawControlBtnVariants}
                        whileHover={clickAndSelectCount <= 0 ? "hover" : "none"}
                        whileTap={clickAndSelectCount <= 0 ? "click" : "none"}
                        onTap={(e)=>{
                            onAutoHandler(e);
                        }}
                        style={clickAndSelectCount <= 0 
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
                        style={clickAndSelectCount <= 0 
                            ?{
                                cursor: 'pointer',
                            } 
                            :{
                                cursor: 'auto',
                            }}>
                                Auto
                        </button>
                        
                    </DrawControlBtn>
                    <DrawControlBtn // Shuffle Btn
                        variants={drawControlBtnVariants}
                        clickandselectcount={clickAndSelectCount}
                        whileHover={clickAndSelectCount <= 0 ? "hover" : "none"}
                        whileTap={clickAndSelectCount <= 0 ? "click" : "none"}
                        onTap={(e)=>{
                            onShuffleHandler(e);
                        }}
                        style={clickAndSelectCount <= 0 
                            ?{
                                opacity: 1,
                                cursor: 'pointer',
                                transition: `opacity 1s ease-in-out`,
                            } 
                            :{
                                opacity: 0.5,
                                cursor: 'auto',
                                transition: `opacity 1s ease-in-out`,
                            }}
                    > 
                        <button
                            style={clickAndSelectCount <= 0 
                                ?{
                                    cursor: 'pointer',
                                } 
                                :{
                                    cursor: 'auto',
                                }}
                        >Shuffle</button>
                    </DrawControlBtn>
                    <DrawControlBtn // Modify Btn
                        variants={drawControlBtnVariants}
                        whileHover={clickAndSelectCount <= 0  ? "hover" : "none"}
                        whileTap={clickAndSelectCount <= 0   ? "click" : "none"}
                        onTap={(e)=>{
                            onModifyHandler(e);
                        }}
                        style={clickAndSelectCount <= 0  
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
                            style={clickAndSelectCount <= 0 
                                ?{
                                    cursor: 'pointer',
                                } 
                                :{
                                    cursor: 'auto',
                                }}
                        >Modify</button>
                    </DrawControlBtn>
                    <DrawControlBtn // Reset Btn
                        variants={drawControlBtnVariants}
                        whileHover={clickAndSelectCount > 0 ? "hover" : "none"}
                        whileTap={clickAndSelectCount > 0 ? "click" : "none"}
                        onTap={(e)=>{
                            onResetHandler(e);
                        }}
                        style={clickAndSelectCount > 0 
                            ?{
                                opacity: 1,
                                transition: `opacity 1s ease-in-out`,
                                cursor: 'pointer',
                            } 
                            :{
                                opacity: 0.5,
                                transition: `opacity 1s ease-in-out`,
                                cursor: 'auto'
                            }}
                    > 
                        <button
                            style={clickAndSelectCount > 0 
                                ?{
                                    cursor: 'pointer',
                                } 
                                :{
                                    cursor: 'auto',
                                }}
                        >Reset</button>
                        
                    </DrawControlBtn>
                    <DrawControlBtn // Next Btn
                        variants={drawControlBtnVariants}
                        whileHover={clickAndSelectCount === userSelectCount ? "hover" : "none"}
                        whileTap={clickAndSelectCount === userSelectCount ? "click" : "none"}
                        onTap={(e)=>{
                            onNextHandler(e);
                        }}
                        style={clickAndSelectCount === userSelectCount 
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
                            style={clickAndSelectCount === userSelectCount 
                                ?{
                                    cursor: 'pointer',
                                } 
                                :{
                                    cursor: 'auto',
                                }}
                        >Next</button>
                        
                    </DrawControlBtn>
                    </>
                </DrawControlBtnBox>
            </DrawControlContainer>
            {isStartOver === false 
                ? <Curtain 
                      variants={curtainVariant}
                      initial="initial"
                      animate="start" />
                : null
            }
            {
                activeOptionContainer === true
                ? 
                    <OptionState
                        dispatch={dispatch}
                        selectedCardCount={_selectedCardCount}
                        optionController={optionController}
                        selectedNumArrController={selectedNumArrController}
                        selectedNumStateArrController={selectedNumStateArrController}
                        clickCounterController={clickCounterController}
                        totalChildStateArrController={totalChildStateArrController}
                        drawRanNumArrController={drawRanNumArrController}
                        setUserSelectCount={setUserSelectCount}
                    />
                : null
            }
        </DrawContainer>
        {/* {
            isCardClicked === true
            ? <QuestionModal></QuestionModal>
            : null
        } */}
    </>
  )
}

export default DrawComponents