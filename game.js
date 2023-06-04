// selecting dom
const startButton = $( '#start' );
const info = $( '.info' );
const wrapper = $( '.wrapper' );
const heading = $( '#heading' );
const msg = $( '.msg' );


// some variable initialization
let sequence = [];
let humanSequence = [];
let level = 0;



// added active classes
function activatedTile ( color )
{
  const tile = document.querySelector( `[data-tile='${color}']` );
  const sound = document.querySelector( `[data-sound='${color}']` );


  tile.classList.add( "activated" );
  sound.play();

  setTimeout( () =>
  {
    tile.classList.remove( "activated" );
  }, 300 );

}



// playing round
function playRound ( nextSequence )
{
  nextSequence.forEach( ( color, i ) =>
  {
    setTimeout( () =>
    {
      activatedTile( color );
    }, ( i + 1 ) * 600 );
  } );
}



// step of the game!
function nextStep ()
{
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor( Math.random() * tiles.length )];

  return random;
}




// next round of the game
function nextRound ()
{
  level += 1;

  wrapper.addClass( 'unclickable' );
  info.text( 'Wait for the computer' );
  heading.text( `Level ${level} of 20` );


  const nextSequence = [...sequence];
  nextSequence.push( nextStep() );
  playRound( nextSequence );

  sequence = [...nextSequence];
  setTimeout( () =>
  {
    humanTurn( level );
  }, level * 600 + 1000 );
}




// handle click operations
function handleClick ( tile )
{
  const index = humanSequence.push( tile ) - 1;
  const sound = document.querySelector( `[data-sound='${tile}']` );
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if ( humanSequence[index] !== sequence[index] )
  {
    resetGame( 'Oops! Game over, you pressed the wrong tile' );
    return;
  }

  if ( humanSequence.length === sequence.length )
  {
    if ( humanSequence.length === 20 )
    {
      resetGame( 'Congrats! You completed all the levels.' );
      return;
    }

    humanSequence = [];
    info.text( 'Success! Keep going!' );

    setTimeout( () =>
    {
      nextRound();
    }, 1000 );
    return;
  }

  info.text( `Your turn: ${remainingTaps} Taps${remainingTaps > 1 ? 's' : ''}` );
}



// start the game
function startGame ()
{
  startButton.addClass( "hidden" );
  info.removeClass( "hidden" );
  info.text( "Wait for the computer!" );
  nextRound();
  msg.text( 'running!' ).css( 'color', 'green', 'font-weight, bold' );

}


// game start by click or enter
startButton.on( 'click', startGame );
$( document ).on( 'keypress', ( event ) =>
{
  if ( event.key == 'Enter' ) startGame();

} );


wrapper.on( 'click', event =>
{
  const { tile } = event.target.dataset;

  if ( tile ) handleClick( tile );
} );






// reset the game
function resetGame ( text )
{
  alert( text );
  msg.text( 'Game over!' ).css( 'color', 'red' );

  sequence = [];
  humanSequence = [];
  level = 0;
  info.addClass( "hidden" );
  startButton.removeClass( "hidden" );
  heading.text( 'SIMON GAME' );
  wrapper.addClass( 'unclickable' );
}




// human turn
function humanTurn ( level )
{
  wrapper.removeClass( "unclickable" );
  info.text( `Your turn: ${level} Tap${level > 1 ? "s" : ""}` );
}

