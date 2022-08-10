import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import Draggable from 'react-draggable'

import {
    HorizontalContainer,
    VerticalContainer,
} from '../../CustomStyles'
import {
    colors,
    fonts,
} from '../../theme'

import HideActiveBtn from './HideActiveBtn'

const HideAndSeekContainer = styled(HorizontalContainer)`

    position: absolute;
    width: 70%;
    height: 70%;
    z-index: 600;
    background-color: ${colors.color.navy};
    border-radius: 10px;
    left: 7.5%;
    padding: 1%;
`
const InHideAndSeekContainer = styled(HorizontalContainer)`
    width: 100%;
    height: 100%;
    background-color: ${colors.color.royalblue};
    border-radius: inherit;
    justify-content: space-between;
    padding: 1%;
`
const HideMenuBox = styled(VerticalContainer)`
    width: 55%;
    height: 100%;
    background-color: ${colors.color.skyblue};
    border-radius: inherit;
    scroll-behavior: auto;
    overflow: overlay;
    overflow-x: hidden;

    padding-top: 5%;

    //justify-content: space-between;
    justify-content: start;

    ::-webkit-scrollbar {
        width: 0.5vw;
        
    }
    ::-webkit-scrollbar-thumb {
        background-color: hsla(0, 0%, 42%, 0.49);
        border-radius: 100px;
    
    }
`
const HideControlBox = styled(VerticalContainer)`
    width: 42%;
    height: 100%;
    background-color: ${colors.color.skyblue};
    border-radius: inherit;
    padding: 1%;
    justify-content: space-evenly;
`

const InHideInfoBox = styled(VerticalContainer)`
    width: 100%;
    height: 55%;
    background-color: ${colors.color.navy};
    border-radius: inherit;
    justify-content: space-evenly;
    padding: 2%;
`
const HideInfoSpanBox = styled(HorizontalContainer)`
    width: 100%;
    height: 25%;
    background-color: teal;
    span{
        display: flex;
        align-items: center;
        &:first-child{
            justify-content: start;
            background-color: ${colors.color.beige};
            width: 60%;
            height: 100%;
            padding-left: 1%;
        }
        &:last-child{
            justify-content: center;
            background-color: ${colors.color.lemonchiffon};
            width: 40%;
            height: 100%;
        }
    }
`
const InHideBtnBox = styled(VerticalContainer)`
    width: 100%;
    height: 15%;
    background-color: ${colors.color.gray};
    border-radius: inherit;

    
`
const HideBackBtn = styled(HorizontalContainer)`
    width: 80%;
    height: 15%;
    border-radius: inherit;
    background-color: ${colors.color.navy};
    padding: 2%;
    cursor: pointer;
    button{
        width: 100%;
        height: 100%;
        background-color: ${colors.color.skyblue};
        outline: unset;
        border: none;
        font-family: ${fonts.family.base};
        font-weight: 600;
        font-size: 1.5em;
        border-radius: inherit;
        cursor: pointer;
    }
`
const backBtnVar = {

    hover:{
        scale: 1.05,
        boxShadow: '0 0 5px 2px #123456'
    },
    click:{
        scale: 1.0,
    }
}
function HideAndSeek(props) {

    const hideRef = useRef();
    let setClickedHide = props.setClickedHide; // ? 왜 뒤로가기 누르는데 자동 적용인가.


    let testArr = new Array(10);
    testArr.fill(10);

    let [selectedDeckInfo, setSelectedDeckInfo] 
    = useState({
        deckNumber : "",
        deckType : "",
        deckCount : "",
        currentMode : "",
    });

    let {
        hideInfoArr,
        setHideInfoArr
    } = props.hideInfoArrController;

    // let {
    //     childCardStateArr,
    //     setChildCardStateArr
    // } = props.childCardStateArrController;
    
    const [btnControlArr, setBtnControlArr] = useState(props.hideBtnOnOffArrController.hideBtnOnOffArr);

    const submitBtnOnOffInfo = () => {
        props.hideBtnOnOffArrController.setHideBtnOnOffArr(btnControlArr);
        // childCardStateArr 변경
        let _childCardStateArr = props.childCardStateArrController.childCardStateArr;

        let firstIdx;
        let lastIdx;
        for(let i = 0; i < btnControlArr.length; i++){
            
            if(btnControlArr[i] === true){ // Hide
                firstIdx = hideInfoArr[i].cardFirstIdx;
                lastIdx = hideInfoArr[i].cardLastIdx;
                for(let j = firstIdx; j < lastIdx + 1; j++){
                    props.childCardStateArrController.childCardStateArr[j].setIsThisCardHide(true);
                    _childCardStateArr[j].isThisCardHide = true;
                }

            }
            else if(btnControlArr[i] === false){ // Seek
                firstIdx = hideInfoArr[i].cardFirstIdx;
                lastIdx = hideInfoArr[i].cardLastIdx;
                for(let j = firstIdx; j < lastIdx + 1; j++){
                    props.childCardStateArrController.childCardStateArr[j].setIsThisCardHide(false);
                    _childCardStateArr[j].isThisCardHide = false;
                }
            }
        }
        props.childCardStateArrController.setChildCardStateArr(_childCardStateArr);
    }
    
  return (
    <>
    <Draggable nodeRef={hideRef}>
    <HideAndSeekContainer
        drag
        ref={hideRef}
        dragConstraints={props.refArr[1]}
        dragMomentum={false}
        dragPropagation={false}
    >
        <InHideAndSeekContainer>
            <HideMenuBox>
                {
                    hideInfoArr.map((a, i) =>{

                        return(

                            <HideActiveBtn 
                                key={'hideBtn' + i}
                                deckNumber={a.deckNumber}
                                deckName={a.deckName}
                                cardCount={a.cardCount}
                                cardType={a.cardType}
                                setSelectedDeckInfo={setSelectedDeckInfo}
                                hideBtnOnOffArrController={props.hideBtnOnOffArrController}
                                setBtnControlArr={setBtnControlArr}
                            />                            
                        );
                    })
                }
            </HideMenuBox>
            <HideControlBox>
                <InHideInfoBox>
                    <HideInfoSpanBox>
                        <span>CARD TYPE</span>
                        <span>
                            {selectedDeckInfo.deckType}
                        </span>
                    </HideInfoSpanBox>
                    <HideInfoSpanBox>
                        <span>CARD COUNT</span>
                        <span>
                            {selectedDeckInfo.deckCount}
                        </span>
                    </HideInfoSpanBox>
                    <HideInfoSpanBox>
                        <span>CURRENT MODE</span>
                        <span>
                            {selectedDeckInfo.currentMode}
                        </span>
                    </HideInfoSpanBox>
                </InHideInfoBox>
                {/* <HideBackBtn // Set Btn
                    variants={backBtnVar}
                    whileHover="hover"
                    whileTap="click"
                >
                    <button
                        // onClick={(e)=>{
                        //     e.preventDefault();
                        //     submitBtnOnOffInfo();
                        // }}
                    >
                        {isAllHide === false ? "ALL HIDE" : "ALL SEEK"}
                    </button>
                </HideBackBtn> */}
                <HideBackBtn
                    variants={backBtnVar}
                    whileHover="hover"
                    whileTap="click"
                >
                    <button
                        onClick={(e)=>{
                            e.preventDefault();
                            setClickedHide(false);
                            submitBtnOnOffInfo();
                        }}
                    >
                        BACK
                    </button>
                </HideBackBtn>
            </HideControlBox>
        </InHideAndSeekContainer>
    </HideAndSeekContainer>    
    </Draggable>
        
    </>
  )
}

export default HideAndSeek