
import React, { useEffect, useState } from 'react';
import styled,{css} from 'styled-components';
import {motion} from 'framer-motion';


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
        font-size: 2em;
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
        font-size: 2em;
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
      yoyo: 1
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


function DrawCardTemp(props) {

  let [isThisCardClicked, setThisCardClicked] = useState(false); // 단순클릭여부, 모달창 플래그
  let [thisCardIndexNumber, setThisCardIndexNumber] = useState(100);

  const cardNumber = props.cardnum;

  let _userSelectCount = props.userSelectCount;
  let _clickAndSelectCount = props.clickAndSelectCount;
  const {selectedNumberStateArr, setSelectedNumberStateArr} = props.selectedNumStateArrController;

  const { totalChildStateArr, setTotalChildStateArr } = props.totalChildStateArrController;
  
  useEffect(()=>{
    let temp = { 
      cardnum : cardNumber,
      isThisCardClicked,
      setThisCardClicked,
      thisCardIndexNumber,
      setThisCardIndexNumber
    };
    let tempArr = totalChildStateArr;
    tempArr[cardNumber] = temp;
    setTotalChildStateArr(tempArr);
  }, [])
  const testSetThisCardClicked = (flag) =>{
    setThisCardClicked(flag)
  }
  const clickCardHandler = (e) => {
    if(_clickAndSelectCount < _userSelectCount
      || ((_clickAndSelectCount <= _userSelectCount) && isThisCardClicked === true)
      ){
      if(props.iscardclicked === false){
        props.setClickedCardNumber(cardNumber);
        props.setcardclicked(true);
        //console.log('선택 : ' + cardNumber);
        // console.log(e.currentTarget.parentNode);
        // console.log([].indexOf.call(e.currentTarget.parentNode.children, e));
  
  
        props.setTempChildAttr({
          isThisCardClicked,
          setThisCardClicked,
          cardnum: cardNumber,
          testFunc: testSetThisCardClicked,
          setThisCardIndexNumber,
        })
        // let tempStateArr = selectedNumberStateArr;
        // tempStateArr.push({isThisCardClicked, setThisCardClicked})
        // setSelectedNumberStateArr(tempStateArr);
      
  
        // if(isThisCardClicked === false){
        //   setThisCardClicked(true);
        // }
        // else if(isThisCardClicked === true){
        //   setThisCardClicked(false);
        // }
      }
    }
  }
  
  return (
    <>
      <DrawCardTemplate
        variants={drawCardTempVariants}
        imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`}
        whileHover="hover"
        whileTap="click"
        cardnum={cardNumber}
        onClick={(e)=>{
          clickCardHandler(e);
        }}
        isthiscardclicked={isThisCardClicked === true ? 'true' : 'false'}
      >
          <div>{(cardNumber + 1)}</div>
          <div>
            {isThisCardClicked === true && thisCardIndexNumber !== 100 
            ? (thisCardIndexNumber + 1) : ""}
          </div>
      </DrawCardTemplate>
    </>
  )
}

export default DrawCardTemp