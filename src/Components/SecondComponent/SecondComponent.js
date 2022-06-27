import React, { useState } from 'react'
import styled, {keyframes, css} from 'styled-components';

const decreaseWidthAnimation = keyframes`
    0% {
        width: 80vw;
    }
    100%{
        width: 0;
    }
`
const TestHeadBox = styled.div`
    width: 80vw;
    height: 50px;
    background-color: olive;
    border: none;
    ${
        props => props.secondCheck === true 
        ? css`
            animation : ${decreaseWidthAnimation} 0.5s ease-out forwards;
        ` 
        : `animation: null;`
    }
`

const Container = styled.div`
        width: inherit;
        height: inherit;
        background-color: beige;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    `;

const Button = styled.button`
        width : 200px;
        height : 50px;
        background-color : red;
        transition: all 0.3s ease-in-out;
        outline: 0;
        border: 0;
        border-radius: 10px;
        &:hover {
            background-color : blue;
        }
    `;
function SecondComponent() {
    
    let [secondCheck, setSecondCheck] = useState(false);
    let [isTestBoxOn , setTestBoxOn] = useState(true);
    const setTestBoxOnHandler = () => {
        setTimeout(()=>{
            setTestBoxOn(false);
        }, 3000)
    }
    return (
    <Container className='SecondComponent_MainBox'>
        {isTestBoxOn === true 
            ? 
            <TestHeadBox 
                secondCheck={secondCheck} 
                onAnimationEnd={setTestBoxOnHandler}    
            >

                </TestHeadBox> 
            : null
        }
        <Button onClick={()=>{
            if(secondCheck === false){
                setSecondCheck(true);
            }else{
                setSecondCheck(false);
            }
        }}>Change</Button>
    </Container>
  )
}

export default SecondComponent