<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Capybot</title>

    <link href="../bootstrap.css" rel="stylesheet">
    <link href="loggedIn.css" rel="stylesheet">

    <style type="text/css">
        body {padding-top: 50px; padding-bottom: 20px;}

    </style>
</head>

<body>

    <!-- Top navbar -->

    <nav class="navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">capybot</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><button class="btn-success btn" style="margin-top:7px;" onclick="createLecture()">+ Create lecture</button></li>
                    <li><a href="#">Dashboard</a></li>
                    <li><a><?php echo $_SESSION["email"]; ?></a></li>
                </ul>
            </div>
        </div>
    </nav>


    <div class="container-fluid">
        <div class="row">

            <!-- Side navbar -->

            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Manage subjects</a></a></li>
                    <li><a href="#">Statistics</a></li>
                </ul>
                <h3 class="menuTitle">Subjects</h3>
                <ul class="nav nav-sidebar">
                    <li><a href="">TDT4140</a></li>
                    <li><a href="">IT1901</a></li>
                    <li><a href="">TDT4145</a></li>
                </ul>
            </div>

            <!-- main -->

            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" id="main">
                <h1 class="page-header">Dashboard </h1>
                <h2 class="sub-header">...</h2>
            </div>
        </div>
    </div>


    <!-- JavaScript -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../bootstrap.min.js"></script>
    <script src="lecturer.js"></script>

</body>
</html>