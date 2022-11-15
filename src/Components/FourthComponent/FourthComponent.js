import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

// Childs
import QuestionBox from "./ChildComponents/QuestionBox";
import FirstModal from "./ChildComponents/FirstModal";
import FirstNextBtn from "./ChildComponents/FirstNextBtn";

// 3장 미리보기
import PreviewThreeCardsQuest from "./ChildComponents/PreviewThreeCardsQuest";
import PreviewThreeCardComponent from "./ChildComponents/PreviewThreeCardComponent/PreviewThreeCardComponent";

// 드로우
import DrawComponents from "./ChildComponents/DrawComponents/DrawComponents";
import SpreadComponents from "./ChildComponents/SpreadComponents/SpreadComponents";

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: beige;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease-in-out;

  ${(props) => {
    if (props.isrightover.animateCheck === true) {
      return css`
        background-color: gray;
        opacity: 0.5;
        & > #First_Modal {
          opacity: 1;
        }
      `;
    }
  }}
`;
const buttonVariant = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
  },
  pressed: {
    scale: 0.5,
  },
  rest: {
    scale: 1,
  },
};

function FourthComponent() {
  const gameManager = useSelector((state) => state.gameManager);
  let [isRightOver, setRightOver] = useState({
    isWrited: false,
    isSuccess: false,
    selectedNum: "",
    animateCheck: false,
  });

  let firstOver = useSelector((state) => state.gameManager.isFirstOver);
  return (
    <>
      <Container isrightover={isRightOver}>
        {gameManager.isFirstAllOver === true ? null : (
          <>
            <QuestionBox
              setRightOver={setRightOver}
              animateCheck={isRightOver.animateCheck}
              variants={buttonVariant}
            />
            {isRightOver.isSuccess === true &&
            firstOver === true &&
            isRightOver.animateCheck === false ? (
              <FirstNextBtn />
            ) : null}
          </>
        )}
        {gameManager.isPreviewThreeCards === false &&
        gameManager.isFirstAllOver === true ? (
          <>
            <AnimatePresence>
              <PreviewThreeCardsQuest />
            </AnimatePresence>
          </>
        ) : null}
        {gameManager.isActivePreviewThree === true &&
        gameManager.isPreviewThreeCards === true &&
        gameManager.isOverPreviewThree === false ? (
          // 3장 미리보기 볼거임
          <PreviewThreeCardComponent />
        ) : null}
        {(gameManager.isActivePreviewThree === false &&
          gameManager.isPreviewThreeCards === true &&
          gameManager.isActiveSpread === false) ||
        (gameManager.isOverPreviewThree === true &&
          gameManager.isActiveSpread === false) ? (
          // 3장 미리보기 안 볼거임 or 보고 넘어 왔다.
          <DrawComponents />
        ) : null}
        {
          // 스프레드 화면
          gameManager.isOverDraw === true &&
          gameManager.isActiveSpread === true ? (
            <>
              <SpreadComponents />
            </>
          ) : null
        }
      </Container>
      {isRightOver.animateCheck === true ? (
        <FirstModal id="First_Modal" />
      ) : null}
    </>
  );
}

export default FourthComponent;
