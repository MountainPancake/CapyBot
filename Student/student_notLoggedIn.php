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
        .jumbotron {padding: 25px;}
        .signin {margin-top: 15px; font-weight: bold;}
    </style>
</head>

<body>
    <div class="container">

        <!-- Header -->

        <div class="header clearfix">

        <!-- Static navbar -->
        <nav class="navbar-default">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <ul id="navbar" class="nav navbar-nav navbar-right navbar-collapse collapse">
                <li class="active"><a href="#">Sign in <span class="sr-only">(current)</span></a></li>
                <li><a href="#" onclick="openProfile()">Profile</a></li>
            </ul>
        </nav>

        <a href="student_notLoggedIn.html" class="capybot"><h3 class="text-muted capybot">capybot</h3></a>
        </div>

        <!-- Body -->
        <div id="student_body">
            <div class="jumbotron">
                <h1 style="font-size:50px;">Sign in to lecture</h1>
                <form action="lectureLogin.php" method="get" class="">
                    <input type="text" placeholder="Lecture pin" name="lecturePin" class="code" style="color:black;">
                    <input type="submit" class="btn btn-lg btn-success signin knapp" value="Submit">
                </form>
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
</body>
</html>
