
import React, { useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import {
    HorizontalContainer
} from '../../CustomStyles'

const OptionContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 50;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`
const YesOrNoBox = styled(HorizontalContainer)`
    background-color: gray;
    width: 40%;
    height: 60%;
    font-size: 0.5em;
    font-weight: 600;

    cursor: pointer;
`
const yesOrNoVariants = {
    hover:{
        scale: 1.1,
        boxShadow: '0 0 10px 2px skyblue'
    },
    click:{
        scale: 1,
    }
}
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
        font-size: 1.5em;
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
        font-size: 0.8em;


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

    position: relative;
    
    & > span,
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
        font-size: 1.5em;
        margin-top: 5%;
    }
    & > input{
        outline: unset;
        border: none;
        width: 80%;
        border-radius: 20px;
        font-size: 1.2em;
        font-weight: 600;
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
const OptionModal = styled(motion.div)`
        width: 15%;
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
            font-size: 1em;
            font-weight: 600;
            width: 100%;
            height: 100%;
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
function OptionState(props) {

    let optionType = props.optionType;
    let setOptionType = props.setOptionType;
    let [optionStage, setOptionStage] = useState(0);
    let setActiveOptionContainer = props.setActiveOptionContainer;
    let [value, setValue] = useState('');
    let [isModifyNumAlright, setModifyNumAlright] = useState(false);
    let userSetNumber = props.userSetNumber;
    let [tempString, setTempString] = useState('');
    let {selectedCardControlArr, 
        setSelectedCardControlArr} = props.selectCardController;
    let drawRanNumArr = props.drawRanNumArr;
    let setDrawRanNumArr = props.setDrawRanNumArr;
    let {selectCount, setSelectCount} = props.selectCounter;
    let selectedCardArr = props.selectedCardArr;
    let setSelectedCardArr = props.setSelectedCardArr;
    let setUserSetNumber = props.setUserSetNumber;
    let setSelectedImgNumArr = props.setSelectedImgNumArr;
    let setThirdFlagOver = props.setThirdFlagOver;
    
    const questionArr = [
        "",
        "자동으로 카드를 선택하시겠습니까?", // auto
        "카드를 다시 섞으시겠습니까?", // shuffle
        "선택할 카드 수량을 바꾸시겠습니까?", // Modify
        "선택한 카드들을 모두 취소하시겠습니까?", // reset
        "카드를 펼쳐서 타로와 대화하시겠습니까?", // next
    ]
    // 0: null, 1: auto, 2: Shuffle, 3: Modify 4: Reset, 5: Next
    const autoSetting = () => {
        let _selectedCardControlArr = selectedCardControlArr;
        let _selectedCardArr = selectedCardArr;
        for(let i = 0; i < userSetNumber; i++){ // idx, imgnum, click
            _selectedCardControlArr[i].setThisCardClicked(true);
            _selectedCardControlArr[i].isThisCardClicked = true;
            _selectedCardControlArr[i].setSelectedIdxNum(i);
            _selectedCardArr[i] = 
                drawRanNumArr[i];
        }
        setSelectedCardControlArr(_selectedCardControlArr);
        setSelectedCardArr(_selectedCardArr);
        setSelectCount(userSetNumber);
    }
    const shuffleSetting = () => {
        let tempRanNumArr = new Array(78);
        let _selectedCardControlArr = selectedCardControlArr;
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
        for(let i = 0; i < selectedCardControlArr.length; i++){
            _selectedCardControlArr[i].imgNum = tempRanNumArr[i];
        }
        setSelectedCardControlArr(_selectedCardControlArr);
        setDrawRanNumArr(tempRanNumArr);
    }
    const cardSelectReset = () => {
        let _selectedCardControlArr = selectedCardControlArr;
        let _selectedCardArr = selectedCardArr;
        for(let i = 0; i < _selectedCardControlArr.length; i++){
            if(_selectedCardControlArr[i].isThisCardClicked === false){
                continue;
            }
            else{
                _selectedCardControlArr[i].setThisCardClicked(false);
                _selectedCardControlArr[i].isThisCardClicked = false;
                _selectedCardControlArr[i].setSelectedIdxNum(100);
            }
        }
        for(let i = 0; i < selectedCardArr.length; i++){
            _selectedCardArr[i] = 100;
        }
        setSelectedCardControlArr(_selectedCardControlArr);
        setSelectedCardArr(_selectedCardArr);
        setSelectCount(0);
    }
    const goToSpread = () => {
        let _selectedCardArr = [...selectedCardArr];
        setSelectedImgNumArr(_selectedCardArr);
        setTimeout(() => {
            setThirdFlagOver(true);
            setOptionStage(0);
            setActiveOptionContainer(false);
            setOptionType(0);
        }, 2000);
    }
    const onBtnHandler = (flag) => {
        let timer = () =>{
            setTimeout(() => {
                setOptionStage(0);
                setActiveOptionContainer(false);
                setOptionType(0);
            }, 2000);
        }
        if(flag === true){  // Yes
            switch(optionType){
                case 1: // auto
                    autoSetting();
                    setOptionStage(1);
                    timer();
                break;
                case 2: // shuffle
                    shuffleSetting();
                    setOptionStage(1);
                    timer();
                break;
                case 3: // modify
                    setOptionStage(2);
                break;
                case 4: // Reset
                    cardSelectReset();
                    setOptionStage(1);
                    timer();
                break;
                case 5: // Next
                    goToSpread();
                    setOptionStage(1);
                    timer();
                break;
                default:
                break;
            }
        }
        else{ // No
            setOptionStage(0);
            setOptionType(0);
            setActiveOptionContainer(false);
        }
    }
    const onChangeHandler = (e) =>{
        let test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setValue(test);
    }
    const setModifyNumAlrightHanler = (type, tempNum) =>{
        if(userSetNumber === tempNum){
            setTempString('입력값이 기존과 동일합니다');
        } else{
            setTempString('입력에 실패하셨습니다');
        }
        setModifyNumAlright(true);
        setValue("");
        setTimeout(()=>{
            setModifyNumAlright(type);
        }, 1000)
    }
    const onButtonHandler = (e, type) =>{
        e.preventDefault();
        let timer = () =>{
            setTimeout(() => {
                setOptionStage(0);
                setActiveOptionContainer(false);
                setOptionType(0);
            }, 2000);
        }
        if(type === 'yes'){
            let tempNum = parseInt(value);
            if(tempNum <= 0 || tempNum > 78){
                //console.log('fail');
                setModifyNumAlrightHanler(false, tempNum);
            }
            else if(tempNum > 0 && tempNum <= 78){
                if(userSetNumber === tempNum){
                    setModifyNumAlrightHanler(false, tempNum);
                } else if(userSetNumber !== tempNum){
                    
                    
                    setUserSetNumber(tempNum); // 카드 수량
                    
                    setOptionStage(1);
                    setValue("");
                    timer();
                } 
            }
        }else if(type === 'no'){
            //console.log('back');
            setValue('');
            setOptionStage(0);
            setActiveOptionContainer(false);
            setOptionType(0);
        }
    }
  return (
    <>
        <OptionContainer
            variants={optionContainerVariants}
            initial="initial"
            animate="start"
        >
            <>
            <OptionQuestionBox>
                {optionStage === 0
                ?
                <>
                <OptionQuestionActiveBox>
                    <span>
                        {questionArr[optionType]}
                    </span>
                    <div>
                        <YesOrNoBox
                            variants={yesOrNoVariants}
                            whileHover="hover"
                            whileTap="click"
                            onClick={(e)=>{
                                e.preventDefault();
                                onBtnHandler(true);
                            }}
                        >
                            YES
                        </YesOrNoBox>
                        <YesOrNoBox
                            variants={yesOrNoVariants}
                            whileHover="hover"
                            whileTap="click"
                            onClick={(e)=>{
                                e.preventDefault();
                                onBtnHandler(false);
                            }}
                        >
                            NO
                        </YesOrNoBox>
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
                                placeholder='( 1 ~ 78 )'
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
                                    <OptionModal
                                        variants={modalVariant}
                                        animate="start"
                                    >
                                        <span
                                            style={{
                                                fontSize: '0.05em',
                                            }}
                                        >
                                            {tempString}
                                        </span>
                                    </OptionModal>
                                </>
                                : null
                            }
                    </>
                    : null
                }
            </OptionQuestionBox>
            </>
        </OptionContainer>
    </>
  )
}

export default OptionState