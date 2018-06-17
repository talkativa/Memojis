
var cards = document.querySelectorAll('.card');
var cardFront = document.querySelectorAll('.card__front');
var cardBack = document.querySelectorAll('.card__back');
var cardFrontArray = Array.prototype.slice.call(cardFront);
var cardBackArray = Array.prototype.slice.call(cardBack);
var cardsArray = Array.prototype.slice.call(cards);

function pickEmojisRandomly(dataList, totalCardAmount, oneTypeCardAmount) { //!!!! checking if cardAmount%2===0
  var cardIndex;
  var criteria;
  var thisGameArray = []; 
  var thisGameIndexes = [];

  var gameRange = [];
  var card;
  var cardPosition;
  var finalArray = [];
  
  for (var j=1; j<=(totalCardAmount/oneTypeCardAmount); j++) {
    criteria = false;

    if (thisGameIndexes.length>0) {
      while (!criteria) {
        cardIndex = Math.floor(Math.random()*dataList.length);
        for (var i = 0; i < thisGameIndexes.length; i++) {
          if(cardIndex != thisGameIndexes[i]) {
            criteria = true;
          } else {
            criteria = false;
            break;
          }
        }
      }
    } else {cardIndex = Math.floor(Math.random()*dataList.length);}
    thisGameIndexes.push(cardIndex);
  }
  
  for (var i = 0; i < thisGameIndexes.length; i++) {
    thisGameArray[i] = dataList[thisGameIndexes[i]];
  }

  for (var i = 0; i<totalCardAmount; i++) {
    gameRange.push(i);
  }
  
  for  (var i = 0; i < thisGameArray.length; i++) {
    card = thisGameArray[i];
    for (var j = 1; j <= oneTypeCardAmount; j++) {
      cardPosition =  Math.floor(Math.random()*gameRange.length);
      while(gameRange[cardPosition] === null) {
        cardPosition =  Math.floor(Math.random()*gameRange.length);
      }
      gameRange[cardPosition] = null;
      finalArray[cardPosition] = card;
    }
  }
  
  return finalArray;
}
var allEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯','🐮', '🐷', '🐸', '🐙','🐵','🐞', '🐟', '🐊', '🐓'];


window.onload = function() {
  var nowEmojis =  pickEmojisRandomly(allEmojis, 12, 2);
  for (var i=0; i<cardBack.length; i++) {
    cardBack[i].textContent = nowEmojis[i];
  }
}




var flippedList = [];
var redList = [];
var greenList = [];
cardFrontArray.forEach(function(cards, index) {
  cards.addEventListener('click', function(evt) {
    evt.preventDefault();
    var flippedItem = 0;
    for (var i=0; i<cardBackArray.length; i++) {
      if(cardBackArray[i].classList.contains('card__back--flipped')&&cardBackArray[i].style.backgroundColor!='green'){
        flippedItem = cardBackArray[i];
      }
    }

    if(flippedItem) {
      if ((cardBackArray[index].textContent === flippedItem.textContent)) {//just added redList check
        if(redList.length==0) {
        flippedItem.style.backgroundColor = 'green';
        cardBackArray[index].style.backgroundColor = 'green';
        flippedItem = 0;}
        else {
          for (var i=0; i<redList.length; i++) {
              if(redList[i].classList.contains('card__back--flipped'))
                {redList[i].classList.remove('card__back--flipped');} 
              else {redList[i].classList.remove('card__front--flipped')}
              redList[i].style.backgroundColor = 'white';
            }
            redList = [];
            flippedList = [];
        }
      } else if (cardBackArray[index].textContent !== flippedItem.textContent) {

          if (redList.length>0) {
            for (var i=0; i<redList.length; i++) {
              if(redList[i].classList.contains('card__back--flipped'))
                {redList[i].classList.remove('card__back--flipped');} 
              else {redList[i].classList.remove('card__front--flipped')}
              redList[i].style.backgroundColor = 'white';
            }
            redList = [];
            flippedList = [];
          } else {
            flippedItem.style.backgroundColor = 'red';
            cardBackArray[index].style.backgroundColor = 'red'; 
            redList.push(flippedItem);
            redList.push(flippedItem.nextElementSibling);
            redList.push(cardBackArray[index]);
            redList.push(cardBackArray[index].nextElementSibling);
          }
      }

    }

    
    if(!cards.classList.contains('card__front--flipped')) {
      cards.classList.add('card__front--flipped');
      cardBackArray[index].classList.add('card__back--flipped');
    } 
  })
})

