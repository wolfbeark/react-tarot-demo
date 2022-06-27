import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import DragCardTest from './DragCardTest'


const SpreadContainer = styled(motion.div)`
    width: 80%;
    height: 90%;
    background-color: mediumseagreen;
`
function SpreadZone(props) {

    const _spreadZone = useRef(null);
    let [spreadRefArr, setSpreadRefArr] = useState([_spreadZone])
    const [numArr, setNumArr] = useState([1, 2, 3]);
    const spreadTemp ={
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }
    const [spreadZoneInfo, setSpreadZoneInfo] = useState(spreadTemp)
    const _subContainerInfo = props.subcontainerinfo;
    const _selectedDeckZoneInfo = props.selecteddeckzoneinfo;
    
    const selectedInfo = {
        width: _selectedDeckZoneInfo.width,
        height: _selectedDeckZoneInfo.height,
        x: _selectedDeckZoneInfo.x,
        y: _selectedDeckZoneInfo.y,
        bottom: _selectedDeckZoneInfo.bottom,
        top: _selectedDeckZoneInfo.top,
    }
    
    useEffect(()=>{
        const temp = _spreadZone.current.getBoundingClientRect();
        const _temp = {
            width: temp.width,
            height: temp.height,
            x: temp.x,
            y: temp.y,
            left: temp.left,
            top: temp.top,
            right: temp.right,
            bottom: temp.bottom,
        }
        setSpreadZoneInfo(_temp);
        const _refArr = props.refArr;
        _refArr.push(_spreadZone);
        setSpreadRefArr(_refArr);
    }, [props.refArr])
    
  return (
      <SpreadContainer 
        ref={_spreadZone}
        
      >
          <>
            {numArr.map((a, i) =>{
                return(
                    <DragCardTest
                        key={i}
                        cardnum={i}
                        style={{
                            zIndex: i+10
                        }}
                        subcontainerinfo={_subContainerInfo}
                        selecteddeckzoneinfo={selectedInfo}
                        spreadzone={spreadZoneInfo}
                        spreadRefArr={spreadRefArr}
                        cardCountController={props.cardCountController}
                        currentCardController={props.currentCardController}
                    >
                        
                    </DragCardTest>
                );
            })}
          </>
      </SpreadContainer>
  )
}

export default SpreadZone