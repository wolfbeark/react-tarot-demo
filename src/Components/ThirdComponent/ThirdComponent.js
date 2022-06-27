
import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import { darken } from 'polished'

import ThirdQuestoinPan from './ChildComponents/ThirdQuestoinPan'
import { keyframes } from 'styled-components'

// styled-component
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: beige;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${(props) => props.isQuestionSucess 
        ? css`
            background-color: ${darken(0.1 , 'grey')};
        `
        : css`
            background-color: beige;
        `
    }
    transition: all 0.3s ease-in-out
`
const ConfirmOpen = keyframes`
    0%{
        width: 0.1em;
        height: 0.1em;
        color : rgba(0, 0, 0, 0);
        font-size: 0;
    }
    70%{
        width: 26em;
        height: 10em;
        
    }
    100%{
        width: 26em;
        height: 10em;
        color : rgba(255, 255, 255, 255);
        font-size: 20px;
        
    }
`
const nextBtn1 = keyframes`
    0%{
        visibility : hidden;
    }
    99%{
        visibility : hidden;
    }
    100%{
        visibility : visible;
    }
`
const clickedNextFirst = keyframes`
    0%{
        width: 100px;
        height: 100px;
    }
    100%{
        width: 0;
        height: 0;
    }
`
const ConfirmBox = styled.div`
    width: 26em;
    height: 10em;
    background-color: #9190e0;
    z-index: 10;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content : center;
    align-items : center;
    font-family: "Jua";
    will-change: width, height;
    font-size: 20px;
    ${(props) => {
        props.isQuestionSucess === true
        ?   css`    
                animation: ${ConfirmOpen} 2s ease-in-out forwards;
            ` 
        : css`    
            animation: none;
        ` 
        }
    }
    & > div{
        display: flex;
        width: 50%;
        height: 100%;
        text-align: center;
        justify-content : center;
        align-items : center;
        flex-direction: column; 
        font-family: "Jua";
        animation: ${nextBtn1} 0.5s ease-in-out forwards;
        span{
            margin-bottom : 10%;
        }
        button{
            background-color: grey;
            outline: unset;
            border: none;
            border-radius: 10px;
            width: 60%;
            height: 25%;
            font-family: "Jua";
            font-weight: 500;
            font-size: 20px;
        }
    }
`


function ThirdComponent() {
    let [isQuestionSucess, setQuestionSucess] = useState(false);
    let [selectedNum, setSelectedNum] = useState('');
    let [isNextFirst, setIsNextFirst] = useState(false);
    
    useEffect(()=>{

    }, [
        isQuestionSucess, 
        isNextFirst,
    ])

    const giveSelectedNum = (e) => {
        console.log(selectedNum);
        setIsNextFirst(true);
    }
  return (
      <Container isQuestionSucess={isQuestionSucess}>
          {isNextFirst !== true
          ? 
          <>
            <ThirdQuestoinPan 
            setQuestionSucess={setQuestionSucess} 
            setSelectedNum={setSelectedNum}
             />
                {isQuestionSucess === true
                ? 
                    <ConfirmBox isQuestionSucess={isQuestionSucess} isNextFirst={isNextFirst}>
                        <div>
                            <span>
                                {isNaN(selectedNum) 
                                ?   `잘못된 숫자를 입력하셨습니다.`
                                :   `${selectedNum} 장을 선택하셨습니다.`
                                }
                            </span>
                            {isNaN(selectedNum) === false
                                ?   
                                <button onClick={giveSelectedNum}>
                                    Next!
                                </button>
                                :   null
                            }
                        </div>
                    </ConfirmBox> 
                : null
                }
          </>
          : null}
      </Container>
  )
}

export default ThirdComponent