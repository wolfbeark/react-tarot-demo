import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import DragCardInfo from './DragCardInfo'

const MainSpreadBox = styled(motion.div)`
    width: 80%;
    height: 95%;
    background-color: rgba(0, 0, 139, 0.7);
    border-radius: 10px;
    
    position: relative;
`

function MainSpreadZone(props) {

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
          <DragCardInfo  
            key={i}
            count={i} // 카드 순서 0 1 2
            zIdx={10 + i} // 여기 수정 필요. 앞에 위치할 수록 zIdx가 높아야 한다.
            //현재는 뒤에 위치할 수록 zIdx가 높은 상황. zIdx={10+i}
            //실험 100 - i // 실패.
            // 스프레드 존에 들어가면 zIdx를 다시 수정해야한다. 이 컨트롤은 카드컴포넌트에서..
            imgnum={a}           
            childCardStateArrController={props.childCardStateArrController}
            selectedzoneposinfo={props.selectedZonePosInfo}
            mainSpreadZonePosInfo={mainSpreadZonePosInfo}
            optionBoxInfo={props.optionBoxInfo}
            newDragArea={props.newDragArea}
            refArr={props.refArr}
            isInCounter={props.isInCounter}
            totalSelectedNumArr={props.totalSelectedNumArr}
            dragCardNumArr={props.dragCardNumArr}
            indexCountController={props.indexCountController}
            isClickedFind={props.isClickedFind}
            findCardControl={props.findCardControl}
            cardNameArr={props.cardNameArr}
            setFindCardName={props.setFindCardName}
            whatModeControl={props.whatModeControl}
          >

          </DragCardInfo>
        );
      })}

    </MainSpreadBox>
  )
}

export default MainSpreadZone