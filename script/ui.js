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

var combobox = {
    internal: {
        names: {
            comboboxTextbox: "cbtxt",
            combobox: "cb",
            comboboxButton: "cbb",
            comboboxDropdown: "cbdd",
            comboboxOption: "cbop"
        },
        showDropdown: (id, containerId) => {
            return function displayDropdown() {
                let dropdown = document.getElementById(id);
                let container = document.getElementById(containerId);
                let width = container.getBoundingClientRect().width;
                dropdown.style.width = `${width}px`;
                dropdown.style.display = "block";
            };
        },
        hideDropdown: (id) => {
            return function obscureDropdown() {
                let dropdown = document.getElementById(id);
                setTimeout( () => dropdown.style.display = "none", 2000);
            };
        },
        createDropdown: function makeCBDropdown(id) {
            let dropdown = document.createElement("div");
            dropdown.className = "comboboxDropdown"; //def in global.css
            dropdown.id = this.names.comboboxDropdown + id;
            dropdown.addEventListener("mouseout", this.hideDropdown(this.names.comboboxDropdown + id));
            dropdown.style.display = "none";
            return dropdown;
        },
        createButton: function createCBButton(id) {
            let button = document.createElement("div");
            button.id = this.names.comboboxButton + id;
            button.className = "comboboxButton";
            button.addEventListener("click", this.showDropdown(this.names.comboboxDropdown + id, this.names.combobox + id));
            let text = document.createTextNode("v");
            button.appendChild(text);
            return button;
        },
        createTextField: function createCBTextbox(id, name) {
            let textField = document.createElement("input");
            textField.setAttribute("name", name);
            textField.setAttribute("type", "text");
            textField.id = this.names.comboboxTextbox + id;
            textField.className = "comboboxText";
            return textField;
        },
        createContainer: function createCBContainer(id) {
            let container = document.createElement("div");
            container.className = "combobox"; //def in global.css
            container.id = this.names.combobox + id;
            return container;
        },
        copyFromDropdownToTextField: function copyFromDropdownToCBTextField(textContainerId, textFieldId) {
            return function copyOptionTextToTextbox() {
                let textContainer = document.getElementById(textContainerId);
                let textField = document.getElementById(textFieldId);
                textField.value = textContainer.innerText;
            }
        },
        populateDropdown: function populateCBDropdown(dropdown, id, dataSource) {
            for(let x = 0; x < dataSource.length; x++) {
                let item = document.createElement("div");
                item.className = "comboboxDropdownItem";
                item.id = this.names.comboboxOption + id + x;

                let text = document.createTextNode(dataSource[x]);
                let comboboxTextFieldId = this.names.comboboxTextbox + id;
                item.appendChild(text);

                item.addEventListener("click", this.copyFromDropdownToTextField(item.id, comboboxTextFieldId));

                dropdown.appendChild(item);
            }
        }
    },
    setText: function setText(id) {
        let textField = document.getElementById(id);
        textField.setAttribute("value", value);
    },
    getText: function getText(id) {
        let textField = document.getElementById(id);
        return textField.innerText;
    },
    init: function initializeCombobox(id, name, parentId, dataSource) {
        let container = this.internal.createContainer(id);

        let textField = this.internal.createTextField(id, name);
        container.appendChild(textField);

        let button = this.internal.createButton(id);
        container.appendChild(button);

        let dropdown = this.internal.createDropdown(id);
        this.internal.populateDropdown(dropdown, id, dataSource);
        container.appendChild(dropdown);

        let parentNode = document.getElementById(parentId);
        parentNode.appendChild(container);
    }
};