// var

const urlParams = new URLSearchParams(window.location.search);
const idPokemon = urlParams.get("id");
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
var tipoPokemon0 = "";
var tipoPokemon1 = "";
var habilidadePokemon0 = "";
var habilidadePokemon1 = "";
var habilidadePokemon2 = "";
var evolutionChain = "";
var listaAtaques = document.getElementById("listaAtaques");
var numeroAtaques = 0;

// functions

$(".mostrarPokemon").hide();

setTimeout(function(){ $(".loading").hide(); $(".mostrarPokemon").show();}, 1500);

function mostrarPokemon() {

    $.get("https://pokeapi.co/api/v2/pokemon/" + idPokemon + "/", function (pokemon) {

        $("#nomePokemon").html(pokemon.name);
        $("#idPokemon").html("#" + pokemon.id);
        $("#imgPokemon").attr("src", pokemon.sprites.front_default);
        $("#miniPokemon").attr("src", pokemon.sprites.versions["generation-vii"].icons.front_default);

        if (!pokemon.types[1]){
            tipoPokemon0 = pokemon.types["0"].type.name;
            $("#tipo2").html("");
            $("#tipo2").css("background-color", "");
            $("#tipo1").html(tipoPokemon0);
            $("#tipo1").css("background-color", colours[tipoPokemon0]);
    
        } else {
            tipoPokemon0 = pokemon.types["0"].type.name;
            tipoPokemon1 = pokemon.types["1"].type.name;
            $("#tipo1").html(tipoPokemon0);
            $("#tipo2").html(tipoPokemon1);
            $("#tipo1").css("background-color", colours[tipoPokemon0]);
            $("#tipo2").css("background-color", colours[tipoPokemon1]);
        }

        if (!pokemon.abilities[1]){
            habilidadePokemon0 =  pokemon.abilities["0"].ability.name;
            $("#habilidadesPokemon").html(habilidadePokemon0);
        } else if(!pokemon.abilities[2]){
            habilidadePokemon0 =  pokemon.abilities["0"].ability.name;
            habilidadePokemon1 =  pokemon.abilities["1"].ability.name;
            $("#habilidadesPokemon").html(habilidadePokemon0 + " | " + habilidadePokemon1);
        } else {
            habilidadePokemon0 =  pokemon.abilities["0"].ability.name;
            habilidadePokemon1 =  pokemon.abilities["1"].ability.name;
            habilidadePokemon2 =  pokemon.abilities["2"].ability.name;
            $("#habilidadesPokemon").html(habilidadePokemon0 + " | " + habilidadePokemon1 + " | (H) " + habilidadePokemon2);
        };

        var hp = pokemon.stats["0"]["base_stat"];
        var attack = pokemon.stats["1"]["base_stat"];
        var defense = pokemon.stats["2"]["base_stat"];
        var spAtk = pokemon.stats["3"]["base_stat"];
        var spDef = pokemon.stats["4"]["base_stat"];
        var speed = pokemon.stats["5"]["base_stat"];
        var total = hp + attack + defense + spAtk + spDef + speed;

        $("#hp").html(hp);
        $("#attack").html(attack);
        $("#defense").html(defense);
        $("#spAtk").html(spAtk);
        $("#spDef").html(spDef);
        $("#speed").html(speed);
        $("#total").html(total);

        barraStats(hp, "barraHp");
        barraStats(attack, "barraAtk");
        barraStats(defense, "barraDef");
        barraStats(spAtk, "barraSpAtk");
        barraStats(spDef, "barraSpDef");
        barraStats(speed, "barraSpeed");

        while ( numeroAtaques < pokemon["moves"].length ) {
            let trAtaquesListaPokemon = document.createElement("tr");
            let tdAtaquesListaPokemon = document.createElement("td"); 
            let tdNomeTipoAtaqueListaPokemon = document.createElement("td");
            let tdPoderTipoAtaqueListaPokemon = document.createElement("td");
            let tdPrecisaoTipoAtaqueListaPokemon = document.createElement("td");
            let tdPPTipoAtaqueListaPokemon = document.createElement("td");
            let tipoAtaquePokemon1 = document.createElement("p");
            let tipoAtaquePokemon2 = document.createElement("p");
            let poderAtaquePokemon = document.createElement("p");
            let precisaoAtaquePokemon = document.createElement("p");
            let ppAtaquePokemon = document.createElement("p");

            $.get("https://pokeapi.co/api/v2/move/" + pokemon["moves"][numeroAtaques].move.name + "/", function (ataque){

                tipoAtaquePokemon1.innerHTML = ataque.type.name;
                tipoAtaquePokemon2.innerHTML = ataque.damage_class.name;
                poderAtaquePokemon.innerHTML = ataque.power;
                precisaoAtaquePokemon.innerHTML = ataque.accuracy + "%";
                ppAtaquePokemon.innerHTML = ataque.pp;
                tipoAtaquePokemon1.style.backgroundColor = colours[ataque.type.name];
                tipoAtaquePokemon1.className = "tipoPokemon4 text-capitalize";
                tipoAtaquePokemon2.className = "tipoPokemon5 text-capitalize";
                tdNomeTipoAtaqueListaPokemon.className = "d-flex flex-row";
                tdNomeTipoAtaqueListaPokemon.appendChild(tipoAtaquePokemon1);
                tdNomeTipoAtaqueListaPokemon.appendChild(tipoAtaquePokemon2);
                tdPoderTipoAtaqueListaPokemon.appendChild(poderAtaquePokemon);
                tdPrecisaoTipoAtaqueListaPokemon.appendChild(precisaoAtaquePokemon);
                tdPPTipoAtaqueListaPokemon.appendChild(ppAtaquePokemon);
        
            });
            
            tdAtaquesListaPokemon.innerHTML = pokemon["moves"][numeroAtaques].move.name;
            tdAtaquesListaPokemon.className = "text-capitalize";
            trAtaquesListaPokemon.appendChild(tdNomeTipoAtaqueListaPokemon);
            trAtaquesListaPokemon.appendChild(tdAtaquesListaPokemon);
            trAtaquesListaPokemon.appendChild(tdPoderTipoAtaqueListaPokemon);
            trAtaquesListaPokemon.appendChild(tdPrecisaoTipoAtaqueListaPokemon);
            trAtaquesListaPokemon.appendChild(tdPPTipoAtaqueListaPokemon);
            listaAtaques.appendChild(trAtaquesListaPokemon);

            numeroAtaques++;
        }

    });

    $.get("https://pokeapi.co/api/v2/pokemon-species/" + idPokemon + "/", function (pokemon) {

        evolutionChain = pokemon.evolution_chain.url;

        $.get(evolutionChain, function (pokemon) {

            if (!pokemon.chain.evolves_to["0"]) {

                $.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.chain.species.name + "/", function (pokemon) {

                    $("#miniPokemon1").attr("src", pokemon.sprites.versions["generation-vii"].icons.front_default);
                    $("#seta1").html(pokemon.name);
                    $("#seta1").attr("href", "mostrarPokemon.html?id=" + pokemon.id + "");

                }); 

            } else {

                $.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.chain.species.name + "/", function (pokemon) {

                    $("#miniPokemon1").attr("src", pokemon.sprites.versions["generation-vii"].icons.front_default);
                    $("#seta1").html(pokemon.name + " ->");
                    $("#seta1").attr("href", "mostrarPokemon.html?id=" + pokemon.id + "");

                }); 

                if (!pokemon.chain.evolves_to["0"].evolves_to["0"]) {

                    $.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.chain.evolves_to["0"].species.name + "/", function (pokemon) {
    
                        $("#miniPokemon2").attr("src", pokemon.sprites.versions["generation-vii"].icons.front_default);
                        $("#seta2").html(pokemon.name);
                        $("#seta2").attr("href", "mostrarPokemon.html?id=" + pokemon.id + "");
    
                    });
    
                } else {
    
                    $.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.chain.evolves_to["0"].species.name + "/", function (pokemon) {
    
                        $("#miniPokemon2").attr("src", pokemon.sprites.versions["generation-vii"].icons.front_default);
                        $("#seta2").html(pokemon.name + " ->");
                        $("#seta2").attr("href", "mostrarPokemon.html?id=" + pokemon.id + "");
    
                    });
    
                    $.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.chain.evolves_to["0"].evolves_to["0"].species.name + "/", function (pokemon) {
    
                        $("#miniPokemon3").attr("src", pokemon.sprites.versions["generation-vii"].icons.front_default);
                        $("#seta3").html(pokemon.name);
                        $("#seta3").attr("href", "mostrarPokemon.html?id=" + pokemon.id + "");
    
                    });
                }

            }
    
        });

    });

}

function barraStats(status, nomeBarra) {

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


// start functions

mostrarPokemon();
