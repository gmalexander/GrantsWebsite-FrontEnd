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

function newsCollection(xmlDocument) {
	this.items = xmlDocument.getElementsByTagName("item");
	this.titles = xmlDocument.getElementsByTagName("title");
	this.avatars = xmlDocument.getElementsByTagName("icon");
	this.posters = xmlDocument.getElementsByTagName("poster");
	this.dates = xmlDocument.getElementsByTagName("date");
	this.bodies = xmlDocument.getElementsByTagName("body");
}

function news(collection, index) {
	this.title = collection.titles[index];
	this.avatar = collection.avatars[index];
	this.poster = collection.posters[index];
	this.date = collection.dates[index];
	this.body = collection.bodies[index];
}

function gatherPages(collection) {
	var allPages = [];
	for(var x = 0; x < collection.items.length; x += 3) {
		((x+3 <= collection.items.length) ? allPages.push([new news(collection, x), new news(collection, x+1), new news(collection, x+2)]) :
			((x+2 <= collection.items.length) ? allPages.push([new news(collection, x), new news(collection, x+1), null]) : allPages.push([new news(collection, x), null, null])));
	}
	return allPages;
}

function getAndModifyPageNumber(operation, pageArrayLength) {
	var pageNumberElement = document.getElementById("pageStorage");
	var pageNumberValue = Number.parseInt(pageNumberElement.innerHTML);
	var destinationPageNumber = operation(pageNumberValue, 1);

	if(destinationPageNumber < 0) {
		pageNumberElement.innerHTML = 0;
		destinationPageNumber = 0;
	}
	else if(destinationPageNumber >= pageArrayLength) {
		pageNumberElement.innerHTML = pageArrayLength-1;
		destinationPageNumber = pageArrayLength-1;
	}
	else {
		pageNumberElement.innerHTML = destinationPageNumber;
	}

	return destinationPageNumber;

}

function populateNews(pages, next) {
	var index = ((next == null) ? 0 :
		(next ? getAndModifyPageNumber((a, b) => {return a+b;}, pages.length) : getAndModifyPageNumber((a, b) => {return a-b;}, pages.length)));
	var currentPage = pages[index];
	var newsSection = document.getElementById("news");
	newsSection.innerHTML = "";
	document.getElementById("currentPage").innerHTML = index+1;
	for(var x = 0; x < currentPage.length; x++){
		newsSection.innerHTML += '<span class="newsTitle">' + currentPage[x].title.innerHTML + '</h3>';
		newsSection.innerHTML += '<br />';
		newsSection.innerHTML += '<img src="' + currentPage[x].avatar.innerHTML + '" class="newsIcons" />';
		newsSection.innerHTML += '<span class="newsInfo">&nbsp;Posted By: ' + currentPage[x].poster.innerHTML + ' on ' + currentPage[x].date.innerHTML + '</span>';
		newsSection.innerHTML += '<br />';
		newsSection.innerHTML += '<br />';
		newsSection.innerHTML += currentPage[x].body.innerHTML;
		newsSection.innerHTML += ((x != (currentPage.length-1)) ? '<hr class="bodyDivider" />' : '<br />');
		newsSection.innerHTML += '<br />';
	}
}
function toughOnGreece(next) {
	var AJAXRequest = new XMLHttpRequest();
	AJAXRequest.onreadystatechange = function () { ((this.readyState == 4) ? populateNews(gatherPages(new newsCollection(this.responseXML)), next): null);};
	AJAXRequest.open("GET", "xml/news.xml", true);
	AJAXRequest.send();
}
