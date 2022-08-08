
import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {motion} from 'framer-motion'


import {
    HorizontalContainer,
    VerticalContainer
} from '../../CustomStyles';

import {
    colors,
    fonts,
} from '../../theme';

import FindTypeCard from './FindTypeCard';

const SelectCardBox = styled(HorizontalContainer)`

    width: 80%;
    height: 80%;
    position: absolute;
    background-color: gray;

    z-index: 501;
    border-radius: 10px;
    padding: 1%;
`

const BackBtn = styled(HorizontalContainer)`
    width: 15%;
    height: 10%;
    background-color: ${colors.color.gray};
    border-radius: inherit;
    padding: 0.5%;
    position: absolute;
    right: 0;
    bottom: -12%;
    & > button{
        width: 100%;
        height: 100%;
        background-color: ${colors.color.beige};
        outline: unset;
        border: none;
        border-radius: inherit;
        font-family: ${fonts.family.base};
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
    }
`
const InSelectCardBox = styled(VerticalContainer)`
    width: 100%;
    height: 100%;
    background-color: ${colors.color.beige};
    border-radius: inherit;

    ${(props) =>{
        if(props.selectmenunum === 10){
            return css`
                padding: 1%;
            `
        }
        else{
            return css`
                padding: 0;
            `
        }
    }}
`
const SelectTypeMenuBox = styled(HorizontalContainer)`
    width: 100%;
    height: 30%;
    background-color: ${colors.color.beige};
    justify-content: space-evenly;
    border-radius: inherit;
    padding: 1%;
`
const MenuBox = styled(HorizontalContainer)`
    width: 35%;
    height: 70%;
    background-color: ${colors.color.gray};

    border-radius: inherit;

    font-family: ${fonts.family.base};
    font-size: 1.5em;
    font-weight: 800;
    
`

const menuBoxVar = {
    hover: {
        scale: 1.1,
        boxShadow: '0 0 10px 5px gray',
    },
    click: {
        scale: 1.0,
    }
}

function FindSelectCard(props) {

    let setOptionType = props.setOptionType;
    let setIsActiveOptionCurtain = props.setIsActiveOptionCurtain;

    const [selectMenuNum, setSelectMenuNum] = useState(10);

    const changeMenuNum = (num) =>{
        setSelectMenuNum(num);
    }
    const onBackBtnClick = () =>{
        setSelectMenuNum(10);
        setOptionType(0);
        setIsActiveOptionCurtain(false);    
    }
  return (
    <>
    <SelectCardBox>
    <InSelectCardBox
        selectmenunum={selectMenuNum}
    >
        {
            selectMenuNum === 10
            ?
            <>
            <SelectTypeMenuBox>
                <MenuBox
                    variants={menuBoxVar}
                    whileHover="hover"
                    whileTap="click"
                    onClick={(e)=>{
                        e.preventDefault();
                        changeMenuNum(0);
                    }}
                >
                    TAROT
                </MenuBox>
                <MenuBox
                    variants={menuBoxVar}
                    whileHover="hover"
                    whileTap="click"
                    onClick={(e)=>{
                        e.preventDefault();
                        changeMenuNum(1);
                    }}
                >
                    LENORMAND
                </MenuBox>
            </SelectTypeMenuBox>
            <SelectTypeMenuBox>
                <MenuBox
                    variants={menuBoxVar}
                    whileHover="hover"
                    whileTap="click"
                    onClick={(e)=>{
                        e.preventDefault();
                        changeMenuNum(2);
                    }}
                >
                    ICHING
                </MenuBox>
                <MenuBox
                    variants={menuBoxVar}
                    whileHover="hover"
                    whileTap="click"
                    onClick={(e)=>{
                        e.preventDefault();
                        changeMenuNum(3);
                    }}
                >
                    POKER
                </MenuBox>
            </SelectTypeMenuBox>
            </>
            : 
            <>
            <FindTypeCard 
                oracleType={selectMenuNum}
                setSelectMenuNum={setSelectMenuNum}
                setSelectImageType={props.setSelectImageType}
                setWhatMode={props.setWhatMode}
                setOptionType={setOptionType}
                setSelectFindImageNum={props.setSelectFindImageNum}
                setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                setSelectFindCardName={props.setSelectFindCardName}
            />
            </>
        }
        {/* {
            selectMenuNum !== 0
            ?
            <>
            <FindTypeCard 
                oracleType={selectMenuNum}
            />
            </>
            : null
        } */}
    </InSelectCardBox>
        <BackBtn
            style={{
                cursor: 'pointer',
            }}
            whileHover={{
                scale: 1.1,
            }}
            whileTap={{
                scale: 1.0
            }}
        >
            <button
                onClick={(e)=>{
                    e.preventDefault();
                    onBackBtnClick();
                }}
            >
                CLOSE
            </button>
        </BackBtn>
    </SelectCardBox>
    </>
  )
}

export default FindSelectCard