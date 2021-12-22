const BLACKLISTED_KEY_CODES = [38];

let userInput, terminalOutput;


const COMMANDS = {
    help:
        'Supported commands: <span class="code">about</span>, <span class="code">education</span>, , <span class="code">projects</span>, <span class="code">skills</span>, <span class="code">hobbies</span>, <span class="code">clear</span>',
    about:
        "Hey there! 👋🏼 <br> \
        I'm Sam, a junior  studying Computer Science at California State University, Fullerton. \
        I love programming, building projects, and teaching others about new technologies. I'm interested in Developer Advocacy and Product Management.",

    education:
        '<strong class="header-name">California State University, Fullerton</strong><br>B.S. Computer Science, Expected Grad: May 2023',

    experience:
        '<strong class="header-name">Microsoft (May 2021 - August 2021)</strong><br><i>Explore Intern</i><br><strong class="header-name">Google (May 2020 - August 2020)</strong><br><i>STEP Intern</i>',
    // <strong class="header-name">Company (May 2020 - Aug. 2020)</strong><br><i>Title</i><br>

    hobbies:
        '- Making/Drinking Coffee Lattes <br>\
         - Doing lighting for concerts and churches. <br>\
         - Building small hacks using the latest tech on my own or at hackathons <br>\
         - Playing games like Minecraft with friends',

    projects:
        '<strong class="header-name">Sudoku GUI Solver</strong><br><i>A Sudoku Solver that uses the backtracking algorithm, and has a GUI to play sudoku. Built using Python, and pygame. View by typing /#sudoku-solver above in the domain.</i><br>\
        <strong class="header-name">NiceBreakers</strong><br><i> A web application designed to make ice breakers fun! Built with Next.JS and Web Sockets. View by typing /#Nicebreakers above in the domain.</i><br>\
        <strong class="header-name">Techish</strong><br><i>A web application to match students to mentors in tech. Built with HTML/CSS, TypeScript and Java Servlets. View by typing /#Techish above in the domain.</i><br>\
        <strong class="header-name">Flix </strong><br><i>An iOS mobile application that allows users to browse movies now playing in theaters. Built with Xcode, Swift and the Movie Database API. View by typing /#Flix above in the domain </i><br>\
        <strong class="header-name">Meme-Creator</strong><br><i>A web application that allows users to make memes! Built with  HTML/CSS, Javascript. View by typing /#meme-creator above in the domain. </i><br>',


    skills:
        '<span class="code">Languages:</span> C++, Python, Swift, JavaScript, TypeScript, HTML, CSS',
};



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
    else if (!COMMANDS.hasOwnProperty(input)) {
        output += `<div class="terminal-line"> ${input}: command not found</div>`;
        console.log('Oops! no such command');
    }
    else{
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

function two(){};

document.addEventListener('keydown', backspace);
document.addEventListener('keypress', key);
document.addEventListener('DOMContentLoaded', app);
