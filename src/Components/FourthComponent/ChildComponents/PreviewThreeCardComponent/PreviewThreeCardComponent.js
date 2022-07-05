import React, { useEffect, useState } from 'react'
import styled,{css} from 'styled-components';
import {motion} from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import { setIsOverPreThree } from '../../../../redux/actions/gameManager_action';




const DrawPreviewDeck = styled(motion.div).attrs({
    //src: `${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`,
})`
    position: absolute;
    width: 10%;
    height: 30%;
    border-radius: 10px;
    z-index: 99;
    box-shadow: 0 0 30px 10px gray;
    background-size: 100%;


`
const DrawPreviewDeckVariants ={
    initial:{
        transform: `translate(0, 0)`,
        scale: 0,
    },
    hover:{
        scale: 1.1,
        boxShadow: "0 0 30px 10px gray"
    },
    click:{
        scale: 1
    },
    moveToLeft:{
        left: '10%',
        scale: 1.2,
        rotate: 90,
        transition:{
            duration: 1,
        }
    },
    moveToRight:{
        left: '75%',
        transition:{
            duration: 1,
        }
    },
    rightStart:{
        scale: 1,
        transition:{
            duration: 1
        }
    }
}

const DrawPreviewDeckVariantsTest = {
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
    moveToLeft:{
        top: '10%',
        transition:{
            duration: 1,
            type:"spring"
        }
    },

}
const TestNavBar = styled(motion.div)`
    width: 100%;
    height: 8%;
    //background-color: royalblue;
    position: fixed;
    top: 2%;

    display: flex;
    justify-content: center;
    align-items: center;


    // &  div{
    //     width: 10%;
    //     height: 100%;
    //     background-color: #123456;
    //     margin: 0 10%;

    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     text-align: center;
    //     border-radius: 10px;
        //box-shadow: 0 0 10px 5px darkblue;

        // button{
        //     font-family: "Jua";
        //     font-size: 1.5em;
        //     width: 95%;
        //     height: 85%;
        //     background-color: skyblue;
        //     outline: unset;
        //     border: none;
        //     cursor: pointer;
        //     border-radius: 10px;
        // }
    }
`
const FunctionalBox = styled(motion.div)`
    width: 10%;
    height: 100%;
    background-color: #123456;
    margin: 0 10%;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;

    transition: opacity 0.5s ease-in-out;
`
const FunctionalBtn = styled(motion.button)`
    font-family: "Jua";
    font-size: 1.5em;
    width: 95%;
    height: 85%;
    background-color: skyblue;
    outline: unset;
    border: none;
    border-radius: 10px;
    transition: opacity 0.5s ease-in-out;
`
const functionalBtnVar = {
    initial:{
        opacity: 0
    },
    start:{
        opacity: 1.0,
        transition:{
            duration: 1.0
        }
    },
    hover: {
        scale: 1.2,
        boxShadow: '0 0 10px 2px #123456'
    },
    click: {
        scale: 1.0
    }
}
const PreviewAlarmModal = styled(motion.div)`

    width: 30%;
    height: 8%;
    background-color: yellow;
    box-shadow: 0 0 20px 5px yellow;
    border-radius: 15px;

    position: absolute;
    top: 12%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Jua";

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


const AlarmVariants = {
    initial:{
        opacity: 0,
        scale: 0
    }
    ,
    start:{
        opacity: 1,
        scale: 1,
        transition:{
            duration: 1,
            repeat: 2,
            repeatType: "reverse"
        }
    },
    
}
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
    width: 15%;
    height: 8%;
    background-color: aqua;

    position: absolute;
    bottom: 3%;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    & button{
        text-align: center;
        font-family: "Jua";
        font-size: 20px;
        font-weight: 600;
        outline: unset;
        border: none;
        width: 80%;
        height: 80%;
        background-color: aqua;
        cursor: pointer;
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
            duration : 3
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
const PreviewContainer = styled(motion.div)`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: beige;
    justify-content: space-evenly;
    align-items: center;

    ${(props) =>{

        if(props.isclickednextbtn === "true"){
            return css`
                pointer-events: none;
            `
        }else if(props.isclickednextbtn === "false"){
            return css`
                pointer-events: auto;
            `
        }
    }}
`
const allOverVariants = {
    allOver:{
        opacity: 0,
        PointerEvent: 'none',
        transition:{
            duration: 2
        }
    }
}


function PreviewThreeCardComponent() {
 
    const dispatch = useDispatch();
    const defaultImgArr = useSelector((state) => state.gameManager.defaultImgArr);
    let [defaultNumberArr, setDefaultNumberArr] = useState([]);
    let [isClickedShuffle, setIsClickedShuffle] = useState(false);
    let [shuffleCount, setShuffleCount] = useState(0);
    let ranNumArr = new Array(3);

    let [isDrawClicked, setDrawClicked] = useState(false);
    let [isDrawAnimationOver, setDrawAnimationOver] = useState(false);

    let [isActiveNextBtn, setActiveNextBtn] = useState(false);
    let [isClickedNextBtn, setClickedNextBtn] = useState(false);

    const previewThreeShuffle = () =>{
        for(let i = 0; i < 3; i++)
        {
            let ranNumber = Math.floor((Math.random() * (78)));
            ranNumArr[i] = ranNumber;
            for(let j = 0; j < i; j++)
            {
                if(ranNumArr[i] === ranNumArr[j])
                {
                    i--;
                    break;
                }
            }
            //console.log('preview number : ', `${i} - ` ,ranNumArr[i]); 
        }
    }
    useEffect(()=>{
        if(ranNumArr[0] === undefined){
            previewThreeShuffle();
            setDefaultNumberArr(ranNumArr);
        }
    },[])
    useEffect(()=>{
        //console.log(isClickedShuffle);
        //console.log('shuffled');
    }, [isClickedShuffle])

    const onShuffleHandler = (e) =>{
        //e.preventDefault();
        setIsClickedShuffle(true);
        previewThreeShuffle();
        let tempNum = shuffleCount;
        tempNum++;
        setShuffleCount(tempNum);
        setDefaultNumberArr(ranNumArr);
        setTimeout(()=>{
            setIsClickedShuffle(false);
        }, 2000)
    }
    const onDrawHandler = (e) =>{
        setDrawClicked(true);
        setTimeout(()=>{
            setDrawAnimationOver(true);
        }, 4700)
        setTimeout(()=>{
            setActiveNextBtn(true);
        }, 5000);
    }
    const onNextBtnHandler = (e) =>{
        e.preventDefault();
        setClickedNextBtn(true);
        setTimeout(()=>{
            dispatch(setIsOverPreThree({isOverPreviewThree: true}));
        }, 2000)
    }
    
  return (
      <>
      <PreviewContainer
        isclickednextbtn={isClickedNextBtn === true ? "true" : "false" }
        variants={allOverVariants}
        animate={
            isClickedNextBtn === true 
            ? "allOver"
            : 'none'
        }
      >
          <TestNavBar>
            <FunctionalBox
                variants={functionalBtnVar}
                initial="initial"
                animate="start"
                whileHover={
                    isDrawClicked === false && isClickedShuffle === false
                    ? "hover"
                    : {
                        scale: 1.0,
                    }
                }
                whileTap={
                    isDrawClicked === false && isClickedShuffle === false
                    ? "click"
                    : ""
                }
                style={
                    isClickedShuffle === false && isDrawClicked === false
                    ?
                    {
                        opacity: 1.0,
                        cursor: 'pointer'
                    }
                    :
                    {
                        opacity: 0.5,
                        cursor: 'auto'
                    }
                }
            >
                <FunctionalBtn onClick={(e)=>{
                    e.preventDefault();
                    if(isClickedShuffle === false && isDrawClicked === false){
                        onShuffleHandler(e);
                    }
                    }}
                    style={
                        isClickedShuffle === false && isDrawClicked === false
                        ?
                        {
                            opacity: 1.0,
                            cursor: 'pointer'
                        }
                        :
                        {
                            opacity: 0.5,
                            cursor: 'auto'
                        }
                    }
                    
                >
                    Shuffle
                </FunctionalBtn>
            </FunctionalBox>
            <FunctionalBox
                variants={functionalBtnVar}
                initial="initial"
                animate="start"
                whileHover={
                    isDrawClicked === false && isClickedShuffle === false
                    ? "hover"
                    : ""
                }
                whileTap={
                    isDrawClicked === false && isClickedShuffle === false
                    ? "click"
                    : ""
                }
                style={
                    isClickedShuffle === false && isDrawClicked === false
                    ?
                    {
                        opacity: 1.0,
                        cursor: 'pointer'
                    }
                    :
                    {
                        opacity: 0.5,
                        cursor: 'auto'
                    }
                }
            >
                <FunctionalBtn onClick={(e)=>{
                    if(isDrawClicked === false && isClickedShuffle === false){
                        onDrawHandler(e);
                    }
                }}
                    style={
                        isClickedShuffle === false && isDrawClicked === false
                        ?
                        {
                            opacity: 1.0,
                            cursor: 'pointer'
                        }
                        :
                        {
                            opacity: 0.5,
                            cursor: 'auto'
                        }
                    }
                >
                    Draw
                </FunctionalBtn>
            </FunctionalBox>
          </TestNavBar>
          {isDrawClicked !== true
            ?
            <>
                <DrawPreviewDeck
                    variants={DrawPreviewDeckVariantsTest}
                    initial="initial"
                    animate={
                        isClickedShuffle 
                        ? "moveToLeft"
                        : "start"
                    }
                >
                    <TempShuffleCard />
                </DrawPreviewDeck>
            </>
            : null
          }
          {isDrawClicked === true
            ? 
            <>
                <DrawPreviewDeck // Center
                    variants={drawVariants}
                    animate="middleToUp"
                >
                    <MaskShuffleCard />
                    <TempShuffleCard 
                        i={1}
                        imgnum={defaultNumberArr[1]}
                        defaultimgarr={defaultImgArr} 
                        isdrawanimationover={
                            isDrawAnimationOver === true
                            ? "true"
                            : "false"
                        }
                        variants={drawChildVariants}
                        animate="moveToDownCenter"
                        whileHover={
                            isDrawAnimationOver === true
                            ? "hover"
                            : "none"
                        }
                        />
                </DrawPreviewDeck>
                <DrawPreviewDeck // Left
                    variants={drawVariants}
                    animate="startToLeft"
                >
                    <MaskShuffleCard />
                    <TempShuffleCard 
                        i={0} 
                        imgnum={defaultNumberArr[0]}
                        defaultimgarr={defaultImgArr} 
                        isdrawanimationover={
                            isDrawAnimationOver === true
                            ? "true"
                            : "false"
                        }
                        variants={drawChildVariants}
                        animate="moveToDownLeft"
                        whileHover={
                            isDrawAnimationOver === true
                            ? "hover"
                            : "none"
                        }
                        />
                </DrawPreviewDeck>
                <DrawPreviewDeck // Right
                    variants={drawVariants}
                    animate="startToRight"
                >
                    <MaskShuffleCard />
                    <TempShuffleCard 
                        i={2} 
                        imgnum={defaultNumberArr[2]}
                        defaultimgarr={defaultImgArr} 
                        isdrawanimationover={
                            isDrawAnimationOver === true
                            ? "true"
                            : "false"
                        }
                        variants={drawChildVariants}
                        animate="moveToDownRight"
                        whileHover={
                            isDrawAnimationOver === true
                            ? "hover"
                            : "none"
                        }
                        />
                </DrawPreviewDeck>
            </>
            : null
            }
      </PreviewContainer>
        { // shuffle alarm modal
          isClickedShuffle === true
        ? 
        <PreviewAlarmModal
            variants={AlarmVariants}
            initial="initial"
            animate="start"
        >
            {`${shuffleCount}회 섞었습니다.`}
        </PreviewAlarmModal>
        : null
        }
        {
            isActiveNextBtn === true
            ? 
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
                        if(isClickedNextBtn === false){
                            onNextBtnHandler(e);
                        }
                    }}
                >N E X T</button>
            </NextBtn>
            : null
        }
      </>
  )
}


export default PreviewThreeCardComponent