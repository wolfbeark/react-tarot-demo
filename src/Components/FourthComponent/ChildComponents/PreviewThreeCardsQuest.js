
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setActivePreThree } from '../../../redux/actions/gameManager_action';



const PreviewThreeBox = styled(motion.div)`

    width : 40%;
    height : 50%;
    background-color : #123456;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius : 10px;
    padding: 2% 2%;

    opacity: 0;
`
const PreviewThreeForm = styled(motion.form)`

    width: 100%;
    height: 100%;
    background-color : whitesmoke;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    border-radius : 10px;
    & > span{
        font-family: "Jua";
        font-size: 40px;
        width: 95%;
        height: 30%;
        text-align : center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`
const PreviewSelectButtonBox = styled(motion.div)`

    width: 100%;
    height: 50%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    background-color : gray;
`
const YesOrNoBtn = styled(motion.button)`

    width: 35%;
    height: 50%;
    
    border : none;
    outline : unset;
    border-radius : 10px;
    background-color : aquamarine;

    font-family : "Jua";
    font-size: 30px;
    font-weight: 600;
`
const boxVariant = {
    initial:{
        opacity: 0,
        PointerEvent: 'none'
    }
    ,
    start:{
        opacity: 1,
        PointerEvent: 'auto',
        transition:{
            duration: 1,
            PointerEvent : {duration : 3},
        }
    },
    end:{
        opacity: 0,
        PointerEvent: 'none',
        transition:{
            duration: 1
        }
    }
}

const buttonVariant = {
    initial:{
        opacity: 0,
        PointerEvent: 'none'
    },
    start:{
        opacity: 1,
        PointerEvent: 'auto',
        transition:{
            duration: 3,
            PointerEvent : {duration : 3}
        }
    }
    ,
    hover:{
        scale: 1.2,
        boxShadow: `0 0 10px 3px aquamarine`,
    }
    ,
    click:{
        scale: 1.0
    },
    isLoading:{
        scalse: 0,
        PointerEvent: 'none',
    }
}

function PreviewThreeCardsQuest(props) {

  let [wantToSeeThreeCards, setWantsToSeeThreeCards] = useState(false);
  let [isLoadingOver, setLoadingOver] = useState(false);
  let [isSelectedOver, setSelectedOver] = useState(false);
  let [isBtnClicked, setBtnClicked] = useState(false);
  let dispatch = useDispatch();

    useEffect(()=>{
        setTimeout(()=>{
            setLoadingOver(true);
        }, 1000)
    }, [])
    useEffect(()=>{

    }, [isSelectedOver])

    
const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(isLoadingOver === true){
        setBtnClicked(true);
        if(setBtnClicked !== true){
            setTimeout(()=>{
                dispatch(setActivePreThree({isActivePreviewThree : wantToSeeThreeCards}));
            }, 1000)
        }
    }
  }
  const setFlag = (flag) => {  
    if(isLoadingOver === true && isBtnClicked === false){
        setSelectedOver(true);
        if(flag === 'yes'){
            setWantsToSeeThreeCards(true);

        }else if(flag === 'no'){
            setWantsToSeeThreeCards(false);
        }
      }
  }
  return (
            <PreviewThreeBox
                variants={boxVariant}
                initial="initial"
                animate={
                    isSelectedOver === false
                    ? "start"
                    : "end"
                }
            >
            <PreviewThreeForm
                onSubmit={onSubmitHandler}
            >
                <span>3장을 미리 보시겠습니까?</span>
                <PreviewSelectButtonBox>
                    <YesOrNoBtn 
                        variants={buttonVariant}
                        initial="initial"
                        animate="start"
                        whileHover={isLoadingOver ? "hover" : "isLoading"}
                        whileTap={isLoadingOver ? "click" : "isLoading"}
                        onClick={()=>{
                            if(isBtnClicked === false){
                                setFlag('yes');
                            }
                        }}
                        
                    >
                            Y E S
                    </YesOrNoBtn>
                    <YesOrNoBtn
                        variants={buttonVariant}
                        initial="initial"
                        animate="start"
                        whileHover={isLoadingOver ? "hover" : "isLoading"}
                        whileTap={isLoadingOver ? "click" : "isLoading"}
                        onClick={()=>{
                            if(isBtnClicked === false){
                                setFlag('no');
                            }
                        }}
                    >
                        N O
                    </YesOrNoBtn>
                </PreviewSelectButtonBox>
            </PreviewThreeForm>
        </PreviewThreeBox>
    
  )
}

export default PreviewThreeCardsQuest