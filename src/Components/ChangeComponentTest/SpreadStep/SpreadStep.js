import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

import MainSpreadZone from "./MainSpreadZone";
import { colors } from "../../theme";

import MakeExtraDeck from "./MakeExtraDeck";
import SpreadCurtain from "./SpreadCurtain";
import Find from "./Find";
import SelectExtraMode from "./SelectExtraMode";

import ExtraLenorMand from "./ExtraLenormand";
import ExtraIChing from "./ExtraIChing";

import HideAndSeek from "./HideAndSeek";
import FindSelectCard from "./FindSelectCard";

const SpreadContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  background-color: ${colors.color.navy};
  //padding: 0 2%;

  position: relative;
  //border-radius: 10px;
`;
const MainSpreadBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 139, 0.7);
  border-radius: 10px;
  padding: 1%;
  & > div {
    width: 100%;
    height: 100%;
    background-color: darkblue;
    border-radius: 10px;
  }
  position: relative;
`;
const OptionSpreadBox = styled(motion.div)`
  width: 25%;
  height: 100%;
  background-color: red;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const OptionSpreadDeckBox = styled(motion.div)`
  width: 95%;
  height: 25%;

  background-color: tomato;
  border-radius: 10px;

  padding: 1%;
`;
const DeckZone = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: tomato;
  border-radius: 10px;
`;
const ExtraCardBox = styled(motion.div)`
  background-image: url(${(props) => props.imgsrc});
  border-radius: 10px;
  background-size: 100% 100%;
  opacity: 1;
`;
const OptionSpreadDragBox = styled(motion.div)`
  width: 40%;
  height: 90%;
  background-color: skyblue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  ${ExtraCardBox} {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    background-size: 100% 100%;
  }
`;
const OptionSpreadCount = styled(motion.div)`
  width: 95%;
  height: 20%;
  background-color: tomato;
  border-radius: 10px;
  padding: 2%;

  & > div {
    width: 100%;
    height: 100%;
    background-color: royalblue;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2%;
    & div {
      width: 100%;
      height: 45%;
      background-color: skyblue;
      border-radius: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      & span {
        font-family: "Jua";
        font-size: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
      }
      & > span {
        width: 70%;
        height: 100%;
        //background-color: gray;
      }
      & span:last-child {
        width: 25%;
        height: 80%;
        background-color: white;
      }
    }
  }
`;
const OptionSpreadBtnBox = styled(motion.div)`
  width: 95%;
  height: 55%;
  background-color: tomato;
  border-radius: 10px;
  padding: 2%;
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: royalblue;
    border-radius: 10px;
    padding: 2%;
  }
`;
const OptionBtn = styled(motion.div)`
  width: 100%;
  height: 18%;
  background-color: #123456;
  border-radius: 10px;
  padding: 2%;
  & > button {
    width: 100%;
    height: 100%;
    outline: unset;
    border: none;
    border-radius: 10px;
    background-color: skyblue;
    font-family: "Jua";
    font-size: 1.5em;
    font-weight: 600;
  }
`;
const optionBtnVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 5px 2px #123456",
  },
  click: {
    scale: 1.0,
  },
  activeFalse: {},
};
const extraBtnVariants = {
  deactivate: {
    opacity: 0.5,
  },
  activate: {
    opacity: 1,
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 10px 5px skyblue",
  },
  click: {
    scale: 1.0,
  },
};
const CaptureName = styled(motion.input)`
  width: 90%;
  height: 20%;
  background-color: whitesmoke;
  font-family: "Jua";
  text-align: center;
  font-size: 1em;
  border: none;
  outline: unset;
  border-radius: 5px;
`;
const optionFadeVariants = {
  initial: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  fadeIn: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transition: {
      duration: 1,
    },
  },
  fadeOut: {
    backgroundColor: "rgba",
  },
};
const OptionFadeCurtain = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 10px;
`;
const SelectCardBox = styled(motion.div)`
  width: 80%;
  height: 80%;
  position: absolute;
  background-color: gray;

  z-index: 501;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  border-radius: 10px;
`;
const SelectMenuBox = styled(motion.div)`
  width: 20%;
  height: 90%;
  background-color: beige;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1% 0;
  border-radius: inherit;
`;

const SelectOptionMenuBox = styled(motion.div)`
  width: 35%;
  height: 90%;
  background-color: beige;
  border-radius: inherit;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 45%;
  }
`;
const SelectOptionImageBox = styled(motion.div)`
  width: 45%;
  height: 100%;
  border-radius: 10px;
  background-color: lemonchiffon;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  box-shadow: 0 0 10px 5px gray;
`;
const SelectCardTypeBtn = styled(motion.button)`
  outline: unset;
  border: none;
  width: 80%;
  height: 15%;
  background-color: gray;

  margin-bottom: 2%;
  font-family: "Jua";
  font-weight: 600;
  font-size: 1.5em;
  border-radius: 10px;

  cursor: pointer;
`;
const SelectSemiTypeBox = styled(motion.div)`
  width: 40%;
  height: 90%;
  background-color: beige;
  border-radius: inherit;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1% 0;
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
  // & ${SelectCardTypeBtn}{
  //     width: 80%;
  //     font-size: 1.2em;
  //     margin-bottom: 5%;
  // }
`;
const SemiTypeBtn = styled(motion.button)`
  outline: unset;
  border: none;
  width: 80%;
  height: 40%;
  background-color: gray;

  margin-bottom: 5%;
  font-family: "Jua";
  font-weight: 600;
  font-size: 1.5em;
  border-radius: 10px;

  cursor: pointer;
`;
const selectCardTypeVar = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 10px 5px gray",
  },
  click: {
    scale: 1.0,
  },
};
const SelectOptionBtnBox = styled(motion.div)`
  width: 100%;
  height: 35%;
  //background-color: seagreen;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const SelectOptionBtn = styled(motion.button)`
  width: 90%;
  height: 40%;
  background-color: burlywood;
  outline: unset;
  border: none;
  border-radius: 10px;
  font-family: "Jua";
  font-size: 1.5em;
  font-weight: 600;

  transition: opacity 0.5s ease-in-out;
`;
const optionBtnVar = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 10px 5px burlywood",
  },
  click: {
    scale: 0.9,
  },
};
const OptionPreviewChoiceSpanBox = styled(motion.div)`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & span {
    font-family: "Jua";
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 45%;
  }
`;
const OptionContainer = styled(motion.div)`
  width: 45%;
  height: 40%;
  position: absolute;
  z-index: 50;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 10px;

  background-color: gray;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30%;
    font-family: "Jua";
    text-align: center;
    font-size: 1.5em;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 30%;
  }
`;
const YesOrNoBox = styled(motion.div)`
  background-color: ${colors.color.royalblue};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;

  width: 40%;
  height: 80%;

  font-family: "Jua";
  text-align: center;
  font-size: 1.3em;
`;
const yesOrNoOptionVariants = {
  initial: {
    boxShadow: "none",
  },
  hover: {
    scale: 1.1,
    boxShadow: "0 0 10px 5px royalblue, 0 0 2px 1px white inset",
  },
  click: {
    scale: 1,
  },
};

function SpreadStep(props) {
  const onRestartHandler = props.onRestartHandler;
  const modeNumber = props.modeNumber;
  let userSetNumber = props.userSetNumber;
  let setUserSetNumber = props.setUserSetNumber;
  let userWannaSeePreCard = props.userWannaSeePreCard;
  let [dragCardNumArr, setDragCardNumArr] = useState(new Array(userSetNumber));
  let previewNumbers = props.previewNumbers;
  const selectedDeckZoneRef = useRef(null);
  const defaultTempObjData = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  };
  const [selectedZonePosInfo, setSelectedZonePosInfo] =
    useState(defaultTempObjData);
  const [optionBoxInfo, setOptionBoxInfo] = useState(defaultTempObjData);

  const mainBox = useRef(null);
  const optionBox = useRef(null);
  const allContainer = useRef(null);
  const [refArr, setRefArr] = useState([allContainer, mainBox]);

  let [newDragArea, setNewDragArea] = useState();

  let _tempChildClickArr = new Array(userSetNumber);
  _tempChildClickArr.fill({
    isThisCardClicked: false,
    setIsThisCardClicked: null,
    isFliped: false,
    setIsFliped: null,
    isInSpreadZone: false,
    currentCardState: "rotateFalse",
    isThisCardHide: false, // Hide 테스트
    setIsThisCardHide: null, // Hide 테스트
  });
  let [childCardStateArr, setChildCardStateArr] = useState(_tempChildClickArr);
  let childCardStateArrController = {
    childCardStateArr,
    setChildCardStateArr,
  };

  // 새로운 z인덱스 컨트롤
  const [indexCount, setIndexCount] = useState(10);
  const indexCountController = {
    indexCount,
    setIndexCount,
  };
  const [isInCount, setIsInCount] = useState(userSetNumber); // 남은 카드 수량
  const isInCounter = {
    isInCount,
    setIsInCount,
  };
  const [activeFlipBtn, setActiveFlipBtn] = useState(true);
  const [totalCount, setTotalCount] = useState(userSetNumber); // 총 카드 수량
  const totalCounter = {
    totalCount,
    setTotalCount,
  };
  // Optional Control
  const [isActiveOptionCurtain, setIsActiveOptionCurtain] = useState(false);
  const [optionType, setOptionType] = useState(0); // 0 : none, 1 : restart, 2 : Extra, 3 : Capture 4: Find
  let [isActiveCurtain, setActiveCurtain] = useState(true);

  //Find
  const [isClickedFind, setClickedFind] = useState(false);
  const [findStateArr, setFindStateArr] = useState(null);
  const [findCardImage, setCardImage] = useState(100);
  const [findImageType, setFindImageType] = useState("T");
  const [selectImageType, setSelectImageType] = useState("T");
  const [whatMode, setWhatMode] = useState(false); // false: zoom, true: find

  const [selectFindImageNum, setSelectFindImageNum] = useState(100);
  const [selectFindCardName, setSelectFindCardName] = useState(null);

  const [customFileName, setCustomFileName] = useState("");
  const findCardControl = {
    findCardImage,
    setCardImage,
  };
  const whatModeControl = {
    whatMode,
    setWhatMode,
  };
  const cardNameArr = [
    "THE FOOL",
    "THE MAGICIAN",
    "THE HIGH PRIESTESS",
    "THE EMPRESS",
    "THE EMPEROR",
    "THE HIEROPHANT",
    "THE LOVERS",
    "THE CHARIOT",
    "STRENGTH",
    "THE HERMIT",
    "THE WHEEL OF FORTUNE",
    "JUSTICE",
    "THE HANGED MAN",
    "DEATH",
    "TEMPERANCE",
    "THE DEVIL",
    "THE TOWER",
    "THE STAR",
    "THE MOON",
    "THE SUN",
    "JUDGEMENT",
    "THE WORLD",
    "WAND 1",
    "WAND 2",
    "WAND 3",
    "WAND 4",
    "WAND 5",
    "WAND 6",
    "WAND 7",
    "WAND 8",
    "WAND 9",
    "WAND 10",
    "PAGE OF WANDS",
    "KNIGHT OF WANDS",
    "QUEEN OF WANDS",
    "KING OF WANDS",
    "SWORD 1",
    "SWORD 2",
    "SWORD 3",
    "SWORD 4",
    "SWORD 5",
    "SWORD 6",
    "SWORD 7",
    "SWORD 8",
    "SWORD 9",
    "SWORD 10",
    "PAGE OF SWORDS",
    "KNIGHT OF SWORDS",
    "QUEEN OF SWORDS",
    "KING OF SWORDS",
    "CUP 1",
    "CUP 2",
    "CUP 3",
    "CUP 4",
    "CUP 5",
    "CUP 6",
    "CUP 7",
    "CUP 8",
    "CUP 9",
    "CUP 10",
    "PAGE OF CUPS",
    "KNIGHT OF CUPS",
    "QUEEN OF CUPS",
    "KING OF CUPS",
    "PENTACLE 1",
    "PENTACLE 2",
    "PENTACLE 3",
    "PENTACLE 4",
    "PENTACLE 5",
    "PENTACLE 6",
    "PENTACLE 7",
    "PENTACLE 8",
    "PENTACLE 9",
    "PENTACLE 10",
    "PAGE OF PENTACLES",
    "KNIGHT OF PENTACLES",
    "QUEEN OF PENTACLES",
    "KING OF PENTACLES",
  ];
  const lenormandNameArr = [
    "1 RIDER",
    "2 CLOVER",
    "3 SHIP",
    "4 HOUSE",
    "5 TREE",
    "6 CLOUD",
    "7 SNAKE",
    "8 COFFIN",
    "9 BOUQUET",
    "10 SCYTHE",
    "11 WHIP",
    "12 BIRDS",
    "13 CHILD",
    "14 FOX",
    "15 BEAR",
    "16 STARS",
    "17 STORK",
    "18 DOG",
    "19 TOWER",
    "20 GARDEN",
    "21 MOUNTAIN",
    "22 PATHS",
    "23 MICE",
    "24 HEART",
    "25 RING",
    "26 BOOK",
    "27 LETTER",
    "28 MAN",
    "29 LADY",
    "30 LILY",
    "31 SUN",
    "32 MOON",
    "33 KEY",
    "34 FISH",
    "35 ANCHOR",
    "36 CROSS",
  ];
  const ichingNameArr = [
    "중천건", //0
    "중지곤", //1
    "수뢰둔", //2
    "산수몽", //3
    "수천수", //4
    "천수송", //5
    "지수사", //6
    "수지비", //7

    "풍천소축", //8
    "천택리", //9
    "지천태", //10
    "천지비", //11
    "천화동인", //12
    "화천대유", //13
    "지산겸", //14
    "뇌지예", //15

    "택뢰수", //16
    "산풍고", //17
    "지택림", //18
    "풍지관", //19
    "화뢰서합", //20
    "산화비", //21
    "산지박", //22
    "지뢰복", //23

    "천뢰무망", //24
    "산천대축", //25
    "산뢰이", //26
    "택풍대과", //27
    "중수감", //28
    "중화리", //29
    "택산함", //30
    "뇌풍항", //31

    "천산돈", //32
    "뇌천대장", //33
    "화지진", //34
    "지화명이", //35
    "풍화가인", //36
    "화택규", //37
    "수산건", //38
    "뇌수해", //39

    "산택손", //40
    "풍뢰익", //41
    "택천쾌", //42
    "천풍구", //43
    "택지췌", //44
    "지풍승", //45
    "택수곤", //46
    "수풍정", //47

    "택화혁", //48
    "화풍정", //49
    "중뢰진", //50
    "중산간", //51
    "풍산점", //52
    "뇌택귀매", //53
    "뇌화풍", //54
    "화산려", //55

    "중풍손", //56
    "중택태", //57
    "풍수환", //58
    "수택절", //59
    "풍택중부", //60
    "뇌산소과", //61
    "수화기제", //62
    "화수미제", //63
  ];
  const [findCardName, setFindCardName] = useState();
  const [findCardType, setFindCardType] = useState(10);
  const [selectedTypeArr, setSelectedTypeArr] = useState([]);

  const [isSemiHover, setSemiHover] = useState(false);
  const [isSemiHoverNum, setIsSemiHoverNum] = useState(100);
  const [choiceSemiNumClick, setChoiceSemiNumClick] = useState(100);

  const [isClickedCapture, setClickedCapture] = useState(false);

  const [imgTypeArr, setImgTypeArr] = useState(new Array(userSetNumber));
  const imgTypeControler = {
    imgTypeArr,
    setImgTypeArr,
  };
  const [isClickedHide, setClickedHide] = useState(false);
  const [hideInfoArr, setHideInfoArr] = useState([]);
  const hideInfoArrController = {
    hideInfoArr,
    setHideInfoArr,
  };
  const [hideBtnOnOffArr, setHideBtnOnOffArr] = useState([false]);
  const hideBtnOnOffArrController = {
    hideBtnOnOffArr,
    setHideBtnOnOffArr,
  };
  const [isClickedLenormandTotal, setIsClickedLenormandTotal] = useState(false); // 35?
  const isClickedLenormandTotalController = {
    isClickedLenormandTotal,
    setIsClickedLenormandTotal,
  };
  let lenormandTotalTempArr = new Array(36);
  lenormandTotalTempArr.fill(0);
  const [lenormandTotalIdx, setLenormandTotalIdx] = useState(
    lenormandTotalTempArr
  );
  const lenormandTotalIdxController = {
    lenormandTotalIdx,
    setLenormandTotalIdx,
  };
  useEffect(() => {
    // 오프닝 커튼
    setTimeout(() => {
      setActiveCurtain(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (modeNumber !== 0) {
      setIsInCount(0);
    }
  }, [modeNumber]);
  useEffect(() => {
    let temp = new Array(userSetNumber);
    temp.fill("T");
    setImgTypeArr(temp);
  }, [userSetNumber]);

  useEffect(() => {
    // Hide Test
    let _arr = [];
    let _temp = {
      deckNumber: 0,
      deckName: "FIRST SPREAD - TAROT",
      cardType: "TAROT",
      cardCount: userSetNumber,
      cardFirstIdx: 0,
      cardLastIdx: userSetNumber - 1,
    };
    _arr.push(_temp);
    setHideInfoArr(_arr);
  }, [userSetNumber]);

  useEffect(() => {
    const temp = optionBox.current.getBoundingClientRect();
    const _temp = {
      width: temp.width,
      height: temp.height,
    };
    setOptionBoxInfo(_temp);
  }, []);
  useEffect(() => {
    let tempArea = mainBox.current.getBoundingClientRect();
    const _newDragArea = {
      left: tempArea.left,
      width: tempArea.width,
      top: tempArea.top,
      hegiht: tempArea.height,
      x: tempArea.x,
      y: tempArea.y,
      right: tempArea.right,
      bottom: tempArea.bottom,
    };
    setNewDragArea(_newDragArea);

    let _dragCardNumArr = new Array(userSetNumber);
    for (let i = 0; i < _dragCardNumArr.length; i++) {
      _dragCardNumArr[i] = props.selectedImgNumArr[i];
    }
    let tempArr = _dragCardNumArr.reverse();
    setDragCardNumArr(tempArr);
  }, [props.selectedImgNumArr, userSetNumber]); // 에러 테스트 22.08.04

  useEffect(() => {
    const _tempSelectedZone =
      selectedDeckZoneRef.current.getBoundingClientRect();
    //console.log(_tempSelectedZone);
    const _selectedZone = {
      x: _tempSelectedZone.x,
      y: _tempSelectedZone.y,
      width: _tempSelectedZone.width,
      height: _tempSelectedZone.height,
      left: _tempSelectedZone.left,
      top: _tempSelectedZone.top,
      right: _tempSelectedZone.right,
      bottom: _tempSelectedZone.bottom,
    };
    setSelectedZonePosInfo(_selectedZone);
  }, []);

  const cardFlipHandler_test = () => {
    for (let i = 0; i < childCardStateArr.length; i++) {
      if (childCardStateArr[i].isInSpreadZone === false) {
        continue;
      } else if (childCardStateArr[i].isInSpreadZone === true) {
        childCardStateArr[i].setIsFliped(true);
      }
    }
  };
  const selectedTypeHandler = (type) => {
    let tempArr = [];
    switch (type) {
      case 0:
        for (let i = 0; i < 22; i++) {
          // Major
          tempArr.push(cardNameArr[i]);
        }
        setSelectedTypeArr(tempArr);
        setFindCardType(0);
        break;
      case 1:
        for (let i = 22; i < 36; i++) {
          // Wand
          tempArr.push(cardNameArr[i]);
        }
        setSelectedTypeArr(tempArr);
        setFindCardType(1);
        break;
      case 2:
        for (let i = 36; i < 50; i++) {
          // Sword
          tempArr.push(cardNameArr[i]);
        }
        setSelectedTypeArr(tempArr);
        setFindCardType(2);
        break;
      case 3:
        for (let i = 50; i < 64; i++) {
          // Cup
          tempArr.push(cardNameArr[i]);
        }
        setSelectedTypeArr(tempArr);
        setFindCardType(3);
        break;
      case 4:
        for (let i = 64; i < 78; i++) {
          // Pentacle
          tempArr.push(cardNameArr[i]);
        }
        setSelectedTypeArr(tempArr);
        setFindCardType(4);
        break;
      default:
        return;
    }
  };

  const onCaptureHandler = () => {
    //e.preventDefault();
    //console.log('capture test');
    let tempName;
    if (customFileName === "") {
      tempName = "image-download.png";
    } else {
      tempName = `${customFileName}.png`;
    }
    console.log(tempName);
    html2canvas(document.getElementById("TarotContainerDraggable")).then(
      (canvas) => {
        onSaveAs(canvas.toDataURL("image/png"), tempName);
      }
      //"image-download.png"
    );
  };
  const onSaveAs = (uri, filename) => {
    //console.log('onSaveAs');
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    //link.style.zIndex = "1000";
    //link.style.position = "absolute";
    //console.dir(link);
    link.click();
    document.body.removeChild(link);
    //window.location.reload();
  };

  // const submitBtnOnOffInfo = () => {
  //     props.hideBtnOnOffArrController.setHideBtnOnOffArr(btnControlArr);
  //     // childCardStateArr 변경
  //     let _childCardStateArr =
  //     props.childCardStateArrController.childCardStateArr;

  //     let firstIdx;
  //     let lastIdx;
  //     for(let i = 0; i < btnControlArr.length; i++){

  //         if(btnControlArr[i] === true){ // Hide
  //             firstIdx = hideInfoArr[i].cardFirstIdx;
  //             lastIdx = hideInfoArr[i].cardLastIdx;
  //             for(let j = firstIdx; j < lastIdx + 1; j++){
  //                 props.childCardStateArrController.childCardStateArr[j].setIsThisCardHide(true);
  //                 _childCardStateArr[j].isThisCardHide = true;
  //             }

  //         }
  //         else if(btnControlArr[i] === false){ // Seek
  //             firstIdx = hideInfoArr[i].cardFirstIdx;
  //             lastIdx = hideInfoArr[i].cardLastIdx;
  //             for(let j = firstIdx; j < lastIdx + 1; j++){
  //                 props.childCardStateArrController.childCardStateArr[j].setIsThisCardHide(false);
  //                 _childCardStateArr[j].isThisCardHide = false;
  //             }
  //         }
  //     }
  //     props.childCardStateArrController.setChildCardStateArr(_childCardStateArr);
  // }
  return (
    <>
      <SpreadContainer ref={allContainer} id="TarotContainerDraggable">
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <MainSpreadBox ref={mainBox}>
            <MainSpreadZone
              modeNumber={modeNumber}
              userSetNumber={userSetNumber}
              userWannaSeePreCard={userWannaSeePreCard}
              dragCardNumArr={dragCardNumArr}
              selectedImgNumAr={props.selectedImgNumArr}
              selectedZonePosInfo={selectedZonePosInfo}
              optionBoxInfo={optionBoxInfo}
              refArr={refArr}
              childCardStateArrController={childCardStateArrController}
              indexCountController={indexCountController}
              newDragArea={newDragArea}
              isInCounter={isInCounter}
              cardNameArr={cardNameArr}
              findCardControl={findCardControl}
              setFindCardName={setFindCardName}
              whatModeControl={whatModeControl}
              isClickedFind={isClickedFind}
              previewNumbers={previewNumbers}
              isActiveCurtain={isActiveCurtain}
              imgTypeControler={imgTypeControler}
              lenormandNameArr={lenormandNameArr}
              ichingNameArr={ichingNameArr}
              setFindImageType={setFindImageType}
              isClickedLenormandTotalController={
                isClickedLenormandTotalController
              }
              lenormandTotalIdx={lenormandTotalIdx}
            ></MainSpreadZone>
          </MainSpreadBox>
          <OptionSpreadBox ref={optionBox}>
            <OptionSpreadDeckBox>
              <DeckZone>
                <OptionSpreadDragBox
                  ref={selectedDeckZoneRef}
                ></OptionSpreadDragBox>
                <OptionSpreadDragBox>
                  <ExtraCardBox
                    imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCard/DefaultImages/RequestBackOfCard.png`}
                    variants={extraBtnVariants}
                    whileHover={isInCount !== 0 ? "" : "hover"}
                    whileTap={isInCount !== 0 ? "" : "click"}
                    animate={isInCount !== 0 ? "deactivate" : "activate"}
                    style={
                      isInCount !== 0
                        ? { cursor: "auto" }
                        : { cursor: "pointer" }
                    }
                    onClick={() => {
                      if (isInCount === 0) {
                        setIsActiveOptionCurtain(true);
                        setTimeout(() => {
                          // setOptionType(2); 기존 코드
                          // 테스트용 코드
                          setOptionType(5);
                        }, 1000);
                      }
                    }}
                  />
                </OptionSpreadDragBox>
              </DeckZone>
            </OptionSpreadDeckBox>
            <OptionSpreadCount>
              <div>
                <div>
                  <span>카드 전체수</span>
                  <span>{totalCount}</span>
                </div>
                <div>
                  <span>남은 수</span>
                  <span>{isInCount}</span>
                </div>
              </div>
            </OptionSpreadCount>
            <OptionSpreadBtnBox>
              <div>
                <OptionBtn
                  variants={optionBtnVariants}
                  whileHover={isInCount === 0 ? "hover" : ""}
                  whileTap={isInCount === 0 ? "click" : ""}
                  style={
                    isInCount === 0
                      ? {
                          opacity: 1,
                          transition: `opacity 1s ease-in-out`,
                          cursor: "pointer",
                        }
                      : {
                          opacity: 0.5,
                          transition: `opacity 1s ease-in-out`,
                          cursor: "auto",
                        }
                  }
                >
                  <button
                    style={
                      isInCount === 0
                        ? {
                            opacity: 1,
                            transition: `opacity 1s ease-in-out`,
                            cursor: "pointer",
                          }
                        : {
                            opacity: 0.5,
                            transition: `opacity 1s ease-in-out`,
                            cursor: "auto",
                          }
                    }
                    onClick={() => {
                      if (isInCount === 0) {
                        setIsActiveOptionCurtain(true);
                        setTimeout(() => {
                          setOptionType(1);
                        }, 1000);
                      }
                    }}
                  >
                    Restart
                  </button>
                </OptionBtn>
                <OptionBtn
                  variants={optionBtnVariants}
                  whileHover="hover"
                  whileTap="click"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <button
                    onClick={() => {
                      setClickedHide(!isClickedHide);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Hide
                  </button>
                </OptionBtn>
                <OptionBtn
                  variants={optionBtnVariants}
                  whileHover="hover"
                  whileTap="click"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <button
                    onClick={() => {
                      setClickedFind(!isClickedFind);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* Find & Zoom */}
                    Find
                  </button>
                </OptionBtn>
                <OptionBtn
                  variants={optionBtnVariants}
                  whileHover={
                    activeFlipBtn === true && isInCount !== totalCount
                      ? "hover"
                      : ""
                  }
                  whileTap={
                    activeFlipBtn === true && isInCount !== totalCount
                      ? "click"
                      : ""
                  }
                  style={
                    activeFlipBtn === true && isInCount !== totalCount
                      ? {
                          opacity: 1,
                          transition: `opacity 1s ease-in-out`,
                          cursor: "pointer",
                        }
                      : {
                          opacity: 0.5,
                          transition: `opacity 1s ease-in-out`,
                          cursor: "auto",
                        }
                  }
                >
                  <button
                    onClick={() => {
                      if (activeFlipBtn === true) {
                        //&& isInCount !== totalCount)
                        cardFlipHandler_test();
                      }
                    }}
                    style={
                      activeFlipBtn === true && isInCount !== totalCount
                        ? {
                            opacity: 1,
                            transition: `opacity 1s ease-in-out`,
                            cursor: "pointer",
                          }
                        : {
                            opacity: 0.5,
                            transition: `opacity 1s ease-in-out`,
                            cursor: "auto",
                          }
                    }
                  >
                    Flip
                  </button>
                </OptionBtn>
                <OptionBtn
                  variants={optionBtnVariants}
                  // whileHover={
                  //   isInCount === 0 && isClickedCapture === false ? "hover" : ""
                  // }
                  // whileTap={
                  //   isInCount === 0 && isClickedCapture === false ? "click" : ""
                  // }
                  whileHover={isInCount === 0 ? "hover" : ""}
                  whileTap={isInCount === 0 ? "click" : ""}
                  // style={
                  //   isInCount === 0 && isClickedCapture === false
                  //     ? {
                  //         opacity: 1,
                  //         transition: `opacity 1s ease-in-out`,
                  //         cursor: "pointer",
                  //       }
                  //     : {
                  //         opacity: 0.5,
                  //         transition: `opacity 1s ease-in-out`,
                  //         cursor: "auto",
                  //       }
                  // }
                  style={{
                    opacity: 1,
                    transition: `opacity 1s ease-in-out`,
                    cursor: "pointer",
                  }}
                >
                  <button
                    onClick={() => {
                      // if (isInCount === 0 && isClickedCapture === false) {
                      //   setIsActiveOptionCurtain(true);
                      //   setClickedFind(false);
                      //   setTimeout(() => {
                      //     setOptionType(3);
                      //   }, 1000);
                      // }
                      if (isInCount === 0) {
                        setIsActiveOptionCurtain(true);
                        setClickedFind(false);
                        setTimeout(() => {
                          setOptionType(3);
                        }, 1000);
                      }
                    }}
                    // style={
                    //   isInCount === 0 && isClickedCapture === false
                    //     ? {
                    //         opacity: 1,
                    //         transition: `opacity 1s ease-in-out`,
                    //         cursor: "pointer",
                    //       }
                    //     : {
                    //         opacity: 0.5,
                    //         transition: `opacity 1s ease-in-out`,
                    //         cursor: "auto",
                    //       }
                    // }
                    style={{
                      opacity: 1,
                      transition: `opacity 1s ease-in-out`,
                      cursor: "pointer",
                    }}
                  >
                    Capture
                  </button>
                </OptionBtn>
              </div>
            </OptionSpreadBtnBox>
          </OptionSpreadBox>
          {isActiveCurtain === true ? ( // curtain
            <SpreadCurtain />
          ) : null}
        </div>
        {isClickedFind === true ? (
          <Find
            refArr={refArr}
            findStateArr={findStateArr} //
            setFindStateArr={setFindStateArr} //
            findCardImage={findCardImage} //
            findCardName={findCardName} //
            whatModeControl={whatModeControl} //
            setIsActiveOptionCurtain={setIsActiveOptionCurtain}
            isActiveOptionCurtain={isActiveOptionCurtain}
            setOptionType={setOptionType}
            selectFindImageNum={selectFindImageNum} //
            selectFindCardName={selectFindCardName} //
            ichingNameArr={ichingNameArr}
            findImageType={findImageType}
            selectImageType={selectImageType}
          />
        ) : null}
        {isClickedHide === true ? (
          <HideAndSeek
            refArr={refArr}
            setClickedHide={setClickedHide}
            hideInfoArrController={hideInfoArrController}
            hideBtnOnOffArrController={hideBtnOnOffArrController}
            childCardStateArrController={childCardStateArrController}
          />
        ) : null}
      </SpreadContainer>
      <>
        {isActiveOptionCurtain === true ? (
          <OptionFadeCurtain
            variants={optionFadeVariants}
            animate={isActiveOptionCurtain === true ? "fadeIn" : ""}
          >
            <>
              {optionType === 1 ? ( // Restart
                <OptionContainer>
                  <span>현재 타로를 중단하고 새로 시작하시겠습니까?</span>
                  <div>
                    <YesOrNoBox
                      variants={yesOrNoOptionVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        onRestartHandler();
                      }}
                    >
                      Yes
                    </YesOrNoBox>
                    <YesOrNoBox
                      variants={yesOrNoOptionVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        setIsActiveOptionCurtain(false);
                        setOptionType(0);
                      }}
                    >
                      No
                    </YesOrNoBox>
                  </div>
                </OptionContainer>
              ) : null}
              {optionType === 2 ? ( // Extra
                <MakeExtraDeck
                  setUserSetNumber={setUserSetNumber}
                  setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                  setOptionType={setOptionType}
                  setDragCardNumArr={setDragCardNumArr}
                  dragCardNumArr={dragCardNumArr}
                  isInCounter={isInCounter}
                  totalCounter={totalCounter}
                  imgTypeControler={imgTypeControler}
                  hideInfoArrController={hideInfoArrController}
                  hideBtnOnOffArrController={hideBtnOnOffArrController}
                ></MakeExtraDeck>
              ) : null}
              {optionType === 3 ? ( // Capture
                <OptionContainer>
                  <span>현재 스프레드를 저장하시겠습니까?</span>
                  <CaptureName
                    value={customFileName}
                    onChange={(e) => {
                      setCustomFileName(e.target.value);
                    }}
                    placeholder="파일 이름을 입력하세요"
                  />
                  <div>
                    <YesOrNoBox
                      variants={yesOrNoOptionVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="click"
                      onClick={(e) => {
                        setClickedCapture(true);
                        setOptionType(0);
                        setIsActiveOptionCurtain(false);
                        setTimeout(() => {
                          onCaptureHandler();
                        }, 1000);
                      }}
                    >
                      Yes
                    </YesOrNoBox>
                    <YesOrNoBox
                      variants={yesOrNoOptionVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        setIsActiveOptionCurtain(false);
                        setOptionType(0);
                        setCustomFileName("");
                      }}
                    >
                      No
                    </YesOrNoBox>
                  </div>
                </OptionContainer>
              ) : null}
              {optionType === 10 ? (
                <FindSelectCard
                  setOptionType={setOptionType}
                  setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                  setSelectFindImageNum={setSelectFindImageNum}
                  setSelectImageType={setSelectImageType}
                  setWhatMode={setWhatMode}
                  setSelectFindCardName={setSelectFindCardName}
                />
              ) : null}
              {optionType === 4 ? ( // Find
                <SelectCardBox>
                  <SelectMenuBox>
                    <SelectCardTypeBtn
                      variants={selectCardTypeVar}
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        selectedTypeHandler(0);
                      }}
                    >
                      MAJOR
                    </SelectCardTypeBtn>
                    <SelectCardTypeBtn
                      variants={selectCardTypeVar}
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        selectedTypeHandler(1);
                      }}
                    >
                      WAND
                    </SelectCardTypeBtn>
                    <SelectCardTypeBtn
                      variants={selectCardTypeVar}
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        selectedTypeHandler(2);
                      }}
                    >
                      SWORD
                    </SelectCardTypeBtn>
                    <SelectCardTypeBtn
                      variants={selectCardTypeVar}
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        selectedTypeHandler(3);
                      }}
                    >
                      CUP
                    </SelectCardTypeBtn>
                    <SelectCardTypeBtn
                      variants={selectCardTypeVar}
                      whileHover="hover"
                      whileTap="click"
                      onClick={() => {
                        selectedTypeHandler(4);
                      }}
                    >
                      PENTACLE
                    </SelectCardTypeBtn>
                  </SelectMenuBox>
                  <SelectSemiTypeBox>
                    {findCardType !== 10
                      ? selectedTypeArr.map((a, i) => {
                          let tempNum = 0;
                          switch (findCardType) {
                            case 0:
                              tempNum = i;
                              break;
                            case 1:
                              tempNum = 22 + i;
                              break;
                            case 2:
                              tempNum = 36 + i;
                              break;
                            case 3:
                              tempNum = 50 + i;
                              break;
                            case 4:
                              tempNum = 64 + i;
                              break;
                            default:
                              break;
                          }
                          return (
                            <SemiTypeBtn
                              key={"semiTypeBtn_" + i}
                              imgnum={tempNum}
                              variants={selectCardTypeVar}
                              whileHover="hover"
                              whileTap="click"
                              onClick={() => {
                                setChoiceSemiNumClick(tempNum);
                              }}
                              onHoverStart={() => {
                                setSemiHover(true);
                                setIsSemiHoverNum(tempNum);
                              }}
                              onHoverEnd={() => {
                                setSemiHover(false);
                                setIsSemiHoverNum(100);
                              }}
                            >
                              {a}
                            </SemiTypeBtn>
                          );
                        })
                      : null}
                  </SelectSemiTypeBox>
                  <SelectOptionMenuBox>
                    <OptionPreviewChoiceSpanBox>
                      <span>Preview</span>
                      <span>Your Choice</span>
                    </OptionPreviewChoiceSpanBox>
                    <div>
                      <SelectOptionImageBox
                        imgsrc={
                          isSemiHover !== false
                            ? `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${isSemiHoverNum}.png`
                            : ""
                        }
                      />
                      <SelectOptionImageBox
                        imgsrc={
                          choiceSemiNumClick !== 100
                            ? `${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${choiceSemiNumClick}.png`
                            : ""
                        }
                      />
                    </div>

                    <SelectOptionBtnBox>
                      <SelectOptionBtn
                        variants={optionBtnVar}
                        whileHover={choiceSemiNumClick !== 100 ? "hover" : ""}
                        whileTap={choiceSemiNumClick !== 100 ? "click" : ""}
                        style={
                          choiceSemiNumClick === 100
                            ? {
                                cursor: "auto",
                                opacity: 0.5,
                              }
                            : {
                                cursor: "pointer",
                                opacity: 1,
                              }
                        }
                        onClick={() => {
                          if (choiceSemiNumClick !== 100) {
                            let temp = choiceSemiNumClick;
                            setSelectFindImageNum(temp);
                            setSelectFindCardName(cardNameArr[temp]);
                            setOptionType(0);
                            setIsActiveOptionCurtain(false);
                            setChoiceSemiNumClick(100);
                            setSelectedTypeArr([]);
                            setFindCardType(10);
                            setWhatMode(true);
                          }
                        }}
                      >
                        CHOICE
                      </SelectOptionBtn>
                      <SelectOptionBtn
                        variants={optionBtnVar}
                        whileHover="hover"
                        whileTap="click"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setOptionType(0);
                          setIsActiveOptionCurtain(false);
                          setChoiceSemiNumClick(100);
                          setSelectedTypeArr([]);
                          setFindCardType(10);
                        }}
                      >
                        BACK
                      </SelectOptionBtn>
                    </SelectOptionBtnBox>
                  </SelectOptionMenuBox>
                </SelectCardBox>
              ) : null}
              {optionType === 5 ? ( // Select Extra mode
                <SelectExtraMode
                  setOptionType={setOptionType}
                  setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                  isClickedLenormandTotal={isClickedLenormandTotal}
                ></SelectExtraMode>
              ) : null}
              {optionType === 6 ? ( // Lenormand
                <ExtraLenorMand
                  setOptionType={setOptionType}
                  imgTypeControler={imgTypeControler}
                  dragCardNumArr={dragCardNumArr}
                  setDragCardNumArr={setDragCardNumArr}
                  setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                  isInCounter={isInCounter}
                  totalCounter={totalCounter}
                  hideInfoArrController={hideInfoArrController}
                  hideBtnOnOffArrController={hideBtnOnOffArrController}
                  childCardStateArr={childCardStateArr}
                  isClickedLenormandTotalController={
                    isClickedLenormandTotalController
                  }
                  lenormandTotalIdxController={lenormandTotalIdxController}
                />
              ) : null}
              {optionType === 7 ? ( // IChing
                <ExtraIChing
                  setOptionType={setOptionType}
                  setIsActiveOptionCurtain={setIsActiveOptionCurtain}
                  dragCardNumArr={dragCardNumArr}
                  setDragCardNumArr={setDragCardNumArr}
                  isInCounter={isInCounter}
                  totalCounter={totalCounter}
                  imgTypeControler={imgTypeControler}
                  hideInfoArrController={hideInfoArrController}
                  hideBtnOnOffArrController={hideBtnOnOffArrController}
                />
              ) : null}
            </>
          </OptionFadeCurtain>
        ) : null}
      </>
    </>
  );
}

export default SpreadStep;
