const BLACKLISTED_KEY_CODES = [38];

let userInput, terminalOutput;

const COMMANDS = {
    help:'Supported commands: <span class="code">about</span>, <span class="code">education</span>,  <span class="code">experience</span>, <span class="code">projects</span>, <span class="code">clear</span>',
    
    about: "I’m a Solutions Engineer I specialize in designing scalable solutions for complex B2B ecosystems. <br>\
    With a few years of experience in the field—built on a versatile foundation of B2C internships, I combine product strategy with technical expertise in SD-WAN, cloud connectivity, and network security <br> \
    I firmly believe in empowering cross-functional teams to design solutions that effectively solve customer's real world pain points. <br>\
    While I'm not on the grind, I'll sometimes travel around, volunteer at church, or spend time with my cat. <br>\
    I love learning about new ideas, technology or experiences, so feel free to reach out to me. <br><br>\
    <strong>Scroll up in the terminal.</strong>",

    education: '<strong class="header-name">California State University, Fullerton</strong><br>B.S. Computer Science, Expected Grad: May 2023',
    
    experience: 
        '<strong class="header-name">Lumen (July 2023 - Present) </strong><br><i>Solutions Engineer</i><br>\<strong class="header-name">USAA (May 2022 - August 2022) </strong><br><i>Product Manager Intern</i><br> \ <strong class="header-name">  Microsoft (May 2021 - August 2021) </strong><br><i>Explorer Intern</i><br> \
        <strong class="header-name"> Google (May 2020 - August 2020) </strong><br><i>STEP Intern</i><br></br>',
    
    projects: 
    '<strong class="header-name">Fart Labs Technical Docs Launchpad</strong><br>Technical Writer<br><i> A template that is used to assist with documentation for each tool repository at Fartlabs; it provides a framework and guide for how to properly document the workings behind the specific repository. View <strong><a href="https://github.com/FartLabs/docs_launchpad">here</a></strong>.</i><br> \
     <strong class="header-name">TuffyHacks.com</strong><br>Product Manager<br><i> Lead a cross-functional team for the MVP development of the TuffyHacks.com. Some of my product work included: creating product requirements, communicating with stakeholders and translating requirements into user stories. TuffyHacks.com is a platform that allows hackers to have an interactive experience at the TuffyHacks hackathon. View <strong><a href="https://github.com/EthanThatOneKid/tuffyhacks.com">here</a></strong>.</i><br> \
     <strong class="header-name">Personal API </strong><br>Personal Project<br><i> An API designed to display information about Samuel Sandoval. This website is fetching from this API. Built using Python and Flask. View <strong><a href="http://github.com/samuelsandoval1/api.samuelsandoval.me">here</a></strong>.</i><br> \
    </br> <b>Scroll up in the terminal.</b> ',
}

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
    var response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://api.samuelsandoval.me/'+ routeLink)}`);
    let data = await response.json();
    data = JSON.parse(data.contents);  
   // print(data)  
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
        // if (input.includes("help")) { // works
        //     var modifiedInput = input += "_message";
        //    const result = await fetchResults(modifiedInput.toLowerCase());
        //    console.log("result from fetchResults "+result);
        //     output += result.text;
        // }
        // else if (input.includes("about")) {
        //     const result = await fetchResults(input.toLowerCase());
        //     output += result.text;
        // }
        // else if (input.includes("education")) {
        //     const result = await fetchResults(input.toLowerCase());
        //     output += result.text;
        // }
        // else if (input.includes("experience")) {
        //     const result = await fetchResults(input.toLowerCase());
        //     output += result.exp1;
        //     output += result.exp2;
        //     output += result.exp3;
        // }
        // else if (input.includes("the gospel")) {
        //     const result = await fetchResults("gospel");
        //     for (const textField in result){
        //         output += result.text;
        //     }
        // }
        // else if (input.includes("projects")) {
        //     const result = await fetchResults(input.toLowerCase());
        //     output += result.project1;
        //     output += result.project2;
        //     output += result.project3;
        //     output += result.project4;
        //     output += result.scroll;
        // }
        if (!COMMANDS.hasOwnProperty(input)){
            output += `<div class="terminal-line"> ${input}: command not found</div>`;
            console.log('Oops! no such command');
        }
        else{
            output += COMMANDS[input];
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
