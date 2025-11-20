<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#1c1c1e">
    <title>Jishnu Calculator</title>
    <style>
        * {
            box-sizing: border-box;
        }
        :root {
            --safe-area-inset-top: env(safe-area-inset-top);
            --safe-area-inset-bottom: env(safe-area-inset-bottom);
            --safe-area-inset-left: env(safe-area-inset-left);
            --safe-area-inset-right: env(safe-area-inset-right);
            --bg-primary: #1c1c1e;
            --bg-secondary: #2c2c2e;
            --bg-display: #000000;
            --text-primary: #ffffff;
            --text-secondary: #ffffff;
            --accent: #0a84ff;
            --operator: #ff9500;
            --clear: #ff3b30;
            --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            --border-radius: 12px;
            --transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg-primary);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: max(5px, env(safe-area-inset-left)) max(5px, env(safe-area-inset-right));
            padding-top: max(10px, env(safe-area-inset-top));
            padding-bottom: max(10px, env(safe-area-inset-bottom));
            overflow: auto;
        }
        .calculator {
            background: var(--bg-secondary);
            border-radius: var(--border-radius);
            padding: clamp(20px, 5vw, 25px);
            box-shadow: var(--shadow);
            width: min(95vw, 350px);
            max-width: 350px;
            animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .header {
            text-align: center;
            color: var(--text-primary);
            margin-bottom: 20px;
            font-size: clamp(1.2em, 4vw, 1.5em);
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .display-container {
            background: var(--bg-display);
            border-radius: var(--border-radius);
            padding: clamp(10px, 3vw, 15px);
            margin-bottom: 20px;
            min-height: clamp(60px, 12vw, 80px);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            transition: var(--transition);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .expression {
            color: #a0a0a0;
            font-size: clamp(0.8em, 2.5vw, 1.2em);
            text-align: right;
            margin-bottom: 5px;
            opacity: 0;
            transform: translateY(5px);
            transition: var(--transition);
        }
        .expression.show {
            opacity: 1;
            transform: translateY(0);
        }
        .result {
            color: var(--text-secondary);
            font-size: clamp(2em, 8vw, 3em);
            font-variant-numeric: tabular-nums;
            text-align: right;
            min-height: 1em;
        }
        .display-container:focus-within {
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 2px var(--accent);
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(5, 1fr);
            gap: 12px;
        }
        button {
            background: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid #3a3a3c;
            padding: clamp(15px, 5vw, 20px);
            font-size: clamp(1.2em, 4vw, 1.5em);
            font-weight: 500;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
            touch-action: manipulation;
            position: relative;
            min-height: clamp(45px, 10vw, 55px);
            min-width: clamp(45px, 10vw, 55px);
        }
        button:hover {
            background: #3a3a3c;
            transform: translateY(-1px);
            box-shadow: var(--shadow);
        }
        button:active {
            transform: translateY(0);
            background: #48484a;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .operator {
            background: var(--operator);
            color: var(--text-secondary);
            border-color: var(--operator);
        }
        .operator:hover {
            background: #ff9f1a;
        }
        .equals {
            background: var(--accent);
            color: var(--text-secondary);
            border-color: var(--accent);
            grid-column: 4;
            grid-row: 4 / 6;
            font-size: clamp(1.3em, 4.5vw, 1.6em);
        }
        .equals:hover {
            background: #0056b3;
        }
        .zero {
            grid-column: 1 / 3;
            grid-row: 5;
        }
        .clear {
            background: var(--clear);
            color: var(--text-secondary);
            border-color: var(--clear);
        }
        .clear:hover {
            background: #ff4d4d;
        }
        .backspace {
            background: #ffc107;
            color: var(--text-primary);
            border-color: #ffc107;
        }
        .backspace:hover {
            background: #ffda44;
        }
        .display-update {
            animation: slideInDisplay 0.2s ease-out;
        }
        @keyframes slideInDisplay {
            from { opacity: 0.8; transform: translateX(-5px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 600px) and (orientation: portrait) {
            body {
                align-items: flex-start;
                padding-top: max(20px, env(safe-area-inset-top));
                justify-content: center;
            }
            .calculator {
                width: 100%;
                max-width: none;
                border-radius: 20px;
                margin: 0 auto;
                padding: clamp(15px, 4vw, 20px);
            }
            .buttons {
                gap: 10px;
            }
            button {
                min-height: 50px;
                min-width: 50px;
            }
        }
        @media (max-width: 600px) and (orientation: landscape) {
            body {
                padding: max(5px, env(safe-area-inset-left)) max(5px, env(safe-area-inset-right));
                padding-top: max(5px, env(safe-area-inset-top));
                padding-bottom: max(5px, env(safe-area-inset-bottom));
            }
            .calculator {
                width: 100%;
                max-width: none;
                border-radius: 16px;
                padding: clamp(12px, 3vw, 16px);
            }
            .header {
                margin-bottom: 12px;
                font-size: clamp(1em, 3.5vw, 1.3em);
            }
            .display-container {
                margin-bottom: 12px;
                min-height: clamp(50px, 8vw, 60px);
            }
            .result {
                font-size: clamp(1.8em, 6vw, 2.5em);
            }
            .buttons {
                gap: 8px;
            }
            button {
                padding: clamp(10px, 3vw, 14px);
                min-height: 46px;
                min-width: 46px;
                font-size: clamp(1.1em, 3.5vw, 1.3em);
            }
        }
        @media (max-width: 360px) {
            .calculator {
                border-radius: 16px;
                padding: 12px;
            }
            .buttons {
                gap: 8px;
            }
            button {
                min-height: 48px;
                min-width: 48px;
            }
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="header">Jishnu Calculator</div>
        <div class="display-container" tabindex="0">
            <div class="expression" id="expression"></div>
            <div class="result" id="result">0</div>
        </div>
        <div class="buttons">
            <button class="clear" onclick="playSound(); clearDisplay()">C</button>
            <button class="backspace" onclick="playSound(); deleteLast()">⌫</button>
            <button class="operator" onclick="playSound(); appendToDisplay('/')">/</button>
            <button class="operator" onclick="playSound(); appendToDisplay('*')">×</button>
            
            <button onclick="playSound(); appendToDisplay('7')">7</button>
            <button onclick="playSound(); appendToDisplay('8')">8</button>
            <button onclick="playSound(); appendToDisplay('9')">9</button>
            <button class="operator" onclick="playSound(); appendToDisplay('-')">-</button>
            
            <button onclick="playSound(); appendToDisplay('4')">4</button>
            <button onclick="playSound(); appendToDisplay('5')">5</button>
            <button onclick="playSound(); appendToDisplay('6')">6</button>
            <button class="operator" onclick="playSound(); appendToDisplay('+')">+</button>
            
            <button onclick="playSound(); appendToDisplay('1')">1</button>
            <button onclick="playSound(); appendToDisplay('2')">2</button>
            <button onclick="playSound(); appendToDisplay('3')">3</button>
            <button class="equals" onclick="playSound(); calculate()">=</button>
            
            <button class="zero" onclick="playSound(); appendToDisplay('0')">0</button>
            <button onclick="playSound(); appendToDisplay('.')">.</button>
        </div>
    </div>

    <script>
        const expressionEl = document.getElementById('expression');
        const resultEl = document.getElementById('result');
        let currentExpression = '0';
        let displayValue = '0';
        let hasResult = false;
        let audioContext;

        function initAudio() {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        function playSound(frequency = 800, duration = 0.1) {
            if (!audioContext) initAudio();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }

        // Special sounds
        function playOperatorSound() {
            playSound(600, 0.15);
        }
        function playEqualsSound() {
            playSound(1000, 0.2);
        }
        function playClearSound() {
            playSound(400, 0.1);
        }

        function updateDisplay() {
            resultEl.textContent = displayValue;
            resultEl.classList.add('display-update');
            setTimeout(() => resultEl.classList.remove('display-update'), 200);
        }

        function showResultWithExpression(calcExpression, result) {
            expressionEl.textContent = calcExpression.replace(/×/g, '×'); // Keep visual ×
            expressionEl.classList.add('show');
            displayValue = result;
            hasResult = true;
            updateDisplay();
        }

        function appendToDisplay(value) {
            if (hasResult) {
                clearDisplay();
            }
            if (value === '*') {
                currentExpression += '*';
                displayValue += (displayValue === '0' ? '' : ' ') + '×';
                playOperatorSound();
            } else {
                if (displayValue === '0' && !['+', '-', '*', '/', '×'].includes(value)) {
                    displayValue = value;
                    currentExpression = value;
                } else {
                    displayValue += value;
                    currentExpression += value;
                }
                playSound();
            }
            if (['+', '-', '*', '/', '×'].includes(value)) {
                displayValue += ' ';
            }
            updateDisplay();
        }

        function clearDisplay() {
            displayValue = '0';
            currentExpression = '0';
            hasResult = false;
            expressionEl.classList.remove('show');
            updateDisplay();
            playClearSound();
        }

        function deleteLast() {
            if (hasResult) {
                clearDisplay();
                return;
            }
            if (displayValue.length > 1) {
                displayValue = displayValue.slice(0, -1);
                currentExpression = currentExpression.slice(0, -1);
                if (['+', '-', '*', '/', '×', ' '].includes(displayValue.slice(-1))) {
                    displayValue = displayValue.slice(0, -2);
                    currentExpression = currentExpression.slice(0, -1);
                }
            } else {
                displayValue = '0';
                currentExpression = '0';
            }
            updateDisplay();
            playSound(500, 0.08);
        }

        function calculate() {
            if (hasResult) {
                // If already has result, treat as new input
                currentExpression = displayValue;
                hasResult = false;
                expressionEl.classList.remove('show');
            }
            try {
                const evalExpression = currentExpression.replace(/×/g, '*');
                let result = eval(evalExpression);
                if (!isFinite(result)) {
                    throw new Error('Invalid');
                }
                result = result.toString().includes('.') ? parseFloat(result.toFixed(10)).toString() : result.toString();
                showResultWithExpression(currentExpression, result);
                playEqualsSound();
            } catch (error) {
                resultEl.textContent = 'Error';
                playSound(200, 0.3);
                setTimeout(clearDisplay, 1500);
            }
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            if (key >= '0' && key <= '9' || key === '.') {
                appendToDisplay(key);
                event.preventDefault();
            } else if (['+', '-', '*', '/'].includes(key)) {
                appendToDisplay(key);
                event.preventDefault();
            } else if (key === 'Enter' || key === '=') {
                calculate();
                event.preventDefault();
            } else if (key.toLowerCase() === 'c' || key === 'Escape') {
                clearDisplay();
                event.preventDefault();
            } else if (key === 'Backspace') {
                deleteLast();
                event.preventDefault();
            }
        });

        // Prevent zoom on iOS
        document.querySelector('.display-container').addEventListener('touchstart', function(e) { e.preventDefault(); }, { passive: false });

        // Init on first interaction for audio (user gesture policy)
        document.addEventListener('click', initAudio, { once: true });
    </script>
</body>
</html>
