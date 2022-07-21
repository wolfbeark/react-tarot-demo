import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons'

import {
    HorizontalContainer,
    VerticalContainer,
    VerticalForm,
    DefaultBtnVar
} from '../../CustomStyles'

import {
    border,
    colors,
    fonts,
} from '../../theme'

const FirstStepContainer = styled(VerticalContainer)`

    width: 100%;
    height: 100%;
    border-radius: ${border.radius[10]};
    background-color: ${colors.color.royalblue};
`
const QuestionBox = styled(HorizontalContainer)`

    width: 60%;
    height: 60%;
    background-color: ${colors.color.navy};
    border-radius: ${border.radius[10]};
    padding: 1%;
    cursor: auto;
    position: relative;
    
`
const QuestionForm = styled(VerticalForm)`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: ${colors.color.skyblue};

    & > label{
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 1.5em;
        margin: 4%;
    }
    
`
const QuestionBtn = styled(HorizontalContainer)`
    width: 30%;
    height: 20%;
    background-color: ${colors.color.beige};
    border-radius: ${border.radius[10]};
    text-align: center;

    transition: background-color 0.2s ease-in-out;
`
const Modal = styled(HorizontalContainer)`
    width: 50%;
    height: 60%;
    //background-color: ${colors.color.beige};
    //opacity: 0.5;
    background-color: rgba(245, 245, 220, 0.8);
    border-radius: ${border.radius[10]};
    position: absolute;
    & span{
        font-size: 2em;
    }
`
const QuestionPreviewBox = styled(HorizontalContainer)`
    width: 28%;
    height: 10%;
    position: absolute;
    justify-content: space-between;
    background-color: ${colors.color.beige};
    //background-color: ${colors.color.royalblue};

    border-radius: ${border.radius[10]};
    text-align: center;
    right: 24%;
    bottom: 4%;
    box-shadow: 0 0 5px 1px black;
    padding: 0 0.5%;
    & > span{
        width: 70%;
        height: 100%;
        border-radius: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        font-weight: 600;
    }
`
const PreviewToggleBtn = styled(HorizontalContainer)`
    width: 25%;
    height: 90%;
    border-radius: inherit;
    background-color: ${colors.color.gray};
    font-size: 1.5em;
    font-weight: 600;
    padding: 2%;
    transition: background-color 0.5s ease-in-out;
    & ${QuestionBtn}{
        width: 100%;
        height: 100%;
        background-color: ${colors.color.navy};
        color: ${colors.color.lemonchiffon};
        letter-spacing: 0.1em;
    }
`
const ModeInSelectBox = styled(HorizontalContainer)`
    width: 90%;
    height: 25%;
    background-color: ${colors.color.navy};
    border-radius: ${border.radius[10]};
    padding: 1%;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 5%;
    

    & > input{
        outline: unset;
        border: none;
        width: 60%;
        height: 80%;
        font-size: 2em;
        text-align: center;
        font-family: ${fonts.family.base};
        font-weight: ${fonts.weight[600]};
        border-radius: ${border.radius[10]};
        transition: box-shadow 0.2s ease-in-out;
    }
    & > input:focus{
        box-shadow: 0 0 10px 5px ${colors.color.beige};
    }
    // & div{
    //     background-color: lemonchiffon;
    //     width: 100%;
    //     height: 100%;
    // }
`

const CustomSelectBox = styled(HorizontalContainer)`
    width: 30%;
    height: 80%;
    
    border-radius: ${border.radius[10]};
    background-color: lemonchiffon;
    cursor: pointer;
    justify-content: space-evenly;
    position: relative;

    & span{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > span:first-child{
        font-size: 1em;
        text-align: center;
        font-family: ${fonts.family.base};
        font-weight: ${fonts.weight[600]};
        width: 70%;
        height: 80%;
        text-align: center;
    }
    & > span:last-child{
        font-family: sans-serif;
        width: 25%;
        height: 80%;
        text-align: center;

    }
`
const ModeModal = styled(VerticalContainer)`

    width: 120%;
    height: 300%;
    border-radius: ${border.radius[10]};
    background-color: rgba(125, 125, 125, 0.8);
    //background-color: red;
    position: absolute;

    justify-content: start;
    top: 130%;

    scroll-behavior: auto;
    overflow: overlay;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 0.5vw;
    }
    ::-webkit-scrollbar-thumb {
        //background-color: hsla(0, 0%, 42%, 0.49);
        background-color: beige;
        border-radius: 100px;
    
    }

`
const ModeBox = styled(HorizontalContainer)`

    width: 80%;
    height: 20%;
    margin: 2%;
    min-widht: 80%;
    min-height: 30%;
    border-radius: inherit;
    background-color: ${colors.color.beige};
    & > span{
        font-size: 1em;
        text-align: center;
        font-family: ${fonts.family.base};
        font-weight: ${fonts.weight[600]};
    }
`

const modalVar = {
    initial:{
        scale: 0
    },
    start:{
        scale: 1,
        transition:{
            duration: 0.3,
        }
    }
}
function FirstStep(props) {

    const setModeNumber = props.setModeNumber;
    const [value, setValue] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [infoText, setInfoText] = useState('');
    const [nextBtnActive, setNextBtnActive] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false);

    const _tempModeArr = [
        {
            ModeNum: 0,
            ModeName: "FREE",
            CardCount: 0,
        },
        {
            ModeNum: 1,
            ModeName: "Three Cards",
            CardCount: 3,
        },
        {
            ModeNum: 2,
            ModeName: "Hexagram",
            CardCount: 7,
        },
        {
            ModeNum: 3,
            ModeName: "Celtic Cross",
            CardCount: 11,
        },
    ]
    const [activeModeModal, setActiveModeModal] = useState(false);
    const [currentMode, setCurrentMode] = useState(0);
    const [modeArr, setModeArr] = useState(_tempModeArr);
    const setFirstFlagOver = props.setFirstFlagOver;
    const setUserSetNumber = props.setUserSetNumber;
    const setUserWannaSeePreCard = props.setUserWannaSeePreCard;
    const setPreviewNumbers = props.setPreviewNumbers;

    useEffect(()=>{
        setModeArr(_tempModeArr);
    }, [])
    const onChangeHandler = (e) => {
        let test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setValue(test);
    }
    const onChecktNumberHandler = () =>{
        let parsedToNum = parseInt(value);
        if(parsedToNum > 0 && parsedToNum <= 78){
            setModalActive(true);
            setInfoText("입력에 성공하였습니다");
            setNextBtnActive(true);
        }            
        else if(parsedToNum <= 0 || parsedToNum > 78){
            setModalActive(true);
            setNextBtnActive(false);
            setInfoText("올바른 값이 아닙니다");
            setTimeout(()=>{ setValue('') }, 1000);
        }
        setTimeout(()=>{
            setModalActive(false);
        }, 1000);
    }
    const onNextBtnHandler = () => {
        let parsedToNum = parseInt(value);
        if(currentMode !== 0){
            setModeNumber(currentMode)
        }
        setUserSetNumber(parsedToNum);
        setFirstFlagOver(true);
        if(toggleBtn !== false){ // preview 3 cards on 상황
            setUserWannaSeePreCard(toggleBtn);
            
            let _tempArr = new Array(3);
            _tempArr.fill(100);
            for(let k = 0; k < 3; k++){
                if(k === 1 || k === 2){
                    _tempArr.fill(100);
                }
                for(let i = 0; i < _tempArr.length; i++)
                {
                    let _tempNum = Math.floor((Math.random() * 78));
                    _tempArr[i] = _tempNum;
                    for(let j = 0; j < i; j++)
                    {
                        if(_tempArr[j] === _tempArr[i])
                        {
                            i--;
                            break;
                        }
                    }
                }
                //console.log(_tempArr);
            }
            //setRanNumArr(_tempArr);
            setPreviewNumbers(_tempArr);
        }
    }
    const onActiveModeModal = () =>{
        setActiveModeModal(!activeModeModal);
    }
    const onChangeMode = (i) =>{
        let temp = i;
        setCurrentMode(modeArr[temp].ModeNum);
        if(nextBtnActive === true){
            setNextBtnActive(false);
        }
        if(i === 0){
            setValue("");
            if(nextBtnActive === true){
                setNextBtnActive(false);
            }
        }else{
            setValue(modeArr[temp].CardCount);
        }
        setActiveModeModal(!activeModeModal);
    }
  return (
    <>
    <FirstStepContainer>
        <QuestionBox>
            <QuestionForm
                onSubmit={(e)=>{
                    e.preventDefault();
                    if(modalActive === false){
                        onChecktNumberHandler();
                    }
                }}
            >
                <label htmlFor='Question_input1'>
                    원하시는 숫자를 입력하세요
                </label>
                <ModeInSelectBox>
                    <CustomSelectBox
                        onClick={(e)=>{
                            e.preventDefault();
                            onActiveModeModal();
                        }}
                    >
                        <span>{modeArr[currentMode].ModeName}</span>
                        <FontAwesomeIcon 
                            icon={faSquareCaretDown} 
                        />
                        {
                            activeModeModal === true
                            ?
                            <>
                            <ModeModal>
                            <>
                                {
                                    modeArr.map((a, i) =>{
                                    return(
                                        <ModeBox
                                            key={i}
                                            onClick={()=>{
                                                onChangeMode(i);
                                            }}
                                        >
                                            <span>
                                                {a.ModeName}
                                            </span>
                                        </ModeBox>
                                    );
                                    })
                                }
                            </>
                            </ModeModal>
                            </>
                            : null
                        }
                    </CustomSelectBox>
                    <input 
                        id='Question_input1' 
                        placeholder='1 - 78'
                        maxLength={2}
                        value={value}
                        autoComplete="off"
                        onChange={(e)=>{
                            if(currentMode === 0){
                                if(nextBtnActive === true){
                                    setNextBtnActive(false)
                                }
                                onChangeHandler(e);
                            }
                        }}    
                    />
                </ModeInSelectBox>
                
                <QuestionBtn
                    variants={DefaultBtnVar}
                    whileHover={
                        value.length <= 0
                        ? DefaultBtnVar.empty
                        : DefaultBtnVar.hover
                    }
                    whileTap={
                        value.length <= 0
                        ? DefaultBtnVar.empty
                        : DefaultBtnVar.click
                    }
                    style={
                        value.length <= 0
                        ?
                        {
                            backgroundColor : colors.color.navy,
                            cursor: 'auto',
                        }
                        :
                        {
                            backgroundColor : colors.color.royalblue,
                            cursor: 'pointer',
                        }
                    }
                    onClick={(e)=>{
                        e.preventDefault();
                        if(modalActive === false){
                            onChecktNumberHandler();
                        }
                    }}
                >
                    설 정 완 료
                </QuestionBtn>
            </QuestionForm>
        </QuestionBox>
        {
            modalActive === true
            ?
            <>
            <Modal
                variants={modalVar}
                initial="initial"
                animate="start"
            >
                <span>
                    {infoText}
                </span>
            </Modal>
            </>
            : null
        }
        {
            nextBtnActive === true && modalActive === false
            ?
            <>
            <QuestionBtn // NextBtn
                style={{
                    position: 'absolute',
                    width: '20%',
                    height: '10%',
                    right: '2%',
                    bottom: '4%',
                    fontSize: '1.5em',
                    fontWeight: '600',
                    boxShadow: '0 0 5px 1px black',
                    transition: 'box-shadow 0.2s ease-in-out',
                }}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                    }
                }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 5px 1px beige',
                }}
                whileTap={{
                    scale: 1.0,
                }}
                onClick={(e)=>{
                    e.preventDefault();
                    if(nextBtnActive === true){
                        onNextBtnHandler();
                    }
                }}

            >
                N E X T
            </QuestionBtn>
            <QuestionPreviewBox // 3장 미리보기 온오프
                initial={{
                    opacity: 0  
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.5,
                    }
                }}
            >
                <span>Preview 3 Cards</span>
                <PreviewToggleBtn
                    style={
                        toggleBtn === false
                        ?
                        {
                            backgroundColor : "skyblue",
                        }
                        :
                        {
                            backgroundColor : "tomato",
                        }
                    }
                >
                    <QuestionBtn
                        onClick={(e)=>{
                            e.preventDefault();
                            if(nextBtnActive === true){
                                setToggleBtn(!toggleBtn);
                            }
                        }}
                    >
                        {toggleBtn === false
                        ? "OFF"
                        : "ON"
                        }
                    </QuestionBtn>
                </PreviewToggleBtn>
            </QuestionPreviewBox>
            </>
            : null
        }
    </FirstStepContainer>
    </>
  )
}

export default FirstStep