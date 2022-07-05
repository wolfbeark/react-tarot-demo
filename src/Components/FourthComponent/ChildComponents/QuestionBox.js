import React, { useRef, useState } from 'react'
import styled, {css} from 'styled-components'
import {motion} from 'framer-motion'
import {useSelector, useDispatch} from 'react-redux';

import { setCardCount } from '../../../redux/actions/gameManager_action';

const QuestionConatiner = styled.div`
    width: 30%;
    height: 50%;
    background-color: #123456;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    ${(props) =>{
        if(props.animateCheck === true){
            return css`
                pointer-events : none;
            `
        }
        else if(props.animateCheck !== true){
            return css`
                pointer-events : auto;
            `
        }
    }}
`
const QuestionForm = styled.form`
    width: 90%;
    height: 90%;
    border-radius: 20px;
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const QuestionLabel = styled.label`
    font-family: "Jua";
    font-size: 25px;
    margin-bottom: 20px;
`
const QuestionInput = styled.input.attrs({
    maxLength: 2,
    autoComplete: "off",
})`
    font-family: "Jua";
    font-size: 25px;
    background-color: gray;
    border-radius: 5px;
    margin-bottom: 20px;
    text-align: center;
    transition: all 0.2s ease-in-out;
    width: 90%;
    color: whitesmoke;

    outline: unset;
    border : none;

    &:hover,
    &:focus{
        box-shadow: 0 0 10px 5px gray;
    }

    ::placeholder{
        color: whitesmoke;
    }
`
const QuestionSpan = styled.span`
    color: rgba(0, 0, 0, 0.5);
    font-family: "Jua";
    font-size: 22px;
    margin-bottom: 20px;

`
const QuestionButton = styled(motion.button)`

    width: 50%;
    height: 15%;
    background-color: skyblue;
    border-radius: 10px;
    font-family: "Jua";
    font-size: 15px;
    outline: unset;
    border: none;

    transition: box-shadow 0.2s ease-in-out;

    &:hover
    {
        box-shadow: 0 0 10px 5px skyblue, 0 0 2px 1px white inset;
        transform : scale(1.1);
    }
`



function QuestionBox({variants, setRightOver, animateCheck}) {
    
    

    let [value, setValue] = useState('');
    let [isWrited, setWrited] = useState(false);
    let dispatch = useDispatch();
    const temp = useSelector(state => state.gameManager.selectedCardCount);

    const input = useRef();
    const onSubmitHandler = (e) =>{
        e.preventDefault();
            let parsedToNum = parseInt(value);
            if(parsedToNum > 0 && parsedToNum <= 78){
                dispatch(setCardCount({isOver : true, parsedToNum}));
                setRightOver({
                    isWrited : true,
                    isSuccess : true,
                    selectedNum : parsedToNum,
                    animateCheck : true,
                })
                setTimeout(()=>{
                    setRightOver({
                        isWrited : true,
                        isSuccess : true,
                        selectedNum : parsedToNum,
                        animateCheck : false,
                    })
                    
                }, 1000)
                setWrited(true);
            }
            else if(parsedToNum <= 0 || parsedToNum > 78){
                dispatch(setCardCount({isOver : false, parsedToNum}));
                setRightOver({
                    isWrited : false,
                    isSuccess : false,
                    selectedNum : parsedToNum,
                    animateCheck : true,
                })
                setTimeout(()=>{
                    setRightOver({
                        isWrited : false,
                        isSuccess : false,
                        selectedNum : '',
                        animateCheck : false,
                    })
                }, 1000);
                setValue('');

        }
    }
    const onChangeHandler = (e) =>{
        let test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setValue(test);
    }
  return (
        <QuestionConatiner isWrited={isWrited} animateCheck={animateCheck}>
            <QuestionForm
                onSubmit={onSubmitHandler}
            >
                <QuestionLabel htmlFor='questionFirstInput'>몇 장을 선택할지 입력하세요</QuestionLabel>
                <QuestionSpan>20장 미만을 추천드립니다.</QuestionSpan>
                <QuestionInput
                    ref={input} 
                    id='questionFirstInput' 
                    value={value} 
                    onChange={onChangeHandler}
                    placeholder="1 ~ 78"
                    />
                <QuestionButton 
                    variants={variants}
                    initial={variants.start}
                    animate={variants.end}
                    whileHover={
                        { 
                            scale: 1.2, 
                        }
                    }
                    whileTap={
                        {
                            scale: 1.0,
                        }
                    }
                    style={
                        {
                            cursor: 'pointer',
                        }
                    }
                >
                    설 정 완 료
                </QuestionButton>
            </QuestionForm>
        </QuestionConatiner>
    )
}

export default QuestionBox