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

function roundPages(pageNumber) {
  var fractionalPart = pageNumber%1;
  return (fractionalPart > 0) ? pageNumber + (1-fractionalPart) : pageNumber;
}

function collection() {
  this.contents = [];
  this.addItem = function addItems(item) {
    this.contents.push(item);
  };
}

function project(title, link, description) {
  this.title = title;
  this.link = link;
  this.description = description;
}

function gatherProjects(xmlDocument) {
  var items = xmlDocument.getElementsByTagName("item");
  var titles = xmlDocument.getElementsByTagName("title");
  var links = xmlDocument.getElementsByTagName("link");
  var descriptions = xmlDocument.getElementsByTagName("description");
  var theCollection = new collection();

  for(var x = 0; x < items.length; x++) {
    var projectObject = new project(titles[x].innerHTML, links[x].innerHTML, descriptions[x].innerHTML);
    theCollection.addItem(projectObject);
  }

  return theCollection;
}

function postProjects(theCollection, pageNumber) {
  var projectsPerPage = 5;
  var startingIndex = pageNumber*projectsPerPage;
  var endingIndex = ( (startingIndex + projectsPerPage) < theCollection.contents.length ) ? startingIndex + projectsPerPage : theCollection.contents.length;
  var projectSection = document.getElementById("projects");

  projectSection.innerHTML = "";
  for(var x = startingIndex; x < endingIndex ; x++) {
    var projectObject = theCollection.contents[x];
    console.log("This iterates!");
    projectSection.innerHTML += '<a class="titleLink" href="' + projectObject.link + '">' + projectObject.title + '</a>';
    projectSection.innerHTML += '<br />';
    projectSection.innerHTML += '<br />';
		projectSection.innerHTML += projectObject.description;
		projectSection.innerHTML += ((x != (endingIndex-1)) ? '<hr class="bodyDivider" />' : '<br />');
  }
}

function requestController(next, xmlDocument) {
  var pageStorage = document.getElementById("pageStorage");
  var currentPage = document.getElementById("currentPage");
  var projectCollection = gatherProjects(xmlDocument);
  var pageNumber = Number.parseFloat(pageStorage.innerHTML);
  var projectsPerPage = 5;
  var maxPages = projectCollection.contents.length/projectsPerPage;
  var correctionToRealPageNumber = 2;
  var correctionToCalcFriendlyPageNumber = 1;

  maxPages = (maxPages < 1) ? 0 : maxPages;
  maxPages = roundPages(maxPages);

  if(next && ((pageNumber+correctionToCalcFriendlyPageNumber) < maxPages)) {
    postProjects(projectCollection, pageNumber + 1);
    currentPage.innerHTML = pageNumber + correctionToRealPageNumber;
    pageStorage.innerHTML = pageNumber + correctionToCalcFriendlyPageNumber;
  }
  else if(!next && pageNumber > 0) {
    postProjects(projectCollection, pageNumber - 1);
    currentPage.innerHTML = pageNumber;
    pageStorage.innerHTML = pageNumber - correctionToCalcFriendlyPageNumber;
  }
  else if(next == null) {
    postProjects(projectCollection, pageNumber);
  }
}

function doAjaxRequest(next) {
  var ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    if(this.readyState == 4) {
      requestController(next, this.responseXML);
    }
  };

  ajaxRequest.open("GET", "xml/projects.xml", true);
  ajaxRequest.send();
}
