
import styled from "styled-components";
import { motion } from "framer-motion";

export const HorizontalContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const VerticalContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const HorizontalForm = styled(motion.form)`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const VerticalForm = styled(motion.form)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
`
export const DefaultBtnVar = {
    hover: {
        scale : 1.1,
    },
    click:{
        scale : 1.0,
    },
    empty:{

    },
}
 