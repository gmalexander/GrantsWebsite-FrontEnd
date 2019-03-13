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

    require "./php/Access.php";
    require "./php/NewsEdit.php";

    session_start();

    $access = new Access();
    $pageName = "edit";

    if (isset($_SESSION["username"]) and isset($_SESSION["logged"])):
        $allowed = $access->verify($pageName, $_SESSION["username"]);

        if ($allowed and $_SESSION["logged"]):
            $newsEdit = new NewsEdit();
    ?>

<!doctype HTML>
<html>
   <head>
      <title>Playground of a Computer Scientist</title>
	  <link rel="stylesheet" type="text/css" href="theme/global.css" />
	  <script type="text/javascript" src="script/main.js"></script>
       <script type="text/javascript" src="script/ui.js"></script>
   </head>
   <body>
     <div class="body">
		  <div class="header">Grant's Web.site</div>
		  <div id="navBar" class="navBar">
			 <div id="navButton1" class="navButton" onclick="javascript:redirectHome();" onmouseover="javascript:highlightNav('navButton1');" onmouseout="javascript:unhighlightNav('navButton1');">Home</div><div id="navButton2" class="navButton" onclick="javascript:redirectCode();" onmouseover="javascript:highlightNav('navButton2');" onmouseout="javascript:unhighlightNav('navButton2');">Code</div><div id="navButton3" class="navButton" onclick="javascript:redirectContact();" onmouseover="javascript:highlightNav('navButton3');" onmouseout="javascript:unhighlightNav('navButton3');">Contact</div><div id="navButton4" class="navButton" onclick="javascript:redirectCV();" onmouseover="javascript:highlightNav('navButton4');" onmouseout="javascript:unhighlightNav('navButton4');">Login</div>
		  </div>
		  <div class="News" id="pgNews">
              <br />
              <form action="edit.php" method="post" class="newsEditForm">
                  <div class="table" id="table">
                    <div class="tableHeader"> Title </div>
                      <div class="tableCell">
                          <input class="contactText" type="text" name="title" />
                      </div>
                      <div class="tableHeader"> User </div>
                      <div class="comboboxTableCell" id="userSelection">
                          <?php echo $newsEdit->generateUserDropdown(); ?>
                      </div>
                      <div class="tableHeader"> Body </div>
                    <div class="tableCell"><input class="contactTextArea" type="text" name="login" /></div>
                    <div class="tableCell">
                        <input type="submit" class="submit" value="Submit" /><input type="button" class="clear" value="Clear" />
                    </div>
                  </div>
                  <div class="previewPane" id="PreviewPane">
                      <script type="text/javascript">correctPreviewPaneSize();</script>
                  </div>
              </form>
          </div>
	  </div>
   </body>
</html>

<?php
        endif;
    else:
        $access->reject();
    endif;
?>