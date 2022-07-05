
import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

import { setRanImgNumbers } from '../../../redux/actions/gameManager_action';

const NextBtnContainer = styled(motion.button)`

    position: fixed;
    width : 10%;
    height: 8%;
    background-color: olive;
    color: whitesmoke;
    z-index: 2;
    bottom: 10%;
    border-radius: 20px;
    outline: unset;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, 0);
    cursor: pointer;


    font-family: "Jua";
    font-weight: 500;
    font-size: 20px; 


    
`
const nextBtnVariants = {
    start:{
        opacity: 1,
        transition:{
            ease: "easeInOut",
            duration: 1,
        }   
    },
    hover:{
        scale: 1.5,
        transition:{
            ease: "easeOut",
            duration: 0.2,
        }
    },
    click:{
        scale: 0.8,
    },
    rest:{
        scale: 1
    }
    
}

function FirstNextBtn() {

    let dispatch = useDispatch();
    let count = useSelector((state) => state.gameManager.selectedCardCount);
    let ranNumArr = [count];
    const onClickHandler = (e) => {
        e.preventDefault();
        for(let i = 0; i < count; i++)
        {
            let ranNumber = Math.floor((Math.random() * (79)));
            ranNumArr[i] = ranNumber;
            for(let j = 0; j < i; j++)
            {
                if(ranNumArr[i] === ranNumArr[j])
                {
                    i--;
                    break;
                }
            }
            //console.log('number : ', `${i} - ` ,ranNumArr[i]);
        }
        dispatch(setRanImgNumbers({ranImgNumArr : ranNumArr, isFirstAllOver : true}));

    }

  return (
      <>
        <NextBtnContainer 
            onClick={onClickHandler}
            variants={nextBtnVariants}
            initial={{opacity: 0}}
            animate="start"
            whileHover={{ 
                scale: 1.2,
                boxShadow: `0 0 10px 2px olive`, 
            }}
            whileTap={{
                scale: 1.0,
            }}
            

        >
            N e x t !
        </NextBtnContainer>
            {/* <button onClick={()=>{
                for(let i = 0; i < ranNumArr.length; i++){
                    console.log(ranNumArr[i]);
                }
            }}>check</button> */}
      </>
  )
}

export default FirstNextBtn