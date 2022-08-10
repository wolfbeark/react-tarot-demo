import React, {useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import{
    HorizontalContainer,
} from '../../CustomStyles'
import{
    colors
} from '../../theme'

const PreveiwContainer = styled(HorizontalContainer)`
    position: absolute;
    z-index: 300;
    width: 45%;
    height: 15%;
    //background-color: ${colors.color.lemonchiffon};
    border-radius: 10px;
    bottom: 2%;
    justify-content: left;
    padding: 0 1%;
`
const PreviewBtn = styled(HorizontalContainer)`
    width: 20%;
    height: 90%;
    background-color: red;
    text-align: center;
    border-radius: inherit;
    margin-right: 2%;
    background-color: ${colors.color.lemonchiffon};
`
const btnVar = {
    hover:{
        scale: 1.1,
        boxShadow: '0 0 5px 2px lemonchiffon',
    },
    click:{
        scale: 1.0
    }
}
const PreviewImgBox = styled(HorizontalContainer)`
    width: 75%;
    height: 150%;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;

    padding : 1% 0;
    border-radius: inherit;
    justify-content: space-evenly;

`
const PreviewImg = styled(motion.div)`
    width: 30%;
    height: 100%;
    background-image: url(${(props) => props.imgsrc});
    background-size: 100% 100%;
    border-radius: inherit;
    will-change: width;

`
const imgBoxVar = {
    
    default:{
        opacity: 0
    },
    on:{
        width: '75%',
        opacity: 1,
        transition:{
            // opacity:{
            //     delay: 0.7
            // },
            // width:{
            //     delay: 1.0
            // },
            duration: 0.5
        }
    },
    off:{
        width: 0,
        opacity: 0,
        transition:{
            // opacity:{
            //     delay: 0.5
            // },
            width:{
                delay: 0.4
            },
            duration: 0.4
        }
    }
}
function PreviewInSpread(props) {
    
    const [isActive, setActive] = useState(false);
    let isActiveCurtain = props.isActiveCurtain;
    const previewNumArr = props.previewNumbers;
    return (
    <>
    <PreveiwContainer>
        <PreviewBtn
            variants={btnVar}
            whileHover="hover"
            whileTap="click"
            onClick={(e)=>{
                e.preventDefault();
                setActive(!isActive);
            }}
        >
            {
                isActive === false
                ? `Preview On`
                : `Preview Off`
            }
        </PreviewBtn>
        <PreviewImgBox
            isactivecurtain={isActiveCurtain === false ? "false" : "ture"}
            variants={imgBoxVar}
            animate={
                props.isActiveCurtain === false
                ?
                    isActive === false
                    ? "off"
                    : "on"
                : "default"
            }
        >
            {
                previewNumArr.map((a, i)=>{

                    return(
                        <PreviewImg 
                            key={'previewImg' + i}
                            imgsrc={`${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${a}.png`}
                        />
                    );
                })
            }
        </PreviewImgBox>
    </PreveiwContainer>
    </>
  )
}

export default PreviewInSpread