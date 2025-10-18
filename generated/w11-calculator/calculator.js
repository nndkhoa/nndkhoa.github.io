// Calculator State Management
class Calculator {
  constructor() {
    this.display = document.getElementById('display');
    this.expression = document.getElementById('expression');
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
    this.memory = 0;
    this.lastOperation = null;
    this.lastOperand = null;

    this.init();
  }

  init() {
    // Number buttons
    document.querySelectorAll('.number-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        if (value !== undefined) {
          this.inputDigit(value);
        } else if (e.target.dataset.action === 'decimal') {
          this.inputDecimal();
        }
      });
    });

    // Operator buttons
    document.querySelectorAll('.operator-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.performOperation(action);
      });
    });

    // Function buttons
    document.querySelectorAll('.function-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleFunction(action);
      });
    });

    // Equals button
    document.querySelector('.equals-btn').addEventListener('click', () => {
      this.calculate();
    });

    // Memory buttons
    document.querySelectorAll('.memory-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleMemory(action);
      });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });

    this.updateMemoryButtons();
  }

  inputDigit(digit) {
    if (this.waitingForOperand) {
      this.currentValue = digit;
      this.waitingForOperand = false;
    } else {
      this.currentValue = this.currentValue === '0' ? digit : this.currentValue + digit;
    }
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.waitingForOperand) {
      this.currentValue = '0.';
      this.waitingForOperand = false;
    } else if (this.currentValue.indexOf('.') === -1) {
      this.currentValue += '.';
    }
    this.updateDisplay();
  }

  performOperation(nextOperation) {
    const inputValue = parseFloat(this.currentValue);

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operation && !this.waitingForOperand) {
      const result = this.performCalculation();
      this.currentValue = String(result);
      this.previousValue = result;
    }

    this.waitingForOperand = true;
    this.operation = nextOperation;
    this.lastOperation = nextOperation;
    this.lastOperand = inputValue;
    this.updateExpression();
  }

  performCalculation() {
    const prev = this.previousValue;
    const current = parseFloat(this.currentValue);

    switch (this.operation) {
      case 'add':
        return prev + current;
      case 'subtract':
        return prev - current;
      case 'multiply':
        return prev * current;
      case 'divide':
        if (current === 0) {
          alert('Cannot divide by zero');
          return prev;
        }
        return prev / current;
      default:
        return current;
    }
  }

  calculate() {
    if (this.operation && this.previousValue !== null) {
      const result = this.performCalculation();
      this.currentValue = String(result);
      this.previousValue = null;
      this.operation = null;
      this.waitingForOperand = true;
      this.updateDisplay();
      this.expression.textContent = '';
    } else if (this.lastOperation && this.lastOperand !== null) {
      // Repeat last operation (Windows Calculator behavior)
      this.previousValue = parseFloat(this.currentValue);
      this.operation = this.lastOperation;
      this.currentValue = String(this.lastOperand);
      const result = this.performCalculation();
      this.currentValue = String(result);
      this.previousValue = null;
      this.operation = null;
      this.waitingForOperand = true;
      this.updateDisplay();
    }
  }

  handleFunction(action) {
    const current = parseFloat(this.currentValue);

    switch (action) {
      case 'clear':
        this.currentValue = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
        this.lastOperation = null;
        this.lastOperand = null;
        this.expression.textContent = '';
        break;

      case 'clear-entry':
        this.currentValue = '0';
        this.waitingForOperand = false;
        break;

      case 'backspace':
        if (!this.waitingForOperand) {
          this.currentValue = this.currentValue.length > 1
            ? this.currentValue.slice(0, -1)
            : '0';
        }
        break;

      case 'negate':
        this.currentValue = String(current * -1);
        break;

      case 'percent':
        if (this.previousValue !== null && this.operation) {
          // Calculate percentage of previous value
          this.currentValue = String((this.previousValue * current) / 100);
        } else {
          this.currentValue = String(current / 100);
        }
        break;

      case 'sqrt':
        if (current < 0) {
          alert('Invalid input');
          return;
        }
        this.currentValue = String(Math.sqrt(current));
        this.waitingForOperand = true;
        break;

      case 'square':
        this.currentValue = String(current * current);
        this.waitingForOperand = true;
        break;

      case 'reciprocal':
        if (current === 0) {
          alert('Cannot divide by zero');
          return;
        }
        this.currentValue = String(1 / current);
        this.waitingForOperand = true;
        break;
    }

    this.updateDisplay();
  }

  handleMemory(action) {
    const current = parseFloat(this.currentValue);

    switch (action) {
      case 'mc':
        this.memory = 0;
        break;

      case 'mr':
        this.currentValue = String(this.memory);
        this.waitingForOperand = true;
        this.updateDisplay();
        break;

      case 'm+':
        this.memory += current;
        break;

      case 'm-':
        this.memory -= current;
        break;

      case 'ms':
        this.memory = current;
        break;

      case 'm-history':
        // Not implemented in basic mode
        break;
    }

    this.updateMemoryButtons();
  }

  updateMemoryButtons() {
    const memoryButtons = document.querySelectorAll('.memory-btn');
    memoryButtons.forEach(btn => {
      if (this.memory === 0 && ['mc', 'mr'].includes(btn.dataset.action)) {
        btn.classList.add('disabled');
      } else {
        btn.classList.remove('disabled');
      }
    });
  }

  handleKeyboard(e) {
    const key = e.key;

    // Numbers
    if (key >= '0' && key <= '9') {
      e.preventDefault();
      this.inputDigit(key);
    }

    // Decimal point
    if (key === '.' || key === ',') {
      e.preventDefault();
      this.inputDecimal();
    }

    // Operators
    if (key === '+') {
      e.preventDefault();
      this.performOperation('add');
    }
    if (key === '-') {
      e.preventDefault();
      this.performOperation('subtract');
    }
    if (key === '*') {
      e.preventDefault();
      this.performOperation('multiply');
    }
    if (key === '/') {
      e.preventDefault();
      this.performOperation('divide');
    }

    // Equals
    if (key === 'Enter' || key === '=') {
      e.preventDefault();
      this.calculate();
    }

    // Backspace
    if (key === 'Backspace') {
      e.preventDefault();
      this.handleFunction('backspace');
    }

    // Escape (Clear)
    if (key === 'Escape') {
      e.preventDefault();
      this.handleFunction('clear');
    }

    // Percentage
    if (key === '%') {
      e.preventDefault();
      this.handleFunction('percent');
    }
  }

  updateDisplay() {
    const value = parseFloat(this.currentValue);

    // Format large numbers with scientific notation
    if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
      this.display.textContent = value.toExponential(6);
    } else {
      // Format with appropriate decimal places
      const formatted = parseFloat(this.currentValue).toString();
      this.display.textContent = formatted.length > 16
        ? parseFloat(formatted).toPrecision(12)
        : this.currentValue;
    }
  }

  updateExpression() {
    if (this.previousValue !== null && this.operation) {
      const operatorSymbol = {
        'add': '+',
        'subtract': '−',
        'multiply': '×',
        'divide': '÷'
      }[this.operation];

      this.expression.textContent = `${this.previousValue} ${operatorSymbol}`;
    }
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});
