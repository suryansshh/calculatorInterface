import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentInput: '',
      previousInput: '',
      operator: '',
      memory: [],
    };
  }

  componentDidMount(){
    this.toggleDarkMode();
  }

  handleButtonClick = (value) => {
    if (value === 'C') {
      this.clearDisplay();
    } else if (value === '=') {
      if (this.state.currentInput !== '') { // Check if there's input to calculate
        const result = this.calculateResult();
        this.setState({
          display: result,
          currentInput: result,
          previousInput: '',
          operator: '',
        });
      }
      if (this.state.display !== 'Error') {
        const result = this.calculateResult();
        this.setState({
          display: result,
          currentInput: result,
          previousInput: '',
          operator: '',
        });
      }
    } else if (value === 'Backspace') {
      this.backspace();
    } else if (value === '.') {
      this.addDecimalPoint();
    } else {
      this.setState((prevState) => {
        if (prevState.display === '0' && prevState.operator === '') {
          return {
            display: value,
            currentInput: value,
          };
        } else {
          const newDisplay =
            value === '+' || value === '-' || value === '*' || value === '/'
              ? `${prevState.display} ${value} `
              : `${prevState.display}${value}`;

          return {
            display: newDisplay,
            currentInput: prevState.operator ? value : prevState.currentInput + value,
          };
        }
      });
    }
  };



  addDecimalPoint = () => {
    this.setState((prevState) => {
      const currentDisplay = prevState.display;
      const currentInput = prevState.currentInput;

      if (currentInput.includes('.') || currentDisplay === 'Error') {
        return {}; // Do nothing if a decimal point already exists or if there's an error.
      } else {
        return {
          display: currentDisplay + '.',
          currentInput: currentInput + '.',
        };
      }
    });
  };


  backspace = () => {
    this.setState((prevState) => {
      const currentDisplay = prevState.display;
      const currentInput = prevState.currentInput;
      const newDisplay = currentDisplay.slice(0, -1);
      const newInput = currentInput.slice(0, -1);

      return {
        display: newDisplay,
        currentInput: newInput,
      };
    });
  };

  clearDisplay = () => {
    this.setState({
      display: '0',
      currentInput: '',
      previousInput: '',
      operator: '',
    });
  };

  handleOperator = (operator) => {
    this.setState((prevState) => ({
      display: operator,
      previousInput: prevState.currentInput,
      currentInput: '',
      operator,
    }));
  };

  calculateResult = () => {
    if (this.state.currentInput === '') {
      return '0'; // Return 0 when there's no input
    }
    try {
      const { display, memory } = this.state;
      const result = eval(display);

      // Save the expression and result in memory
      const memoryItem = {
        expression: display,
        result: result,
      };

      this.setState((prevState) => ({
        memory: [...prevState.memory, memoryItem].slice(-3),
        display: result.toString(),
        currentInput: result.toString(),
        previousInput: '',
        operator: '',
      }));

      return result.toString();
    } catch (error) {
      this.setState({
        display: 'Error',
        currentInput: '',
        previousInput: '',
        operator: '',
      });

      return 'Error';
    }
  };

  toggleDarkMode = () => {
    const calculators = document.getElementsByClassName("calculator");
    for (const calculator of calculators) {
      calculator.classList.add('dark-mode');
    }

    const modes = document.getElementsByClassName("mode-btn");
    for (const mode of modes) {
      mode.classList.add('dark-mode-btn');
    }

    const oprs = document.getElementsByClassName("opr");
    for (const opr of oprs) {
      opr.classList.add('opr-dark-mode');
    }

    const buttons = document.getElementsByClassName("buttons");
    for (const button of buttons) {
      button.classList.add('button-dark-mode');
    }
  };

  toggleLightMode = () => {
    const calculators = document.getElementsByClassName("calculator");
    for (const calculator of calculators) {
      calculator.classList.remove('dark-mode');
    }

    const buttons = document.getElementsByClassName("buttons");
    for (const button of buttons) {
      button.classList.remove('button-dark-mode');
    }

    const modes = document.getElementsByClassName("mode-btn");
    for (const mode of modes) {
      mode.classList.remove('dark-mode-btn');
    }

    const oprs = document.getElementsByClassName("opr");
    for (const opr of oprs) {
      opr.classList.remove('opr-dark-mode');
    }

  };



  render() {
    return (
      <div className="calculator">
        <div className="top-bar">
          <button className='mode-btn' onClick={this.toggleLightMode}><span class="material-symbols-outlined">light_mode</span></button>
          <button className='mode-btn' onClick={this.toggleDarkMode}><span class="material-symbols-outlined">dark_mode</span></button>
        </div>

        <div className="display">
          <div className="memory">
            <ul>
              {this.state.memory.map((item, index) => (
                <li key={index}>{item.expression} = {item.result}</li>
              ))}
            </ul>
          </div>
          {this.state.display}
        </div>
        <div className="buttons">
          <button className='opr' onClick={() => this.handleButtonClick('9')}>9</button>
          <button className='opr' onClick={() => this.handleButtonClick('8')}>8</button>
          <button className='opr' onClick={() => this.handleButtonClick('4')}>4</button>
          <button className='opr purple' onClick={() => this.handleButtonClick('Backspace')}><i className="material-icons">backspace</i></button>
          <button className='opr' onClick={() => this.handleButtonClick('5')}>5</button>
          <button className='opr' onClick={() => this.handleButtonClick('6')}>6</button>
          <button className='opr' onClick={() => this.handleButtonClick('7')}>7</button>
          <button className='opr purple' onClick={() => this.handleButtonClick('/')}>÷</button>
          <button className='opr' onClick={() => this.handleButtonClick('1')}>1</button>
          <button className='opr' onClick={() => this.handleButtonClick('2')}>2</button>
          <button className='opr' onClick={() => this.handleButtonClick('3')}>3</button>
          <button className='opr purple' onClick={() => this.handleButtonClick('*')}><span>&#215;</span></button>
          <button className='opr' onClick={() => this.handleButtonClick('0')}>0</button>
          <button className='opr ' onClick={() => this.handleButtonClick('.')}>.</button>
          <button className='opr' onClick={() => this.handleButtonClick('-')}><span>&#8722;</span></button>
          <button className='opr purple' onClick={() => this.handleButtonClick('+')}>+</button>
          <button className='opr' onClick={() => this.handleButtonClick('C')}>C</button>
          <button className='opr' onClick={() => this.handleButtonClick('=')}>=</button>
        </div>

      </div >
    );
  }
}

export default Calculator;
