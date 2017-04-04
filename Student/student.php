<?php
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Capybot</title>

    <link href="../bootstrap.css" rel="stylesheet">
    <link href="student.css" rel="stylesheet">

    <style type="text/css">
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<<<<<<< HEAD
    <script src="collapseNavbar.js"></script>
=======
>>>>>>> b03cfd829d5cc7a809e4830e99f39c889ea8de0f

</head>

<body onload="openLecture()">

    <div class="container">

        <!-- Header -->

        <div class="header clearfix">

        <!-- Static navbar -->
            <nav class="navbar-default">
                <button id="dropdown-menu" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <ul id="navbar" class="nav navbar-nav navbar-right navbar-collapse collapse">
                    <li class="active" id="activeLecture"><a href="#" onclick="openLecture()">Lecture <span class="sr-only">(current)</span></a></li>
                    <li id="activeQuestions"><a href="#" onclick="openQuestions()">Questions <span class="badge">4</badge></a></li>
                    <li id="activeHighscore"><a href="#" onclick="openHighscore()">Highscore</a></li>
                    <li id="activeProfile"><a href="#" onclick="openProfile()">Profile</a></li>
                </ul>
            </nav>

            <a href="student.php" class="capybot"><h3 class="text-muted capybot">capybot</h3></a>
        </div>

        <!-- Body -->
        <div id="student_body">

            <h3 id="subject"></h3>

            <h1>Lecture: <?php echo $_SESSION["lecturePin"]; ?> <span id="pin"></span></h1>

            <div class="jumbotron">
                <h1 class="question" style="font-size:50px;">Question</h1>

                <ul class="list-group answers">
                    <button type="button" class="btn btn-lg btn-primary list-group-item answer ">Answer</button>
                    <button type="button" class="btn btn-lg btn-primary list-group-item answer ">Answer</button>
                    <button type="button" class="btn btn-lg btn-primary list-group-item answer">Answer</button>
                </ul>
            </div>

            <div class="row marketing">
                <div class="col-lg-12">

                    <h3>Give feedback</h3>

                    <div class="" style="width:100%">
<<<<<<< HEAD

                        <p>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="slowDown"></span></button>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="speedUp"></span></button>
                        </p>
                        <p>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="tooHard"></span></button>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="tooEasy"></span></button>
                        </p>

                    </div>
=======
>>>>>>> b03cfd829d5cc7a809e4830e99f39c889ea8de0f

                        <p>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="slowDown"></span></button>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="speedUp"></span></button>
                        </p>
                        <p>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="tooHard"></span></button>
                            <button type="button" class="btn btn-lg btn-primary knapp"><span id="tooEasy"></span></button>
                        </p>

                    </div>

                    <h3>Ask question</h3>
                    <form class="" >
                        <input type="text" class="form-control" placeholder="?">
                        <input type="submit" class="btn btn-success knapp" value="Ask" style="display:block; width:25%; margin:auto; margin-top: 5px; text-align:center">
                    </form>
                    <br />

               </div>
           </div>
       </div>

      <!-- Footer -->

    <footer class="footer">
        <p>&copy; Capybaras are cool, inc.</p>
    </footer>

  </div>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../bootstrap.min.js"></script>  <!-- Menu -->
    <script src="student.js"></script>
    <script src="lectureUpdate.js"></script>
</body>
</html>
