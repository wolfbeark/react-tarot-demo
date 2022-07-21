import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { 
    HorizontalContainer, 
    VerticalContainer,
    DefaultBtnVar } from '../CustomStyles'
import { 
    fonts,
    border,
    colors
} from '../theme'

import SubMenu from './SubMenu/SubMenu'
import TarotComponent from './TarotComponents/TarotComponent'

const ChangeComponentContainer = styled(HorizontalContainer)`
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    background-color: beige;
    font-family: ${fonts.family.base};
    font-weight: ${fonts.weight[600]};
    overflow: hidden;
    position: relative;
`
const ActiveSubMenuBtn = styled(HorizontalContainer)`
    
    position: absolute;
    left: 2%;
    top: 2vw;
    width: 5%;
    height: 3vw;
    border-radius: ${border.radius[10]};
    background-color: ${colors.color.navy};
    font-family: ${fonts.family.base};
    font-weight: ${fonts.weight[600]};
    font-size: ${fonts.size.default};
    color: ${colors.color.lemonchiffon};
    cursor: pointer;
    
`

function ChangeComponentTest() {


    const [subClick, setSubClick] = useState(false);
    const [subBtnType, setSubBtnType] = useState(0);
    // 0 : none, 1 : start

    const TotalBox = useRef();
    return (
    <>
    <ChangeComponentContainer
        fonts={fonts}
        ref={TotalBox}
    >
        <ActiveSubMenuBtn
            fonts={fonts}
            border={border}
            colors={colors}
            variants={DefaultBtnVar}
            whileHover={DefaultBtnVar.hover}
            whileTap={DefaultBtnVar.click}
            onClick={(e)=>{
                e.preventDefault();
                setSubClick(!subClick);
            }}
        >
            BTN
        </ActiveSubMenuBtn>
        <SubMenu 
            subClick={subClick}
            setSubBtnType={setSubBtnType}
        />
        <TarotComponent subBtnType={subBtnType} TotalBox={TotalBox}/>
           
    </ChangeComponentContainer>    
    </>
  )
}

export default ChangeComponentTest