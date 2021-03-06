import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import DragCardInfo from './DragCardInfo'
import DragCard from './DragCard'
import PreviewInSpread from './PreviewInSpread'

const MainSpreadBox = styled(motion.div)`
    width: 80%;
    height: 95%;
    background-color: rgba(0, 0, 139, 0.7);
    border-radius: 10px;
    
    position: relative;
`

function MainSpreadZone(props) {
    const modeNumber = props.modeNumber;
    const userWannaSeePreCard = props.userWannaSeePreCard;
    const userSetNumber = props.userSetNumber;
    const mainSpreadRef = useRef(null);
    const defaultTempObjData ={
      x : 0, 
      y : 0, 
      width : 0,
      height : 0, 
      left : 0, 
      top : 0, 
      right : 0, 
      bottom : 0,
    }
    const [mainSpreadZonePosInfo, setMainSpreadZonePosInfo] = useState(defaultTempObjData);
    const [newIdxArr, setNewIdxArr] = useState(new Array(userSetNumber));
    useEffect(()=>{
        if(modeNumber !== 0){
            let tempNum = userSetNumber;
            let tempNumArr = new Array(userSetNumber);
            for(let i = 0; i < userSetNumber; i++){
                tempNum--;
                tempNumArr[i] = tempNum;
            }
            setNewIdxArr(newIdxArr);
        }
    }, [])
    useEffect(()=>{
      const tempInfo = mainSpreadRef.current.getBoundingClientRect();
      const temp ={
        x : tempInfo.x, 
        y : tempInfo.y, 
        width : tempInfo.width,
        height : tempInfo.height, 
        left : tempInfo.left, 
        top : tempInfo.top, 
        right : tempInfo.right, 
        bottom : tempInfo.bottom,
      }
      setMainSpreadZonePosInfo(temp);
    }, [])
  return (
    <MainSpreadBox
        ref={mainSpreadRef}
    >
      {props.dragCardNumArr.map((a, i) =>{
        return(
          
            <DragCard  
             key={i}
             count={i} // μΉ΄λ μμ 0 1 2
             zIdx={10 + i} // μ¬κΈ° μμ  νμ. μμ μμΉν  μλ‘ zIdxκ° λμμΌ νλ€.
        //     //νμ¬λ λ€μ μμΉν  μλ‘ zIdxκ° λμ μν©. zIdx={10+i}
        //     //μ€ν 100 - i // μ€ν¨.
        //     // μ€νλ λ μ‘΄μ λ€μ΄κ°λ©΄ zIdxλ₯Ό λ€μ μμ ν΄μΌνλ€. μ΄ μ»¨νΈλ‘€μ μΉ΄λμ»΄ν¬λνΈμμ..
             imgnum={a}
             newIdxNum={newIdxArr[i]}
             selectedImgNumArr={props.selectedImgNumArr}
             selectedZonePosInfo={props.selectedZonePosInfo}
             mainSpreadZonePosInfo={mainSpreadZonePosInfo}
             optionBoxInfo={props.optionBoxInfo}
             refArr={props.refArr}
             childCardStateArrController={props.childCardStateArrController}           
             indexCountController={props.indexCountController}
             newDragArea={props.newDragArea}
             isInCounter={props.isInCounter}
             dragCardNumArr={props.dragCardNumArr}
             cardNameArr={props.cardNameArr}
             findCardControl={props.findCardControl}
             setFindCardName={props.setFindCardName}
              whatModeControl={props.whatModeControl}
              isClickedFind={props.isClickedFind}
              userSetNumber={userSetNumber}
              modeNumber={modeNumber}
        //     childCardStateArrController={props.childCardStateArrController}
        //     selectedzoneposinfo={props.selectedZonePosInfo}
        //     mainSpreadZonePosInfo={mainSpreadZonePosInfo}
        //     optionBoxInfo={props.optionBoxInfo}
        //     newDragArea={props.newDragArea}
        //     refArr={props.refArr}
        //     isInCounter={props.isInCounter}
        //     totalSelectedNumArr={props.totalSelectedNumArr}
        //     dragCardNumArr={props.dragCardNumArr}
        //     indexCountController={props.indexCountController}
        //     isClickedFind={props.isClickedFind}
        //     findCardControl={props.findCardControl}
        //     cardNameArr={props.cardNameArr}
        //     setFindCardName={props.setFindCardName}
        //     whatModeControl={props.whatModeControl}
           >

           </DragCard>
        );
      })}
      {
        userWannaSeePreCard === true
        ?
        <PreviewInSpread
          previewNumbers={props.previewNumbers}
          isActiveCurtain={props.isActiveCurtain}
        >

        </PreviewInSpread>
        : null
      }
    </MainSpreadBox>
  )
}

export default MainSpreadZone