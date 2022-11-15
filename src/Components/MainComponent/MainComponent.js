import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const MainComponentContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: beige;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputAccessKeyBox = styled(motion.div)`
  width: 30%;
  height: 50%;
  background-color: navy;
  border-radius: 10px;
  box-shadow: 0 8px 20px 5px navy;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  & label,
  & input,
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Jua";
    font-size: 1.5em;
    font-weight: 600;
    border-radius: 10px;
    border: none;
  }
  & label {
    height: 10%;
    font-size: 1.8em;
  }
  & label,
  & input {
    width: 80%;
    height: 20%;
  }
  & input {
    margin: 5% 0;
  }
  & input:focus {
    outline: none;
  }
`;

const AccessBtn = styled(motion.button)`
  width: 50%;
  height: 15%;
  background-color: royalblue;
  outline: unset;
  border: none;
  border-radius: 10px;
  //transition: opacity 0.5s ease-in-out;
  transition: background-color 0.5s ease-in-out;
`;
const accessBtnVar = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 10px 5px royalblue",
  },
  click: {
    scale: 1.0,
  },
};

const Modal = styled(motion.div)`
  width: 45%;
  height: 60%;
  opacity: 0.9;
  background-color: whitesmoke;

  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: absolute;
  ${(props) => {
    return css`
      left: calc(27.5%);
      top: calc(50% - 30%);
    `;
  }}
  & span {
    font-family: "Jua";
    font-size: 3em;
    font-weight: 600;
    margin: 2% 0;
  }
`;

function MainComponent() {
  const REACT_APP_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const REACT_APP_TEST_ACCESS_KEY = process.env.REACT_APP_TEST_ACCESS_KEY;
  const [password, setPassword] = useState("");
  const [isRight, setIsRight] = useState(false);
  const [activeCurtain, setActiveCurtain] = useState(false);
  const [timerNum, setTimerNum] = useState(3);

  const modalRef = useRef(null);
  const [modalInfo, setModalInfo] = useState();
  const navigate = useNavigate();

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  //console.log(process.env);

  const checkPassWordHandler = () => {
    if (password === REACT_APP_ACCESS_KEY) {
      //console.log('right');
      setActiveCurtain(true);
      setIsRight(true);
      activeTimer();
      setTimeout(() => {
        setActiveCurtain(false);
        setTimerNum(3);
        navigate("/fourth");
      }, 4000);
    } else if (password === REACT_APP_TEST_ACCESS_KEY) {
      setActiveCurtain(true);
      setIsRight(true);
      activeTimer();
      setTimeout(() => {
        setActiveCurtain(false);
        setTimerNum(3);
        navigate("/changetest");
      }, 4000);
    } else {
      //console.log('fail')
      setActiveCurtain(true);
      setTimeout(() => {
        setActiveCurtain(false);
      }, 2000);
    }
  };
  const activeTimer = () => {
    let temp = 3;
    let timerId = setInterval(() => {
      //console.log(temp);
      temp--;
      setTimerNum(temp);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerId);
    }, 4000);
  };

  // useEffect(()=>{
  //     const tempInfo = modalRef.current.getBoundingClientRect();
  //     const tempInfoArea = {
  //         left : tempInfo.left,
  //         width : tempInfo.width,
  //         top : tempInfo.top,
  //         hegiht : tempInfo.height,
  //         x : tempInfo.x,
  //         y : tempInfo.y,
  //         right : tempInfo.right,
  //         bottom : tempInfo.bottom,
  //     }
  //     setModalInfo(tempInfoArea);
  // }, [])
  return (
    <>
      <MainComponentContainer>
        <InputAccessKeyBox>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (activeCurtain === false) {
                if (password.length > 0) {
                  checkPassWordHandler();
                }
              }
            }}
          >
            <label htmlFor="inputAcessKey">Write an access key below.</label>
            <input
              id="inputAcessKey"
              type="password"
              autoComplete="off"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => {
                e.preventDefault();
                onPasswordChangeHandler(e);
              }}
            />
            <AccessBtn
              variants={accessBtnVar}
              whileHover={password.length > 0 ? "hover" : ""}
              whileTap={password.length > 0 ? "click" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (activeCurtain === false) {
                  if (password.length > 0) {
                    checkPassWordHandler();
                  }
                }
              }}
              style={
                password.length > 0
                  ? {
                      cursor: "pointer",
                      //opacity: 1
                    }
                  : {
                      backgroundColor: "gray",
                      cursor: "auto",
                      //opacity: 0.7
                    }
              }
            >
              ACCESS
            </AccessBtn>
          </form>
        </InputAccessKeyBox>
      </MainComponentContainer>
      {activeCurtain !== false ? (
        <>
          <Modal ref={modalRef} modalinfo={modalInfo}>
            {isRight !== false ? (
              <>
                <span>잠시만 기다려 주십시오</span>
                <span>{timerNum}</span>
              </>
            ) : (
              <span>입력에 실패하였습니다</span>
            )}
          </Modal>
        </>
      ) : null}
    </>
  );
}

export default MainComponent;
/* 

}
*/
