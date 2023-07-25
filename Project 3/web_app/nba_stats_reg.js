
let allTeamsSelect = document.querySelector('#allteams')
let statSelect = document.querySelector('#stat')

function graphData(teamAbbr, stat) {
    fetch(`http://127.0.0.1:5000/api/${teamAbbr}/${stat}`)
    .then(res=> res.json())
    .then(apiData => { 
        console.log(apiData)
        console.log(apiData.map(player => player.name ))
        
        let trace = {
            x: apiData.map(player => player.name),
            y: apiData.map(player => player[stat]),
            type: 'bar'
        }

        let title = ''

        if (stat == 'pts') title = 'Average Points per Game (APG)'
        else if (stat == 'tov') title = 'Turn-Overs'
        else if (stat == 'blk') title = 'Blocks'
        else if (stat == 'ast') title = 'Assists'

        let layout = {
            title: title,
        }

        Plotly.newPlot('plot', [trace], layout)
    })
}

allTeamsSelect.addEventListener('change', function() {
    graphData(allTeamsSelect.value, statSelect.value)
})

statSelect.addEventListener('change', function() {
    graphData(allTeamsSelect.value, statSelect.value)
})

function init() {
    fetch('http://127.0.0.1:5000/api/allteams')
    .then(res=> res.json())
    .then(apiData => {
        let html = ''
        apiData.forEach(teamAbbr => {
            html += `<option>${teamAbbr}</option>`
        })

        allTeamsSelect.innerHTML = html
    })

    graphData('ATL', 'pts')
}

init()