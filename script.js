let apiLinkBase = `https://www.superheroapi.com/api.php/1511307029385766`

// return the hero stats in HTML
const getHeroStats = (hero) => {
    const statToEmoji = {
        intelligence: '🧠',
        strength: '💪',
        speed: '⚡',
        durability: '🏋️‍♂️',
        power: '📊',
        combat: '⚔️',
    }
    let stats = ''
    Object.keys(hero.powerstats).map(power => {
        stats += `<h3>${statToEmoji[power]} ${power.toUpperCase()}: ${hero.powerstats[power]}</h3>`
    })
    return stats
}

// show the hero stats on the DOM
const showHeroStats = (hero) => {
    let heroImageDiv = document.getElementById('heroImage')
    let heroName = document.getElementById('heroName')
    let heroPowerStats = document.getElementById('heroPowerStats')
    heroName.innerText = hero.name
    heroImageDiv.innerHTML = `<img src="${hero.image.url}" alt="${hero.name} Image" width=200 height=200/>`
    heroPowerStats.innerHTML = getHeroStats(hero)
}

// show new hero based on your Id number
const getHero = (id) => {
    fetch(`${apiLinkBase}/${id}`)
    .then(response => response.json())
    .then(json => showHeroStats(json))
}

let newHeroButtonDiv = document.getElementById('newHeroButton')

newHeroButtonDiv.onclick = () => {
    let id = Math.ceil(Math.random() * 731)
    getHero(id);
}

// show new hero based on his name
const getSearchHero = (name) => {
    fetch(`${apiLinkBase}/search/${name}`)
    .then(response => response.json())
    .then(json => showHeroStats(json.results[0]))
}

let searchButton = document.getElementById('searchButton')

searchButton.onclick = () => {
    let input = document.getElementById('searchInput')
    getSearchHero(input.value.toLowerCase())
}