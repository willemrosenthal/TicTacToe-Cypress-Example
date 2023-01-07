import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';

export default function App (props) {
  
  const [name, setName] = useState('');

  return (
    <div className='app'>
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

function EnterName () {

}


function Board (props) {
  let [boxState, updateBoxState] = useState(['','','','','','','','','']);
  let [currentTurn, changeTurn] = useState('O');
  const [message, setMessage] = useState('');


  function changeState(boxNum) { 
    // dont interact if game is over
    if (message !== '') return;

    // return if already set
    if (boxState[boxNum] !== '') return;

    // get X or O
    const updateTo = currentTurn;

    // rebuild array with change
    const copyOfBoxVals = boxState;
    copyOfBoxVals[boxNum] = updateTo;

    // update state
    updateBoxState( boxState = copyOfBoxVals );

    // switch turn
    changeTurn(currentTurn === 'O' ? 'X' : 'O');
  }

  function checkForStalemate() {
    if (message !== '') return;
    for (let i = 0; i < boxState.length; i++) {
      if (boxState[i] === '') return;
    }
    setMessage('Stalemate');
  }

  function checkForVictory() {
    // declare an array with all win conditions
    // itterate though that win conditon array
    // check each current one to see if it's the case
    // if we find a match, we do a brower alert

    const winCondition = [[boxState[0], boxState[1], boxState[2]], 
      [boxState[3], boxState[4], boxState[5]],
      [boxState[6], boxState[7], boxState[8]],
      [boxState[0], boxState[3], boxState[6]],
      [boxState[1], boxState[4], boxState[7]],
      [boxState[2], boxState[5], boxState[8]],
      [boxState[0], boxState[4], boxState[8]],
      [boxState[2], boxState[4], boxState[6]]
    ];

    for(let i = 0; i < winCondition.length; i++) {
      if(((winCondition[i][0]+'') === (winCondition[i][1]+'')) && ((winCondition[i][1]+'') === (winCondition[i][2]+'')) && ((winCondition[i][0]+'') !== '')){
        setMessage(`Player ${winCondition[i][0]} won the game!`);
        return;
      }
    }
    checkForStalemate();
  }
  

  // resets box state
  function clearBoard() {
    updateBoxState( boxState = ['','','','','','','','',''] );
    setMessage('');
  }

  // run any time currentTurn is changed. --- check for victory
  useEffect( () => {
    checkForVictory();
    // checkForStalemate();
  }, [currentTurn]); 


  function render() {
    // create rows
    const rows = [];
    for(let i = 0; i < 3; i++){
      const i1 = (i * 3);
      const i2 = (i * 3) + 1;
      const i3 = (i * 3) + 2;
      
      rows.push(
        <div className='rowContainer'>
          <Row display={[boxState[i1], boxState[i2], boxState[i3]]} changeState={changeState} keys={[i1,i2,i3]} message={message}/>
        </div>
      );
    }
    // return rows
    return (
      <div className='gameSpace'>
        <div className='currentTurn'><p><div className='turn'>{currentTurn}</div>'s turn</p></div>
        <div className='board'>
          {rows}
        </div>
        {message !== '' && <div className='gameMessage'>{message}</div>}
        {message !== '' && <div className='resetButton'><button name='reset' onClick={clearBoard}>New Game</button></div>}
      </div>
    );
  }

  // return
  return render();
}



// ROW
function Row (props) {
  const boxs = [];
  for (let i = 0; i < 3; i++) {
    boxs.push(
      <Box display={props.display[i]} changeState={props.changeState} boxNum={props.keys[i]} message={props.message} />
    );
  }
  return boxs;
}


// BOX
function Box (props) {
  return (
    <button onClick={() => {
      props.changeState(props.boxNum);
      //alert(this.props.boxNum);
    }} className={`box ${ props.message==='' ? "boxHover" : ""}`} name={props.boxNum}>{props.display}</button>
  );
}


// RUN APP
render(<App />, document.querySelector('#root'));
