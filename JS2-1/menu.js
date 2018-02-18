function Container() {
    this.id = 'container';
    this.className = 'container';

    this.element = document.createElement('div');
}

Container.prototype.render = function () {
    var div = this.element;
    div.id = this.id;
    div.className = this.className;

    return div;
}

Container.prototype.remove = function () {
    if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
    }
}

function Menu(id, className, items) {
    Container.call(this);
    this.id = id;
    this.className = className;
    this.items = items;

    this.element = document.createElement('ul');

}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function () {
    var ul = this.element;
    ul.className = this.className;
    ul.id = this.id;

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof MenuItem) {
            ul.appendChild(this.items[i].render());
        }
    }

    return ul;
}

function SuperMenu(id, className, items) {
    Menu.apply(this, arguments);
}

SuperMenu.prototype = Object.create(Menu.prototype);

SuperMenu.prototype.render = function () {
    var ul = this.element;
    ul.className = this.className;
    ul.id = this.id;

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof MenuItem) {
            ul.appendChild(this.items[i].render());
        }
        else if (this.items[i] instanceof Menu) {
            var li = document.createElement('li');
            li.appendChild(this.items[i].render());
            ul.appendChild(li);
        }
    }

    return ul;
}

function MenuItem(link, label) {
    Container.call(this);
    this.link = link;
    this.label = label;

    this.element = document.createElement('li');
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function () {
    var li = this.element;
    var a = document.createElement('a');
    a.href = this.link;
    a.textContent = this.label;
    li.appendChild(a);

    return li;
}