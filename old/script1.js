
//Colours

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

$(document).ready(function(){
    $("#tabelaListaPokemonsMds > tbody > tr").on('click', function() {

        var idPrincipal = $(this).attr("id");

        mostrarPokemonPokedex(idPrincipal);

    });
});

var listaPokemons = document.getElementById("listaPokemons"); // my table
var i = 1;
var y = 10033;
var m = 10033;

// my function to display a pokemon's status

function mostrarPokemonPokedex(id) {

    $.get("https://pokeapi.co/api/v2/pokemon/" + id + "/", function(pokemon) {

        var spritePokemon = pokemon.sprites.front_default;

        if ( id == 10226 ) {

            var miniPokemon = "sprites/sprites/pokemon/versions/generation-viii/icons/892-gmax.png";

        } else {

            var miniPokemon = pokemon.sprites.versions["generation-viii"].icons.front_default;

        }




        var hp = pokemon.stats["0"]["base_stat"];
        var attack = pokemon.stats["1"]["base_stat"];
        var defense = pokemon.stats["2"]["base_stat"];
        var spAtk = pokemon.stats["3"]["base_stat"];
        var spDef = pokemon.stats["4"]["base_stat"];
        var speed = pokemon.stats["5"]["base_stat"];
        var total = hp + attack + defense + spAtk + spDef + speed;

        var tipoPokemon0 = pokemon.types["0"].type.name;
        var tipoPokemon1 = "";
        var habilidadePokemon0 = pokemon.abilities["0"].ability.name;

        if (!pokemon.types[1]){
            $("#tipoPokemon2").html("");
            $("#tipoPokemon2").css("background-color", "");
            $("#tipoPokemon1").html(tipoPokemon0);
            $("#tipoPokemon1").css("background-color", colours[tipoPokemon0]);

        } else {
            var tipoPokemon1 = pokemon.types["1"].type.name;
            $("#tipoPokemon1").html(tipoPokemon0);
            $("#tipoPokemon2").html(tipoPokemon1);
            $("#tipoPokemon1").css("background-color", colours[tipoPokemon0]);
            $("#tipoPokemon2").css("background-color", colours[tipoPokemon1]);
        }

        if (!pokemon.abilities[1]){
            $("#habilidadesPokemon").html(habilidadePokemon0);
        } else if(!pokemon.abilities[2]){
            var habilidadePokemon1 =  pokemon.abilities["1"].ability.name;
            $("#habilidadesPokemon").html(habilidadePokemon0 + " " + habilidadePokemon1);
        } else {
            var habilidadePokemon1 =  pokemon.abilities["1"].ability.name;
            var habilidadePokemon2 =  pokemon.abilities["2"].ability.name;
            $("#habilidadesPokemon").html(habilidadePokemon0 + " " + habilidadePokemon1 + " (H) " + habilidadePokemon2);
        };

        $("#centro img").attr("src", spritePokemon);
        $("#miniPokemon").attr("src", miniPokemon);
        $("#nomePokemonStats").html(nomePokemon.value);

        $("#hp").html(hp);
        $("#attack").html(attack);
        $("#defense").html(defense);
        $("#spAtk").html(spAtk);
        $("#spDef").html(spDef);
        $("#speed").html(speed);
        $("#total").html(total);

        barraVida(hp, "barraHp");
        barraVida(attack, "barraAtk");
        barraVida(defense, "barraDef");
        barraVida(spAtk, "barraSpAtk");
        barraVida(spDef, "barraSpDef");
        barraVida(speed, "barraSpeed");

    }); 

}

tabelaPokemons();
megas();

function tabelaPokemons() {

    while ( i < 1000 ){

        let trListaPokemons = document.createElement("tr");
        let tdListaPokemons = document.createElement("td");
        let tdListaPokemons1 = document.createElement("td");
        let tdListaPokemons2 = document.createElement("td");
        let tipoPokemonLista1 = document.createElement("p");
        let tipoPokemonLista2 = document.createElement("p");
        let spriteListaPokemons = document.createElement("img");
        let nomeListaPokemons = document.createElement("p");

        nomeListaPokemons.classList = "text-capitalize mt-4";
        tdListaPokemons1.appendChild(spriteListaPokemons);
        tdListaPokemons.appendChild(nomeListaPokemons);
        tdListaPokemons2.appendChild(tipoPokemonLista1);
        tdListaPokemons2.appendChild(tipoPokemonLista2);
        spriteListaPokemons.setAttribute("id", i + "img");
        spriteListaPokemons.classList = "spritesGrandes";
        nomeListaPokemons.setAttribute("id", i + "nome");
        tipoPokemonLista1.setAttribute("id", i + "tipo1");
        tipoPokemonLista2.setAttribute("id", i + "tipo2");
        tipoPokemonLista1.setAttribute("class", "tipoPokemon3 text-capitalize");
        tipoPokemonLista2.setAttribute("class", "tipoPokemon3 text-capitalize");
        tdListaPokemons1.setAttribute("class", "borda1");
        tdListaPokemons2.setAttribute("class", "borda2");
        trListaPokemons.appendChild(tdListaPokemons1);
        trListaPokemons.appendChild(tdListaPokemons);
        trListaPokemons.appendChild(tdListaPokemons2);
        trListaPokemons.setAttribute("id", i);
        trListaPokemons.setAttribute("class", "linha");
        trListaPokemons.setAttribute("value", i);
        listaPokemons.appendChild(trListaPokemons);


       $.get("https://pokeapi.co/api/v2/pokemon/" + i + "/", function (batata) {

            imagemPokemon = batata.sprites.versions["generation-viii"].icons.front_default;
            nomePokemon = batata.name;
            idPokemon = batata.id;
            tipoPokemon0 = batata.types["0"].type.name;
            tipoPokemon1 = "";
        
            if (!batata.types[1]){
                $("#" + idPokemon + "tipo2").html("");
                $("#" + idPokemon + "tipo2").css("background-color", "");
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
        
            } else {
                var tipoPokemon1 = batata.types["1"].type.name;
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo2").html(tipoPokemon1);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
                $("#" + idPokemon + "tipo2").css("background-color", colours[tipoPokemon1]);
            }

            $("#" + idPokemon + "nome").html(nomePokemon);
            $("#" + idPokemon + "img").attr("src", imagemPokemon);
            $("#" + idPokemon).attr("nomePokemon", batata.name);

        });

        i++;

    };

   /* while ( y < 10272 ) {

        let trListaPokemons = document.createElement("tr");
        let tdListaPokemons = document.createElement("td");
        let tdListaPokemons1 = document.createElement("td");
        let tdListaPokemons2 = document.createElement("td");
        let tipoPokemonLista1 = document.createElement("p");
        let tipoPokemonLista2 = document.createElement("p");
        let spriteListaPokemons = document.createElement("img");
        let nomeListaPokemons = document.createElement("p");

        nomeListaPokemons.classList = "text-capitalize mt-4";
        tdListaPokemons1.appendChild(spriteListaPokemons);
        tdListaPokemons.appendChild(nomeListaPokemons);
        tdListaPokemons2.appendChild(tipoPokemonLista1);
        tdListaPokemons2.appendChild(tipoPokemonLista2);
        spriteListaPokemons.setAttribute("id", y + "img");
        spriteListaPokemons.classList = "spritesGrandes";
        nomeListaPokemons.setAttribute("id", y + "nome");
        tipoPokemonLista1.setAttribute("id", y + "tipo1");
        tipoPokemonLista2.setAttribute("id", y + "tipo2");
        tipoPokemonLista1.setAttribute("class", "tipoPokemon3 text-capitalize");
        tipoPokemonLista2.setAttribute("class", "tipoPokemon3 text-capitalize");
        tdListaPokemons1.setAttribute("class", "borda1");
        tdListaPokemons2.setAttribute("class", "borda2");
        trListaPokemons.appendChild(tdListaPokemons1);
        trListaPokemons.appendChild(tdListaPokemons);
        trListaPokemons.appendChild(tdListaPokemons2);
        trListaPokemons.setAttribute("id", y);
        trListaPokemons.setAttribute("class", "linha");
        trListaPokemons.setAttribute("value", y);
        listaPokemons.appendChild(trListaPokemons);


       $.get("https://pokeapi.co/api/v2/pokemon/" + y + "/", function (batata) {

            if ( batata.id == 10226 ) {

                imagemPokemon = "sprites/sprites/pokemon/versions/generation-viii/icons/892-gmax.png";

            } else if ( batata.id == 10191 ){
                
                imagemPokemon = "sprites/sprites/pokemon/versions/generation-viii/icons/892.png";

            } else {

                imagemPokemon = batata.sprites.versions["generation-viii"].icons.front_default;

            }

            nomePokemon = batata.name;
            idPokemon = batata.id;
            tipoPokemon0 = batata.types["0"].type.name;
            tipoPokemon1 = "";
        
            if (!batata.types[1]){
                $("#" + idPokemon + "tipo2").html("");
                $("#" + idPokemon + "tipo2").css("background-color", "");
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
        
            } else {
                var tipoPokemon1 = batata.types["1"].type.name;
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo2").html(tipoPokemon1);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
                $("#" + idPokemon + "tipo2").css("background-color", colours[tipoPokemon1]);
            }

            $("#" + idPokemon + "nome").html(nomePokemon);
            $("#" + idPokemon + "img").attr("src", imagemPokemon);

        });

        y++;

    };*/
};

function megas() {

    while ( y < 10275 ) {

        let trListaPokemons = document.createElement("tr");
        let tdListaPokemons = document.createElement("td");
        let tdListaPokemons1 = document.createElement("td");
        let tdListaPokemons2 = document.createElement("td");
        let tipoPokemonLista1 = document.createElement("p");
        let tipoPokemonLista2 = document.createElement("p");
        let spriteListaPokemons = document.createElement("img");
        let nomeListaPokemons = document.createElement("p");

        nomeListaPokemons.classList = "text-capitalize mt-4";
        tdListaPokemons1.appendChild(spriteListaPokemons);
        tdListaPokemons.appendChild(nomeListaPokemons);
        tdListaPokemons2.appendChild(tipoPokemonLista1);
        tdListaPokemons2.appendChild(tipoPokemonLista2);
        spriteListaPokemons.setAttribute("id", y + "img");
        spriteListaPokemons.classList = "spritesGrandes";
        nomeListaPokemons.setAttribute("id", y + "nome");
        tipoPokemonLista1.setAttribute("id", y + "tipo1");
        tipoPokemonLista2.setAttribute("id", y + "tipo2");
        tipoPokemonLista1.setAttribute("class", "tipoPokemon3 text-capitalize");
        tipoPokemonLista2.setAttribute("class", "tipoPokemon3 text-capitalize");
        tdListaPokemons1.setAttribute("class", "borda1");
        tdListaPokemons2.setAttribute("class", "borda2");
        trListaPokemons.appendChild(tdListaPokemons1);
        trListaPokemons.appendChild(tdListaPokemons);
        trListaPokemons.appendChild(tdListaPokemons2);
        trListaPokemons.setAttribute("id", y);
        trListaPokemons.setAttribute("class", "linha");
        trListaPokemons.setAttribute("value", y);
        listaPokemons.appendChild(trListaPokemons);


       $.get("https://pokeapi.co/api/v2/pokemon/" + y + "/", function (batata) {

            nomePokemon = batata.name;

            if ( batata.id == 10226 ) {

                imagemPokemon = batata.sprites.versions["generation-viii"].icons.front_default;

            } else if ( batata.id == 10191 ){
                
                imagemPokemon = batata.sprites.versions["generation-viii"].icons.front_default;

            } else {

                imagemPokemon = batata.sprites.versions["generation-viii"].icons.front_default;

            }

            nomePokemon = batata.name;
            idPokemon = batata.id;
            tipoPokemon0 = batata.types["0"].type.name;
            tipoPokemon1 = "";
        
            if (!batata.types[1]){
                $("#" + idPokemon + "tipo2").html("");
                $("#" + idPokemon + "tipo2").css("background-color", "");
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
        
            } else {
                var tipoPokemon1 = batata.types["1"].type.name;
                $("#" + idPokemon + "tipo1").html(tipoPokemon0);
                $("#" + idPokemon + "tipo2").html(tipoPokemon1);
                $("#" + idPokemon + "tipo1").css("background-color", colours[tipoPokemon0]);
                $("#" + idPokemon + "tipo2").css("background-color", colours[tipoPokemon1]);
            }

            $("#" + idPokemon + "nome").html(nomePokemon);
            $("#" + idPokemon + "img").attr("src", imagemPokemon);
            $("#" + idPokemon).attr("megapokemon", batata.name);

        });


        y++;

    };
}

setTimeout(ordenarMega, 1000);

function ordenarMega() {

    while ( m < 10275 ) {

        megaPokemon = document.getElementById(m);

        nomePokemonOrdenar = $(megaPokemon).attr("megapokemon");

        teste = nomePokemonOrdenar.split("-");

        var banana = document.querySelector('[nomepokemon='+ teste[0] +']');
    
        $(megaPokemon).insertAfter(banana);

        m++;

    }

}

function barraVida(status, nomeBarra) {

    var cor = "";

    $("#" + nomeBarra).css("width", ""+ status/2 + "%");

    if( status/2 > 20 && status/2 >= 50) {
        cor = "green";
    } else if ( status/2 > 20 && status/2 < 50) {
        cor = "orange";
    } else {
        cor = "red";
    }

    $("#" + nomeBarra).css("background-color", cor);
}

$(document).ready(function() {
    $("#nomePokemon").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tabelaListaPokemonsMds tr").filter(function() {
            $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
        });
    });
});