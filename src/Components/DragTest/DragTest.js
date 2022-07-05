import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import {motion, useDragControls} from 'framer-motion';

const TestContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background-color: beige;
`
const TestBox1 = styled(motion.div)`
  width: 80%;
  height: 80%;
  background-color: skyblue;
`



const DragTestBox2 = styled(motion.div)`
  width: 50px;
  height: 75px;
  background-color: red;

  position: absolute;
  z-index: 3;
  top : ${props => props.testboxpos.y }px;
  left: ${props => props.testboxpos.x }px;
  
  ${(props) =>
    props.isrotate === 'true' ? `transform: rotate(-90deg);` : `transform: rotate(0);`
  }
  
  
`
const SubTestContainer = styled(motion.div)`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: mediumseagreen;
  padding: 0 2%;
`
const TestBox2 = styled(motion.div)`
  width: 50px;
  height: 75px;
  background-color: olive;
  
`
const cardTestVariants = {

  isRotateTrue:{
    transform: 'rotate(-90deg)',
  },
  isRotateFalse:{
    transform: 'rotate(0)'
  },
  hover:{
    //transform: 'rotate(-90deg)',
    scale: 1.1,
  }

}
let posX;
let posY;

// function TestBoxTest(props){
//   let [testArr1, setTestArr1] = useState(props.testArr1);
//   let test1 = props.test1
//   let card2 = props.card2
//   let subContainer = props.subContainer
//   let isInSpread = props.isInSpread
//   return(

//     <TestBox1 
//           ref={test1}
//           //onClick={checkThisInfo}
//         >
//           {testArr1.map((a, i) =>{
//             return(
//               <DragTestBox2
//                 key={i}
//                 ref={card2}
//                 drag
//                 dragMomentum={false}
//                 testboxpos={test2Pos}
//                 dragConstraints={isInSpread === false ? subContainer : test1}
//                 onDrag={e => props.dragTest}
//                 onDragEnd={e => props.dragEndTest(e)}
//               >
//                 {a}
//               </DragTestBox2>
//             );
//           })}
          
//         </TestBox1>
//   );
// }
function DragTest() {

  let [isInSpread, setIsInSpread] = useState(false);
  let [test2Pos, setTest2Pos] = useState({});
  //let [card2Pos, setCard2Pos] = useState({});
  let _arr1 = [1, 2, 3]
  let [testArr1, setTestArr1] = useState(_arr1);

  let [isRotate, setRotate] = useState(false);

  let [clickCount, setClickCount] = useState(0);
  const container = useRef();
  const subContainer = useRef();
  const test1 = useRef(TestBox1);
  const test2 = useRef(); // 카드 생성 위치
  const card1 = useRef();
  const card2 = useRef(); // 카드 생성 위치 실험중인 카드
  const dragControl = useDragControls();

  useEffect(()=>{
    let _tempPos = test2.current.getBoundingClientRect();
    let tempPos ={
      x: _tempPos.x,
      y: _tempPos.y,
      width: _tempPos.width,
      height: _tempPos.height,
    }
    let _cardTempPos = card2.current.getBoundingClientRect();
    
    

    setTest2Pos(tempPos);
  }, [])
  useEffect(()=>{

  }, [isRotate]);

  let originLeft = null;
  let originTop = null;
  let originX = null; 
  let originY = null;

  const checkThisInfo = () =>{
    console.dir(test1)
    const temp = test1.current.getBoundingClientRect();
    console.dir(temp);
  }

  const checkThisInfo2 = () =>{
    const temp = test2.current.getBoundingClientRect();
    console.dir(temp);
  }

 
  const dragTest = (e) => {
    const temp1 = test1.current.getBoundingClientRect();
    const temp2 = test2.current.getBoundingClientRect();
    const _card1 = card1.current.getBoundingClientRect();

    console.log(temp1.width);

    originX = e.clientX;
    originY = e.clientY;
    originLeft = _card1.offsetLeft;
    originTop = _card1.offsetTop;
  }
  const dragEndTest = (e) =>{
    if(isInSpread === false){
        const temp1 = test1.current.getBoundingClientRect();
        console.log(e.offsetX);
        console.dir(e);
      if(e.clientX >= temp1.left 
        && e.clientX <= temp1.width
        && e.clientY >= temp1.top
        && e.clientY <= temp1.height){
          setIsInSpread(true);
          console.log('card enter');
        }
    }
    
  }
 

  const testExtraCard = (e) =>{
    let _tempArr = new Array(3);
    let _tempNum = 4;
    for(let i = 0; i < _tempArr.length; i++){
      _tempArr[i] = _tempNum;
      _tempNum++;
    }
    let _testArr1 = testArr1;
    for(let i = 0; i < _tempArr.length; i++){
      _testArr1.push(_tempArr[i]);
    }
    setTestArr1(_testArr1);
  }
  return (
    <TestContainer ref={container}>
      <SubTestContainer ref={subContainer}>
        <TestBox1 
          ref={test1}
          //onClick={checkThisInfo}
          //onDoubleClick={()=>{console.log('check')}}
        >
          {testArr1.map((a, i) =>{
            return(
              <DragTestBox2
                variants={cardTestVariants}
                key={i}
                ref={card2}
                drag
                dragMomentum={false}
                testboxpos={test2Pos}
                dragConstraints={isInSpread === false ? subContainer : test1}
                onDrag={e => dragTest}
                onDragEnd={e => dragEndTest(e)}
                isrotate={isRotate ? 'true' : 'false'}
                whileHover="hover"
          
                //onTap={() => setRotate(!isRotate)}
                onDoubleClick={(e) => {
                  console.log('heyho')
                  setRotate(!isRotate)
                }}
                
              >
                {a}
              </DragTestBox2>
            );
          })}
          
        </TestBox1>
        <TestBox2 
          ref={test2}
          onClick={checkThisInfo2}
          >
            
        </TestBox2>

      </SubTestContainer>
      <button 
        onClick={e => {
          let tempNum = clickCount;
          tempNum++;
          setClickCount(tempNum);
          testExtraCard(e)}}
      >배열 추가</button>
    </TestContainer>
  )
}

export default DragTest