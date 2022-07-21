import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { 
    VerticalContainer, 
    HorizontalContainer,
    DefaultBtnVar, 
} from '../../CustomStyles'

import {
    fonts,
    colors,
    border,
    zIndexs,
} from '../../theme'

const SubMenuContainer = styled(VerticalContainer)`
    position: absolute;
    border-radius: ${border.radius[10]};
    justify-content: space-evenly;
    left: 2%;
    top: 12%;
    width: 20%;
    height: 80%;
    background-color: rgba(125, 125, 125, 0.5);
    z-index: ${zIndexs.subMenu};
    & > span{
        width: 85%;
        height: 55%;
        background-color: ${colors.color.skyblue};
        border-radius: ${border.radius[10]};
    }
`
const SubMenuBtnBox = styled(VerticalContainer)`
    width: 100%;
    height: 35%;
    justify-content: space-evenly;

`
const SubMenuBtn = styled(HorizontalContainer)`
    width: 85%;
    height: 25%;
    cursor: pointer;
    background-color: ${colors.color.navy};
    border-radius: ${border.radius[10]};
    color: ${colors.color.lemonchiffon};
    font-family: ${fonts.family.base};
    font-weight: ${fonts.weight[600]};
    font-size: ${fonts.size.default};
    letter-spacing: 0.1em;
    opacity: ${(props) => props.changeopacity === "true"
    ? '0;'
    : '1.0;'   
    }
    transition: opacity 0.2s ease-in-out;
`
const menuVar = {
    initial:{
        height: 0,
    },
    start:{
        height: '80%',
        transition:{
            duration: 0.5,
            ease: "easeOut",
        }
    },
    end:{
        height: '0%',
        transition:{
            duration :0.5,
            ease: "easeOut"
        }
    }
}

function SubMenu(props) {

    const setSubBtnType = props.setSubBtnType;
    let [pold, setPold] = useState(props.subClick);
    let [isClickStart, setIsClickStart] = useState(pold);

    useEffect(()=>{
        setPold(props.subClick);
    }, [props.subClick]);

    const settingSubBtnType = (e, num) => {
        e.preventDefault(); 
        switch(num){
            case 0:
                setSubBtnType(0);
            break;
            case 1:
                setSubBtnType(1);
            break;
            default:

            break;
        }
    }
    
  return (
    <>
    <SubMenuContainer
        variants={menuVar}
        initial="initial"
        animate={pold === true ? "end" : "start"}
    >
        <span></span>
        <SubMenuBtnBox>
        <SubMenuBtn
            border={border}
            fonts={fonts}
            colors={colors}
            changeopacity={pold === true ? "true" : "false"}
            variants={DefaultBtnVar}
            whileHover={DefaultBtnVar.hover}
            whileTap={DefaultBtnVar.click}
            onClick={(e)=>{
                if(isClickStart === false){
                    settingSubBtnType(e, 1)

                }
                else if(isClickStart === true){
                    settingSubBtnType(e, 0)
                }
                setIsClickStart(!isClickStart);
            }}
        >
            {isClickStart === false ? 'ON' : 'OFF'}
        </SubMenuBtn>
        <SubMenuBtn
            border={border}
            fonts={fonts}
            colors={colors}
            changeopacity={pold === true ? "true" : "false"}
            variants={DefaultBtnVar}
            whileHover={DefaultBtnVar.hover}
            whileTap={DefaultBtnVar.click}
            //onClick={(e)=>settingSubBtnType(e, 0)}
        >
            CLEAR
        </SubMenuBtn>
        <SubMenuBtn
            border={border}
            fonts={fonts}
            colors={colors}
            changeopacity={pold === true ? "true" : "false"}
            variants={DefaultBtnVar}
            whileHover={DefaultBtnVar.hover}
            whileTap={DefaultBtnVar.click}
            onClick={(e)=>settingSubBtnType(e, 2)}
        >
            TEST
        </SubMenuBtn>
        </SubMenuBtnBox>
        
    </SubMenuContainer>    
    </>
  )
}

export default SubMenu