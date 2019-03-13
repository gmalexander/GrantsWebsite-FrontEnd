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

function highlightNav(buttonID) {
	var navigationButton = document.getElementById(buttonID);
	navigationButton.style.background = "#3fd227";
	navigationButton.style.color = "#ffffff";
}

function highlightNavInverted(buttonID) {
	var navigationButton = document.getElementById(buttonID);
	navigationButton.style.background = "#c02dd8";
	navigationButton.style.color = "#000000";
}

function unhighlightNavInverted(buttonID) {
	var navigationButton = document.getElementById(buttonID);
	navigationButton.style.background = "#df75d5";
	navigationButton.style.color = "#000000";
}

function unhighlightNav(buttonID) {
	var navigationButton = document.getElementById(buttonID);
	navigationButton.style.background =  "#208a2a";
	navigationButton.style.color = "#ffffff";
}

function redirectHome() {
	window.location.assign("index.html");
}

function redirectCode() {
	window.location.assign("code.html");
}

function redirectContact() {
	window.location.assign("contact.html");
}

function redirectCV() {
	window.location.assign("login.php");
}

function embiggen(img) {
	window.location.assign(img);
}