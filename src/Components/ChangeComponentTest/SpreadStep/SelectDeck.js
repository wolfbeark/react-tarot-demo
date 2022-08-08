import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const DeckContainer = styled(motion.div)`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
`
const ImageContainer = styled(motion.div)`

    width: 100%;
    height: 70%;
    //background-color: black;
    padding: 5%;
    border-radius: 10px;

`
const ImageBox = styled(motion.div)`

    width: 100%;
    height: 100%;
    background-color: royalblue;
    background-image : url(${props => props.imgsrc});
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px black;
`
const TextBox = styled(motion.div)`

    width: 100%;
    height: 20%;
    background-color: skyblue;
    border-radius: 10px;
    cursor: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Jua";
    font-size: 0.8em;
    font-weight: 600;
    text-align: center;
`
const imageBoxVariants = {
    active:{
        opacity: 1,
    },
    inactive:{
        opacity: 0.5
    },
    hover:{
        scale: 1.15,
    },
    click:{
        scale: 1.0,
    }
}

function SelectDeck(props){

    let type = props.deckType;
    const [isClicked, setIsClicked] = useState(false);
    let { selectDeckControlArr, setSelectDeckControlArr } = props.selectDeckController;
    let { listSelectArr, setListSelectArr } = props.listSelectController;
    let { isThereTotal, setIsThereTotal } = props.totalControl;
    let { deckClickCount, setDeckClickCount} = props.clickCountControl;
    let { isClickedMinor, setIsClickedMinor } = props.minorControl;
    const DeckNameArr = [
        "+ Major",
        "+ Wand",
        "+ Sword",
        "+ Cup",
        "+ Pentacle",
        "+ Minor",
        `+ Wand Palace`,
        "+ Sword Palace",
        "+ Cup Palace",
        "+ Pentacle Palace"
    ]
    const MinusDeckNameArr = [
        "- Major",
        "- Wand",
        "- Sword",
        "- Cup",
        "- Pentacle",
        "- Minor",
        `- Wand Palace`,
        "- Sword Palace",
        "- Cup Palace",
        "- Pentacle Palace"

    ]
    useEffect(()=>{
        const _DeckNameArr = [
            "Major",
            "Wand",
            "Sword",
            "Cup",
            "Pentacle",
            "Minor",
            `Wand Palace`,
            "Sword Palace",
            "Cup Palace",
            "Pentacle Palace"
        ]
        let temp = {
            name: _DeckNameArr[type],
            isClicked: isClicked,
            setIsClicked: setIsClicked,
        }
        let _tempArr = selectDeckControlArr;
        _tempArr[type] = temp;
        setSelectDeckControlArr(_tempArr);
    }, [])
    const onMajorTest = (type) =>{
        //let _count = deckClickCount;
        let _nameList = [...listSelectArr];
        let testNum = 0;
        if(isClicked === false){
           // _count++;
            if(isThereTotal === false){
                _nameList.push(
                    {
                        type: type,
                        name: DeckNameArr[type]
                    }
                );
            }
            else if(isThereTotal === true){
                _nameList.push(
                    {
                        type: type,
                        name: MinusDeckNameArr[type]
                    }
                );
            }
            if(_nameList.length >= 2){
                _nameList.sort(function(a, b){
                    return a.type - b.type
                })
            }
            setListSelectArr(_nameList);
            //setDeckClickCount(_count);
            
        }
        else if(isClicked === true){
            //_count--;
            let _str = DeckNameArr[type];
            let _idx;
            for(let i = 0; i < _nameList.length; i++){
                if(_nameList[i].type === type){
                    _idx = i;
                    break;
                }
            }
            _nameList[_idx] = null;
            let delNullArr = _nameList.filter((a) => a !== null);
            //console.log(delNullArr);
            if(delNullArr.length >= 2){
                delNullArr.sort(function(a, b){
                    return a.type - b.type
                })
            }
            setListSelectArr(delNullArr);
            //setDeckClickCount(_count);
        }
        setIsClicked(!isClicked);
        let _itemList = selectDeckControlArr;
        let _item = {
            name : DeckNameArr[type],
            isClicked : !isClicked,
            setIsClicked : setIsClicked
        }
        _itemList[type] = _item;
        setSelectDeckControlArr(_itemList);
        for(let i = 0; i < selectDeckControlArr.length; i++){
            if(selectDeckControlArr[i].isClicked === true){
                testNum++;
            }
        }
        if(isThereTotal === true){
            testNum++;
        }
        setDeckClickCount(testNum);
    }
    const onMinorTest = (type) =>{
        //let _count = deckClickCount;
        let _nameList = [...listSelectArr];
        let tempArr = selectDeckControlArr;
        let testNum = 0;
        if(isClicked === false){

            if(isThereTotal === false){
                for(let i = 0; i < _nameList.length; i++){
                    if(_nameList[i].type === 0 
                        || _nameList[i].type === 5) // 0과 5 제외 전부 null 처리
                    {
                        continue;
                    }
                    else{
                        _nameList[i] = null;
                    }
                }
            }
            else if(isThereTotal === true){
                for(let i = 0; i < _nameList.length; i++){
                    if(_nameList[i].type === 0 
                        || _nameList[i].type === 5
                        || _nameList[i].type === -1) // 0과 5, 10 제외 전부 null 처리
                    {
                        continue;
                    }
                    else{
                        _nameList[i] = null;
                    }
                }
            }
            let delNullArr = _nameList.filter((a) => a !== null);
            //_count++;
            if(isThereTotal === false){
                delNullArr.push(
                    {
                        type: type,
                        name: DeckNameArr[type]
                    }
                );
            }
            else if(isThereTotal === true){
                delNullArr.push(
                    {
                        type: type,
                        name: MinusDeckNameArr[type]
                    }
                );
            }
            
            if(delNullArr.length >= 2){
                delNullArr.sort(function(a, b){
                    return a.type - b.type
                })
            }
            for(let i = 0; i < selectDeckControlArr.length; i++){
                if(i === 0 || i === 5){
                    continue;
                }
                else{
                    tempArr[i].isClicked = false;
                    selectDeckControlArr[i].setIsClicked(false);
                }
            }
            setSelectDeckControlArr(tempArr);
            setListSelectArr(delNullArr);
            //setDeckClickCount(_count);
            setIsClickedMinor(true);
            
        }
        else if(isClicked === true){
            //_count--;
            let _str = DeckNameArr[type];
            let _idx;
            for(let i = 0; i < _nameList.length; i++){
                if(_nameList[i].type === type){
                    _idx = i;
                    break;
                }
            }
            _nameList[_idx] = null;
            let delNullArr = _nameList.filter((a) => a !== null);
            //console.log(delNullArr);
            if(delNullArr.length >= 2){
                delNullArr.sort(function(a, b){
                    return a.type - b.type
                })
            }
            setListSelectArr(delNullArr);
            //setDeckClickCount(_count);
            setIsClickedMinor(false);
        }
        setIsClicked(!isClicked);
        let _itemList = selectDeckControlArr;
        let _item = {
            name : DeckNameArr[type],
            isClicked : !isClicked,
            setIsClicked : setIsClicked
        }
        _itemList[type] = _item;
        setSelectDeckControlArr(_itemList);
        for(let i = 0; i < selectDeckControlArr.length; i++){
            if(selectDeckControlArr[i].isClicked === true){
                testNum++;
            }
        }
        if(isThereTotal === true){
            testNum++;
        }
        setDeckClickCount(testNum);
    }
    const onDeckClickHandler = (type) =>{

        // 0 : Major, 5 : Minor
        
        switch(type){
            case 0: // Major
                let {isClickedMajor, setIsClickedMajor} = props.majorControl;
                //console.log('Major : 0 - 21');
                onMajorTest(type);
                setIsClickedMajor(!isClickedMajor);
            break;
            case 1: // Wand
                //console.log('Wand : 22 - 35');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 2: // Sword
                //console.log('Sword : 36 - 49');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 3: // Cup
                //console.log('Cup : 50 - 63');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 4: // Pentacle
                //console.log('Pentacle : 64 - 77');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 5: // Minor
                //console.log('Minor : 22 - 77');
                onMinorTest(type);
            break;
            case 6: // Wand Palace
                //console.log('Wand Palace : 32 - 35');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 7: // Sword Palace
                //console.log('Sword Palace : 46 - 49');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 8: // Cup Palace
                //console.log('Cup Palace : 60 - 63');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            case 9: // Pentacle Palace
                //console.log('Pentacle Palace : 74 - 77');
                if(isThereTotal === false){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
                else if(isThereTotal === true){
                    if(isClickedMinor === false){
                        onMajorTest(type);
                    }
                }
            break;
            default:
                //console.log('deck select fail')
            break
        }
    }
    return(
        <>
        <DeckContainer>
            <ImageContainer>
                <ImageBox 
                    imgsrc={`${process.env.PUBLIC_URL}/images/ArcanaOfCard/DefaultImages/TotalImages/Default${props.imgNum}.png`}
                    variants={imageBoxVariants}
                    animate={
                        type === 0 || type === 5
                        ? isClicked === false ? "active" : "inactive"
                        : isClickedMinor === false
                            ? isClicked === false
                                ? "active" 
                                : "inactive"
                            : "inactive"   
                    }
                    whileHover={
                        type === 0 || type === 5
                        ? "hover"
                        : isClickedMinor === false  // 나머지 마이너들
                            ? "hover"
                            : ""
                    }
                    whileTap="click"
                    onClick={()=>{
                        onDeckClickHandler(type);
                    }}
                />
            </ImageContainer>
            <TextBox>
                {props.deckName}
            </TextBox>
        </DeckContainer>
        </>
    );
}

export default SelectDeck;
