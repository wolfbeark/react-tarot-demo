import React from 'react'

function MainSpreadInBox(props) {

    const drop = (e) =>{
        e.preventDefault();
        const card_id = e.dataTransfer.getData('cardId');

        const card = document.getElementById(props.card_id);
        card.style.display = 'block';

        e.target.appendchild(card);

    }

  return (
    <div>MainSpreadInBox</div>
  )
}

export default MainSpreadInBox