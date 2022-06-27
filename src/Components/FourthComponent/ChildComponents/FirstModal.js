
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const Modal = styled(motion.div)`
        width: 10%;
        height: 5%;
        background-color: gray;
        z-index: 99;
        translate: (0, 0);
        position: fixed;
        opacity: 1;
        border-radius: 10px;

        display: flex;
        justify-content : center;
        align-items: center;
        flex-direction: column;
        box-shadow: 0 0 2px 0.5px white inset; 

        & > span {
            display: flex;
            justify-content : center;
            align-items: center;
            flex-direction: column;

            font-family: "Jua";
            width: 80%;
            height: 50%;
            font-size: 10px;
        }
    `
const modalVariant = {
    start:{
        scale: 4
    },
    exit :{
        scale : 0.1
    },
    transition: {
        type: "spring",
        ease: "easeInOut",
        duration: 1,
    }
}
function FirstModal() {

    let [isAlright, setAlright] = useState(false);
    let firstOver = useSelector((state) => state.gameManager.isFirstOver);
    let selectedNum = useSelector((state) => state.gameManager.selectedCardCount);
    useEffect(() => {
      
        setAlright(firstOver);
      return () => {
        setAlright(false);
      }
    }, [isAlright, firstOver]);
    
  return (
    <AnimatePresence exitBeforeEnter={false}>
        <Modal
            key="firstModal"
            variants={modalVariant}
            animate="start"
            exit={{scale : 0}}
        >
            {
                isAlright === true 
                ? 
                    <span>
                        {`${selectedNum}장 선택 하셨습니다.`}
                    </span>
                :  
                    <span>
                        {"입력에 실패하셨습니다."}
                    </span>
            }
        </Modal>
    </AnimatePresence>
  )
}

export default FirstModal