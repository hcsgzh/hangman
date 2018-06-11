<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
       
        class Thesaurus
        {
            private $thesaurus;

            function Thesaurus($thesaurus)
            {
                $this->thesaurus = $thesaurus;
            }

            public function getSynonyms($word)
            {
                $result = $this->thesaurus[$word];
                //echo 'get:'.json_encode($result);

                $output = ["word" => $word, $word => $result];

                if($result === NULL){
                    $output = NULL;
                }

                return json_encode($output);
            }
        }

        $thesaurus = new Thesaurus(
            array 
                (
                    "buy" => array("purchase"),
                    "big" => array("great", "large")
                )); 

        echo $thesaurus->getSynonyms("big");
        echo "\n";
        echo $thesaurus->getSynonyms("agelast");        
        
        
        
        ?>
    </body>
</html>

