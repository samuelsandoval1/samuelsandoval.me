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
    var response = await fetch(`http://api.allorigins.win/get?url=${encodeURIComponent('http://api.samuelsandoval.me/'+ routeLink)}`);
    let data = await response.json();
    data = JSON.parse(data.contents);  
    print(data)  
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
        if (input.includes("help")) { // works
            var modifiedInput = input += "_message";
            const result = await fetchResults(modifiedInput.toLowerCase());
        //    console.log("result from fetchResults "+result);
            output += result.text;
        }
        else if (input.includes("about")) {
            const result = await fetchResults(input.toLowerCase());
            output += result.text;
        }
        else if (input.includes("education")) {
            const result = await fetchResults(input.toLowerCase());
            output += result.text;
        }
        else if (input.includes("experience")) {
            print("in experience")
           // const result = await fetchResults(input.toLowerCase());

            output += '<strong class="header-name">USAA (May 2022 - August 2022) </strong><br><i>Digital/Technical Product Manager Intern</i><br><strong class="header-name">  Microsoft (May 2021 - August 2021) </strong><br><i>Explorer Intern</i><br><strong class="header-name"> Google (May 2020 - August 2020) </strong><br><i>STEP Intern</i><br>';

            // output += result.exp1;
            // output += result.exp2;
            // output += result.exp3;
        }
        else if (input.includes("the gospel")) {
            const result = await fetchResults("gospel");
            for (const textField in result){
                output += result.text;
            }
        }
        else if (input.includes("projects")) {
            const result = await fetchResults(input.toLowerCase());
            output += result.project1;
            output += result.project2;
            output += result.project3;
            output += result.project4;
            output += result.scroll;
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
