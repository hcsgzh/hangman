
    (function(exports) {
        
        function hangmanCore (rows,cols) {
            this.GRID_ROWS= rows;
            this.GRID_COLS= cols;
            this.GRID_ELEMENT;
            this.WORD_SECTION;
            this.word_data = ['stay cool', 'stay positive', 'how are you', 'hello world', 'block bit', 'have fun'];
            this.word = 'stay positive';
            this.single_letters;

            this.columnLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', '&', 'R', 'S', 'T', 'U', 'V', 'W', '&', 'X', 'Y', 'Z'];
            this.gridStore= {};
            this.currentCellID = '';
            this.wordStore = {} ;

            this.mistake_count = 0;
            this.mode = 7;
            this.gridContainer= "letterGrid";
            this.wordContainer= "wordSection";
            
        }
            
            hangmanCore.prototype.init = function(){
                this.createWordScetion();
                this.createGrid();
            };
            
            hangmanCore.prototype.showWord = function(){
                console.log('hahah::'+this.word);
                return this.word;
            };
            
            hangmanCore.prototype.getRows = function(){
                return this.GRID_ROWS;
            };
            
            hangmanCore.prototype.getCols = function(){
                return this.GRID_COLS;
            };
            hangmanCore.prototype.getNewArray= function(word){
                return this.createNewArray(word);
            };
            
            
            
            
            hangmanCore.prototype.createWordScetion = function() {
                //to get a random word from the word data
                var randomNumber = Math.floor(Math.random() * this.word_data.length);
                  this.word = this.word_data[randomNumber];

                  this.word =   this.word.toUpperCase();
                this.WORD_SECTION = $("#" + this.wordContainer);
                var wordArray =   this.word.split("");
                var newWord = $('<div id="wordSection" class="gridContainer" > </div>');
                for (var i = 0; i <   this.word.length; i++) {
                    var letter = wordArray[i] === " " ? "" : "_";
                    var letter_cell = wordArray[i] === " " ? "cell_white" : "cell";
                    //console.log('letter:::'+i+':'+letter);
                    $("<div id=" + i + " class=" + letter_cell + " data-hover-text='" + i + "'>" + letter + "</div>")
                            .appendTo(newWord);
                }

                newWord.height(38);
                newWord.width(74 * this.word.length);

                this.WORD_SECTION.replaceWith(newWord);

                this.single_letters = this.createNewArray(this.word);

                //for refresh
                $("#result").text('');
                this.mistake_count = 0;

            };

            hangmanCore.prototype.createGrid = function() {
                this.GRID_ELEMENT = $("#" + this.gridContainer);
                var cell; // Contains the 1 or 0 based upon the cell selection
                var newGrid = $('<div id="letterGrid" class="gridContainer" > </div>');

                var label_row = '';
                var label_colume = '';
                var cell_count = 0;
                var self = this;
                


                for (var i = 1; i <= this.GRID_ROWS; i++) {
                    for (var j = 1; j <= this.GRID_COLS; j++) {
                        label_colume = i - 1;
                        label_row = j - 1;
                        var id = label_row + "-" + label_colume;
                        $("<div id=" + id + " class='cell' data-hover-text='" + label_row + "," + label_colume + "'>" + this.columnLabel[cell_count] + "</div>")
                                .appendTo(newGrid)
                        .on("click", function(){
                            self.currentCellID = $(this).attr('id');
                            console.log('cellClick  $(this).id:' + $(this).attr('id') + '; value:' + self.gridStore[self.currentCellID] ); //+ this.gridStore[this.currentCellID]
                            $("#" + self.currentCellID).css('border-color', 'red');
                            self.single_letters = self.hangmanCheck(self.single_letters, 0, 7, self.gridStore[self.currentCellID]);
                            self.checkFinish(self.single_letters);
                        });
//                                .on("click", this.cellOnClick);
                        this.gridStore[id] = this.columnLabel[cell_count];
                        cell_count = cell_count + 1;
                    }
                }

                newGrid.height(38 * this.GRID_ROWS);
                newGrid.width(74 * this.GRID_COLS);

                this.GRID_ELEMENT.replaceWith(newGrid);
            };

//            hangmanCore.prototype.cellOnClick= function(e) {
//                //this.currentCellID && $("#" + currentCellID).css('border-color', 'black');
//                e.hangmanCore.currentCellID = $(this).attr('id');
//                console.log('cellClick  $(this).id:' + $(this).attr('id') + '; value:' + e.hangmanCore.gridStore[e.hangmanCore.currentCellID] ); //+ this.gridStore[this.currentCellID]
//                $("#" + e.hangmanCore.currentCellID).css('border-color', 'red');
//                e.hangmanCore.single_letters = e.hangmanCore.hangmanCheck(e.hangmanCore.single_letters, 0, 7, e.hangmanCore.gridStore[e.hangmanCore.currentCellID]);
//                e.hangmanCore.checkFinish(e.hangmanCore.single_letters);
//            };
            
            

            hangmanCore.prototype.createNewArray= function(word) {
                var arr = word.split("");
                var result = arr.sort().reduce((accumulator, current) => {
                    const length = accumulator.length;
                    if (length === 0 || accumulator[length - 1] !== current) {
                        accumulator.push(current);
                    }
                    return accumulator;
                }, []);
                console.log(arr);
                console.log(result); //[1,2,3,4,5]

                return result;
            };

            hangmanCore.prototype.getAllIndexes = function(arr, val) {
                var indexes = [], i = -1;
                while ((i = arr.indexOf(val, i + 1)) !== -1) {
                    indexes.push(i);
                }
                return indexes;
            };

            hangmanCore.prototype.hangmanCheck= function(single_letters, steps, mode, inputLetter) {
                var single_letters_new = single_letters.filter(letter => letter !== inputLetter);
                console.log('single_letters.length:' + single_letters.length + '; single_letters_new:' + single_letters_new.length);
                var result_log = "";

                if (single_letters_new.length === single_letters.length) {
                    console.log('you lose one step! ' + inputLetter);
                    result_log = 'You lose one step! ' + inputLetter;
                    this.mistake_count =this.mistake_count + 1;

                } else {
                    //correct choise 
                    console.log('good guess! ' + inputLetter);
                    result_log = 'good guess! ' + inputLetter;

                    //to show in the word section
                    var word_original = this.word.split('');
                    var index_array = this.getAllIndexes(word_original, inputLetter);
                    console.log(index_array);
                    index_array.map(x => {
                        $("#" + x).text(inputLetter);
                        $("#" + x).animate({fontSize: '20px'}, "slow");
                    });

                }

                $("#result").append(result_log + '<br>');

                return single_letters_new;
            };
            hangmanCore.prototype.checkFinish= function(single_letters) {
                if (single_letters.length === 0 || single_letters.every(x => x === ' ')) {
                    console.log('You win!');
                    window.alert('You win!');
                } else {
                    if (this.mistake_count === this.mode) {
                        window.alert('You lose!\n The answer is ' +   this.word);
                        return;
                    }
                    console.log('Keep going! watch out you step!');
                }
            };
        
        
        

        this.start = function(){
            var hangman = new hangmanCore(4,7);
            hangman.init();
            hangman.showWord();
            return hangman;
        };
        
        this.easy = function(){
            var hangman = new hangmanCore(4,7);
            hangman.init();
            hangman.mode = 7;
            $("#result").append('You are in the <b>easy</b> mode now!<br>');
            return hangman;
        };
        
        this.medium = function(){
            var hangman = new hangmanCore(4,7);
            hangman.init();
            hangman.mode = 6;
            $("#result").append('You are in the <b>medium</b> mode now!<br>');
            return hangman;
        };
        
        this.hard = function(){
            var hangman = new hangmanCore(4,7);
            hangman.init();
            hangman.mode = 5;
            $("#result").append('You are in the <b>hard</b> mode now!<br>');
            return hangman;
        };
        
        exports.hangmanStart = this.start;
        exports.hangmanEasy = this.easy;
        exports.hangmanMedium = this.medium;
        exports.hangmanHard = this.hard;
        exports.Hangman = hangmanCore;
    })(this);
    
    
    
    
    
    $(document).ready(function () {
        
        hangmanStart();
        
    });
