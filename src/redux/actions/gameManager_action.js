
import{
    SET_CARD_COUNT,
    SET_RAN_IMG_NUMBERS,
    SET_ACTIVE_PRE_THREE,
    SET_ISOVER_PREVIEW_THREE,
    SET_CHANGE_SELECT_NUM,
    SET_ISOVER_DRAW,
} from './types'


export function setCardCount(parsedToNum){
    return{
        type: SET_CARD_COUNT,
        payload: parsedToNum
    }
}
export function setRanImgNumbers(ranNumArr){
    return{
        type: SET_RAN_IMG_NUMBERS,
        payload: ranNumArr,
    }
}
export function setActivePreThree(isActivePreviewThree){
    return{
        type: SET_ACTIVE_PRE_THREE,
        payload: isActivePreviewThree,
    }
}
export function setIsOverPreThree(isOverPreviewThree){
    return{
        type: SET_ISOVER_PREVIEW_THREE,
        payload: isOverPreviewThree,
    }
}
export function setChangeSelectNum(changedSelectNum){
    return{
        type: SET_CHANGE_SELECT_NUM,
        payload: changedSelectNum,
    }
}
export function setIsOverDraw(drawReturnInfo){
    return{
        type: SET_ISOVER_DRAW,
        payload: drawReturnInfo,
    }
}
