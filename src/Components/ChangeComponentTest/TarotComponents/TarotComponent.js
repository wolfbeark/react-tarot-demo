import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import Draggable from 'react-draggable'


import {
    HorizontalContainer
} from '../../CustomStyles'

import{
    colors,
    fonts,
    border,
    zIndexs
} from '../../theme'

import Testele from './Testele'
import FirstStep from '../FirstStep/FirstStep'
import SecondStep from '../SecondStep/SecondStep'
import ThirdStep from '../ThirdStep/ThirdStep'
import SpreadStep from '../SpreadStep/SpreadStep'

const TarotContainer = styled(HorizontalContainer)`
    position: absolute;
    width: 70%;
    height: 85%;
    border-radius: ${border.radius[10]};
    background-color: ${colors.color.navy};
    left: 25%;
    z-index: ${(props) => props.subbtntype === "active"
        ? `${zIndexs.tarotContainer}`
        : 0
    };
    padding: 1%;
    cursor: pointer;
`
const TarotInnerCotainer = styled(HorizontalContainer)`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: gray;
    border-radius: ${border.radius[10]};

`

const tarotContainerVar = {
    initial:{
        opacity: 0,
        scale: 0,
    },
    start:{
        scale: 1,
        opacity: 1.0,
        transition:{
            duration: 1.0
        }
    },
    end:{
        scale: 0,
        opacity: 0,
        transition:{
            duration: 1.0
        }
    }

}

function TarotComponent(props) {
    let subBtnType = props.subBtnType;
    const [position, setPosition] = useState({ x : 0, y : 0});
    const containerRef = useRef();

    const [modeNumber, setModeNumber] = useState(0);
    // FirstStep // 드로우 값 입력
    const [isFirstFlagOver, setFirstFlagOver] = useState(false);
    const [userSetNumber, setUserSetNumber] = useState(100);
    const [userWannaSeePreCard, setUserWannaSeePreCard] = useState(false);
    const [previewNumbers, setPreviewNumbers] = useState(new Array(3));

    // SecondStep // 3장 미리보기 질문
    const [isSecondFlagOver, setSecondFlagOver] = useState(false);

    // ThridStep // 드로우
    const [isThirdFlagOver, setThirdFlagOver] = useState(false);
    const [clickAndSelectCount, setClickAndSelectCount] = useState(0); // 유저가 클릭한 횟수

    // SpreadStep // 스프레드
    let tempArr = new Array(userSetNumber);
    const [selectedImgNumArr, setSelectedImgNumArr] = useState(tempArr);
    const [isSpreadFlagOver, setSpreadFlagOver] = useState(false);
    let clickCounterController ={
        clickAndSelectCount,
        setClickAndSelectCount
    };
    const trackPos = (data) => {
        setPosition({ x : data.x , y : data.y });
    }
    useEffect(()=>{
        let tempArr = new Array(userSetNumber);
        setSelectedImgNumArr(tempArr);
    }, [userSetNumber])
    
    const onRestartHandler = () => {
        setModeNumber(0);
        setFirstFlagOver(false);
        setUserSetNumber(100);
        setUserWannaSeePreCard(false);
        setPreviewNumbers(new Array(3));
        setThirdFlagOver(false);
        setClickAndSelectCount(0);
        let tempArr = new Array(100);
        setSelectedImgNumArr(tempArr);

    }
  return (
    <>
    <Draggable nodeRef={containerRef} onDrag={(e, data) => {trackPos(data)}}>
        <TarotContainer
            ref={containerRef}
            drag
            draggable="true"
            dragConstraints={props.TotalBox}
            dragPropagation={false}
            dragMomentum={false}
            dragElastic={0}
            variants={tarotContainerVar}
            initial="initial"
            animate={subBtnType === 1 ? "start" : "end"}
            subbtntype={subBtnType === 1 ? "active" : "inactive"}
        >
            <TarotInnerCotainer>
                {/* <Testele box={containerRef}></Testele> */}
                {isFirstFlagOver === false
                ?
                <FirstStep
                    setUserSetNumber={setUserSetNumber}
                    setFirstFlagOver={setFirstFlagOver}
                    setUserWannaSeePreCard={setUserWannaSeePreCard}
                    setPreviewNumbers={setPreviewNumbers}
                    setModeNumber={setModeNumber}
                />
                :
                null
                }
                {/* {
                isFirstFlagOver === true
                && isSecondFlagOver === false
                && userWannaSeePreCard === true // 미리보기 on
                ?
                <>
                <SecondStep 
                    setSecondFlagOver={setSecondFlagOver}
                />
                </>
                : null
                }
                {
                (isFirstFlagOver === true
                && isThirdFlagOver === false)
                && 
                (userWannaSeePreCard === false
                || isSecondFlagOver === true)
                ?
                <>
                <ThirdStep 
                    userSetNumber={userSetNumber}
                    setUserSetNumber={setUserSetNumber}
                    clickCounterController={clickCounterController}
                />
                </>
                : null
                } */}
                {
                    isFirstFlagOver === true
                    && isThirdFlagOver === false
                    ?
                    <>
                    <ThirdStep 
                        userSetNumber={userSetNumber}
                        setUserSetNumber={setUserSetNumber}
                        clickCounterController={clickCounterController}
                        setThirdFlagOver={setThirdFlagOver}
                        setSelectedImgNumArr={setSelectedImgNumArr}
                        modeNumber={modeNumber}
                    />
                    </>
                    : null
                }
                {
                    isThirdFlagOver === true
                    && isSpreadFlagOver === false
                    ?
                    <>
                    <SpreadStep
                        modeNumber={modeNumber} 
                        userSetNumber={userSetNumber}
                        userWannaSeePreCard={userWannaSeePreCard}
                        selectedImgNumArr={selectedImgNumArr}
                        setUserSetNumber={setUserSetNumber}
                        previewNumbers={previewNumbers}
                        onRestartHandler={onRestartHandler}
                    />
                    </>
                    : null
                }
            </TarotInnerCotainer>
        </TarotContainer>
    </Draggable>
    </>
  )
}

export default TarotComponent