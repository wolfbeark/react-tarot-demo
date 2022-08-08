
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'


import {
    HorizontalContainer,
    VerticalContainer,
} from '../../CustomStyles'
import {
    colors,
    fonts,
} from '../../theme'

const MenuBtnBox = styled(HorizontalContainer)`

    width: 95%;
    height: 10%;
    min-height: 15%;
    background-color: ${colors.color.lemonchiffon};
    margin-bottom: 5%;

    border-radius: inherit;
    padding: 0 1%;
    justify-content: space-between;
    font-size: 0.8em;
    span{
        &:first-child{
            //background-color: white;
            width: 55%;
            height: 50%;
            display: flex;
            justify-content: start;
            align-items: center;
            padding-left: 1%;
        }
        &:nth-child(2){
            width: 10%;
            height: 50%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &:nth-child(3){ // 시바 버근가 
            width: 10%;
            height: auto;
            background-color: blue;
        }
    }
`
const OnOffBox = styled(HorizontalContainer)`

    width: 10%;
    height: 50%;
    background-color: ${colors.color.gray};
    padding: 1%;
    & > button{
        outline: unset;
        border: none;
        background-color: white;
        width: 90%;
        height: 90%;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }
`

const menuBtnBoxVar = {

    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1.0,
    }
}
function HideActiveBtn(props) {

    let deckNumber = props.deckNumber;
    let deckName = props.deckName;
    let cardType = props.cardType;
    let cardCount = props.cardCount;

    let {
        hideBtnOnOffArr,
        setHideBtnOnOffArr
    } = props.hideBtnOnOffArrController; // SpreadStep

    let setBtnControlArr = props.setBtnControlArr; // HideAndSeek

    const [isClickedHideBtn, setIsClickedHideBtn] = useState(hideBtnOnOffArr[deckNumber]);
    const [isClickedSeekBtn, setIsClickedSeekBtn] = useState(!hideBtnOnOffArr[deckNumber]);
    

    let setSelectedDeckInfo = props.setSelectedDeckInfo; // HideAndSeek

    

    const preSettingArrHandler = (flag) => {
        let _hideBtnOnOffArr = hideBtnOnOffArr; // SpreadStep 배열 참고
        _hideBtnOnOffArr[deckNumber] = flag; // 값 대입
        setBtnControlArr(_hideBtnOnOffArr); // HideAndSeek setting
    }



    const giveDeckInfo = (mode) => {
        let _temp = {
            deckNumber : deckNumber,
            deckType : cardType,
            deckCount : cardCount,
            currentMode : mode,
        }
        setSelectedDeckInfo(_temp);
    }
    
    const btnControlHandler = (mode) => {
        let _mode = mode;
        setIsClickedHideBtn(!isClickedHideBtn);
        setIsClickedSeekBtn(!isClickedSeekBtn);
        if(_mode === "HIDE"){
            preSettingArrHandler(true);
        }
        else if(_mode === 'SEEK'){
            preSettingArrHandler(false);
        }
        giveDeckInfo(_mode);
    }

  return (
    <>
    <MenuBtnBox
        // variants={menuBtnBoxVar}
        // whileHover="hover"
        // whileTap="click"
        
    >
        <span>
            {deckName}
        </span>
        <span>
            HIDE
        </span>
        <OnOffBox
            onClick={(e)=>{
                e.preventDefault();
                if(isClickedHideBtn === false){
                    btnControlHandler("HIDE");
                }
                else{
                    btnControlHandler("SEEK");
                }
            }}
        >
            <button
                style={
                    isClickedHideBtn === true
                    ?{
                        backgroundColor: "seagreen",
                    }
                    :{
                        backgroundColor: "whitesmoke",
                    }
                }
                
            >

            </button>
        </OnOffBox>
        <span
            style={{
                width:'10%',
                height: '50%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            SEEK
        </span>
        <OnOffBox>
            <button
                style={
                    isClickedSeekBtn === true
                    ?{
                        backgroundColor: "seagreen",
                    }
                    :{
                        backgroundColor: "whitesmoke",
                    }
                }
                onClick={(e)=>{
                    e.preventDefault();
                    if(isClickedSeekBtn === false){
                        btnControlHandler("SEEK");
                    }
                    else{
                        btnControlHandler("HIDE");
                    }
                }}
            >

            </button>
        </OnOffBox>
    </MenuBtnBox>
    </>
  )
}

export default HideActiveBtn