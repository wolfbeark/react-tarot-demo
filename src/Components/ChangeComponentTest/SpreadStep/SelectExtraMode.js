import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { HorizontalContainer, VerticalContainer } from "../../CustomStyles";
import { colors, fonts } from "../../theme";

const SelectExtraModeContainer = styled(VerticalContainer)`
  width: 70%;
  height: 80%;
  background-color: ${colors.color.navy};
  border-radius: 10px;
  justify-content: space-evenly;
  position: relative;
`;
const BackBtn = styled(HorizontalContainer)`
  width: 15%;
  height: 10%;
  background-color: ${colors.color.navy};
  border-radius: inherit;
  padding: 0.5%;
  position: absolute;
  right: 0;
  bottom: -12%;
  & > button {
    width: 100%;
    height: 100%;
    background-color: ${colors.color.skyblue};
    outline: unset;
    border: none;
    border-radius: inherit;
    font-family: ${fonts.family.base};
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
  }
`;
const InformationTitle = styled(HorizontalContainer)`
  width: 90%;
  height: 20%;
  background-color: ${colors.color.royalblue};
  border-radius: inherit;
  padding: 1%;
  & > span {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: ${colors.color.lemonchiffon};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
  }
`;
const SelectModeList = styled(motion.ul)`
  width: 90%;
  height: 60%;
  background-color: ${colors.color.royalblue};
  border-radius: inherit;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-left: 0;
  margin: 0;
`;
const ModeList = styled(motion.li)`
  width: 20%;
  height: 55%;
  //background-color: yellow;
  background-image: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: -25%;
  }
`;
const modeListVar = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 10px 5px gray",
  },
  click: {
    scale: 1.0,
  },
};
function SelectExtraMode(props) {
  let setOptionType = props.setOptionType;
  let setIsActiveOptionCurtain = props.setIsActiveOptionCurtain;
  let isClickedLenormandTotal = props.isClickedLenormandTotal;
  //const [extraModeNum, setExtraModeNum] = useState();

  const onChangeExtraNum = (num) => {
    if (num === 0) {
      setOptionType(2); // 기존 Extra
      //console.log(num);
    } else if (num !== 0) {
      switch (num) {
        case 1:
          if (isClickedLenormandTotal === false) {
            setOptionType(6);
          }
          break;
        case 2:
          setOptionType(7);
        default:
          break;
      }
    }
  };
  const defaultRoute = [
    `/images/ArcanaOfCard/DefaultImages/MAJOR/MJ.0_LE.MAT.png`,
    `/images/Lenormand/DefaultImages/Default_LenormandBack.png`,
    `/images/IChing/DefaultIChing0.png`,
    `/images/Poker/DefaultImages/Default_Poker1.png`,
  ];
  const nameArr = ["Tarot", "Lenormand", "IChing", "Poker"];

  const onBackBtnClick = () => {
    setOptionType(0);
    setIsActiveOptionCurtain(false);
  };
  return (
    <>
      <SelectExtraModeContainer>
        <InformationTitle>
          <span>원하시는 오라클 종류를 선택하세요</span>
        </InformationTitle>
        <SelectModeList>
          {nameArr.map((a, i) => {
            return (
              <ModeList
                imgsrc={`${process.env.PUBLIC_URL}${defaultRoute[i]}`}
                key={"modeList" + i}
                variants={modeListVar}
                whileHover={
                  i < 4
                    ? i === 1
                      ? isClickedLenormandTotal === false
                        ? "hover"
                        : ""
                      : "hover"
                    : ""
                }
                whileTap={
                  i < 4
                    ? i === 1
                      ? isClickedLenormandTotal === false
                        ? "click"
                        : ""
                      : "click"
                    : ""
                }
                style={
                  i === 1
                    ? isClickedLenormandTotal === false
                      ? {
                          opacity: 1.0,
                        }
                      : {
                          opacity: 0.5,
                        }
                    : {
                        opacity: 1.0,
                      }
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (i < 3) {
                    if (i !== 1) {
                      onChangeExtraNum(i);
                    }
                  }
                }}
              >
                <span>{a}</span>
              </ModeList>
            );
          })}
        </SelectModeList>
        <BackBtn
          style={{
            cursor: "pointer",
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1.0,
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              onBackBtnClick();
            }}
          >
            CLOSE
          </button>
        </BackBtn>
      </SelectExtraModeContainer>
    </>
  );
}

export default SelectExtraMode;
