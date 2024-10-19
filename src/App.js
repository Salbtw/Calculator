import { useState } from 'react';
import './App.css';

function App() {
  const [boxValue, setBoxValue] = useState('');
  const [bOf, setBoF] = useState('←');
  const [answClicked, setAnswerClicked] = useState(false)
  // const [lastClicked, setLastClicked] = useState('');

  const display = (x) => {
    if (boxValue === '') {
      setBoF('OFF')
      setBoxValue(String(x));
    }
  };

  const number = (x) => {
    if (boxValue === '0') {
      setBoF('←');
      setBoxValue(String(x));
    } else  if (boxValue !== '0' && boxValue !== '') {
      setBoF('←');
      setBoxValue(`${boxValue}${x}`);
    }
  };

  const dmas = (x) => {
    if (boxValue === 0) {
      setBoxValue(String(x));
    } else if (boxValue !== '') {
      setBoxValue(`${boxValue}` + `${x}`);
    }
  }

  const squared = () => {
    if (boxValue !== '') {
      setBoxValue(`${boxValue}²`);
    }
  };

  const preprocessExpression = (expression) => {
    // Use a regular expression to find instances of numbers followed by "²"
    return expression.replace(/(\d+)²/g, (match, number) => {
      return `Math.pow(${number}, 2)`; // Replace with Math.pow(number, 2)
    });
  };

  const backspace = () => {
    if (boxValue !== 0) {
      setBoxValue(boxValue.slice(0, -1));
    }
    if (!boxValue[1] && boxValue !== '') {
      setBoF('OFF');
      setBoxValue('0');
    }
    if (boxValue === '0') {
      setBoF('←');
      setBoxValue('');
    }
    if (answClicked) {
      setAnswerClicked(false);
      setBoF('OFF');
      setBoxValue('0');
    }
  }

  const decimalPoint = () => {
    if (!boxValue.includes('.') && boxValue !== '') {
      setBoxValue(`${boxValue}.`);
    } else {
      setBoxValue(boxValue);
    }
  }
  
  const clearAll = () => {
    if (boxValue !== '0' && boxValue !== '') {
      setAnswerClicked(false);
      setBoxValue('0');
    } 
  };

  const equals = () => {
    // if (boxValue.includes('÷')) {
    //   const [num1, num2] = boxValue.split('÷');
    //   if (num1.includes('÷')) {
    //     const [num3, num4] = num1.split('÷');
    //     let answ1 = num4 / num2;
    //   } else if (num1.includes('*')) {
    //     const [num3, num4] = num1.split('*');
    //     let answ1 = num4 / num2;
    //   } else if (num1.includes('+')) {
    //     const [num3, num4] = num1.split('+');
    //     let answ1 = num4 / num2;
    //   } else if (num1.includes('-')) {
    //     const [num3, num4] = num1.split('-');
    //     let answ1 = num4 / num2;
    //   }
    //   if (boxValue.includes('x')) {
    //     const [num1, num2] = boxValue.split('x');
    //     let answ = num1 * num2;
    //     if (boxValue.includes('+')) {
    //       const [num1, num2] = boxValue.split('+');
    //       let answ = parseInt(num1) + parseInt(num2);
    //       if (boxValue.includes('-')) {
    //         const [num1, num2] = boxValue.split('-');
    //         let answ = num1 - num2;
    //         setBoxValue(answ);
    //       }
    //       setBoxValue(answ)
    //     }
    //     setBoxValue(answ)
    //   }
    //   setBoxValue(answ)
    // }
    // else if (boxValue.includes('x')) {
    //   const [num1, num2] = boxValue.split('x');
    //   let answ = num1 * num2;
    //   if (boxValue.includes('+')) {
    //     const [num1, num2] = boxValue.split('+');
    //     let answ = parseInt(num1) + parseInt(num2);
    //     if (boxValue.includes('-')) {
    //       const [num1, num2] = boxValue.split('-');
    //       let answ = num1 - num2;
    //       setBoxValue(answ);
    //     }
    //     setBoxValue(answ)
    //   }
    //   setBoxValue(answ)
    // }
    // else if (boxValue.includes('+') && boxValue.includes('-')) {
    //   const [num1, num2] = boxValue.split('+');
    //   let answ1 = parseInt(num1) + parseInt(num2);
    //     const [num3, num4] = boxValue.split('-');
    //     if (num3 === answ1){
    //       let answ2 = answ1 - num4
    //       setBoxValue(answ2);
    //     } else if (num4 === answ1) {
    //       let answ2 = num3 - answ1
    //       setBoxValue(answ2);
    //     }
    // }
    // else if (boxValue.includes('+') && !boxValue.includes('-')) {
    //   const [num1, num2] = boxValue.split('+');
    //   let answ1 = parseInt(num1) + parseInt(num2);
    //   setBoxValue(answ1);
    // }
    // else if (boxValue.includes('-')) {
    //   const [num1, num2] = boxValue.split('-');
    //   let answ = num1 - num2;
    //   setBoxValue(answ);
    // }

    // for (let i = 0; i < boxValue.length; i++) {
    //   let arr = []
    // }

    if (boxValue !== '') { 
      try {
        let processedExpression = preprocessExpression(boxValue); // Handle squared numbers
        processedExpression = processedExpression.replace(/x/g, '*').replace(/÷/g, '/'); // Replace 'x' and '÷'
        
        const result = eval(processedExpression); // Use eval to calculate the expression
        setBoxValue(String(result));
      } 
      catch (error) {
        setBoxValue('Error');
      }
      setAnswerClicked(true);
    }
  }

  return (
    <div className="App">
      <div className="calc">
        <div>
          <input type="text" readOnly id="box" value={boxValue}/>
        </div>
        <div className="buttons">
          <button id="on" onClick={() => display(0)}>ON</button>
          <button id="squared" onClick={() => squared()}>x²</button>
          <button id="delete" onClick={() => backspace()}>{bOf}</button>
          <button id="x" onClick={() => dmas('x')}>x</button>
          <br />
          <button id="1" onClick={() => number(1)}>1</button>
          <button id="2" onClick={() => number(2)}>2</button>
          <button id="3" onClick={() => number(3)}>3</button>
          <button id="divide" onClick={() => dmas('÷')}>÷</button>
          <br />
          <button id="4" onClick={() => number(4)}>4</button>
          <button id="5" onClick={() => number(5)}>5</button>
          <button id="6" onClick={() => number(6)}>6</button>
          <button id="add" onClick={() => dmas('+')}>+</button>
          <br />
          <button id="7" onClick={() => number(7)}>7</button>
          <button id="8" onClick={() => number(8)}>8</button>
          <button id="9" onClick={() => number(9)}>9</button>
          <button id="minus" onClick={() => dmas('-')}>-</button>
          <br />
          <button id="0" onClick={() => number(0)}>0</button>
          <button id="decimal" onClick={() => decimalPoint()}>.</button>
          <button id="clear" onClick={() => clearAll()}>AC</button>
          <button id="answer" onClick={() => equals()}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
