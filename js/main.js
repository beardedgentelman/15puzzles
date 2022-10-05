$('document').ready(function() {
    const puzzleArea = $('.main__puzzle'); // Область пазлов \ Puzzle area
    const puzzles = $('.puzzle__item'); // Коллекция пазлов \ Puzzle collection
    const arrayPuzzle = $.makeArray(puzzles); // Создаем массив элементов (пазлы) \ Create an array of elements (puzzles)
    const mixBtn = $('.main__mix-btn'); // Кнопка перемешивания пазлов (начало игры) \ Puzzle shuffle button (game start)
    
    let puzzlesText = $('.puzzle__item').text();
    let newPuzzlesText;
    alert('Для початку гри натисніть "Перемішати"');

    // Перебор всех элементов массива \ Loop through all array elements
    $(arrayPuzzle).each(function(index) {
        // Исключение нажатия на пустую ячейку \ Exception for clicking on an empty cell
        if(index !== 15) {
            // Действия при нажатии на пазл \ Actions when clicking on a puzzle
            $(this).click(function() {
                const currentEl = $(this);
                let timeCurrent; // Временная переменная для записи позоции нажатой ячейки \ Temporary variable to record the position of an clicked cell
                let timeZero; // Временная переменная для записи позоции пустой ячейки \ Temporary variable to record the position of an empty cell
                // Найти координаты пустой ячейки \ Find empty cell coordinates
                function findZeroCoord() {
                    timeZero = $(arrayPuzzle[15]).offset({
                        top: this.top,
                        left: this.left
                    });
                };
                findZeroCoord();

                // Найти координаты кликнутой ячейки \ Find the coordinates of the clicked cell
                function findCurrentCoord() {
                    timeCurrent = currentEl.offset({
                        top: currentEl.top,
                        left: currentEl.left
                    });
                };
                findCurrentCoord();

                let nextCurrEl = currentEl.next();
                let prevCurrEl = currentEl.prev();

                // Исключение перемещения пазлов не по соседству и не по диагонали \ Exclusion of moving puzzles not in the neighborhood and not diagonally
                if ((timeCurrent.position().left - 100) == timeZero.position().left && timeCurrent.position().top == timeZero.position().top) {
                    $(currentEl).insertBefore(arrayPuzzle[15]);
                } 
                else if ((timeCurrent.position().left + 100) == timeZero.position().left && timeCurrent.position().top == timeZero.position().top) {
                    $(currentEl).insertAfter(arrayPuzzle[15]);
                }
                else if ((timeCurrent.position().top - 100) == timeZero.position().top && timeCurrent.position().left == timeZero.position().left){
                    $(currentEl).insertBefore(arrayPuzzle[15]);
                    $(arrayPuzzle[15]).insertBefore(nextCurrEl);
                    if (nextCurrEl.length == 0) { // Когда пазл последний \ When the puzzle is the last
                        $(currentEl).insertBefore(arrayPuzzle[15]);
                        $(arrayPuzzle[15]).insertAfter(prevCurrEl);
                    }
                }
                else if ((timeCurrent.position().top + 100) == timeZero.position().top && timeCurrent.position().left == timeZero.position().left) {
                    $(currentEl).insertBefore(arrayPuzzle[15]);
                    $(arrayPuzzle[15]).insertBefore(nextCurrEl);
                }

                newPuzzlesText = $('.puzzle__item').text();

                // Проверка совпадения исходного текста HTML с перезаписаным \ Checking if the original HTML text matches the overwritten one
                if (newPuzzlesText == puzzlesText) {
                    setTimeout(function() {
                        alert('Вiтаю, Ви перемогли!');
                    }, 50);
                }
            });
        }
    });
    
    // Перемешивания пазлов / Puzzles shuffling
    function mix() {
        $(puzzleArea).append(arrayPuzzle.map(i => [Math.floor(Math.random() * 201), i]).sort().map(i => i[1]));
    };

    // Перемешивания пазлов при нажатии на кнопку "Перемешать" \ Shuffle puzzles by pressing the "Shuffle" button
    $(mixBtn).click(function() {
        mix();
        let newPuzzlesTextShuffle = $('.puzzle__item').text();
        if (newPuzzlesTextShuffle == puzzlesText) {
            mix();
        }
    });
});


