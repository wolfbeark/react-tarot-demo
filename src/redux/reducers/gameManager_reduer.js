
import {
    SET_CARD_COUNT,
    SET_RAN_IMG_NUMBERS,
    SET_ACTIVE_PRE_THREE,
    SET_ISOVER_PREVIEW_THREE,
    SET_CHANGE_SELECT_NUM,
    SET_ISOVER_DRAW,
} from "../actions/types"
import DefaultMajorArcana from "../../Components/FourthComponent/DefaultImgArr";

const initialCardState = {
    defaultImgArr: DefaultMajorArcana,
    selectedCardCount : null,
    isSettingCardCount : true,
    isFirstOver : false, // 드로우 수량 질문
    ranImgNumArr : null,
    isFirstAllOver : false, // 분기점에서 true는 완전히 끝난 상태 의미
    
    isPreviewThreeCards : false, // 3장 미리보기 선택 완료여부
    isActivePreviewThree : false, // 3장 미리보기 볼거냐
    isOverPreviewThree : false, // 3장 미리보기 끝났냐

    // 드로우 value들
    isOverDraw : false,
    // 최종 선택된 넘버 어레이
    totalSelectedNumArr : [],
    isActiveSpread : false,
}

export default function(state = initialCardState, action){
    switch(action.type){
        case SET_CARD_COUNT :
            return{
                ...state,
                selectedCardCount : action.payload.parsedToNum,
                isSettingCardCount : false,
                isFirstOver : action.payload.isOver,
            }
        case SET_RAN_IMG_NUMBERS :
            return{
                ...state,
                ranImgNumArr : action.payload.ranImgNumArr,
                isFirstAllOver : true,

            }
        case SET_ACTIVE_PRE_THREE:
            return{
                ...state,
                isPreviewThreeCards: true,
                isActivePreviewThree: action.payload.isActivePreviewThree,
            }
        case SET_ISOVER_PREVIEW_THREE:
            return{
                ...state,
                isOverPreviewThree: action.payload.isOverPreviewThree,

            }
        case SET_CHANGE_SELECT_NUM:
            return{
                ...state,
                selectedCardCount : action.payload.changedSelectNum,
            }
        case SET_ISOVER_DRAW:
            return{
                ...state,
                isOverDraw : action.payload.drawReturnInfo.isOverDraw,
                totalSelectedNumArr : action.payload.drawReturnInfo.totalSelectedNumArr,
                isActiveSpread: true,
            }
        
        default :
            return state;
    }
} 