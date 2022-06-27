import React, { useEffect, useRef, useState } from 'react'
import styled, {keyframes, css} from 'styled-components'
import {darken} from 'polished';

// styled-component
const QuestionBox = styled.div`
    background-color : #123456;
    width: 30em;
    height: 30em;
    border-radius: 20px;
    padding: 1em;
    position: fixed;
    z-index: 0;
    transition : all 0.2s ease-in-out
    ${(props) => props.testContorl 
        ? css`
            background-color: ${darken(0.1, 'grey')};
            opacity: 0.5;
        `
        : css`
            background-color: #123456;
            opacity: 1;
        `
    }
    
`
const TextInput = styled.input.attrs({
    required : true,
    placeholderTextColor : "blue",
    autoComplete : 'off',
    maxLength : 2,
})`

    border-radius: 5px;
    background-color: violet;
    width: 70%;
    height: 10%;
    outline: unset;
    border: none;
    caret-color: brown;
    font-weight : 600;
    font-family : "Jua";
    font-size : 30px;
    text-align : center;
    margin-bottom : 30px;
    transition : all 0.3s ease-in-out;
    &:hover,
    &:focus{
         background-color: tomato;
        box-shadow: 0px 0px 10px 2px rgba(207, 16, 255, 255);
    }
    &:hover{
        cursor: pointer;
    }
`
const buttonAnimation = keyframes`
    0%{
        transfrom: scale(1, 1);
        pointer-events: none;
    }
    60%{
        transform: scale(0.5, 0.5);
    }
    100%{
        transform : scale(1, 1);
        pointer-events: auto;
    }
`
const testOpacity = keyframes`
    0%{
        opacity: 1;
    }
    50%{
        opacity: 0.2;
    }
    100%{
        opacity: 1;
    }
`

const QuestForm = styled.form`
    background-color: whitesmoke;
    width: 100%;
    height : 100%;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    & > label{
        font-family: "Jua";
        width: 70%;
        height: auto;
        background-color: skyblue;
        outline: unset;
        border: none;
        text-align: center;
        font-size : 30px;
        margin-bottom : 20px;
    };
    & > span{
        font-size : 20px;
        font-family: "Jua";
        width: 70%;
        height: auto;
        background-color: skyblue;
        outline: unset;
        border: none;
        text-align: center;
        margin-bottom: 20px;
        opacity : 0.7;
    }
    ${(props) => {
        props.isClicked 
            ?
                css`pointer-events: none;`
            :
                css`pointer-events: auto;`
    }}
    
`
const Button = styled.button`
    font-family: "Jua";
    width: 50%;
    height: 10%;
    background-color: aquamarine;
    outline: unset;
    border: none;
    border-radius : 10px;
    font-size : 20px;
    font-weight : 600;
    text-align : center;
    box-shadow: none;
    transition : all 0.3s ease-in-out;
    &:hover,
    &:focus{
        background-color: tomato;
        box-shadow: 0px 0px 10px 2px rgba(207, 16, 255, 255);
        cursor: pointer;
    }
    ${(props) => props.value 
        ? css`
            animation: ${buttonAnimation} 2s linear infinite;
            pointer-events: none;
        `
        : css`animation: ${testOpacity} 2s linear infinite;
            pointer-events: auto;
        `
    }
`



function ThirdQuestoinPan({setQuestionSucess, isQuestionSucess, setSelectedNum}) {

    let [value, setValue] = useState('');
    let [isClicked, setIsClicked] = useState(false);
    let [testContorl, setTestControl] =useState(isQuestionSucess);
    useEffect(()=>{

    }, [isClicked, testContorl, isQuestionSucess])
    
    const input = useRef();

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const tempNum = parseInt(value);
        if(tempNum <= 78 && tempNum >= 1){
            setSelectedNum(tempNum);
            setTestControl(true);
            setIsClicked(false);
            setQuestionSucess(true);
        }else if(tempNum === 0 || tempNum > 78){
            input.current.value = "";
            setSelectedNum('false');
            setValue("");
            setQuestionSucess(true);
            setTestControl(true);
            setIsClicked(false);
            setTimeout(()=>{
                setQuestionSucess(false);
                setTestControl(false);
            }, 2000);
        }
    }
  return (
    <QuestionBox testContorl={testContorl}>
        <QuestForm isClicked={isClicked}
        >
            <label htmlFor='ThirdQuestInput'>몇 장을 뽑으시겠습니까?</label>
            <span>1 ~ 78 사이의 숫자를 입력</span>
            <TextInput
                ref={input} 
                value={value}
                required={true} 
                id='ThirdQuestInput' 
                placeholder='1 ~ 78'
                onInput={(e)=>{
                        const test = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
                        setValue(test);                   
                }}
            />
            <Button  onClick={(e)=>{
                if(input.current.value !== '' ||
                    isQuestionSucess === false){
                    setIsClicked(true);
                    onSubmitHandler(e);
                }
                }}
                value={isClicked}
            > 설 정 완 료 </Button>
        </QuestForm>
    </QuestionBox>
  )
}

export default ThirdQuestoinPan