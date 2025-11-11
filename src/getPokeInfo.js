export default function getPokeInfo(nameOfPokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/{${nameOfPokemon}}`).then(res => res.json());
};