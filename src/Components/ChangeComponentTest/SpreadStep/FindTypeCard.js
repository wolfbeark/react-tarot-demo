
import React, {useState, useEffect, useMemo} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

import{
    HorizontalContainer,
    VerticalContainer,
} from '../../CustomStyles'

import {
    fonts,
    colors,
} from '../../theme'

const FindTypeCardContainer = styled(HorizontalContainer)`

    width: 100%;
    height: 100%;
    background-color: ${colors.color.gray};
    //border-radius: 10px;
    justify-content: space-between;
`
const SelectOptionMenuBox = styled(VerticalContainer)`
    width: 32%;
    height: 90%;
    background-color: beige;
    border-radius: 10px;
    
    justify-content: space-evenly;
    margin: 0 1%;
    &:first-child{
        width: 20%;
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
    &:last-child{
        width: 30%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        
        & > div:nth-child(2){
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            height: 45%;
        }
    }
    
    
`
const SelectCardTypeBtn = styled(motion.button)`
    outline: unset;
    border: none;
    width: 80%;
    height: 12%;
    min-height: 12%;
    max-height: 12%;
    background-color: gray;

    margin-bottom: 2%;
    font-family: "Jua";
    font-weight: 600;
    font-size: 1.2em;
    border-radius: 10px;

    cursor: pointer;
`
const SelectSemiTypeBox = styled(motion.div)`
    width: 50%;
    height: 90%;
    background-color: beige;
    border-radius: 10px;


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
`
const SemiTypeBtn = styled(motion.button)`
    outline: unset;
    border: none;
    width: 80%;
    height: 40%;
    min-height: 10%;
    max-height: 10%;
    background-color: gray;

    margin-bottom: 5%;
    font-family: "Jua";
    font-weight: 600;
    font-size: 1em;
    border-radius: 5px;

    cursor: pointer;
`
const OptionPreviewChoiceSpanBox = styled(HorizontalContainer)`
    width: 100%;
    height: 5%;
    justify-content: space-evenly;
    background-color: red;

    & span{
        font-family: "Jua";
        font-size: 1.2em;
        font-weight: 600;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 45%;
    }
`
const SelectOptionImageBox = styled(motion.div)`
    width: 45%;
    height: 100%;
    border-radius: 10px;
    background-color: lemonchiffon;
    background-image: url(${(props) => props.imgsrc});
    background-size: 100% 100%; 
    box-shadow: 0 0 10px 5px gray;
    
`
const SelectOptionBtnBox = styled(motion.div)`
    width: 100%;
    height: 35%;
    //background-color: seagreen;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
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
`
const optionBtnVar = {
    hover:{
        scale: 1.05,
        boxShadow: '0 0 10px 5px burlywood',
    },
    click:{
        scale: 0.9,
    }
}

function FindTypeCard(props) {

    let selectMenuNum = props.oracleType;
    let setSelectMenuNum =props.setSelectMenuNum;
    let setSelectFindImageNum = props.setSelectFindImageNum;
    let setSelectImageType = props.setSelectImageType;
    let setWhatMode = props.setWhatMode;
    let setIsActiveOptionCurtain = props.setIsActiveOptionCurtain;
    let setOptionType = props.setOptionType;
    let setSelectFindCardName = props.setSelectFindCardName;

    const [selectedMenuType, setSelectedMenuType] = useState(selectMenuNum);
    const [isClickedTypeMenu, setIsClickedTypeMenu] = useState(false);
    const [typeMenuArr, setTypeMenuArr] = useState([]);
    const [semiTypeArr, setSemiTypeArr] = useState([]);
    const [semiTypeNum, setSemiTypeNum] = useState(10);

    const [childSemiHover, setChildSemiHover] = useState(false);
    const [childIsSemiHoverNum, setChildIsSemiHoverNum] = useState(100);
    const [childSemiNumClick, setChildSemiNumClick] = useState(100);

    const [imgRoute, setImgRoute] = useState();
    const [tempCardName, setTempCardName] = useState(null);

    

    const tarotMenuNameArr = [
        "MAJOR",
        "WAND",
        "SWORD",
        "CUP",
        "PENTACLE"
    ];
    const lenorMenuNameArr = [
        "1 - 10",
        "11 - 20",
        "21 - 30",
        "31 - 36"
    ];
    const ichingMenuNameArr = [
        "1 - 10",
        "11 - 20",
        "21 - 30",
        "31 - 40",
        "41 - 50",
        "51 - 60",
        "61 - 64",
    ];
    const pokerMenuNameArr = [
        "JOKER",
        "SPADE",
        "HEART",
        "DIAMOND",
        "CLOVER"
    ];

    const semiTarotNameArr = [
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
    const semiLenormandNameArr = [
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
        "36 CROSS"
    ];
    const semiIchingNameArr = [
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
    const semiPokerNameArr = [
        "RED JOKER",
        "BLACK JOKER",

        "TWO OF SPADES",
        "THREE OF SPADES",
        "FOUR OF SPADES",
        "FIVE OF SPADES",
        "SIX OF SPADES",
        "SEVEN OF SPADES",
        "EIGHT OF SPADES",
        "NINE OF SPADES",
        "TEN OF SPADES",
        "JACK OF SPADES",
        "QUEEN OF SPADES",
        "KING OF SPADES",
        "ACE OF SPADE",

        "TWO OF HEARTS",
        "THREE OF HEARTS",
        "FOUR OF HEARTS",
        "FIVE OF HEARTS",
        "SIX OF HEARTS",
        "SEVEN OF HEARTS",
        "EIGHT OF HEARTS",
        "NINE OF HEARTS",
        "TEN OF HEARTS",
        "JACK OF HEARTS",
        "QUEEN OF HEARTS",
        "KING OF HEARTS",
        "ACE OF HEART",

        "TWO OF DIAMONDS",
        "THREE OF DIAMONDS",
        "FOUR OF DIAMONDS",
        "FIVE OF DIAMONDS",
        "SIX OF DIAMONDS",
        "SEVEN OF DIAMONDS",
        "EIGHT OF DIAMONDS",
        "NINE OF DIAMONDS",
        "TEN OF DIAMONDS",
        "JACK OF DIAMONDS",
        "QUEEN OF DIAMONDS",
        "KING OF DIAMONDS",
        "ACE OF DIAMOND", // 총 13장

        "TWO OF CLOVER",
        "THREE OF CLOVER",
        "FOUR OF CLOVER",
        "FIVE OF CLOVER",
        "SIX OF CLOVER",
        "SEVEN OF CLOVER",
        "EIGHT OF CLOVER",
        "NINE OF CLOVER",
        "TEN OF CLOVER",
        "JACK OF CLOVER",
        "QUEEN OF CLOVER",
        "KING OF CLOVER",
        "ACE OF CLOVER",

    ];

    const semiTotalNameArr = [
        semiTarotNameArr, 
        semiLenormandNameArr,
        semiIchingNameArr,
        semiPokerNameArr,
    ];

    
    useEffect(()=>{
        setSelectedMenuType(selectMenuNum);
        switch(selectMenuNum){
            case 0:
                setTypeMenuArr(tarotMenuNameArr);
                setImgRoute(`/images/ArcanaOfCard/DefaultImages/TotalImages/Default`)
            break;
            case 1:
                setTypeMenuArr(lenorMenuNameArr);
                setImgRoute(`/images/Lenormand/DefaultImages/Default_Lenormand`)
            break;
            case 2:
                setTypeMenuArr(ichingMenuNameArr);
                setImgRoute(`/images/IChing/iching`)
            break;
            case 3:
                setTypeMenuArr(pokerMenuNameArr);
            break;
            default:

            break;
        }
    }, [selectMenuNum])

    const settingImgIdx = (i) => { // setSelectFindCardName 해줘야함
        let _tempNum; // 이미지 넘버의 시작점
        let _result;
        //semiTypeNum // 0 Tarot 1 Lenor 2 IChing 3 Poker
        switch(selectMenuNum){ 
            case 0: // 타로면
                if(semiTypeNum === 0){ // 타로인데 메이저면
                    // 이미지 넘버의 시작을 0 으로
                    _tempNum = 0;
                }
                else if(semiTypeNum > 0){
                    if(semiTypeNum === 1){
                        _tempNum = 22;
                    }
                    else{
                        _tempNum = 22 + (14 * (semiTypeNum - 1));
                    }
                }
                _result = _tempNum + i;
                return _result;
            case 1: // Lenor
                if(semiTypeNum < 3){
                    if(semiTypeNum === 0){
                        _tempNum = 0;
                    }
                    else{
                        _tempNum = semiTypeNum * 10;
                    }
                    _result = _tempNum + i;
                }
                else if(semiTypeNum === 3){
                    _tempNum = 30;
                    _result = _tempNum + i;
                }
                return _result;
            case 2: // IChing
                if(semiTypeNum < 6){
                    if(semiTypeNum === 0){
                        _tempNum = 0;
                    }
                    else{
                        _tempNum = semiTypeNum * 10;
                    }
                    _result = _tempNum + i;            
                }
                else if(semiTypeNum === 6){
                    _tempNum = 60;
                    _result = _tempNum + i;
                }
                return _result;
            default:

            break;
        }
    }
    const settingSemiTypeArr = (deckType,_tempNum, _lastNum) => {

        let _temp = _tempNum;
        let _tempArr = [];
        for(let i = 0; i < _lastNum; i++){
            _tempArr.push(semiTotalNameArr[deckType][_temp]);
            _temp++;
        }
        return _tempArr;
    }
    const semiTypeSetting = (num) => {
        let _tempNum = 0;
        let _tempArr = [];
        let _lastNum = 0;
        switch(selectMenuNum){
            case 0:
                if(num === 0){
                    _tempNum = 0;
                    _lastNum = 22;
                    _tempArr = settingSemiTypeArr(0, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                else if(num > 0){
                    if(num === 1){
                        _tempNum = 22;
                    }
                    else{
                        _tempNum = 22 + (14 * (num - 1));
                    }
                    _lastNum = 14;
                    _tempArr = settingSemiTypeArr(0, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                setSemiTypeNum(num);
            break;
            case 1:
                if(num < 3){
                    if(num === 0){
                        _tempNum = 0;
                    }
                    else{
                        _tempNum = num * 10;
                    }
                    _lastNum = 10;
                    _tempArr = settingSemiTypeArr(1, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                else if(num === 3){
                    _tempNum = 30;
                    _lastNum = 6;
                    _tempArr = settingSemiTypeArr(1, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                setSemiTypeNum(num);
            break;
            case 2:
                if(num < 6){
                    if(num === 0){
                        _tempNum = 0;
                    }
                    else{
                        _tempNum = num * 10;
                    }
                    _lastNum = 10;
                    _tempArr = settingSemiTypeArr(2, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                else if(num === 6){
                    _tempNum = 60;
                    _lastNum = 4;
                    _tempArr = settingSemiTypeArr(2, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                setSemiTypeNum(num);
            break;
            case 3:
                if(num === 0){
                    _tempNum = 0;
                    _lastNum = 2;
                    _tempArr = settingSemiTypeArr(3, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                else if(num > 0){

                    _tempNum = 2 + ((num - 1) * 13);
                    // num 1
                    // 2
                    // num 2
                    // 2 + 13 => 15

                    _lastNum = 13;
                    _tempArr = settingSemiTypeArr(3, _tempNum, _lastNum);
                    setSemiTypeArr(_tempArr);
                }
                setSemiTypeNum(num);
            break;
            default:

            break;
        }
        
    }
  return (
    <>
    <FindTypeCardContainer>
        <SelectOptionMenuBox>
            {
                typeMenuArr.map((a, i) =>{
                    let _num = i;
                    return(
                        <>
                        <SelectCardTypeBtn
                            key={`type${i}`}
                            onClick={(e)=>{
                                e.preventDefault();
                                setIsClickedTypeMenu(true);
                                semiTypeSetting(_num);
                            }}
                        >
                            {a}
                        </SelectCardTypeBtn>
                        </>
                    );
                })
            }
        </SelectOptionMenuBox>
        <SelectSemiTypeBox>
            {
                isClickedTypeMenu === true
                ?
                <>
                {
                    semiTypeArr.map((a, i) =>{

                        let imgnum = settingImgIdx(i);
                        
                        return(
                            <SemiTypeBtn
                                key={i}
                                onHoverStart={()=>{
                                    if(selectMenuNum !== 3){
                                        setChildSemiHover(true);
                                        setChildIsSemiHoverNum(imgnum);
                                    }
                                }}
                                onHoverEnd={()=>{
                                    if(selectMenuNum !== 3){
                                        setChildSemiHover(false)
                                        setChildIsSemiHoverNum(100);
                                    }
                                }}
                                onClick={()=>{
                                    if(selectMenuNum !== 3){
                                        setChildSemiNumClick(imgnum);
                                        // setTempCardName
                                        switch(selectMenuNum){
                                            case 0:
                                                setTempCardName(semiTarotNameArr[imgnum]);
                                            break;
                                            case 1:
                                                setTempCardName(semiLenormandNameArr[imgnum]);
                                            break;
                                            case 2:
                                                setTempCardName(semiIchingNameArr[imgnum]);
                                            break;
                                            case 3:
                                                setTempCardName(semiPokerNameArr[imgnum]);
                                            break;
                                            default:

                                            break;
                                        }
                                    }
                                }}
                            >
                                {a}
                            </SemiTypeBtn>
                        );
                    })
                }
                </>
                : null
            }
        </SelectSemiTypeBox>
        <SelectOptionMenuBox>
           <OptionPreviewChoiceSpanBox>
                <span>Preview</span>
                <span>Your Choice</span>
            </OptionPreviewChoiceSpanBox>
            <div>
                <SelectOptionImageBox 
                    imgsrc={
                        childSemiHover !== false
                        ? `${process.env.PUBLIC_URL}${imgRoute}${childIsSemiHoverNum}.png`
                        : ""
                    }
                />
                <SelectOptionImageBox
                    imgsrc={
                        childSemiNumClick !== 100
                        ? `${process.env.PUBLIC_URL}${imgRoute}${childSemiNumClick}.png`
                        : ""
                    }
                />
            </div>
            <SelectOptionBtnBox>
                <SelectOptionBtn
                    variants={optionBtnVar}
                    // whileHover={choiceSemiNumClick !== 100 
                    //     ? "hover"
                    //     : ""
                    // }
                    // whileTap={choiceSemiNumClick !== 100
                    //     ? "click"
                    //     : ""
                    // }
                    // style={
                    //     choiceSemiNumClick === 100
                    //     ?
                    //     {
                    //         cursor: 'auto',
                    //         opacity: 0.5,
                    //     }
                    //     :
                    //     {
                    //         cursor: 'pointer',
                    //         opacity: 1,
                    //     }
                    // }
                    // onClick={()=>{
                    //     if(choiceSemiNumClick !== 100){
                    //         let temp = choiceSemiNumClick;
                    //         setSelectFindImageNum(temp);
                    //         setSelectFindCardName(cardNameArr[temp]);
                    //         setOptionType(0);
                    //         setIsActiveOptionCurtain(false);
                    //         setChoiceSemiNumClick(100);
                    //         setSelectedTypeArr([]);
                    //         setFindCardType(10);
                    //         setWhatMode(true);
                    //     }
                    // }}
                    onClick={()=>{
                        if(childSemiNumClick !== 100){

                            switch(selectMenuNum){
                                case 0:
                                    setSelectImageType("T");
                                break;
                                case 1:
                                    setSelectImageType("L");
                                break;
                                case 2:
                                    setSelectImageType("I");
                                break;
                                default:

                                break;
                            }
                            setSelectFindImageNum(childSemiNumClick);
                            setOptionType(0);
                            setIsActiveOptionCurtain(false);
                            setWhatMode(true);
                            setSelectFindCardName(tempCardName);
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
                        cursor: 'pointer',
                    }}
                    onClick={()=>{
                        setSelectMenuNum(10);
                    }}
                >
                    BACK
                </SelectOptionBtn>
            </SelectOptionBtnBox>
        </SelectOptionMenuBox>
    </FindTypeCardContainer>
    </>
  )
}

export default FindTypeCard