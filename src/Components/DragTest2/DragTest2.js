import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'


import SpreadZone from './ChildComponents/SpreadZone'

const DragTest2Container = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    background-color: beige;

    display: flex;
    justify-content: center;
    align-items: center;
`
const SubContainer = styled(motion.div)`
    width: 80%;
    height: 80%;
    background-color: aquamarine;
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;
`
const OptionConatiner = styled(motion.div)`
    width: 15%;
    height: 90%;
    background-color: salmon;
`
const DeckZone = styled(motion.div)`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: limegreen;
`
const SelectedDeckZone = styled(motion.div)`
    width: 40%;
    height: 100%;
    background-color: tomato;

`
const ExtraDeckZone = styled(motion.div)`
    width: 40%;
    height: 95%;
    background-color: gray;
`

function DragTest2() {

    const temp = {
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
    }
    const temp2 ={
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        left: 0,
        top: 0, 
    }

    let [subContainerInfo, setSubContainerInfo] = useState(temp);
    let [selectedDeckZoneInfo, setSelectedDeckZoneInfo] = useState(temp2);
    let [currentCard, setCurrentCard] = useState(null);
    const currentCardController = {
        currentCard,
        setCurrentCard
    }
    const subContainer = useRef();
    const selectedDeckZone = useRef();
    let [refArr, setRefArr] = useState([subContainer]);
    let [cardInCount, setCardInCount] = useState(0);
    const cardCountController ={
        cardInCount,
        setCardInCount
    }
    useEffect(() => {
        const _subContainerInfo = subContainer.current.getBoundingClientRect();
        const _selectedDeckZoneInfo = selectedDeckZone.current.getBoundingClientRect();
        const _temp = {
            x: _subContainerInfo.x,
            y: _subContainerInfo.y,
            bottom: _subContainerInfo.bottom,
            right: _subContainerInfo.right,
            width: _subContainerInfo.width,
            height: _subContainerInfo.height,
            left: _subContainerInfo.left,
            top: _subContainerInfo.top,
        }
        const _temp2 ={
            x: _selectedDeckZoneInfo.x,
            y: _selectedDeckZoneInfo.y,
            bottom: _selectedDeckZoneInfo.bottom,
            right: _selectedDeckZoneInfo.right,
            width: _selectedDeckZoneInfo.width,
            height: _selectedDeckZoneInfo.height,
            left: _selectedDeckZoneInfo.left,
            top: _selectedDeckZoneInfo.top, 
        }
        setSubContainerInfo(_temp);
        // console.log(_temp);
        // console.log(subContainerInfo);
        setSelectedDeckZoneInfo(_temp2);
    }, [])
    const onRotateHandler = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        if(currentCard !== null){
            if(currentCard.isInSpreadZone !== false){
                let temp = currentCard.isRotate;
                currentCard.setRotate(!temp)
            }
        }
    }
  return (
      <DragTest2Container>
          <SubContainer ref={subContainer}>
            <SpreadZone 
                subcontainerinfo={subContainerInfo}
                selecteddeckzoneinfo={selectedDeckZoneInfo}
                refArr={refArr}
                setRefArr={setRefArr}
                cardCountController={cardCountController}
                currentCardController={currentCardController}
                
            >

            </SpreadZone>
            <OptionConatiner>
                <DeckZone>
                    <SelectedDeckZone ref={selectedDeckZone}>

                    </SelectedDeckZone>
                    <ExtraDeckZone></ExtraDeckZone>
                </DeckZone>
                <span>{cardInCount}</span>
                <button onClick={(e) => onRotateHandler(e)}>rotate</button>
            </OptionConatiner>
          </SubContainer>
      </DragTest2Container>
  )
}

export default DragTest2