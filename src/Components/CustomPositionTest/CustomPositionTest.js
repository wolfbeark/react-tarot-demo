import React, { useRef, useState } from 'react'

function CustomPositionTest() {

    const testBox = useRef(null);
    const startBox = useRef(null);

    let [cardCount, increaseCount] = useState(0);
    let [cardNumInfoArr, setCardNumInfoArr] = useState([{
        index : cardCount,
        number: `${cardCount+=1}`,
        check : () => {
            console.log(this.number);
        }
    }]);
    let consoletest = [];
    console.log(consoletest.length);
    const checkBtn = (e) => {
        e.preventDefault();
        let rect = testBox.current.getBoundingClientRect();
        console.log(rect.x);
        console.log(rect.y);
        console.log(rect.width);
        console.log(rect.height);
        
        setCardNumInfoArr(() =>{
            if(cardNumInfoArr.length === 1){
                let tempObj = cardNumInfoArr[0];
                tempObj.index = 0;
                tempObj.number = 1;
                let tempArr = [tempObj];
                setCardNumInfoArr(tempArr);
                return
            }
            else{
                let tempArr = [...cardNumInfoArr,
                    {
                        index : cardCount,
                        number: `${cardCount+=1}`,
                        check : () => {
                            console.log(this.number);
                        }
                    }
                ];
            }
            
        })
        let tempNum = cardCount;
        tempNum++;
        increaseCount(tempNum);
    }
    
    function TestCreateFixPosBox({number, index, check}){
        
        return(
            <div
                style={{
                    width: '200px',
                    height: '250px',
                    backgroundColor: 'green'
                }}
                index={index}
                number={number}
                onClick={check}
                
            >

            </div>
        );
    }
    return (
    <div>
        <button
            onClick={checkBtn}
        >
            Position Check
        </button>
        <div
            ref={testBox}
            style={{
                width: '200px',
                height: '30px',
                backgroundColor : 'red'
            }}
        >
            This Box!
        </div>
        <div
            ref={startBox} 
            style={{
                width: '300px',
                height: ' 350px',
                backgroundColor: 'blue',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {cardCount === 0 ?<span>Started Position</span> : null}
            {cardCount !== 0  
            ? cardNumInfoArr.map((a, i) => {
                return (
                    <TestCreateFixPosBox key={i} />
                );
            })
            : null}
        </div>
    </div>
  )
}

export default CustomPositionTest