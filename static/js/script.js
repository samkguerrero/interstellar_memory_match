//alert("this page works!");

var arrOfImages = ["csharplogo.jpeg", "csslogo.jpeg", "htmllogo.jpeg", "javalogo.jpeg", "jslogo.jpeg", "pythonlogo.jpeg"];
var numberOfPossibleMatches = arrOfImages.length
var cardsPicked = [];
var guesses = 0;
var matches = 0;

function doubleImages(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        arr.push(arr[i]);
    }
    return arr;
}

function displayCards(arr) {
    // instead of a list, we're going to grab the empty div so we can add to it later
    var container = document.getElementById("container");
    
    // for each image in our array
    for (var i = 0; i < arr.length; i++) {
        // create a new HTML image element
        var newImgElement = document.createElement("img");
        // set the src of the img tag to be the name of the file
        newImgElement.src = "static/images/" + arr[i];
        // give the element an id 
        newImgElement.id = i;
        // give the element a class so CSS can be applied to it
        newImgElement.className = "card";
        // add the element to the container div
        container.appendChild(newImgElement);
    }
}

function shuffleCards(arr) {
    for (var i = 0; i < arr.length; i++) {
        // get 2 random index values
        var idx1 = Math.floor(Math.random()*arr.length);
        var idx2 = Math.floor(Math.random()*arr.length);
    
        // swap them in the array
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
    return arr;
}

function hideACard(idx) {
    // get the image with the specified idx/id
    var specificCard = document.getElementById(idx);
    // set the image's source to the question mark
    specificCard.src = "static/images/questionmark.png";
}

function revealCard(event) {
    var clickedImageId = event.target.id;
        
    var clickedImage = document.getElementById(clickedImageId); 
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];
    
    // add the clicked image to our array
    cardsPicked.push(clickedImageId);
    
    // if 2 cards have been picked
    if (cardsPicked.length == 2) {
        guesses += 1;
        document.getElementById("guess").innerHTML = guesses;
        // if the 2 selected images are the same
        if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]) {
            // resets the cards picked
            cardsPicked = [];
            matches += 1
            document.getElementById("match").innerHTML = matches;
            if (matches >= numberOfPossibleMatches) {
                alert("you won!")
                shuffleCards(arrOfImages);
                for (var i = 0; i < arrOfImages.length; i++) {
                    // let's call on the hideACard function we just made
                    hideACard(i);
                }
                guesses = 0;
                matches = 0;
                document.getElementById("guess").innerHTML = guesses;
                document.getElementById("match").innerHTML = matches;
            }
            
        } else {
            // make a function that will flip the cards back over
            var hidePickedCards = function() {
                hideACard(cardsPicked[0]);    // remember this function from earlier?
                hideACard(cardsPicked[1]);
                cardsPicked = [];
            }
            window.setTimeout(hidePickedCards, 500);
        }
    }
}

// let's shuffle the cards BEFORE we display them!
doubleImages(arrOfImages);
shuffleCards(arrOfImages);
displayCards(arrOfImages);

// call on the hideACard function for each card in our array of images
for (var i = 0; i < arrOfImages.length; i++) {
    // let's call on the hideACard function we just made
    hideACard(i);
}

var cards = document.getElementsByClassName("card");    // grab all the cards
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
}