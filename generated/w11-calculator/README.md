# Windows 11 Calculator - Basic Mode

A web-based calculator that replicates the Basic Mode functionality of the Windows 11 Calculator.

## 🚀 Features

### Standard Operations
- **Basic Arithmetic**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Advanced Functions**:
  - Percentage (%)
  - Square Root (√x)
  - Square (x²)
  - Reciprocal (1/x)
  - Negate (+/−)

### Memory Functions
- **MC** - Memory Clear
- **MR** - Memory Recall
- **M+** - Add to Memory
- **M−** - Subtract from Memory
- **MS** - Memory Store

### Additional Features
- **Clear (C)**: Reset all calculations
- **Clear Entry (CE)**: Clear current entry
- **Backspace (⌫)**: Delete last digit
- **Full Keyboard Support**: Use your keyboard for faster input
- **Responsive Design**: Works on desktop and mobile devices

## 🎨 Design

The calculator features:
- Clean, modern Windows 11-inspired interface
- Responsive layout using Tailwind CSS
- Smooth animations and transitions
- Professional color scheme matching Windows 11

## 🖥️ Technology Stack

- **HTML5**: Structure and markup
- **CSS3**: Custom styling
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **Vanilla JavaScript**: Calculator logic and functionality

## 📦 Installation & Usage

### Option 1: Direct File Opening
1. Download all files (index.html, styles.css, calculator.js)
2. Open `index.html` in any modern web browser

### Option 2: Local Development Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Number input |
| + | Addition |
| - | Subtraction |
| * | Multiplication |
| / | Division |
| Enter or = | Calculate result |
| . or , | Decimal point |
| Backspace | Delete last digit |
| Escape | Clear all |
| % | Percentage |

## 🎯 How to Use

### Basic Calculations
1. Click number buttons or use keyboard to enter numbers
2. Click an operator (+, −, ×, ÷)
3. Enter the second number
4. Press = or Enter to see the result

### Advanced Functions
- **Percentage**: Enter a number, then click %
- **Square Root**: Enter a number, then click √x
- **Square**: Enter a number, then click x²
- **Reciprocal**: Enter a number, then click 1/x
- **Negate**: Enter a number, then click +/− to toggle sign

### Memory Operations
1. Perform a calculation
2. Click **MS** to store the result in memory
3. Use **MR** to recall the stored value
4. Use **M+** or **M−** to add/subtract from memory
5. Click **MC** to clear memory

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🏗️ Project Structure

```
calculator/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styling
├── calculator.js       # Calculator logic and functionality
└── README.md          # This file
```

## 🔧 Features Implementation

### Calculator Logic
- Maintains state for current value, previous value, and operation
- Handles chained operations correctly
- Prevents division by zero
- Formats large numbers with scientific notation
- Supports decimal precision

### Memory System
- Independent memory storage
- Visual feedback for memory state
- Disabled buttons when memory is empty

### UI/UX Enhancements
- Button press animations
- Hover effects for better interactivity
- Expression display shows ongoing calculations
- Responsive text sizing for long numbers

## 🎓 Learning Points

This project demonstrates:
- Object-oriented JavaScript (ES6 Classes)
- DOM manipulation and event handling
- State management in vanilla JavaScript
- CSS Grid for layout
- Responsive design principles
- Keyboard event handling

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this calculator!

## 📧 Support

If you encounter any issues or have suggestions, please open an issue on the repository.

---

**Enjoy calculating!** 🧮
