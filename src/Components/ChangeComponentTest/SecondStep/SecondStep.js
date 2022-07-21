
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import {
    HorizontalContainer,
    VerticalContainer,
    DefaultBtnVar
} from '../../CustomStyles'

import{
    colors,
    border,
} from '../../theme'

const SecondStepContainer = styled(VerticalContainer)`
    width: 100%;
    height: 100%;
    border-radius: ${border.radius[10]};
    background-color: ${colors.color.royalblue};
    justify-content: start;
`
// const QuestionBox = styled(HorizontalContainer)`

//     width: 60%;
//     height: 50%;
//     background-color: ${colors.color.navy};
//     border-radius: ${border.radius[10]};
//     padding: 1%;
//     cursor: auto;
// `
// const QuestionPreviewThreeContainer = styled(VerticalContainer)`
//     width: 100%;
//     height: 100%;
//     border-radius: inherit;
//     background-color: ${colors.color.skyblue};
//     //justify-content: space-evenly;
//     & > span{
//         width: 100%;
//         height: auto;
//         background-color: red;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         font-size: 2em;
//         margin-bottom: 2%;
//     }
// `
// const BtnBox = styled(HorizontalContainer)`
//     width: 100%;
//     height: 40%;
//     background-color: gray;
//     justify-content: space-between;
//     border-radius: inherit;
// `
const OptionalBtnBox = styled(HorizontalContainer)`

    width: 100%;
    height: 15%;
    background-color: gray;
    justify-content: space-evenly;
    position: relative;
`
const DefaultBtn = styled(HorizontalContainer)`
    width: 20%;
    height: 80%;
    background-color: ${colors.color.navy};
    border-radius: ${border.radius[10]};
    padding: 0.8%;
    transition: opacity 0.5s ease-in-out;
    & > div{
        background-color: ${colors.color.skyblue};
        width: 100%;
        height: 100%;
        border-radius : inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const PreviewCardContainer = styled(HorizontalContainer)`
    width: 100%;
    height: 70%;
    background-color: lemonchiffon;
    position: relative;
`
const DefaultCard = styled(HorizontalContainer)`
    width: 10%;
    height: 30%;
    background-color: olive;
    border-radius: ${border.radius[10]};
    position: absolute;
    z-index: ${(props) => props.zidx};
`
const OptionalBtnBoxMask = styled(motion.div)`
    width: 100%;
    height: 100%;
    //background-color: white;
    position: absolute;
`
const MaskShuffleCard = styled(motion.img).attrs(props => ({
    src: `${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`,

}))`

    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    z-index: 99;
    background-size: 100%;
`
const TempShuffleCard = styled(motion.img).attrs(props => ({
    src: props.isdrawanimationover === "true"
    ? `${process.env.PUBLIC_URL}${props.defaultimgarr[props.imgnum]}`  
    : `${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`,
}))` 

    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    z-index: 99;
    background-size: 100%;
`
const drawVariants ={
    initial:{
        easeIn: "easeInOut",
    },
    startToLeft:{
        left: "20%",
        top:"15%",

        transition:{
            duration: 2,
            left:{
                duration:1,
            },
            top:{
                delay: 1,
                duration: 1,
            }
        }
    },
    startToRight:{
        left: "68%",
        top:"15%",
        transition:{
            duration: 2,
            left:{
                duration:1,
            },
            top:{
                delay: 1,
                duration: 1,
            }
        }
    },
    middleToUp:{
        top:"15%",
        transition:{
            duration: 2,
            top:{
                delay: 1,
                duration: 1,
            }
        }
    },
}
const DrawPreviewDeckVariants = {
    initial:{
        opacity: 0,
        boxShadow: 'none'
    },
    start:{
        opacity: 1,
        boxShadow: "0 0 30px 10px gray",
        transition:{
            duration: 1
        }
    },
    moveToTop:{
        top: '10%',
        transition:{
            duration: 1,
            type:"spring"
        }
    },
}
const drawChildVariants ={
    initial:{
        cursor:"auto",
    }
    ,
    hover:{
        scale: 1.1,
    }
    ,
    moveToDownLeft:{
        top:"125%",
        cursor:"pointer",
        boxShadow: "0 0 30px 10px gray",
        transition:{
            duration: 1.5,
            delay: 2,
            type:"spring",
            boxShadow:{
                delay: 3.5,
            }
        }
    },
    moveToDownCenter:{
        top:"125%",
        cursor:"pointer",
        boxShadow: "0 0 30px 10px gray",
        transition:{
            duration: 1.5,
            delay: 2.5,
            type:"spring",
            boxShadow:{
                delay: 4,
            }
        }
    },
    moveToDownRight:{
        top:"125%",
        cursor:"pointer",
        boxShadow: "0 0 30px 10px gray",
        transition:{
            duration: 1.5,
            delay: 3,
            type:"spring",
            boxShadow:{
                delay: 4.5,
            }
        }
    }
}
const NextBtn = styled(motion.div)`
    

    position: absolute;
    //bottom: 3%;

    width: 20%;
    height: 80%;
    background-color: ${colors.color.navy};
    border-radius: ${border.radius[10]};
    padding: 0.8%;

    display: flex;
    justify-content: center;
    align-items: center;
    & button{
        width: 100%;
        height: 100%;
        text-align: center;
        font-family: "Jua";
        font-size: 20px;
        font-weight: 600;
        outline: unset;
        border: none;
        // width: 80%;
        // height: 80%;
        background-color: ${colors.color.skyblue};
        cursor: pointer;
        border-radius: inherit;
    }
`
const nextBtnVariants = {
    initial:{
        opacity: 0,
    }
    ,
    start: {
        opacity: 1,
        transition: {
            duration : 1
        } 
    },
    hover: {
        scale: 1.1,
        boxShadow: `0 0 10px 3px aqua`,
        transition:{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
        }
    },
    allOver:{
        opacity: 0,
        transition:{
            duration: 2
        }
    }
}
function SecondStep(props) {

    const setSecondFlagOver = props.setSecondFlagOver;
    const [ranNumArr, setRanNumArr] = useState(new Array(3));
    const [isDrawClicked, setIsDrawClicked] = useState(false);
    const [isClickedShuffle, setIsClickedShuffle] = useState(false);
    const [isClickedCapture, setIsClickedCapture] = useState(false);
    let [isDrawAnimationOver, setDrawAnimationOver] = useState(false);
    let [isActiveNextBtn, setActiveNextBtn] = useState(false);
    let [isClickedNextBtn, setClickedNextBtn] = useState(false);

    useEffect(()=>{
        let _tempArr = new Array(3);
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
        setRanNumArr(_tempArr);
    }, []);

    const onShuffleHandler = () => {
        setIsClickedShuffle(true);
        let _tempArr = new Array(3);
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
        setTimeout(()=>{
            setIsClickedShuffle(false);
        }, 2100)
        setRanNumArr(_tempArr);
    }
    const onDrawHandler = (e) =>{
        setIsDrawClicked(true);
        setTimeout(()=>{
            setDrawAnimationOver(true);
        }, 4700)
        setTimeout(()=>{
            setActiveNextBtn(true);
        }, 5000);
    }
    const onNextBtnHandler = () =>{
        setClickedNextBtn(true);
        setTimeout(()=>{
            //dispatch(setIsOverPreThree({isOverPreviewThree: true}));
            console.log('second over');
            setSecondFlagOver(true);
        }, 2000)
    }
  return (
    <>
    <SecondStepContainer>
        <OptionalBtnBox>
            <DefaultBtn
                variants={DefaultBtnVar}
                whileHover={
                    isDrawClicked === false
                    ? DefaultBtnVar.empty   
                    : DefaultBtnVar.hover
                }
                whileTap={
                    isDrawClicked === false
                    ? DefaultBtnVar.empty   
                    : DefaultBtnVar.click
                }
                style={
                    isDrawClicked === false
                    ?
                    {
                        opacity: 0.5,
                        cursor: 'auto'
                    }
                    :
                    {
                        opacity: 1,
                        cursor: 'pointer'
                    }
                }
            >
                <div>
                    CAPTURE
                </div>
            </DefaultBtn>
            <DefaultBtn
                variants={DefaultBtnVar}
                whileHover={
                    isDrawClicked !== false
                    ? DefaultBtnVar.empty   
                    : DefaultBtnVar.hover
                }
                whileTap={
                    isDrawClicked !== false
                    ? DefaultBtnVar.empty   
                    : DefaultBtnVar.click
                }
                style={
                    isDrawClicked !== false || isClickedShuffle !== false
                    ?
                    {
                        opacity: 0.5,
                        cursor: 'auto'
                    }
                    :
                    {
                        opacity: 1,
                        cursor: 'pointer'
                    }
                }
            >
                <div
                    onClick={(e)=>{
                        e.preventDefault();
                        if(isClickedShuffle === false && isDrawClicked === false){            
                            onShuffleHandler();
                        }
                        
                    }}
                >
                    SHUFFLE
                </div>
            </DefaultBtn>
            <DefaultBtn
                variants={DefaultBtnVar}
                whileHover={
                    isDrawClicked !== false
                    ? DefaultBtnVar.empty   
                    : DefaultBtnVar.hover
                }
                whileTap={
                    isDrawClicked !== false
                    ? DefaultBtnVar.empty   
                    : DefaultBtnVar.click
                }
                style={
                    isDrawClicked !== false || isClickedShuffle !== false
                    ?
                    {
                        opacity: 0.5,
                        cursor: 'auto'
                    }
                    :
                    {
                        opacity: 1,
                        cursor: 'pointer'
                    }
                }
            >
                <div
                    onClick={(e)=>{
                        e.preventDefault();
                        if(isDrawClicked === false){
                            //setIsDrawClicked(true);
                            onDrawHandler();
                            setIsClickedCapture(true);
                        }
                    }}
                >
                    DRAW
                </div>
            </DefaultBtn>
            {
                isClickedShuffle === true
                ?
                <>
                <OptionalBtnBoxMask />
                </>
                : null
            }
        </OptionalBtnBox>
        
        <PreviewCardContainer>
            {
            isDrawClicked !== true
            ?
            <>
            <DefaultCard 
                variants={DrawPreviewDeckVariants}
                initial="initial"
                animate={
                    isClickedShuffle 
                    ? "moveToTop"
                    : "start"
                }
            />
            </>
            : null
            }
            {
            isDrawClicked === true
            ?
            <>
            <DefaultCard  // Center
                variants={drawVariants}
                animate="middleToUp"
            >
                <MaskShuffleCard />
                <TempShuffleCard
                    variants={drawChildVariants}
                    animate="moveToDownCenter"
                    whileHover={
                        isDrawAnimationOver === true
                        ? "hover"
                        : "none"
                    }
                >

                </TempShuffleCard>
            </DefaultCard>
            <DefaultCard  // Left
                variants={drawVariants}
                animate="startToLeft"
            >
                <MaskShuffleCard />
                <TempShuffleCard
                    variants={drawChildVariants}
                    animate="moveToDownLeft"
                    whileHover={
                        isDrawAnimationOver === true
                        ? "hover"
                        : "none"
                    }
                >

                </TempShuffleCard>
            </DefaultCard>
            <DefaultCard  // Right
                variants={drawVariants}
                animate="startToRight"
            >
                <MaskShuffleCard />
                <TempShuffleCard
                    variants={drawChildVariants}
                    animate="moveToDownRight"
                    whileHover={
                        isDrawAnimationOver === true
                        ? "hover"
                        : "none"
                    }
                >
                </TempShuffleCard>
            </DefaultCard>
            
            </>
            : null
            }
        </PreviewCardContainer>
        {
            isActiveNextBtn === true
            ?
            <>
            <OptionalBtnBoxMask
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '15%',
                }}
            >
            <NextBtn
                variants={nextBtnVariants}
                initial="initial"
                animate={isClickedNextBtn === true
                    ? "allOver"
                    : "start"
                }
                whileHover={
                    isClickedNextBtn === true
                    ? "none"
                    : "hover"
                }
            >
                <button
                    onClick={(e)=>{
                        e.preventDefault();
                        if(isClickedNextBtn === false){
                            onNextBtnHandler();
                        }
                    }}
                >N E X T</button>
            </NextBtn>
            </OptionalBtnBoxMask>
            </>
            : null
        }
    </SecondStepContainer>    
    </>
  )
}

export default SecondStep