<?php
    /***************************************************************************************************************************************
     * Copyright 2017 Grant Alexander
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
     * (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
     * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
     * subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
     * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
     * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     ****************************************************************************************************************************************/

    require 'php/Database.php';
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $body = $_POST["body"];
    $dbType = "COMM";

    $db = new database($dbType);
    $db->insertIntoCommentsTable($email, $subject, $body);
?>

<!doctype HTML>
<html>
   <head>
      <title>Playground of a Computer Scientist</title>
	  <link rel="stylesheet" type="text/css" href="theme/global.css" />
	  <script type="text/javascript" src="script/main.js"></script>
   </head>
   <body>
     <div class="body">
		  <div class="header">Grant's Web.site</div>
		  <div id="navBar" class="navBar">
			 <div id="navButton1" class="navButton" onclick="javascript:redirectHome();" onmouseover="javascript:highlightNav('navButton1');" onmouseout="javascript:unhighlightNav('navButton1');">Home</div><div id="navButton2" class="navButton" onclick="javascript:redirectCode();" onmouseover="javascript:highlightNav('navButton2');" onmouseout="javascript:unhighlightNav('navButton2');">Code</div><div id="navButton3" class="navButton" onclick="javascript:redirectContact();" onmouseover="javascript:highlightNav('navButton3');" onmouseout="javascript:unhighlightNav('navButton3');">Contact</div><div id="navButton4" class="navButton" onclick="javascript:redirectCV();" onmouseover="javascript:highlightNav('navButton4');" onmouseout="javascript:unhighlightNav('navButton4');">Experimental</div>
		  </div>
		  <div id="news">
              <br />
              <div class="newsTitle">Thank you for your submission!</div>
              <br />
              <div class="newsInfo">You'll be redirected to the main page, shortly! :)</div>
              <script type="text/javascript">
                setTimeout(() => redirectHome(), 5000);
              </script>
          </div>
	  </div>
   </body>
</html>