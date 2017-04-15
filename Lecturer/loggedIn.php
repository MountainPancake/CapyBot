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
                <a class="navbar-brand" onclick="overview()">capybot</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><button class="btn-success btn" style="margin-top:7px;" onclick="createLecture()">+ Create lecture</button></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php echo $_SESSION["email"]; ?><span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Sign out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


    <div class="container-fluid">
        <div class="row">

            <!-- Side navbar -->

            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active" onclick="overview()"><a>Overview</a></li>
                    <li onclick="manageSubjects()"><a>Manage subjects</a></li>
                    <li onclick="statistics()"><a>Statistics</a></li>
                </ul>
                <h3 class="menuTitle">Subjects</h3>
                <ul class="nav nav-sidebar">
                    <li><a href="">TDT4140</a></li>
                    <li><a href="">IT1901</a></li>
                    <li><a href="">TDT4145</a></li>
                </ul>
            </div>

            <div id="main" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

                <!-- main -->

                <h1>Overview</h1>

                <!-- Features: -->

                <hr class="featurette-divider">

                <div class="row featurette">
                    <div class="col-md-7">
                        <h2 class="featurette-heading">Welcome to capybot. <span class="text-muted">It'll blow your mind.</span></h2>
                        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div class="col-md-5">
                        <img class="featurette-image img-responsive center-block" src="http://www.zooborns.com/.a/6a010535647bf3970b01a3fd3d706c970b-800wi" alt="Generic placeholder image">
                    </div>
                </div>

                <hr class="featurette-divider">

                <div class="row featurette">
                    <div class="col-md-7 col-md-push-5">
                        <h2 class="featurette-heading">Oh yeah, it's that good. <span class="text-muted">See for yourself.</span></h2>
                        <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div class="col-md-5 col-md-pull-7">
                        <img class="featurette-image img-responsive center-block" src="http://gianthamster.com/wp-content/uploads/2009/05/caplin_profile_pool.jpg" alt="Generic placeholder image">
                    </div>
                </div>

                <hr class="featurette-divider">

                <!-- end main -->
            </div>
        </div>
    </div>


    <!-- JavaScript -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../bootstrap.min.js"></script>
    <script src="lecturer.js"></script>

</body>
</html>
