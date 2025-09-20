let btn = document.querySelector('#btn');
let content = document.querySelector('#content');

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1.25;
    text_speak.pitch = 1.5;
    text_speak.volume = 1;

    // Get available voices
    let voices = window.speechSynthesis.getVoices();

    // Pick a female English voice if available
    let femaleVoice = voices.find(voice =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("zira") ||   // Microsoft female
        voice.name.toLowerCase().includes("susan") ||  // Example female
        voice.name.toLowerCase().includes("google uk english female")
    );

    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    }

    window.speechSynthesis.speak(text_speak);
}

// Ensure voices are loaded
window.speechSynthesis.onvoiceschanged = () => {};


function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir!");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir!");
    } else if (hours >= 16 && hours < 20) {
        speak("Good Evening Sir!");
    } else {
        speak("Good Night Sir!");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!speechRecognition) {
    alert("Your browser does not support speech recognition.");
}

let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    message = message.toLowerCase().trim();

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        speak("Hello Sir! How may I help you?");
    } else if (message.includes('who are you') || message.includes('what is your name') || message.includes('your name')) {
        speak("I am Jenie, Your Virtual Assistant.");
    } else if (message.includes('what can you do') || message.includes('your abilities') || message.includes('what are your capabilities')) {
        speak("I can perform various tasks such as telling the time and date, opening websites like YouTube, Google, and Wikipedia, providing weather updates, telling jokes, and much more. How can I assist you today?");
    } else if (message.includes('who made you') || message.includes('who is your creator') || message.includes('your creator')) {
        speak("I was created by Harjot Singh.");
    } else if (message.includes('why were you created') || message.includes('your purpose') || message.includes('purpose') || message.includes('reason for your creation') || message.includes('why are you created')) {
        speak("I was created to assist you with various tasks and make your life easier. And, hopefully, to bring a smile to your face!");
    } else if (message.includes('good morning') || message.includes('morning')) {
        speak("Good Morning Sir! Have a great day ahead.");
    } else if (message.includes('good afternoon') || message.includes('afternoon')) {
        speak("Good Afternoon Sir! Hope you are having a great day.");
    } else if (message.includes('good evening') || message.includes('evening')) {
        speak("Good Evening Sir! How was your day?");
    } else if (message.includes('good night') || message.includes('night')) {
        speak("Good Night Sir! Have a restful sleep.");
    } else if (message.includes('how are you') || message.includes('how do you do')) {
        speak("I am fine, thank you! And what about you Sir?");
    } else if (message.includes('time') || message.includes('what time is it') || message.includes('current time')) {
        speak("The current time is " + new Date().toLocaleTimeString());
    } else if (message.includes('date') || message.includes('what is the date') || message.includes("today's date") || message.includes('what date is it')) {
        speak("Today's date is " + new Date().toLocaleDateString());
    } else if (message.includes('open youtube') || message.includes('youtube') || message.includes('play youtube') || message.includes('go to youtube')) {
        speak("Opening YouTube");
        window.open('https://youtube.com', '_blank');
    } else if (message.includes('weather') || message.includes('temperature')) {
        getWeather();
    } else if (message.includes('news') || message.includes('headlines')) {
        speak("Opening news");
        window.open('https://news.google.com', '_blank');
    } else if (message.includes('open google') || message.includes('google') || message.includes('search google') || message.includes('go to google')) {
        speak("Opening Google");
        window.open('https://google.com', '_blank');
     
    } else if (message.includes('tell me a joke') || message.includes('joke') || message.includes('make me laugh')) {
        speak
("Why don't scientists trust atoms? Because they make up everything!");
("You are good");
    } else if (message.includes('i love you assistant') || message.includes('love') || message.includes('i do love you')) {
        speak("Awwwwww, I love you too Sweetheart!");
    } else if (message.includes('what is your favorite color') || message.includes('favorite color') || message.includes('your favorite color')) {
        speak("My favorite color is blue, like the sky!");
    } else if (message.includes('sing a song') || message.includes('sing') || message.includes('play a song')) {
        speak("Twinkle twinkle little star, how I wonder what you are!");
    } else if (message.includes('goodbye') || message.includes('bye') || message.includes('see you later') || message.includes('exit') || message.includes('quit')) {
        speak("Goodbye Sir! Have a great day!");
    } else if (message.includes('thank you') || message.includes('thanks') || message.includes('appreciate it')) {
        speak("You're welcome Sir!");
    } else if (message.includes('open wikipedia') || message.includes('wikipedia') || message.includes('go to wikipedia')) {
        speak("Opening Wikipedia");
        window.open('https://wikipedia.org', '_blank');
    } else {
        let query = message.replace('search for', '').replace('on google', '').trim();
        if (query === '') {
            speak("Please specify what you want to search for.");
            return;
        }
        speak(`Searching for ${message} on Google`);
        window.open(`https://www.google.com/search?q=${message}`, '_blank');
    }
}

function getWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true')
        .then(response => response.json())
        .then(data => {
            let temperature = data.current_weather.temperature;
            let weathercode = data.current_weather.weathercode;
            speak(`The current temperature is ${temperature} degrees Celsius with weather code ${weathercode}.`);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            speak("Sorry, I couldn't fetch the weather data right now.");
        });
}
