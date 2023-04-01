let wordOfTheDay ='';
let validateWord = "https://words.dev-apis.com/validate-word";
let attempts = 0;
let wordColumn = 97; //Decimal value of the letter a; (ASCII Table Lookup)[https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/ASCII-Table.svg/2522px-ASCII-Table.svg.png]

function init(){
    wordOfTheDay = getWordOfTheDay("https://words.dev-apis.com/word-of-the-day");
}

async function getWordOfTheDay(url){
    const promise = await fetch(url);
    const response = await promise.json();
    console.log(response);
    wordOfTheDay = response.word;
}

async function validateWordofTheDay(word){
    const promise = await fetch(validateWord,{
                                method: 'POST',
                                body: `{"word":"${word}"}`
                            });
    const response = await promise.json();
    
    if (response.validWord == true){
        return true;
    }

    return false;
}

function gottheword(word){
    if (word == wordOfTheDay){
        return true;
        }
    return false;

}


function checkletters(guess){
    const guessarray = guess.split("");
    const wordOfTheDayarray = wordOfTheDay.split("");
    let tempwordColumn = 97;

    for (let i=0; i< 5; i++){
        if((guessarray[i].charCodeAt() ^ wordOfTheDayarray[i].toUpperCase().charCodeAt()) === 0){
            document.querySelector(`.guess${attempts+1}${String.fromCharCode(tempwordColumn)}`).style.backgroundColor = 'lightgreen';
        }
        tempwordColumn += 1;
    }



}




function fillSquare(key){

     let row = attempts + 1;
     let letter = String.fromCharCode(wordColumn);
     let space = document.querySelector(`.guess${row}${letter}`);
          
    if (key.toUpperCase() === "BACKSPACE"){
        if (wordColumn == 97){
            wordColumn == 97;
        }else{
        wordColumn -=1;
        }
        let letter = String.fromCharCode(wordColumn);
        let space = document.querySelector(`.guess${row}${letter}`);
        space.innerText = '';
        
    }else if (key.toUpperCase() === "ENTER") {
        let row = attempts + 1;
        let enteredWord = '';
        for (let i = 97;i<=101;i++){
            enteredWord += document.querySelector(`.guess${row}${String.fromCharCode(i)}`).innerText;
        }
        console.log(`Word entered: ${enteredWord}\nWord Length: ${enteredWord.length}`);
         if (enteredWord.length < 5){
            alert("The word is too short.");
            return;
         }
         validateWordofTheDay(enteredWord).then(returnValue => {
            if (returnValue){
                checkletters(enteredWord);
                console.log("i'm in the if statement")

                if (gottheword(enteredWord)){
                    alert("You win brah!");
                    gameover = true;
                }
                attempts = attempts +1;
                wordColumn = 97;
                enteredWord = '';
            }
        });

    }
    else if (key.toUpperCase().charCodeAt() >= 65 && key.toUpperCase().charCodeAt() <= 90){
        
        space.innerText = String.fromCharCode(key.charCodeAt()).toUpperCase();
        wordColumn += 1;
        
    } 




     
}


init()

const typedWord = document;

typedWord.addEventListener("keydown", (event) => {

    fillSquare(event.key);
});

