<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
       
        class LeagueTable
        {
                public function __construct($players)
            {
                        $this->standings = array();
                        foreach($players as $index => $p)
                {
                                $this->standings[$p] = array
                    (
                        'index' => $index,
                        'games_played' => 0, 
                        'score' => 0
                    );
                }
                }

                public function recordResult($player, $score)
                {
                            $this->standings[$player]['games_played']++;
                            $this->standings[$player]['score'] += $score;
                    }

                public function cmp($a, $b)
                {
                    return strcmp($a["score"], $b["score"]);
                }

                public function playerRank($rank)
                {

                foreach ($this->standings as $key => $row) {
                    $score[$key]  = $row['score'];
                    $games_played[$key] = $row['games_played'];
                }

                array_multisort($score, SORT_DESC, $games_played, SORT_ASC, $this->standings);


                return array_keys($this->standings)[$rank-1];
                }
        }

        $table = new LeagueTable(array('Mike', 'Chris', 'Arnold'));
        $table->recordResult('Mike', 2);
        $table->recordResult('Mike', 3);
        $table->recordResult('Arnold', 5);
        $table->recordResult('Chris', 5);
        echo $table->playerRank(1);

        
        
        ?>
    </body>
</html>

