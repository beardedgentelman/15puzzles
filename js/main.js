$('document').ready(function() {
    const puzzleArea = $('.main__puzzle'); // Область пазлов \ Puzzle area
    const puzzlesArray = $('.puzzle__item'); // Коллекция пазлов \ Puzzle collection
    const arrayPuzzle = $.makeArray(puzzlesArray); // Создаем массив элементов (пазлы) \ Create an array of elements (puzzles)
    const mixBtn = $('.main__mix-btn'); // Кнопка перемешивания пазлов (начало игры) \ Puzzle shuffle button (game start)
    
    let timeZero; // Временная переменная для записи позоции пустой ячейки \ Temporary variable to record the position of an empty cell
    let CurrTop; // Временная переменная для записи позиции сверху нажатой ячейки \ Temporary variable to record the position on top of the clicked cell
    let CurrLeft; // Временная переменная для записи позиции снизу нажатой ячейки \ Temporary variable to record the position at the bottom of the clicked cell


    // Функция определения победной позиции у всех пазлов \ The function of determining the winning position for all puzzles
    function endGame() {
        if (
            $(arrayPuzzle[0]).position().top === 0 && $(arrayPuzzle[0]).position().left === 0
        && 
            $(arrayPuzzle[1]).position().top === 0 && $(arrayPuzzle[1]).position().left === 100
        &&
            $(arrayPuzzle[2]).position().top === 0 && $(arrayPuzzle[2]).position().left === 200
        &&
            $(arrayPuzzle[3]).position().top === 0 && $(arrayPuzzle[3]).position().left === 300
        &&
            $(arrayPuzzle[4]).position().top === 100 && $(arrayPuzzle[4]).position().left === 0
        &&
            $(arrayPuzzle[5]).position().top === 100 && $(arrayPuzzle[5]).position().left === 100
        &&
            $(arrayPuzzle[5]).position().top === 100 && $(arrayPuzzle[5]).position().left === 100
        &&
            $(arrayPuzzle[6]).position().top === 100 && $(arrayPuzzle[6]).position().left === 200
        &&
            $(arrayPuzzle[7]).position().top === 100 && $(arrayPuzzle[7]).position().left === 300
        &&
            $(arrayPuzzle[8]).position().top === 200 && $(arrayPuzzle[8]).position().left === 0
        &&
            $(arrayPuzzle[9]).position().top === 200 && $(arrayPuzzle[9]).position().left === 100
        &&
            $(arrayPuzzle[10]).position().top === 200 && $(arrayPuzzle[10]).position().left === 200
        &&
            $(arrayPuzzle[11]).position().top === 200 && $(arrayPuzzle[11]).position().left === 300
        &&
            $(arrayPuzzle[12]).position().top === 300 && $(arrayPuzzle[12]).position().left === 0
        &&
            $(arrayPuzzle[13]).position().top === 300 && $(arrayPuzzle[13]).position().left === 100
        &&
            $(arrayPuzzle[14]).position().top === 300 && $(arrayPuzzle[14]).position().left === 200
        &&
            $(arrayPuzzle[15]).position().top === 300 && $(arrayPuzzle[15]).position().left === 300
        
        ) {
            alert('Вітаю, ви перемогли');
        }
    };
    
    // Функция перемешивания \ Shuffle function
    function mix() {
        $(puzzleArea).empty(); // Удаление пазлов \ Deleting puzzles

        // Вставка пазлов \ Inserting puzzles
        $(puzzleArea).append(
            arrayPuzzle.map(i => [Math.floor(Math.random() * 201), i]).sort().map(i => i[1])
        );
    };

    mix();

    // Перебор всех элементов массива \ Loop through all array elements
    $(arrayPuzzle).each(function(index) {
        // Найти координаты пустой ячейки \ Find empty cell coordinates
        function findZeroCoord() {
            timeZero = $(arrayPuzzle[15]).offset({
                top: this.top,
                left: this.left
            });
        };
        
        findZeroCoord();

        // Исключение нажатия на пустую ячейку \ Exception for clicking on an empty cell
        if(index !== 15) {
            // Действия при нажатии на пазл \ Actions when clicking on a puzzle
            $(this).click(function() {
                const currentEl = $(this);
                let timeCurrent;

                // Найти координаты кликнутой ячейки \ Find the coordinates of the clicked cell
                function findCurrentCoord() {
                    timeCurrent = currentEl.offset({
                        top: currentEl.top,
                        left: currentEl.left
                    });

                    return timeCurrent.position();
                };
                findCurrentCoord();

                // Запись координат во временные переменные \ Writing coordinates to temporary variables
                CurrTop = currentEl.offset().top;
                CurrLeft = currentEl.offset().left;

                // Заменить координаты кликнутой ячейки координатами пустой ячейки \ Replace clicked cell coordinates with empty cell coordinates
                function changeCurrentCoord() {
                    currentEl.offset({
                        top: timeZero.offset().top,
                        left: timeZero.offset().left
                    });
                };

                // Заменить координаты пустой ячейки координатами кликнутой ячейки \ Replace empty cell coordinates with clicked cell coordinates
                function changeZeroCoord() {
                    $(arrayPuzzle[15]).offset({
                        top: CurrTop,
                        left: CurrLeft
                    });
                };

                const zeroTopMinusCurrentTop = timeZero.position().top - timeCurrent.position().top; // Отнимаем от позиции пустой ячейки сверху от нажатой позиции сверху \ Subtract from the position of the empty cell above from the pressed position above
                const currentLeftMinusZeroLeft = timeZero.position().left - timeCurrent.position().left; // Отнимаем от позиции пустой ячейки слева от нажатой позиции слева \ Subtract from the position of the empty cell to the left of the pressed position to the left

                // Исключение перемещения пазлов не по соседству и не по диагонали \ Exclusion of moving puzzles not in the neighborhood and not diagonally
                if(zeroTopMinusCurrentTop < 101 && currentLeftMinusZeroLeft < 101 && zeroTopMinusCurrentTop > -101 && currentLeftMinusZeroLeft > -101 && (zeroTopMinusCurrentTop + currentLeftMinusZeroLeft !== 200) && (zeroTopMinusCurrentTop + currentLeftMinusZeroLeft !== -200) && (zeroTopMinusCurrentTop - currentLeftMinusZeroLeft !== 200) && (zeroTopMinusCurrentTop - currentLeftMinusZeroLeft !== -200)){
                    changeCurrentCoord();
                    changeZeroCoord();
                };

                endGame();
            });
        }
    });

    // Перемешивания пазлов при нажатии на кнопку "Перемешать" \ Shuffle puzzles by pressing the "Shuffle" button
    $(mixBtn).click(function() {
        mix();
    });
});


