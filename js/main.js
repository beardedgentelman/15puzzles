window.addEventListener('DOMContentLoaded', () => {
    const puzzles = document.querySelectorAll('.puzzle__item')
    const puzzlesArray = Array.from(puzzles);
    let timeZero;
    function findZeroCoord() {
        timeZero = $(puzzlesArray[0]).offset({
            top: this.top,
            left: this.left
        });
    };
    
    findZeroCoord();

    console.log(timeZero.position().left);
    $(puzzlesArray).each(function (index) {
        if(index !== 0){
            $(this).click(function() {
                const currentEl = $(this);
                function findCurrentCoord() {
                    timeCurrent = currentEl.offset({
                        top: currentEl.top,
                        left: currentEl.left
                    });

                    return timeCurrent.position();
                };
                findCurrentCoord();
                
                if ((timeCurrent.position().left - 100) === timeZero.position().left) {
                    $(puzzlesArray[0]).insertAfter(currentEl);
                } 
                else if ((timeCurrent.position().left + 100) === timeZero.position().left) {
                    $(puzzlesArray[0]).insertBefore(currentEl);
                }
                console.log(timeCurrent.position().left);
                console.log(timeZero.position().left);

            });
        };
    });
    
});