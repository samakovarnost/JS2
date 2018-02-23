function Pokemon(data) {
    this.id = data.id;
    this.name = data.name;
    this.height = data.height;
    this.weight = data.weight;
}

Pokemon.prototype.getImg = function () {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png";
}

function PokemonList() {
    this.url = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
    this.data = {};
}

PokemonList.prototype.getList = function (callback) {
    if (typeof this.list === 'undefined') {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.open('GET', this.url, true);

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                self.list = result.results;
                if (typeof callback === "function") {
                    callback(self.list);
                }
            }
        }
    }
    else if (typeof callback === "function") {
        callback(this.list);
    }
}

PokemonList.prototype.getByUrl = function (url, callback) {
    if (typeof this.data[url] === 'undefined') {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.open('GET', url, true);

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                self.data[url] = new Pokemon(JSON.parse(xhr.responseText));
                if (typeof callback === "function") {
                    callback(self.data[url]);
                }
            }
        }
    }
    else if (typeof callback === "function") {
        callback(this.data[url]);
    }
}

var pokemonInLine = 12;
var line = 1;
var table = document.createElement('table');
document.body.appendChild(table);
var button = document.createElement('button');
document.body.appendChild(button);
button.innerHTML = 'Добавить покемона';
var counter = 0;
var list = new PokemonList();

button.onclick = function () {
    list.getList(function (pokemons) {
            if (pokemons[counter]) {
                for (var i = 0; i < line; i++) {
                    if (pokemons[counter]) {
                        var tr = document.createElement('tr');
                        table.appendChild(tr);
                        for (var j = 0; j < pokemonInLine; j++) {
                            if (pokemons[counter]) {
                                var td = document.createElement('td');
                                tr.appendChild(td);
                                list.getByUrl(pokemons[counter].url, function (td) {
                                    return function (pokemon) {
                                        var img = document.createElement('img');
                                        img.src = pokemon.getImg();
                                        td.appendChild(img);
                                        var name = document.createElement('p');
                                        name.innerHTML = pokemon.name;
                                        td.appendChild(name);
                                    }
                                }(td));
                                counter++;
                            }
                        }
                    }
                }
            }
        }
    )
}

button.click();


