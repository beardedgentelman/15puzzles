window.addEventListener('DOMContentLoaded', () => {
    const puzzles = document.querySelectorAll('.puzzle__item')
    const puzzlesArray = Array.from(puzzles);
    const zeroPuzzle = puzzlesArray[0];
    const puzzleArea = document.querySelector('.main__puzzle');
    
    for (let i = 0; i < puzzlesArray.length; i++) {
        const puzNum = {puzNum : i};
        Object.assign(puzzlesArray[i], puzNum);
    }

    const key = 'puzNum';

    puzzlesArray.forEach((el, i) => {
        el.addEventListener('click', () => {
            let clickPuzNum = el.puzNum;

            el.puzNum = zeroPuzzle.puzNum;
            zeroPuzzle.puzNum = clickPuzNum;

            const sortedPuzzles = puzzlesArray.sort((el, zeroPuzzle) => el[key] > zeroPuzzle[key] ? 1 : -1);
            console.log(sortedPuzzles);

            $(puzzleArea).empty();
            $(puzzleArea).append(sortedPuzzles);
        });
    });
    
});