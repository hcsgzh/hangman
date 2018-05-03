
(function () {

    var assert = chai.assert;

    suite("HangmanTest", function () {
        var hangman;
        var start;
        var easyMode;
        var mediumMode;
        var hardMode;
        

        setup(function () {
            hangman = Hangman;
            start = hangmanStart;
            easyMode = hangmanEasy;
            mediumMode = hangmanMedium;
            hardMode = hangmanHard;
            
        });

        suite(".hangnmanStart()", function () {
            test("default", function () {
                var h1 = start();
                console.log("Testing h1: rows::"+h1.getRows()+'; col:'+h1.getCols());
                assert(h1.getRows() === 4);
                assert(h1.getCols() === 7);
            });
        });
        suite(".createNewArray()", function () {
            test("default", function () {
                var h = new hangman(4,7);
                var newWordArray = h.createNewArray('foot');
                assert(newWordArray.length === 3);
                assert(newWordArray[0] === 'f');
                assert(newWordArray[1] === 'o');
                assert(newWordArray[2] === 't');
                
            });
        });

        suite(".getAllIndexes()", function () {
            test("default", function () {
                var h = new hangman(4,7);
                var allIndexInArray = h.getAllIndexes('foot','o');
                assert(allIndexInArray.length === 2);
                assert(allIndexInArray[0] === 1);
                assert(allIndexInArray[1] === 2);
            });
        });
        suite(".easy()", function () {
            test("default", function () {
                var h = easyMode();
                assert(h.mode === 7);
            });
        });
        suite(".medium()", function () {
            test("default", function () {
                var h = mediumMode();
                assert(h.mode === 6);
            });
        });
        suite(".hard()", function () {
            test("default", function () {
                var h = hardMode();
                assert(h.mode === 5);
            });
        });

    });
})(this);