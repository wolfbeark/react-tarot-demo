
import React, { useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import {
    HorizontalContainer,
    VerticalContainer
} from '../../CustomStyles'
import {
    colors,
    fonts,
    border,
} from '../../theme'

const LenormandContainer = styled(VerticalContainer)`
    width: 70%;
    height: 80%;
    background-color:  ${colors.color.navy};
    border-radius: 10px;
    justify-content: space-evenly;
    position: relative;
`
const InformationTitle = styled(HorizontalContainer)`
    width: 90%;
    height: 20%;
    background-color: ${colors.color.royalblue};
    border-radius: inherit;
    padding: 1%;
    & > span{
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: ${colors.color.lemonchiffon};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
    }
`
const LenormandForm = styled(motion.div)`

    width: 90%;
    height: 60%;
    background-color: ${colors.color.lemonchiffon};
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 0;
    margin: 0;

    & > input{
        width: 60%;
        height: 20%;
        background-color: ${colors.color.lemonchiffon};
        outline: unset;
        border: none;
        border-radius: inherit;
        transition: box-shadow 0.2s ease-in-out;
    }
    & > input:focus{
        box-shadow: 0 0 10px 5px ${colors.color.lemonchiffon};
    }
`
const LenormandBtnBox = styled(motion.div)`

    width: ${(props) => props.newwidth ? props.newwidth : '15'}%;
    height: ${(props) => props.newheight ? props.newheight : '60'}%;
    background-color: ${colors.color.skyblue};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1%;

    transition: opacity 0.5s ease-in-out;

    & > button{
        font-family: ${fonts.family.base};
        font-size: 1.2em;
        width: 100%;
        height: 100%;
        background-color: ${colors.color.navy};
        //background-color: blue;
        border-radius: inherit;
        color: ${colors.color.lemonchiffon};
        outline: unset;
        border: none;
    }
`
const LenormandInputBox = styled(HorizontalContainer)`
    width: 95%;
    height: 40%;
    background-color: ${colors.color.royalblue};
    border-radius: inherit;
    justify-content: space-evenly;
    margin-bottom: 3%;
    
    & > input{
        font-family: ${fonts.family.base};
        font-size: 2em;
        font-weight: 600;
        width: 60%;
        height: 70%;
        //background-color: ${colors.color.white};
        background-color: whitesmoke;
        outline: unset;
        border: none;
        border-radius: inherit;
        transition: box-shadow 0.2s ease-in-out;
        text-align: center;
        
    }
    & > input:focus{
        box-shadow: 0 0 10px 5px ${colors.color.lemonchiffon};
    }
`
const BackBtn = styled(HorizontalContainer)`

    width: 15%;
    height: 10%;
    background-color: ${colors.color.navy};
    border-radius: inherit;
    padding: 0.5%;
    position: absolute;
    right: 0;
    bottom: -12%;
    & > button{
        width: 100%;
        height: 100%;
        background-color: ${colors.color.skyblue};
        outline: unset;
        border: none;
        border-radius: inherit;
        font-family: ${fonts.family.base};
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
    }
`

const Modal = styled(HorizontalContainer)`
    width: 80%;
    height: 80%;
    //background-color: ${colors.color.beige};
    //opacity: 0.5;
    background-color: rgba(245, 245, 220, 0.8);
    border-radius: ${border.radius[10]};
    position: absolute;
    & span{
        font-size: 2em;
    }
`
const OptionBtnBox = styled(HorizontalContainer)`

    justify-content: space-evenly;
    width: 95%;
    height: 20%;
    background-color: tomato;
`
const modalVar = {
    initial:{
        scale: 0
    },
    start:{
        scale: 1,
        transition:{
            duration: 0.3,
        }
    }
}
const btnVar = {

    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1.0,
    }
}

function ExtraLenorMand(props) {

    let setOptionType = props.setOptionType;
    let setIsActiveOptionCurtain = props.setIsActiveOptionCurtain

    let {totalCount, setTotalCount} = props.totalCounter;
    let {setIsInCount} = props.isInCounter;
    let dragCardNumArr = props.dragCardNumArr
    let setDragCardNumArr = props.setDragCardNumArr
    let {
        imgTypeArr,
        setImgTypeArr
    } = props.imgTypeControler
    const [value, setValue] = useState("");
    const [isRightNum, setIsRightNum] = useState(false);
    const [isClickedAll, setClickedAll] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [infoText, setInfoText] = useState('');
    let {
        hideBtnOnOffArr,
        setHideBtnOnOffArr
    } = props.hideBtnOnOffArrController;

    let {
        hideInfoArr,
        setHideInfoArr
    } = props.hideInfoArrController

    let childCardStateArr = props.childCardStateArr;
    let {
        isClickedLenormandTotal,
        setIsClickedLenormandTotal
    } = props.isClickedLenormandTotalController;

    let {
        lenormandTotalIdx,
        setLenormandTotalIdx
    } = props.lenormandTotalIdxController;

    const onBackBtnClick = () =>{
        setOptionType(0);
        setIsActiveOptionCurtain(false);    
    }
    
    const checkRightNumber = () =>{
        let parsedToNum = parseInt(value);
        if(parsedToNum > 0 && parsedToNum <= 36){
            //console.log('success');
            setModalActive(true);
            setInfoText("입력에 성공하였습니다");
            setIsRightNum(true);
            //setNextBtnActive(true);
        }            
        else if(parsedToNum <= 0 || parsedToNum > 36){
            //console.log('fail');
            setModalActive(true);
            //setNextBtnActive(false);
            setInfoText("올바른 값이 아닙니다");
            setIsRightNum(false);
            setTimeout(()=>{ setValue('') }, 1000);
        }
        setTimeout(()=>{
             setModalActive(false);
        }, 1000);
    }

    const onChangeHandler = (e) =>{
        if(isClickedAll === true || isRightNum === true){
            setClickedAll(false);
            setIsRightNum(false);
        }
        let test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setValue(test);
    }
    
    const onAllHandler = () => {

        if(isClickedAll === false){
            setValue("36");
            setModalActive(true);
            setInfoText("모든 카드가 선택되었습니다");
            setIsRightNum(true);
        }
        else{
            setValue("");
            setModalActive(true);
            setInfoText("모든 카드가 해제되었습니다");
            setIsRightNum(false);
        }
        setTimeout(()=>{
            setModalActive(false);
       }, 1000);
        setClickedAll(!isClickedAll);
    }
    const makeRanNumbers = () =>{
        let tempNum = parseInt(value);
        let tempArr = new Array(tempNum);
        let reverse;
        let totalReverse;
        let allOverArr = dragCardNumArr;
        let _hideTempArr;
        let _hideTempInfo;
        let _hideBtnOnOffArr;

        let _totalTrueFirstIdx;
        let _totalTrueLastIdx;

        let _lenormandTotalCount;
        let _tempTotalIdx;

        if(isClickedAll === true){
            for(let i = 0; i < 36; i++){
                tempArr[i] = i;
            }
            _totalTrueFirstIdx = childCardStateArr.length; // 3장 먼저 있었다면
            _totalTrueLastIdx = (_totalTrueFirstIdx + 35);
            // 기존 인덱스가 0, 1, 2인데 배열의 길이는 3이므로 이 값을 인덱스로 주면
            // 자연스럽게 다음 인덱스를 가리키게됨
            // 기존 3장 + 36 => 총 39장. 인덱스의 마지막은 38이 되어야함 인덱스 : 0 ~ 38

        }
        else if(isClickedAll === false){
            for(let i = 0; i < tempArr.length; i++){
                let _tempRanNum = Math.floor((Math.random() * 36));
                tempArr[i] = _tempRanNum;
                for(let j = 0; j < i; j++){
                    if(tempArr[j] === tempArr[i]){
                        i--;
                        break;
                    }
                }
            }
        }

        let _typeArr = imgTypeArr;
        reverse = tempArr.reverse();
        //console.log(tempArr);
        for(let i = 0; i < reverse.length; i++){
            allOverArr.push(reverse[i]);
            _typeArr.push("L");
        }

        // 1차 테스트 코드
        // imgTypeArr "L"
        //let _dragCardNumArr = dragCardNumArr;
        let _totalCount = totalCount;
        _totalCount += tempNum;

        _hideTempArr = hideInfoArr;
        _hideTempInfo = {
            deckNumber: (_hideTempArr.length),
            deckName : `EXTRA DECK - LENORMAND ` + _hideTempArr.length,
            cardType : 'LENORMAND',
            cardCount : tempNum,
            cardFirstIdx : (totalCount),
            cardLastIdx : ((totalCount + tempNum) - 1),
            }
        _hideTempArr.push(_hideTempInfo);

        _hideBtnOnOffArr = hideBtnOnOffArr;
        _hideBtnOnOffArr.push(false);

        // for(let i = 0; i < tempNum; i++){
        //     _typeArr.unshift("L");
        //     _dragCardNumArr.unshift(tempArr[i])
        // }
        // setImgTypeArr(_typeArr);
        // setDragCardNumArr(_dragCardNumArr);
        if(isClickedAll === true){
            _tempTotalIdx = new Array(36);
            for(let i = 0; i < 36; i++){
                _tempTotalIdx[i] = _totalTrueFirstIdx;
                _totalTrueFirstIdx++;
            }
            //totalReverse = _tempTotalIdx.reverse(); // 리버스 해야 하는가? 
            // 리버스하고 setIsInSpreadzone 하니 포지션 제대로 못잡음 22.08.04
            // 잡음
            
            setLenormandTotalIdx(_tempTotalIdx);
            setIsClickedLenormandTotal(true);
        }
        setDragCardNumArr(allOverArr);
        setImgTypeArr(_typeArr);
        setIsActiveOptionCurtain(false);
        setOptionType(0);

        setTotalCount(_totalCount);
        if(isClickedAll === true){
            setIsInCount(0);
        }
        else{
            setIsInCount(tempNum);
        }

        setHideInfoArr(_hideTempArr);
        setHideBtnOnOffArr(_hideBtnOnOffArr);

    }
    return(
        <>
        <LenormandContainer>
            <InformationTitle>
                <span>
                    원하시는 수량을 입력하세요
                </span>
            </InformationTitle>
            <LenormandForm
                // onSubmit={(e)=>{
                //     e.preventDefault();
                // }}
            >
                <LenormandInputBox>
                    <input 
                        value={value}
                        maxLength={2}
                        autoComplete='off'
                        placeholder='1 - 36'
                        onChange={(e) =>{
                            onChangeHandler(e);
                        }}
                    />
                    <LenormandBtnBox
                        variants={btnVar}
                        whileHover={
                            value.length < 1
                            ? ""
                            : "hover"
                        }
                        whileTap={
                            value.length < 1
                            ? ""
                            : "click"
                        }
                        style={
                            value.length < 1
                            ?{
                                opacity: 0.5,
                                cursor: 'auto',
                            }
                            :{
                                opacity: 1.0,
                                cursor: 'pointer',
                            }
                        }
                    >
                        <button
                            style={
                                value.length < 1
                                ?{
                                    //opacity: 0.5,
                                    cursor: 'auto',
                                }
                                :{
                                    //opacity: 1.0,
                                    cursor: 'pointer',
                                }
                            }
                            onClick={(e)=>{
                                e.preventDefault();
                                if(value.length >= 1 && modalActive === false){
                                    checkRightNumber();
                                }
                            }}
                        >
                            SET
                        </button>
                    </LenormandBtnBox>
                    <LenormandBtnBox
                        variants={btnVar}
                        whileHover="hover"
                        whileTap='click'
                        style={
                            isClickedAll === false || isClickedLenormandTotal === false
                            ?
                            {
                                backgroundColor: 'skyblue',
                                transition: 'background-color 0.5s ease-in-out',
                                cursor: 'pointer',
                            }
                            :
                            {
                                backgroundColor: 'yellow',
                                transition: 'background-color 0.5s ease-in-out',
                                cursor: 'pointer',
                            }
                        }
                    >
                        <button
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={(e)=>{
                                e.preventDefault();
                                if(modalActive === false){
                                    if(isClickedLenormandTotal === false){
                                        onAllHandler();
                                    }
                                }
                            }}
                        >
                            All
                        </button>
                    </LenormandBtnBox>
                </LenormandInputBox>
                <OptionBtnBox>
                    <LenormandBtnBox
                        newwidth={30}
                        newheight={100}
                        variants={btnVar}
                        whileHover={
                            isRightNum === true
                            ? "hover"
                            : ""
                        }
                        whileTap={
                            isRightNum === true
                            ? "hover"
                            : ""
                        }
                        style={
                            isRightNum === true
                            ?
                            {
                                opacity: 1.0,
                                cursor: 'pointer'
                            }
                            :
                            {
                                opacity: 0.5,
                                cursor: 'auto'
                            }
                        }
                    >
                        <button
                            onClick={()=>{
                                if(isRightNum === true){
                                    //setOptionType(5);
                                    //console.log('make');
                                    makeRanNumbers();
                                }
                            }}
                            style={
                                isRightNum === true
                                ?
                                {
                                    cursor: 'pointer'
                                }
                                :
                                {
                                    cursor: 'auto'
                                }
                            }
                        >
                            Make
                        </button>
                    </LenormandBtnBox>
                    
                    <LenormandBtnBox
                        newwidth={30}
                        newheight={100}
                        variants={btnVar}
                        whileHover="hover"
                        whileTap="click"
                        style={{
                            cursor: 'pointer'
                        }}
                    >
                        <button
                            onClick={()=>{
                                setOptionType(5);
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            Back
                        </button>
                    </LenormandBtnBox>
                </OptionBtnBox>
                
            </LenormandForm>
            {
                modalActive === true
                ?
                <>
                    <Modal
                        variants={modalVar}
                        initial="initial"
                        animate="start"
                    >
                        <span>
                            {infoText}
                        </span>
                    </Modal>
                </>
                : null
            }
            <BackBtn
                style={{
                    cursor: 'pointer',
                }}
                whileHover={{
                    scale: 1.1,
                }}
                whileTap={{
                    scale: 1.0
                }}
            >
                <button

                    onClick={(e)=>{
                        e.preventDefault();
                        onBackBtnClick();
                    }}
                >
                    CLOSE
                </button>
            </BackBtn>
        </LenormandContainer>
        </>
    );
}

export default ExtraLenorMand;