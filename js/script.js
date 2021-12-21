const BLACKLISTED_KEY_CODES = [38];

let userInput, terminalOutput;


const app = () => {
    userInput = document.getElementById('userInput');
    terminalOutput = document.getElementById('terminalOutput');
    document.getElementById('dummyKeyboard').focus();
    console.log('Application loaded');

    //URL Redirects
    if (window.location.href.endsWith("/#TuffyHacks")) {
        window.open("https://tuffyhacks.com");
    }
    else if (window.location.href.endsWith("/#GPAide")) {
        window.open("https://github.com/samuelsandoval1/223w-gp-aide");
    }
    else if (window.location.href.endsWith("/#API")) {
        window.open("http://github.com/samuelsandoval1/api.samuelsandoval.me");
    }
    else if (window.location.href.endsWith("/#Flix")) {
        window.open("http://github.com/samuelsandoval1/Flix");
    }
};

const fetchResults = async function fetchData(routeLink) {
    console.log("got here");
    // currently fetches but cant get promise specifics
    var response = await fetch('https://cors-anywhere.herokuapp.com/'+'http://api.samuelsandoval.me/' + routeLink) 
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    console.log("got here3" + data);
    
    return data;
};

const execute = async function executeCommand(input) {
    let output;
    input = input.toLowerCase();
    if (input.length === 0) {
        return;
    }
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (input === 'clear') {
        console.log('Clear command ran');
        location.reload();
    }
    else {
        if (input.includes("help")) {
            var modifiedInput = input += "_message";
            const result = await fetchResults(modifiedInput.toLowerCase());
            console.log("here3 "+result);
            output += result['text'];
        }
        else if (input.includes("about")) {
            const result = await fetchResults(input.toLowerCase());
            output += result['text'];
        }
        else if (input.includes("education")) {
            const result = await fetchResults(input.toLowerCase());
            output += result['text'];
        }
        else if (input.includes("experience")) {
            const result = await fetchResults(input.toLowerCase());
            output += result['text'];
        }
        else if (input.includes("the gospel")) {
            const result = await fetchResults("gospel");
            for (const textField in result){
                output += result[textField];
            }
        }
        else if (input.includes("projects")) {
            const result = await fetchResults(input.toLowerCase());
            for (const project in result){
                output += result[project];
            }
        }
        else{
            output += `<div class="terminal-line"> ${input}: command not found</div>`;
            console.log('Oops! no such command');
        }
    }
    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
    const input = userInput.innerHTML;

    if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
        return;
    }

    if (e.key === 'Enter') {
        execute(input);
        userInput.innerHTML = '';
        return;
    }

    userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(
        0,
        userInput.innerHTML.length - 1
    );
};

document.addEventListener('keydown', backspace);
document.addEventListener('keypress', key);
document.addEventListener('DOMContentLoaded', app);
