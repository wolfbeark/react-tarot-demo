
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import Draggable from 'react-draggable'
 

const CardName = styled(motion.span)`
    width: 100%;
    height: 12%;
    background-color: beige;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Jua";
    font-size: 1em;
    font-weight: 600;
    margin: 5%;
`

const FindContainer = styled(motion.div)`

    width: 15%;
    height: 70%;
    background-color: gray;
    left: 63%;
    top: 6%;

    position: absolute;
    z-index: 500;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    cursor: pointer;

    padding: 1%;

    border-radius: 10px;
    & input,
    & span,
    & div,
    & button{
        border-radius: 10px;
    }

`
const ImgBox = styled(motion.div)`
    width: 100%;
    height: 60%;
    background-color: burlywood;
    background-image: url(${(props) => props.imgsrc});
    background-size: 100% 100%;
    margin-bottom: 5%;
`

const InputBox = styled(motion.div)`
    width: 100%;
    height: 20%;
    //background-color: skyblue;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    & input,
    & button{
        outline: unset;
        border: none;
    }
`
const InputBtn = styled(motion.button)`
    width: 100%;
    height: 100%;
    background-color: royalblue;
    font-family: "Jua";
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
`
const modeVariants = {
    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1.0,
    }
}

function Find(props) {

    let findCardImage = props.findCardImage;
    let findCardName = props.findCardName;
    let selectFindCardName = props.selectFindCardName;
    let selectFindImageNum = props.selectFindImageNum;
    const [position, setPosition] = useState({ x : 0, y : 0});
    const trackPos = (data) => {
        setPosition({ x : data.x , y : data.y });
    }
    //const [value, setValue] = useState("");
    let { whatMode, setWhatMode } = props.whatModeControl;
    //const [isClickedFind, setClickedFind] = useState(false);

    const findRef = useRef();

    useEffect(()=>{
        //console.log('change');
    }, [findCardImage])
    const convertMode = () => {
        setWhatMode(!whatMode);
    }
    const setIsActiveOptionCurtain = props.setIsActiveOptionCurtain;
    //const isActiveOptionCurtain = props.isActiveOptionCurtain;
    const setOptionType = props.setOptionType;
    const onFindActive = () => {
        setIsActiveOptionCurtain(true);
        setTimeout(()=>{
            setOptionType(4);
        }, 2000);
    }
  return (
    <>
    <Draggable nodeRef={findRef} onDrag={(e, data) => {trackPos(data)}}>
        <FindContainer
            ref={findRef}
            drag
            dragConstraints={props.refArr[1]}
            dragMomentum={false}
            dragPropagation={false}
        >
            <ImgBox
                imgsrc={
                    findCardImage !== 100 && whatMode === false
                    ? 
                    `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${findCardImage}.png`
                    : findCardImage !== 100 || whatMode === true
                        ? 
                        `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${selectFindImageNum}.png`
                        : ""
                }
            ></ImgBox>
            <CardName 
                style={{
                    cursor: 'auto',
                }}   
            >
                
                {
                    whatMode === false
                    ? findCardName !== null
                        ? findCardName
                        : ""
                    : selectFindCardName !== null
                        ? selectFindCardName
                        : ""
                }
            </CardName>
            <CardName
                variants={modeVariants}
                whileHover="hover"
                whileTap="click"
                onClick={()=>{
                    convertMode();
                }}
                style={{
                    cursor: "pointer"
                    
                }}
            >
                {
                    whatMode === false
                    ? "CHANGE MODE : ZOOM"
                    : "CHANGE MODE : FIND"
                }
            </CardName>
            <InputBox>
                <InputBtn
                    variants={modeVariants}
                    whileHover="hover"
                    whileTap="click"
                    onClick={()=>{
                        onFindActive();
                    }}
                    
                >
                    FIND CARD
                </InputBtn>
            </InputBox>
        </FindContainer>
    </Draggable>
    
    </>
  )
}

export default Find