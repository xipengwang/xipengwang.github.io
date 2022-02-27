var WORDLE_LENGTH = 5;
var TOTAL_NUMBER_ROWS = 6;
var DEFAULT_LETTER = '&#9814';
var MAX_NUM_OF_SUGGESTED_WORD = 10;

var START_DATE = new Date('2021-06-19');

var current_wordle_word = null;
var cell_index = 0;
var row_index = 0;
var you_win = false;
var current_words = [];

var kYes = '0';
var kExist = '1';
var kNo = '2';

var info_content_g = '<h2>Information Session</h2>';

$(document).ready(function () {
  // Set empty wordle word
  var wordle_word = $('#wordle_word').children();
  for (let i = 0; i < wordle_word.length; i++) {
    wordle_word[i].innerHTML = '';
  }

  Keyboard.init();

  $('#help_div.custom-model-main').addClass('model-open');

  $('#show_wordle_word').on('change', function () {
    // console.log(this.checked)
    var wordle_word = $('#wordle_word').children();
    for (let i = 0; i < wordle_word.length; i++) {
      if (this.checked && current_wordle_word != null)
        wordle_word[i].innerHTML = current_wordle_word[i];
      else wordle_word[i].innerHTML = '';
    }
  });

  StartTodayGame();
  $('#datepicker').on('change', function () {
    var current_date = new Date($(this).val());
    var diff = current_date.setHours(0, 0, 0, 0) - START_DATE;
    var idx = Math.round(diff / 864e5) % words.length;
    current_wordle_word = words[idx].toUpperCase();
    console.log(current_wordle_word);
    var wordle_word = $('#wordle_word').children();
    for (let i = 0; i < current_wordle_word.length; i++) {
      if ($('#show_wordle_word').is(':checked')) {
        wordle_word[i].innerHTML = current_wordle_word[i];
      } else wordle_word[i].innerHTML = '';
    }
    StartNewGame();
  });

  $(window).keyup(function (event) {
    if (CheckGlobalStateForEarlyReturn()) {
      return;
    }
    if (event.key.length == 1 && IsCharacterALetter(event.key)) {
      var letter = event.key.toUpperCase();
      // console.log("Input letter: " + letter);
      // Update the letter.
      ProcessLetter(letter);
      return;
    }

    if (event.key.toUpperCase() == 'ENTER') {
      ProcessEnter();
      return;
    }

    if (event.which == 8 || event.which == 46) {
      ProcessDelete();
      return;
    }
  });

  $('#helpbutton').on('click', function () {
    $('#help_div.custom-model-main').addClass('model-open');
  });
  $('.close-btn, .bg-overlay').click(function () {
    $('.custom-model-main').removeClass('model-open');
  });
  $('#infobutton').on('click', function () {
    $('#info_div.custom-model-main').addClass('model-open');
    $('#info_content_div').html(info_content_g);
  });

  $('#submit_suggested_word').on('click', function () {
    ProcessWord($('#select_candidate option:selected').text());
    $('#info_div.custom-model-main').removeClass('model-open');
  });
});

function IsCharacterALetter(char) {
  return /[a-zA-Z]/.test(char);
}

function UpdateCellContent(cell_id, letter) {
  $('#cell_' + cell_id).html(letter);
}

function GetWordState(guess_word, true_word) {
  var word_state = '';
  for (var i = 0; i < guess_word.length; i++) {
    var letter = guess_word[i];
    if (letter == true_word[i]) {
      word_state += kYes;
      continue;
    }
    if (true_word.includes(letter)) {
      word_state += kExist;
      continue;
    }
    word_state += kNo;
  }
  return word_state;
}

function AllYes(word_state) {
  for (var i = 0; i < word_state.length; i++) {
    if (word_state[i] != kYes) {
      return false;
    }
  }
  return true;
}

function UpdateCellColor(cell_id, state) {
  if (state == kYes) $('#cell_' + cell_id).addClass('grid_cell_yes');
  if (state == kExist) $('#cell_' + cell_id).addClass('grid_cell_exist');
  if (state == kNo) $('#cell_' + cell_id).addClass('grid_cell_no');
}

function GetCellId(row_index, cell_index) {
  return row_index * WORDLE_LENGTH + cell_index;
}

function ResetState() {
  you_win = false;
  row_index = 0;
  cell_index = 0;
  current_words = [];
  for (var i = 0; i < words.length; i++) {
    current_words[i] = words[i].toUpperCase();
  }
  $('#grid_wrapper').empty();
  info_content_g = '<h2>Information Session</h2>';
}

function StartNewGame() {
  ResetState();
  // Create grids
  for (let i = 0; i < TOTAL_NUMBER_ROWS; i++) {
    var $new_row_div = $('<div/>') // creates a div element
      .addClass('grid_row') // add a class
      .attr('id', 'row_' + i); // adds the id
    for (let j = 0; j < WORDLE_LENGTH; j++) {
      var $new_cell_div = $('<div/>') // creates a div element
        .addClass('grid_cell') // add a class
        .attr('id', 'cell_' + GetCellId(i, j)) // adds the id
        .html(DEFAULT_LETTER);
      $new_row_div.append($new_cell_div);
    }
    $('#grid_wrapper').append($new_row_div);
  }
}

function Alert(content) {
  $('#alert_div.custom-model-main').addClass('model-open');
  $('#alert_content_div').html(content);
}

function AppendInfoContent(content) {
  info_content_g += '<p>' + content + '</p>';
}

function GenerateSuggestion(current_words) {
  AppendInfoContent('# of words: ' + current_words.length);
  // TODO: progress bar
  Alert('Generate suggestions... Please wait...');
  var words_with_score = [];
  for (var i = 0; i < current_words.length; i++) {
    words_with_score.push([
      current_words[i],
      CalculateScore(current_words[i], current_words),
    ]);
  }

  words_with_score.sort(function (a, b) {
    return b[1] - a[1];
  });
  var suggested_word_idx = 0;
  $('#select_candidate').empty();
  for (let key in words_with_score) {
    //console.log(key)
    //console.log(words_with_score[key])
    var candidate = words_with_score[key][0];
    $('#select_candidate').append(
      $('<option></option>').val(candidate).html(candidate)
    );
    suggested_word_idx++;
    if (suggested_word_idx == MAX_NUM_OF_SUGGESTED_WORD) {
      break;
    }
  }
  $('#alert_div.custom-model-main').removeClass('model-open');
  AppendInfoContent(
    'After<' +
      row_index +
      '> guess, ' +
      'the top suggestion is ' +
      '[' +
      words_with_score[0][0] +
      ']'
  );
}

function CalculateScore(guess_word, current_words) {
  guess_state = [];
  for (var i = 0; i < current_words.length; i++) {
    var word_state = GetWordState(guess_word, current_words[i]);
    if (word_state in guess_state) {
      guess_state[word_state] += 1.0;
    } else {
      guess_state[word_state] = 1.0;
    }
  }
  var entropy = 0.0;
  for (let key in guess_state) {
    var p = guess_state[key] / current_words.length;
    entropy -= (p * Math.log(p)) / Math.log(2);
  }
  return entropy;
}

function CheckGlobalStateForEarlyReturn() {
  if (row_index == TOTAL_NUMBER_ROWS) {
    Alert('You used up all your chances. Please select a date to try again...');
    return true;
  }
  if (you_win) {
    Alert('You have won! Please select a date to try again...');
    return true;
  }
  return false;
}

function ProcessWord(word) {
  console.assert(word.length == WORDLE_LENGTH);
  cell_index = 0;
  for (var i = 0; i < WORDLE_LENGTH; i++) {
    ProcessLetter(word[i]);
  }
}

function ProcessLetter(letter) {
  if (cell_index < WORDLE_LENGTH) {
    cell_id = GetCellId(row_index, cell_index);
    UpdateCellContent(cell_id, letter);
    cell_index++;
    // Highlight selected cell.
  }
}

function ProcessEnter() {
  if (cell_index != WORDLE_LENGTH) {
    Alert('There are not enough letters in the word...');
    return;
  }

  // Collect word.
  var guess_word = '';

  for (cell_idx = 0; cell_idx < WORDLE_LENGTH; cell_idx++) {
    cell_id = GetCellId(row_index, cell_idx);
    guess_word += $('#cell_' + cell_id).html();
  }
  // console.log(guess_word);

  var found_word = false;
  for (var i = 0; i < words.length; i++) {
    if (words[i].toUpperCase() == guess_word) {
      found_word = true;
      break;
    }
  }

  if (!found_word) {
    cell_index = 0;
    Alert('Word is not in our list.');
    for (cell_idx = 0; cell_idx < WORDLE_LENGTH; cell_idx++) {
      cell_id = GetCellId(row_index, cell_idx);
      UpdateCellContent(cell_id, DEFAULT_LETTER);
    }
    return;
  }

  var word_state = GetWordState(guess_word, current_wordle_word);

  for (var i = 0; i < guess_word.length; i++) {
    var cell_id = GetCellId(row_index, i);
    UpdateCellColor(cell_id, word_state[i]);
  }

  you_win = AllYes(word_state);
  if (you_win) {
    Alert('You win!');
    return;
  }

  // Move to next row.
  if (row_index < TOTAL_NUMBER_ROWS) {
    row_index++;
  }
  cell_index = 0;

  current_words = PruneWordList(current_words, guess_word, word_state);
  GenerateSuggestion(current_words);
}

function ProcessDelete() {
  if (cell_index > 0) {
    cell_index--;
    cell_id = GetCellId(row_index, cell_index);
    UpdateCellContent(cell_id, DEFAULT_LETTER);
  }
}

function PruneWordList(current_words, guess_word, word_state) {
  var new_word_list = [];
  for (var i = 0; i < current_words.length; i++) {
    if (GetWordState(guess_word, current_words[i]) == word_state) {
      new_word_list.push(current_words[i]);
    } else {
    }
  }
  return new_word_list;
}

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    this.open();
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'enter',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      'backspace',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['p', 'l'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = '&#x232b';

          keyElement.addEventListener('click', () => {
            if (CheckGlobalStateForEarlyReturn()) {
              return;
            }
            ProcessDelete();
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = 'ENTER';

          keyElement.addEventListener('click', () => {
            if (CheckGlobalStateForEarlyReturn()) {
              return;
            }
            ProcessEnter();
          });
          break;

        default:
          var letter = key.toUpperCase();
          keyElement.textContent = letter;

          keyElement.addEventListener('click', () => {
            if (CheckGlobalStateForEarlyReturn()) {
              return;
            }
            ProcessLetter(letter);
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  open() {
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.elements.main.classList.add('keyboard--hidden');
  },
};

function StartTodayGame() {
  var today = new Date();
  var diff = today.setHours(0, 0, 0, 0) - START_DATE;
  $('#datepicker').val(
    today.getFullYear() +
      '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + today.getDate()).slice(-2)
  );
  var idx = Math.round(diff / 864e5) % words.length;
  current_wordle_word = words[idx].toUpperCase();
  console.log(current_wordle_word);
  var wordle_word = $('#wordle_word').children();
  for (let i = 0; i < current_wordle_word.length; i++) {
    if ($('#show_wordle_word').is(':checked')) {
      wordle_word[i].innerHTML = current_wordle_word[i];
    } else wordle_word[i].innerHTML = '';
  }
  StartNewGame();
}
