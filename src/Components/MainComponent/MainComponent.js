
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable';
import {Link} from 'react-router-dom'

function MainComponent() {

    const [value, setValue] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    let [deduplicationNumArr, setDeduplicationNumArr] = useState([]);
    let cardData ={
        cardNum: value,
        cardName: 'fool'
    }

    const onChangeHandler = (e) => {
        setValue(e.target.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const num = Number(value);
        let tempNumArr = new Array(num);;
        for(let i = 0; i < tempNumArr.length; i++)
        {
            let ranNum = Math.floor(Math.random() * 78);
            tempNumArr[i] = ranNum;
            for(let j = 0; j < i; j++)
            {
                if(tempNumArr[i] === tempNumArr[j])
                {
                    i--;
                    break;
                }
            }
        }
        setDeduplicationNumArr([...tempNumArr]);
        setIsCreated(true);
    }
    function TestCardComponent({cardData, zIndex}){
        
        const [position, setPosition] = useState({x : 0, y : 0});
        const trackPos = (data) => {
            setPosition({
                x : data.x,
                y : data.y,
            });
        }
        const nodeRef = useRef(null);
        let num = cardData.cardNum;
        let name = cardData.cardName;
        
        return (
            <Draggable nodeRef={nodeRef} onDrag={(e, data) => trackPos(data)}>
                <div
                    ref={nodeRef}
                    className='test1'
                    onClick={()=>{console.log(value, num, name)}}
                    style={{
                        zIndex : {zIndex},
                        //position : 'absolute'
                    }}
                    
                >
                    {cardData.cardName}
                </div>
            </Draggable>
        );
    }
    return (
        <>
            <form 
                className='test1Form'
                type='submit'
                onSubmit={onSubmitHandler}
                >
                <input 
                    type="number" 
                    value={value}
                    onChange={onChangeHandler} 
                />
                <button type='submit'>Create</button>
                <Link to="/fourth">Move</Link>
            </form>
            {isCreated === true 
            ? 
            <div style={{position : 'relative'}}>
                { deduplicationNumArr.map((a, i) => {
                    return(
                        <TestCardComponent key={i} RNum={a} cardData={cardData} zIndex={i} />
                    );
                })
                }
            </div>
            : null}
        </>
    )
}

export default MainComponent
/* 

}
*/