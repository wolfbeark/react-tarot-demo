
import React, { useEffect, useState } from 'react';
import styled,{css} from 'styled-components';
import {motion} from 'framer-motion';

import {
    HorizontalContainer,
    VerticalContainer,
    VerticalForm,
    DefaultBtnVar
} from '../../CustomStyles'
  
import {
    border,
    colors,
    fonts,
} from '../../theme'

const DrawCardTemplate = styled(motion.div)`
  width: 90%;
  height: 100%;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  ${props => props.isthiscardclicked === 'true'
    ? css`
      background-color: rgba(0, 0, 0, 0.7);
    `
    :  css`
      background-color: rgba(100, 100, 100, 1);
    `
    };
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  
  transition: background-color 0.5s ease-in-out;
  border-radius: 10px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  
  & div{
    &:first-child{
      position: relative;
      background-color: rgba(0, 0, 0, 0);
      color: yellow;
      width: 50%;
      height: 30%;

      top: -5%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Jua";
      font-size: 1em;
      font-weight: 700;
    }
    &:last-child{
      position: relative;
      background-color: rgba(0, 0, 0, 0);
      color: red;

      width: 50%;
      height: 30%;

      top: -10%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      font-family: "Jua";
      font-size: 1em;
      font-weight: 700;
    }
`
const drawCardTempVariants = {
    initial:{
      opacity: 0,
    },
    start:{
      opacity: 1,
      transition:{
        duration: 2,
        repeatType: "loop"
      }
    },
    startEnd:{
      opacity: 1
    }
    ,
    hover:{
      scale: 1.1,
    },
    click:{
      scale: 1,
    },
    
  }
function DrawCardBox(props) {

    const cardNumber = props.cardnum;
    let [isThisCardClicked, setThisCardClicked] = useState(false);
    let [selectedIdxNum, setSelectedIdxNum] = useState(100);
    let imgNum = props.imgnum;
    let cardNum = props.cardnum;
    let userSetNumber = props.userSetNumber;
    let clickAndSelectCount = props.clickAndSelectCount;
    let isCardClicked = props.isCardClicked;
    let setCardClicked = props.setCardClicked;
    let {selectedCardControlArr, setSelectedCardControlArr} = props.selectCardController;
    //let { clickAndSelectCount, setClickAndSelectCount } = props.clickCounterController;
    let {selectCount, setSelectCount} = props.selectCounter;

    useEffect(()=>{
      let tempObj = {
        isThisCardClicked,
        setThisCardClicked,
        selectedIdxNum,
        setSelectedIdxNum,
        cardNum,
        imgNum,
      }
      let tempArr = selectedCardControlArr;
      tempArr[cardNum] = tempObj;
      setSelectedCardControlArr(tempArr);
    }, [])
    const onClickHandler = (e) =>{
        //let tempFlag = isThisCardClicked;
        e.preventDefault();
        if(selectCount < userSetNumber){
          if(isCardClicked === false){
            setCardClicked(true);
            props.setTempChildAttr({
                isThisCardClicked,
                setThisCardClicked,
                selectedIdxNum,
                setSelectedIdxNum,
                cardNum,
                imgNum,
            })
          }
        }
        else if(selectCount <= userSetNumber 
          && isThisCardClicked === true){
          if(isCardClicked === false){
            setCardClicked(true);
            props.setTempChildAttr({
                isThisCardClicked,
                setThisCardClicked,
                selectedIdxNum,
                setSelectedIdxNum,
                cardNum,
                imgNum,
            })
          }
        }
    }
return (
    <>
      <DrawCardTemplate
        isthiscardclicked={isThisCardClicked === true ? 'true' : 'false'}
        variants={drawCardTempVariants}
        imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`}
        whileHover="hover"
        whileTap="click"
        //cardnum={cardNumber}
        onClick={(e)=>{
            onClickHandler(e);
        }}
        //isthiscardclicked={isThisCardClicked === true ? 'true' : 'false'}
      >
          <div>{cardNumber + 1}</div>
          <div>
            {/* {isThisCardClicked === true && thisCardIndexNumber !== 100 
            ? (thisCardIndexNumber + 1) : ""} */}
            {/* {imgNum} */}
            {
              isThisCardClicked === true
              && selectedIdxNum !== 100
              ? (selectedIdxNum + 1)
              : ""
            }
          </div>
      </DrawCardTemplate>
    </>
  )
}

export default DrawCardBox