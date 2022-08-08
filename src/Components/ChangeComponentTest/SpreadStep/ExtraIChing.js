import React, {useState} from 'react'
import styled from 'styled-components'

import{
    HorizontalContainer,
    VerticalContainer
} from '../../CustomStyles'

import{
    colors,
    fonts,
} from '../../theme'

const ExtraIChingContainer = styled(VerticalContainer)`
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
const IChingControlBox = styled(HorizontalContainer)`
    width: 90%;
    height: 60%;
    background-color: ${colors.color.lemonchiffon};
    border-radius: inherit;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
    position: relative;
`
const IChingBarBox = styled(VerticalContainer)`
    width: 30%;
    height: 90%;
    background-color: skyblue;
    border-radius: inherit;
    justify-content: space-evenly;
    flex-direction: column-reverse;
`
const IChingBtnBox = styled(VerticalContainer)`
    width: 30%;
    height: 90%;
    background-color: ${colors.color.beige};
    border-radius: inherit;
    justify-content: space-evenly;

`
const IChingBtn = styled(HorizontalContainer)`
    width: 80%;
    height: 20%;
    background-color: ${colors.color.navy};
    border-radius: inherit;
    padding: 2%;
    & > button{
        width: 100%;
        height: 100%;
        background-color: ${colors.color.skyblue};
        outline: unset;
        border: none;
        border-radius: inherit;
        font-family: ${fonts.family.base};
        font-size: 1.2em;
        font-weight: 600;
        cursor: pointer;
    }
`
const ichingBtnVar = {
    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1.0,
    }
}
const IChingBar = styled(HorizontalContainer)`

    width: 90%;
    height: 15%;
    background-color: gray;
    //border-radius: inherit;
    background-color: white;
    //background-image : url(${props => props.imgsrc});
    //background-size: 100%; 100%;
    & > div{
        width: 90%;
        height: 85%;
        background-image : url(${props => props.imgsrc});
        background-size: 100%; 100%;
        transition: background-image 0.5s ease-in-out;
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
const btnVar = {

    hover:{
        scale: 1.1,
    },
    click:{
        scale: 1.0,
    }
}

const Modal = styled(VerticalContainer)`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.7;
    background-color: whitesmoke;

    border-radius: inherit;
    & span{
        font-family: "Jua";
        font-size: 3em;
        font-weight: 600;
        margin: 2% 0;
    }
`
const modalVar = {
    initial:{
        opacity: 0,
    },
    start:{
        opacity: 0.7,
        transition:{
            duration: 1.0,
        }
    }
}


function ExtraIChing(props) { // optionType 7

    let setOptionType = props.setOptionType;
    let setIsActiveOptionCurtain = props.setIsActiveOptionCurtain;

    let dragCardNumArr = props.dragCardNumArr;
    let setDragCardNumArr = props.setDragCardNumArr;
    let {
        isInCount,
        setIsInCount
    } = props.isInCounter;
    let {
        totalCount,
        setTotalCount
    } = props.totalCounter;
    let {
        imgTypeArr,
        setImgTypeArr
    } = props.imgTypeControler;
    let {
        hideBtnOnOffArr,
        setHideBtnOnOffArr
    } = props.hideBtnOnOffArrController;
    const defaultImageRoute = `${process.env.PUBLIC_URL}/images/IChing/ichingBaseBar.png`;
    const flagStandardArr = [false, true]; // 0, 1

    const [timerNum, setTimerNum] = useState(3);

    const [firstFlag, setFirstFlag] = useState(10); // flag 개수 = true 개수
    // true: 앞, false : 뒤로 간주함
    const [secondFlag, setSecondFlag] = useState(10);
    const [thirdFlag, setThirdFlag] = useState(10);
    const [fourthFlag, setFourthFlag] = useState(10);
    const [fifthFlag, setFifthFlag] = useState(10);
    const [sixthFlag, setSixthFlag] = useState(10);

    // Left Image Route
    const [firstRoute, setFirstRoute] = useState("");
    const [secondRoute, setSecondRoute] = useState("");
    const [thirdRoute, setThirdRoute] = useState("");
    const [fourthRoute, setFourthRoute] = useState("");
    const [fifthRoute, setFifthRoute] = useState("");
    const [sixthRoute, setSixthRoute] = useState("");

    // Right Image Route
    const [rightFirstRoute, setRightFirstRoute] = useState("");
    const [rightSecondRoute, setRightSecondRoute] = useState("");
    const [rightThirdRoute, setRightThirdRoute] = useState("");
    const [rightFourthRoute, setRightFourthRoute] = useState("");
    const [rightFifthRoute, setRightFifthRoute] = useState("");
    const [rightSixthRoute, setRightSixthRoute] = useState("");

    //const [leftImgCode, setLeftImgCode] = useState("");
    //const [rightImgCode, setRightImgCode] = useState("");

    const [isOnModal, setIsOnModal] = useState(false);

    //const [leftImgNum, setLeftImgNum] = useState();
    const IChingTranslateCodeArr =[
        "111111",
        "000000",
        "100010",
        "010001",
        "111010",
        "010111",
        "010000",
        "000010",
        "111011",
        "110111",
        "111000",
        "000111",
        "101111",
        "111101",
        "001000",
        "000100",
        "100110",
        "011001",
        "110000",
        "000011",
        "100101",
        "101001",
        "000001",
        "100000",
        "100111",
        "111001",
        "100001",
        "011110",
        "010010",
        "101101",
        "001110",
        "011100",
        "001111",
        "111100",
        "000101",
        "101000",
        "101011",
        "110101",
        "001010",
        "010100",
        "110001",
        "100011",
        "111110",
        "011111",
        "000110",
        "011000",
        "010110",
        "011010",
        "101110",
        "011101",
        "100100",
        "001001",
        "001011",
        "110100",
        "101100",
        "001101",
        "011011",
        "110110",
        "010011",
        "110010",
        "110011",
        "001100",
        "101010",
        "010101",
    ]
    let {
        hideInfoArr,
        setHideInfoArr,
    } = props.hideInfoArrController;

    const activeTimer = () =>{
        let temp = 3;
        let timerId = setInterval(()=>{
            //console.log(temp);
            temp--;
            setTimerNum(temp);
        }, 1000)
        setTimeout(()=>{
            clearInterval(timerId);
        }, 3000);
    }
    const onBackBtnClick = () =>{
        setOptionType(0);
        setIsActiveOptionCurtain(false);    
    }

    const flagChecker = () => {
        let tempNum;
        let checker = 0;
        let flagCheckArr = new Array(3);
        for(let i = 0; i < 3; i++){
            tempNum = Math.floor((Math.random() * 2));
            //console.log(tempNum);
            if(tempNum === 0){
                flagCheckArr[i] = flagStandardArr[0];
            }
            else{
                flagCheckArr[i] = flagStandardArr[1];
                checker++;
            }
        }
        return checker;
    }
    const setLeftCheckerRoute = (num, type) =>{
        let _str;
        switch(type){
            case "First":
                if(num >= 2){ // true가 2개 이상.
                    setFirstRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                else{ // true가 1개 이하.
                    setFirstRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                return _str;
            //break;
            case "Second":
                if(num >= 2){
                    setSecondRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                else{
                    setSecondRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                return _str;
            //break;
            case "Third":
                if(num >= 2){
                    setThirdRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                else{
                    setThirdRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                return _str;
            //break;
            case "Fourth":
                if(num >= 2){
                    setFourthRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                else{
                    setFourthRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                return _str;
            //break;
            case "Fifth":
                if(num >= 2){
                    setFifthRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                else{
                    setFifthRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                return _str;
            //break;
            case "Sixth":
                if(num >= 2){
                    setSixthRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                else{
                    setSixthRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                return _str;
            //break;
            default:

            break;
        }
    }
    const setRightCheckerRoute = (num, type) =>{
        let _str;
        switch(type){
            case "First_R":
                if(num === 3 || num === 1){ // true가 3개, 1개 // 나눠진 이미지
                    setRightFirstRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                else{ // true 2, 0 // 나눠지지 않은 이미지
                    setRightFirstRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                return _str;
            //break;
            case "Second_R":
                if(num === 3 || num === 1){ // true가 3개, 1개 // 나눠진 이미지
                    setRightSecondRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                else{ // true 2, 0 // 나눠지지 않은 이미지
                    setRightSecondRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                return _str;
            //break;
            case "Third_R":
                if(num === 3 || num === 1){ // true가 3개, 1개 // 나눠진 이미지
                    setRightThirdRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                else{ // true 2, 0 // 나눠지지 않은 이미지
                    setRightThirdRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                return _str;
            //break;
            case "Fourth_R":
                if(num === 3 || num === 1){ // true가 3개, 1개 // 나눠진 이미지
                    setRightFourthRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                else{ // true 2, 0 // 나눠지지 않은 이미지
                    setRightFourthRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                return _str;
            //break;
            case "Fifth_R":
                if(num === 3 || num === 1){ // true가 3개, 1개 // 나눠진 이미지
                    setRightFifthRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                else{ // true 2, 0 // 나눠지지 않은 이미지
                    setRightFifthRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                return _str;
            //break;
            case "Sixth_R":
                if(num === 3 || num === 1){ // true가 3개, 1개 // 나눠진 이미지
                    setRightSixthRoute(`/images/IChing/DivBlack.png`);
                    _str = "0";
                }
                else{ // true 2, 0 // 나눠지지 않은 이미지
                    setRightSixthRoute(`/images/IChing/NonBlack.png`);
                    _str = "1";
                }
                return _str;
            //break;
            default:

            break;

        }
    }

    
    const translateIChingCode = (str) => {
        //let _str = str;
        //console.log(str);
        let imgnum;
        
        for(let i = 0; i < IChingTranslateCodeArr.length; i++){
            if(IChingTranslateCodeArr[i] === str){
                //console.log(IChingTranslateCodeArr[i]);
                imgnum = i;
                break;
            }
        }
        return imgnum;
        //console.log("Left : " + imgnum1);
        //console.log("Right : " + imgnum2);

    }
    const onStartHandler = () => {
        
        let _dragCardNumArr = dragCardNumArr;
        let _imgTypeArr = imgTypeArr;
        let _isInCount = isInCount;
        let _totalCount = totalCount;
        
        let first = flagChecker();
        let second = flagChecker(); 
        let third = flagChecker();
        let fourth = flagChecker();
        let fifth = flagChecker();
        let sixth = flagChecker();


        
        let leftTotalStr = "";
        let rightTotalStr = "";
        let _strArr = new Array(6); // Left
        let _strArrR = new Array(6); // Right

        let leftNum;
        let rightNum;

        let _hideTempArr;
        let _hideTempInfo;
        let _hideBtnOnOffArr;


        // Left Image
        _strArr[0] = setLeftCheckerRoute(first, "First");
        _strArr[1] = setLeftCheckerRoute(second, "Second");
        _strArr[2] = setLeftCheckerRoute(third, "Third");
        _strArr[3] = setLeftCheckerRoute(fourth, "Fourth");
        _strArr[4] = setLeftCheckerRoute(fifth, "Fifth");
        _strArr[5] = setLeftCheckerRoute(sixth, "Sixth");

        // Right Image
        _strArrR[0] = setRightCheckerRoute(first, "First_R");
        _strArrR[1] = setRightCheckerRoute(second, "Second_R");
        _strArrR[2] = setRightCheckerRoute(third, "Third_R");
        _strArrR[3] = setRightCheckerRoute(fourth, "Fourth_R");
        _strArrR[4] = setRightCheckerRoute(fifth, "Fifth_R");
        _strArrR[5] = setRightCheckerRoute(sixth, "Sixth_R");

        for(let i = 0; i < _strArr.length; i++){
            leftTotalStr += _strArr[i];
            rightTotalStr += _strArrR[i];
        }
        //console.log(typeof leftTotalStr);
        //console.log(typeof rightTotalStr);

        //console.log("left : " + leftTotalStr);
        //console.log("right : " + rightTotalStr);

        leftNum = translateIChingCode(leftTotalStr);
        //setLeftImgNum(leftNum);
        rightNum = translateIChingCode(rightTotalStr);

        //console.log("Left : " + leftNum);
        //console.log("Right : " + rightNum);

        // 현재순서
        // 오른쪽 카드가 먼저 드래그 가능함( 위에 있음 )
        // 수정함. 왼쪽 카드 먼저로.
        _dragCardNumArr.push(rightNum);
        _dragCardNumArr.push(leftNum);
        _imgTypeArr.push("I");
        _imgTypeArr.push("I");
        setFirstFlag(first);
        setSecondFlag(second);
        setThirdFlag(third);
        setFourthFlag(fourth);
        setFifthFlag(fifth);
        setSixthFlag(sixth);

        //setLeftImgCode(leftTotalStr);
        //setRightImgCode(rightTotalStr);

        _hideTempArr = hideInfoArr;
        _hideTempInfo = {
            deckNumber: (_hideTempArr.length),
            deckName : `EXTRA DECK - ICHING ` + _hideTempArr.length,
            cardType : 'ICHING',
            cardCount : 2,
            cardFirstIdx : (totalCount),
            cardLastIdx : (totalCount + 1),
        }
        _hideTempArr.push(_hideTempInfo);

        _hideBtnOnOffArr = hideBtnOnOffArr;
        _hideBtnOnOffArr.push(false);


        setIsOnModal(true);
        activeTimer();
        setTimeout(()=>{
            setIsOnModal(false);
            setTimerNum(3);

            setOptionType(0);
            setIsActiveOptionCurtain(false);

            setIsInCount(_isInCount + 2);
            setTotalCount(_totalCount + 2);
            setDragCardNumArr(_dragCardNumArr);
            setImgTypeArr(_imgTypeArr);
            setHideInfoArr(_hideTempArr);
            setHideBtnOnOffArr(_hideBtnOnOffArr);

        }, 3000);   
        
    }

    
  return (
    <>
    <ExtraIChingContainer>
        <InformationTitle>
            <span>
                시작하려면 버튼을 누르십시오
            </span>
        </InformationTitle>
        <IChingControlBox>
            <IChingBarBox
                // Left
            > 
                <IChingBar
                    imgsrc={
                        firstFlag !== 10
                        ? `${process.env.PUBLIC_URL}${firstRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {firstFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        secondFlag !== 10
                        ? `${process.env.PUBLIC_URL}${secondRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {secondFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        thirdFlag !== 10
                        ? `${process.env.PUBLIC_URL}${thirdRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {thirdFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        fourthFlag !== 10
                        ? `${process.env.PUBLIC_URL}${fourthRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {fourthFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        fifthFlag !== 10
                        ? `${process.env.PUBLIC_URL}${fifthRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {fifthFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        sixthFlag !== 10
                        ? `${process.env.PUBLIC_URL}${sixthRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {sixthFlag} */}
                    </div>
                </IChingBar>
            </IChingBarBox>
            <IChingBtnBox>
                <IChingBtn
                    variants={ichingBtnVar}
                    whileHover="hover"
                    whileTap="click"
                >
                    <button
                        onClick={(e)=>{
                            e.preventDefault();
                            onStartHandler();
                        }}
                    >
                        MAKE
                    </button>
                </IChingBtn>
                <IChingBtn
                    variants={ichingBtnVar}
                    whileHover="hover"
                    whileTap="click"
                >
                    <button

                        onClick={(e)=>{
                            e.preventDefault();
                            setOptionType(5);
                        }}
                    >
                        BACK
                    </button>    
                </IChingBtn>
            </IChingBtnBox>
            <IChingBarBox
                // Right
            >
                <IChingBar
                    imgsrc={
                        firstFlag !== 10
                        ? `${process.env.PUBLIC_URL}${rightFirstRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {firstFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        secondFlag !== 10
                        ? `${process.env.PUBLIC_URL}${rightSecondRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {secondFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        thirdFlag !== 10
                        ? `${process.env.PUBLIC_URL}${rightThirdRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {thirdFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        fourthFlag !== 10
                        ? `${process.env.PUBLIC_URL}${rightFourthRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {fourthFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        fifthFlag !== 10
                        ? `${process.env.PUBLIC_URL}${rightFifthRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {fifthFlag} */}
                    </div>
                </IChingBar>
                <IChingBar
                    imgsrc={
                        sixthFlag !== 10
                        ? `${process.env.PUBLIC_URL}${rightSixthRoute}`
                        : `${defaultImageRoute}`
                    }
                >
                    <div>
                        {/* {sixthFlag} */}
                    </div>
                </IChingBar>

            </IChingBarBox>
            {
                isOnModal === true
                ?
                <>
                    <Modal
                        variants={modalVar}
                        initial="initial"
                        animate="start"
                    >
                        <span>
                            잠시만 기다려 주십시오
                        </span>
                        <span>
                            {timerNum}
                        </span>                    
                    </Modal>
                </>
                : null
            }
        </IChingControlBox>
        <BackBtn
            variants={btnVar}
            whileHover={isOnModal === false ? "hover" : ""}
            whileTap={isOnModal === false ? "click" : ""}
            style={
                isOnModal === false
                ?{
                    cursor: 'pointer',
                    opacity: 1.0,
                    transition: 'opacity 0.2s ease-in-out',
                }
                :{
                    cursor: 'auto',
                    opacity: 0.8,
                    transition: 'opacity 0.2s ease-in-out',
                }
            }
        >
            <button
                style={
                    isOnModal === false
                    ?{
                        cursor: 'pointer',
                    }
                    :{
                        cursor: 'auto',
                    }
                }
                onClick={(e)=>{
                    e.preventDefault();
                    if(isOnModal === false){
                        onBackBtnClick();
                    }
                }}
            >
                CLOSE
            </button>
        </BackBtn>
    </ExtraIChingContainer>
    </>
  )
}

export default ExtraIChing