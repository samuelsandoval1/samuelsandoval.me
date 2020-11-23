const BLACKLISTED_KEY_CODES = [38];
const COMMANDS = {
    help:
        'Supported commands: <span class="code">about</span>, <span class="code">education</span>, <span class="code">experience</span>, <span class="code">projects</span>, <span class="code">skills</span>',
    about: "Hey there! 👋🏼 <br> I'm Sam, a sophomore studying Computer Science at California State University, Fullerton. I love programming, building projects, and teaching others about new technologies. I'm interested in Developer Advocacy and Product Management.",

    skills:
        '<span class="code">Languages:</span> C++, Python, Swift, JavaScript, TypeScript, HTML, CSS',
    education:
        '<strong class="header-name">California State University, Fullerton</strong><br>B.S. Computer Science, Expected Grad: May 2023',
    experience:
        '<strong class="header-name">Microsoft (May 2021)</strong><br><i>Incoming Explore Intern</i><br><strong class="header-name">Google (May 2020 - August 2020)</strong><br><i>STEP Intern</i>',
        // <strong class="header-name">Company (May 2020 - Aug. 2020)</strong><br><i>Title</i><br>
    projects:
        '<strong class="header-name">NiceBreakers</strong><br><i> A web platform designed to make ice breakers fun! Built with Next.JS and Web Sockets </i><br><strong class="header-name">Techish </strong><br><i>A web application to match students to mentors in tech. Built with HTML/CSS, TypeScript and Java Servlets </i><br><strong class="header-name">Quizzler </strong><br><i>Developed an iOS mobile application that is a Trivia Questions Game. Built with Xcode, Swift </i><br><strong class="header-name">SimpleChat </strong><br><i>A web application that allows users to converse with each other. Built using React.js and Firebase </i><br>',

    };
    
let userInput, terminalOutput;

const app = () => {
    userInput = document.getElementById('userInput');
    terminalOutput = document.getElementById('terminalOutput');
    document.getElementById('dummyKeyboard').focus();
    console.log('Application loaded');
};

const execute = function executeCommand(input) {
    let output;
    input = input.toLowerCase();
    if (input.length === 0) {
        return;
    }
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
        output += `<div class="terminal-line">no such command: ${input}</div>`;
        console.log('Oops! no such command');
    } else {
        output += COMMANDS[input];
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
