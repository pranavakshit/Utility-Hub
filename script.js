// Navigation
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
        document.getElementById(button.dataset.section).classList.add('active');
    });
});

// Utility Navigation
document.querySelectorAll('.utility-card').forEach(card => {
    card.addEventListener('click', () => {
        const section = card.dataset.section;
        
        // Hide all sections first
        document.querySelectorAll('.section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(section);
        targetSection.classList.add('active');
        
        // Prevent body scrolling when section is open
        document.body.style.overflow = 'hidden';
    });
});

// Back Button Navigation
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Hide all sections
        document.querySelectorAll('.section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    });
});

// Calculator Implementation
class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        if (this.operation != null) {
            document.querySelector('.previous-operand').textContent = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}

const calculator = new Calculator();

document.querySelector('.calculator-grid').addEventListener('click', e => {
    if (e.target.matches('button')) {
        const button = e.target;
        if (button.classList.contains('span-two')) {
            if (button.textContent === 'AC') {
                calculator.clear();
            } else if (button.textContent === '=') {
                calculator.compute();
            }
        } else if (button.textContent === 'DEL') {
            calculator.delete();
        } else if ('+-×÷'.includes(button.textContent)) {
            calculator.chooseOperation(button.textContent);
        } else {
            calculator.appendNumber(button.textContent);
        }
        calculator.updateDisplay();
    }
});

// BMI Calculator Implementation
document.getElementById('calculate-bmi').addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const result = document.getElementById('bmi-result');

    if (weight && height) {
        const bmi = weight / (height * height);
        let category;

        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal weight';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';

        result.textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
        result.classList.add('show');
    } else {
        result.textContent = 'Please enter valid weight and height';
        result.classList.add('show');
    }
});

// Password Generator Implementation
const generatePassword = () => {
    const length = document.getElementById('password-length').value;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasLower = document.getElementById('lowercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSymbols = document.getElementById('symbols').checked;

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (hasUpper) chars += upper;
    if (hasLower) chars += lower;
    if (hasNumbers) chars += numbers;
    if (hasSymbols) chars += symbols;

    if (!chars) {
        alert('Please select at least one character type');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password-output').value = password;
};

document.getElementById('generate-password').addEventListener('click', generatePassword);
document.getElementById('copy-password').addEventListener('click', () => {
    const passwordOutput = document.getElementById('password-output');
    passwordOutput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

// Captcha Implementation
class Captcha {
    constructor() {
        this.canvas = document.getElementById('captcha-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.captchaText = '';
        this.canvas.width = 200;
        this.canvas.height = 60;
        this.init();
    }

    init() {
        this.ctx.fillStyle = '#27272a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.generateCaptcha();
    }

    generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        this.captchaText = '';
        
        for (let i = 0; i < 6; i++) {
            this.captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        this.ctx.fillStyle = '#27272a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add noise
        for (let i = 0; i < 100; i++) {
            this.ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;
            this.ctx.fillRect(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 2, 2);
        }

        // Add lines
        for (let i = 0; i < 4; i++) {
            this.ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.lineTo(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            this.ctx.stroke();
        }

        // Draw captcha text
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillStyle = '#fafafa';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        let x = this.canvas.width / (this.captchaText.length + 1);
        for (let i = 0; i < this.captchaText.length; i++) {
            const char = this.captchaText.charAt(i);
            const rotation = (Math.random() - 0.5) * 0.4;
            this.ctx.save();
            this.ctx.translate(x * (i + 1), this.canvas.height / 2);
            this.ctx.rotate(rotation);
            this.ctx.fillText(char, 0, 0);
            this.ctx.restore();
        }
    }

    validate(userInput) {
        return userInput.toLowerCase() === this.captchaText.toLowerCase();
    }
}

const captcha = new Captcha();

document.getElementById('refresh-captcha').addEventListener('click', () => {
    captcha.generateCaptcha();
});

document.getElementById('verify-captcha').addEventListener('click', () => {
    const userInput = document.getElementById('captcha-input').value;
    const result = document.getElementById('captcha-result');
    
    if (captcha.validate(userInput)) {
        result.textContent = 'Captcha verified successfully!';
        result.style.color = '#4ade80';
    } else {
        result.textContent = 'Invalid captcha. Please try again.';
        result.style.color = '#ef4444';
    }
    result.classList.add('show');
    document.getElementById('captcha-input').value = '';
    captcha.generateCaptcha();
});