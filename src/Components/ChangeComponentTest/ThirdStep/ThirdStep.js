import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

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

import DrawCardBox from './DrawCardBox'
import OptionState from './OptionState'

const DrawContainer = styled(VerticalContainer)`
    width: 100%;
    height: 100%;
    background-color: ${colors.color.royalblue};
    border-radius: inherit;
    
    justify-content: space-evenly;
`
const DrawInfoBox = styled(HorizontalContainer)`

    width: 80%;
    height: 13%;
    background-color: olive;

    border-radius: inherit;
    & div{
        width: 98%;
        height: 80%;
        font-family: "Jua";
        font-size: 2em;
        font-weight: 600;
        text-align: center;
        background-color: green;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: inherit;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
`
const DrawControlContainer = styled(HorizontalContainer)`
    
    width: 95%;
    height: 75%;
    background-color: brown;

    border-radius: inherit;
    justify-content: space-between;
    padding: 1%;
    
`
const DrawScrollBox = styled(motion.div)`
    width: 75%;
    height: 100%;
    background-color: red;
    border-radius: inherit;

    margin-right: 1%;
    padding: 1%;
`
const CardSelectPannel = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: cornflowerblue;
    border-radius: 5px;

    padding: 1.5%;

   
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(13%, 1fr));
    grid-template-rows: repeat(auto-fit, minMax(40%, 1fr));
    
    grid-auto-columns: 13%;
    grid-auto-rows: 40%;

    grid-gap: 3%;

    scroll-behavior: auto;
    overflow: overlay;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 1vw;
    }
    ::-webkit-scrollbar-thumb {
        background-color: hsla(0, 0%, 42%, 0.49);
        border-radius: 100px;
    
    }
}
`
const DrawControlBtnBox = styled(VerticalContainer)`

    width: 25%;
    height: 100%;
    background-color: royalblue;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: inherit;

`
const CountInfoBox = styled(HorizontalContainer)`
    width: 95%;
    height: 15%;
    background-color: skyblue;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 2% 0;

    border-radius: 10px;
    
`
const CountingClass = styled(HorizontalContainer)`
    width: 70%;
    height: 100%;
    //background-color: royalblue;

    padding: 1%;
    border-radius: 20px;
    
    & span{
        //background-color: blue;
        margin: 1%;
        width: 100%;
        height: 100%;

        font-family: "Jua";
        font-size: 1em;
        text-align: inline;

        display: flex;
        justify-content: center;
        align-items: left;
        flex-direction: column;
    }
`
const CountingNotice = styled(HorizontalContainer)` 
    width: 20%;
    height: 80%;
    background-color: whitesmoke;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    margin: 1%;
    & span{
        height: 50%;
        width: 100%;
        font-family: "Jua";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        font-weight: 600;
    }
`
const DrawControlBtn = styled(motion.div)`

    width: 80%;
    height: 13%;
    background-color: #123456;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1%;

    border-radius: 10px;

    margin: 2% 0%;
    will-change: auto;
    cursor: pointer;

    & button{
        width: 95%;
        height: 85%;
        background-color: skyblue;
        outline: unset;
        border: none;

        font-family: "Jua";
        font-weight: 600;
        font-size: 1.5em;

        border-radius: 10px;
        cursor: pointer;
    }
    
`
const QuestionModal = styled(motion.div)`

  position: absolute;
  width: 40%;
  height: 50%;
  background-color: royalblue;
  border-radius: 10px;

  z-index: 30;
  transform: translate(35%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  top: 30%;

  & span, div{
    width: 80%;
    height: 30%;
    margin: 2% 0;
    font-family: "Jua";
    font-weight: 600;
    font-size: 2em;
    //background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  & span{
    font-size: 1.7em;
  }
  & > div{
      
    justify-content: space-evenly;
    & div{
        background-color: skyblue;
        width: 40%;
        height: 60%;
        font-size: 0.8em;
        border-radius: 10px;
      }
  }
`
const YesOrNoBox = styled(HorizontalContainer)`
    background-color: gray;
    width: 40%;
    height: 60%;
    font-size: 0.5em;
    font-weight: 600;

    cursor: pointer;
`
const yesOrNoVariants = {
    hover:{
        scale: 1.1,
        boxShadow: '0 0 10px 2px skyblue'
    },
    click:{
        scale: 1,
    }
}
const Curtain = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: beige;
    z-index: 50;
    position: absolute;
`
const curtainVariant = {
    initial:{
        opacity: 1
    },
    start:{
        opacity: 0,
        transition:{
            duration: 2
        }
    }
}
const drawControlBtnVariants ={
  hover:{
      scale: 1.1,
      transform: "rotate(.001deg)",
  },
  click:{
      scale: 1,
      transform: "rotate(.001deg)",
  },
  
}


// function SelectModal(props){

//   //const _clickedCardNumber = props.clickedcardnumber;
//   const {isThisCardClicked, setThisCardClicked, cardnum, testFunc, setThisCardIndexNumber} = props.tempChildAttr;
//   // yes, no ?????? ??????, ?????????????????? ????????????
//   //const {selectedNumberStateArr, setSelectedNumberStateArr} = props.selectedNumStateArrController
//   //const {selectedNumberArr, setSelectedNumberArr} = props.selectedNumArrController;
//   //let {clickAndSelectCount ,setClickAndSelectCount} = props.clickCounterController;

//   const clickedYesOrNoHandler = (flag) => {
//       if(flag === 'true'){ // Yes??????
//           if(isThisCardClicked === false){ // ???????????? ???????????? Yes??? ?????????
//               testFunc(true); // ???????????? ?????????
//               //console.log(cardnum); // ???????????? ?????? ??????
//               // ??????????????? ???????????? ????????? ???????????? ????????? ????????? ???????????? ?????? ??????
//               // ??? ???????????? ????????? ????????? ??????????????? ????????? ???????????? clickcount ?????? ????????? ???????????? ???????????????
              
//               // ????????? ?????? ??????
//               let _tempArr = [...selectedNumberArr];
//               for(let i = 0; i < _tempArr.length; i++){
//                   if(_tempArr[i] === 100){
//                       _tempArr[i] = cardnum;
//                       setThisCardIndexNumber(i);
//                       setSelectedNumberArr(_tempArr);
//                       break;
//                   }
//               }
              
//               // click count increase
//               let _clickCount = clickAndSelectCount;
//               _clickCount++;
//               setClickAndSelectCount(_clickCount);
              
//               // ????????? number??? state??????
//               let tempNumState = { cardnum, isThisCardClicked, setThisCardClicked};
//               let tempNumStateArr = [...selectedNumberStateArr];
              
//               for(let i = 0; tempNumStateArr.length; i++){
//                   if(tempNumStateArr[i].cardnum === 100){
//                       tempNumStateArr[i] = tempNumState;
//                       break;
//                   }
//               }
              
//               //tempNumStateArr.push(tempNumState);
//               setSelectedNumberStateArr(tempNumStateArr);

//               // for(let i = 0; i < tempNumStateArr.length; i++){
//               //     //if(tempNumStateArr[i])
//               //     console.log(tempNumStateArr[i].keys());
//               // }
              

//           }
//           else if(isThisCardClicked === true){ // ????????? ?????? ????????? ???????????? Yes??? ?????????,
//               testFunc(false);
//               //console.log(cardnum);
//               // ??????????????? ???????????? ????????? ???????????? ????????? ????????? ???????????? ?????? ??????

//               let _tempArr = [...selectedNumberArr];
//               for(let i = 0; i < _tempArr.length; i++){
//                   if(_tempArr[i] === cardnum){
//                       _tempArr[i] = 100;
//                       setThisCardIndexNumber(100);
//                       setSelectedNumberArr(_tempArr);
//                       break;
//                   }
//               }

//               let tempStateNum = cardnum;
//               let tempStateNumArr = selectedNumberStateArr;

//               //let cancelIndex;
//               for(let i = 0; i < tempStateNumArr.length; i++){
//                   if(tempStateNumArr[i].cardnum === tempStateNum){
//                       tempStateNumArr[i] = {cardnum : 100};
//                       break;
//                   }
//               }
//               //tempStateNumArr[cancelIndex] = {cardnum: 100};

//               // ?????? ?????? ??????
//               // for(let i = 0; i < tempStateNumArr.length; i++){
//               //     if(tempStateNumArr[i].cardnum === tempStateNum){
//               //         tempStateNumArr[i] = null;
//               //         break;
//               //     }
//               // }
//               setSelectedNumberStateArr(tempStateNumArr);

//               let _clickCount = clickAndSelectCount;
//               _clickCount--;
//               setClickAndSelectCount(_clickCount);
//           } 
//       }
//       else if(flag === 'false'){ // No ??????
//           if(isThisCardClicked === false){ // ???????????? ???????????? no??????.
//               // ??????????????????.
//               testFunc(false);
//           }
//           else if(isThisCardClicked === true){ // ????????? ???????????? no??????
//               // ????????? ????????????.
//               testFunc(true);
//           }
//       }
//       props.setCardClicked(false);
//   }
//   return(
//       <>
//           <QuestionModal>
//               <span>
//                   {props.tempChildAttr.isThisCardClicked === false 
//                       ? `${_clickedCardNumber + 1} ?????? ????????? ?????????????????????????`
//                       : `${_clickedCardNumber + 1} ?????? ????????? ?????????????????????????`
//                   }
//               </span>
//               <div>
//                   <YesOrNoBox 
//                       variants={yesOrNoVariants}
//                       whileHover="hover"
//                       whileTap="click"
//                       onClick={()=>{
//                           clickedYesOrNoHandler("true")
//                       }}
//                   >Y E S</YesOrNoBox>
//                   <YesOrNoBox
//                       variants={yesOrNoVariants}
//                       whileHover="hover"
//                       whileTap="click"
//                       onClick={()=>{
//                           clickedYesOrNoHandler("false")
//                       }}
//                   >N O</YesOrNoBox>
//               </div>
//           </QuestionModal>
//       </>
//   );
// }
function QueSelectCard(props){

  let setCardClicked = props.setCardClicked;
  let {
    isThisCardClicked,
    setThisCardClicked,
    selectedIdxNum,
    setSelectedIdxNum,
    cardNum,
    imgNum,
  } = props.tempChildAttr;
  let selectedCardArr = props.selectedCardArr;
  let setSelectedCardArr = props.setSelectedCardArr;
  let {selectCount, setSelectCount} = props.selectCounter;
  let {selectedCardControlArr, setSelectedCardControlArr} = props.selectCardController;


  const clickedYesOrNoHandler = (type) => {
    let _selectCount = selectCount;
    let _idxNum;
    let _selectedCardControlArr = selectedCardControlArr;
    if(type === "true"){
      let tempArr = selectedCardArr;
      let tempNum = imgNum;
      if(isThisCardClicked === false){
        for(let i = 0; i < tempArr.length; i++){
          if(tempArr[i] === 100){
            tempArr[i] = imgNum;
            _idxNum = i;
            break;
          }
        }
        _selectedCardControlArr[cardNum].isThisCardClicked = true;
        setSelectedCardControlArr(_selectedCardControlArr);
        _selectCount++;
        setSelectCount(_selectCount);
        setSelectedIdxNum(_idxNum);
        setSelectedCardArr(tempArr);
        setThisCardClicked(true);
      }
      else{
        for(let i = 0; i < tempArr.length; i++){
          if(tempArr[i] === tempNum){
            tempArr[i] = 100;
            break;
          }
        }
        _selectedCardControlArr[cardNum].isThisCardClicked = false;
        setSelectedCardControlArr(_selectedCardControlArr);
        _selectCount--;
        setSelectCount(_selectCount);
        setSelectedIdxNum(100);
        setSelectedCardArr(tempArr);
        setThisCardClicked(false);
      }
      setCardClicked(false);
    }
    else{
      setCardClicked(false);
    }
  }
  return(
    <>
    <QuestionModal>
      <span>
        {isThisCardClicked === false
        ? `${cardNum + 1}??? ????????? ?????????????????????????`
        : `${cardNum + 1}??? ????????? ?????????????????????????`
        }
      </span>
      <div>
        <YesOrNoBox
          variants={yesOrNoVariants}
          whileHover="hover"
          whileTap="click"
          onClick={()=>{
            clickedYesOrNoHandler("true");
          }}
        >
          YES
        </YesOrNoBox>
        <YesOrNoBox
          variants={yesOrNoVariants}
          whileHover="hover"
          whileTap="click"
          onClick={()=>{
            clickedYesOrNoHandler("false");
          }}
        >
          NO
        </YesOrNoBox>
      </div>
    </QuestionModal>
    </>
  );
}

function ThirdStep(props) {
  const modeNumber = props.modeNumber;
  let userSetNumber = props.userSetNumber;
  let setUserSetNumber = props.setUserSetNumber;
  let [drawRanNumArr, setDrawRanNumArr] = useState([]);
  let { clickAndSelectCount, setClickAndSelectCount } = props.clickCounterController;
  let [isCardClicked, setCardClicked] = useState(false); // ??????????????????, ????????? ?????????
  let [tempChildAttr, setTempChildAttr] = useState({});
  let _tempArr = new Array(userSetNumber);
  _tempArr.fill(100);
  let [selectedCardArr, setSelectedCardArr] = useState(_tempArr);
  let [selectedCardControlArr, setSelectedCardControlArr] = useState(new Array(78));
  let selectCardController = {selectedCardControlArr, setSelectedCardControlArr};
  let [selectCount, setSelectCount] = useState(0);
  let selectCounter = {selectCount, setSelectCount};

  let [activeOptionContainer, setActiveOptionContainer] = useState(0);
  let [optionType, setOptionType] = useState(0);

  let setSelectedImgNumArr = props.setSelectedImgNumArr;
  useEffect(()=>{
    let tempRanNumArr = new Array(78);
    for(let i = 0; i < tempRanNumArr.length; i++){
      let tempRanNum = Math.floor((Math.random() * (78)));
      tempRanNumArr[i] = tempRanNum;
      for(let j = 0; j < i; j++){
      if(tempRanNumArr[i] === tempRanNumArr[j]){
          i--;
          break;
        }
      }
    }   
    setDrawRanNumArr(tempRanNumArr);
  }, [])
  useEffect(()=>{
    let _tempArr = new Array(userSetNumber);
    _tempArr.fill(100);
    setSelectedCardArr(_tempArr);

  }, [userSetNumber])

  const onOptionHandler = (e, typeNum) => {
    e.preventDefault();
    setActiveOptionContainer(true);
    setOptionType(typeNum);
  }
  return (
    <>
    <DrawContainer>
      <DrawInfoBox>
        <div>
          ???????????? ????????? ???????????? ????????????
        </div>
      </DrawInfoBox>
      <DrawControlContainer>
        <DrawScrollBox>
          <CardSelectPannel>
            {drawRanNumArr.map((a, i) =>{

              return(
                <DrawCardBox 
                  key={i}
                  cardnum={i}
                  imgnum={drawRanNumArr[i]}
                  userSetNumber={userSetNumber}
                  clickAndSelectCount={clickAndSelectCount}
                  isCardClicked={isCardClicked}
                  setCardClicked={setCardClicked}
                  setTempChildAttr={setTempChildAttr}
                  selectCounter={selectCounter}
                  selectCardController={selectCardController}
                />
              );
            })}
            {
              isCardClicked === true
              ?
              <>
              <QueSelectCard 
                setCardClicked={setCardClicked}
                tempChildAttr={tempChildAttr}
                setTempChildAttr={setTempChildAttr}
                selectedCardArr={selectedCardArr}
                setSelectedCardArr={setSelectedCardArr}
                selectCounter={selectCounter}
                selectCardController={selectCardController}
              />
              </> 
              : null
            }
          </CardSelectPannel>
        </DrawScrollBox>
        <DrawControlBtnBox>
        <CountInfoBox>
          <CountingClass>
            <span>?????? ?????? ??????</span>
          </CountingClass>
          <CountingNotice>
            <span>{userSetNumber}</span>
          </CountingNotice>
        </CountInfoBox>
          <CountInfoBox 
            style={{
              marginBottom: '5%',
            }}>
              <CountingClass>
                <span>?????? ????????? ??????</span>
              </CountingClass>
              <CountingNotice>
                <span>{selectCount}</span>
              </CountingNotice>
          </CountInfoBox>
            <>
              <DrawControlBtn // Auto Btn
                variants={drawControlBtnVariants}
                whileHover={selectCount <= 0 && isCardClicked === false ? "hover" : "none"}
                whileTap={selectCount <= 0 && isCardClicked === false ? "click" : "none"}
                onTap={(e)=>{
                  if(selectCount <= 0 && isCardClicked === false){
                    onOptionHandler(e, 1);
                  }
                }}
                style={selectCount <= 0 && isCardClicked === false
                  ?
                  {
                      opacity: 1,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'pointer',
                  } 
                  :
                  {
                      opacity: 0.5,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'auto',
                  }}
              > 
                <button
                  style={selectCount <= 0 && isCardClicked === false
                    ?{
                      cursor: 'pointer',
                    } 
                    :{
                        cursor: 'auto',
                    }}
                >
                  Auto
                </button>
              </DrawControlBtn>
              <DrawControlBtn // Shuffle Btn
                variants={drawControlBtnVariants}
                whileHover={selectCount <= 0 && isCardClicked === false ? "hover" : "none"}
                whileTap={selectCount <= 0 && isCardClicked === false ? "click" : "none"}
                style={selectCount === 0 && isCardClicked === false
                  ?
                  {
                      opacity: 1,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'pointer',
                  } 
                  :
                  {
                      opacity: 0.5,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'auto',
                  }}
                onTap={(e)=>{
                  if(selectCount === 0 && isCardClicked === false){
                    onOptionHandler(e, 2);
                  }
                }}
              > 
                <button
                  style={selectCount === 0 && isCardClicked === false
                    ?{
                      cursor: 'pointer',
                    } 
                    :{
                        cursor: 'auto',
                    }}
                >
                  Shuffle
                </button>
              </DrawControlBtn>
              <DrawControlBtn // Modify Btn
                variants={drawControlBtnVariants}
                whileHover={selectCount <= 0 && isCardClicked === false
                  && modeNumber === 0 ? "hover" : "none"}
                whileTap={selectCount <= 0 && isCardClicked === false
                  && modeNumber === 0 ? "click" : "none"}
                style={selectCount === 0 && isCardClicked === false
                  && modeNumber === 0
                  ?
                  {
                      opacity: 1,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'pointer',
                  } 
                  :
                  {
                      opacity: 0.5,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'auto',
                  }}
                onTap={(e)=>{
                  if(selectCount === 0 && isCardClicked === false
                    && modeNumber === 0){
                    onOptionHandler(e, 3);
                  }
                }}
              > 
                <button
                  style={selectCount === 0 && isCardClicked === false
                    && modeNumber === 0
                    ?{
                      cursor: 'pointer',
                    } 
                    :{
                        cursor: 'auto',
                    }}
                >
                  Modify
                </button>
              </DrawControlBtn>
              <DrawControlBtn // Reset Btn
                variants={drawControlBtnVariants}
                whileHover={selectCount > 0 && isCardClicked === false ? "hover" : "none"}
                whileTap={selectCount > 0 && isCardClicked === false ? "click" : "none"}
                style={selectCount > 0 && isCardClicked === false
                  ?
                  {
                      opacity: 1,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'pointer',
                  } 
                  :
                  {
                      opacity: 0.5,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'auto',
                  }}
                onTap={(e)=>{
                  if(selectCount > 0 && isCardClicked === false){
                    onOptionHandler(e, 4);
                  }
                }}
              > 
                <button
                  style={selectCount > 0 && isCardClicked === false
                    ?{
                      cursor: 'pointer',
                    } 
                    :{
                        cursor: 'auto',
                    }}
                >
                  Reset
                </button>
              </DrawControlBtn>
              <DrawControlBtn // Next Btn
                variants={drawControlBtnVariants}
                whileHover={selectCount === userSetNumber && isCardClicked === false ? "hover" : "none"}
                whileTap={selectCount === userSetNumber && isCardClicked === false ? "click" : "none"}
                style={selectCount === userSetNumber && isCardClicked === false
                  ?
                  {
                      opacity: 1,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'pointer',
                  } 
                  :
                  {
                      opacity: 0.5,
                      transition: `opacity 1s ease-in-out`,
                      cursor: 'auto',
                  }}
                onTap={(e)=>{
                  if(selectCount === userSetNumber && isCardClicked === false){
                    onOptionHandler(e, 5);
                  }
                }}
              > 
                <button
                  style={selectCount === userSetNumber && isCardClicked === false
                    ?{
                      cursor: 'pointer',
                    } 
                    :{
                        cursor: 'auto',
                    }}
                >
                  Next
                </button>
              </DrawControlBtn>
          </>
        </DrawControlBtnBox>
      </DrawControlContainer>
      {/* { ?????? ????????????} */}
      {
        activeOptionContainer === true
        ?
        <>
        <OptionState
          userSetNumber={userSetNumber} 
          optionType={optionType}
          setOptionType={setOptionType}
          setActiveOptionContainer={setActiveOptionContainer}
          selectCardController={selectCardController}
          drawRanNumArr={drawRanNumArr}
          setDrawRanNumArr={setDrawRanNumArr}
          selectCounter={selectCounter}
          selectedCardArr={selectedCardArr}
          setSelectedCardArr={setSelectedCardArr}
          setUserSetNumber={setUserSetNumber}
          setSelectedImgNumArr={setSelectedImgNumArr}
          setThirdFlagOver={props.setThirdFlagOver}
        />
        </>
        : null
      }
    </DrawContainer>
    </>
  )
}

export default ThirdStep