
let allTeamsSelect = document.querySelector('#allteams')
let statSelect = document.querySelector('#stat')

function graphData(teamAbbr, stat) {
    fetch(`http://127.0.0.1:5000/api/${teamAbbr}/${stat}`)
    .then(res=> res.json())
    .then(apiData => { 
        console.log(apiData)
        console.log(apiData.map(player => player.name ))
        let teamColors = {
            ATL:"#FF0000",
            BOS:"#2F7D0D",
            BRK:"#000000",
            CHO:"#2F0D7D",
            CHI:"#BA233C",
            CLE:"#942B66",
            DAL:"#2891EE",
            DEN:"#83BBEC",
            DET:"#0E51D7",
            GSW:"#F0F045",
            HOU:"#BF2B3A",
            IND:"#0E1A69",
            LAC:"#C7113B",
            LAL:"#9331CB",
            MEM:"#445194",
            MIA:"#944451",
            MIL:"#147F49",
            MIN:"#174492",
            NOP:"#264D90",
            NYK:"#316ED8",
            OKC:"#31A1D8",
            ORL:"#4EA9D7",
            PHI:"#2A7EA8",
            PHO:"#FFB70B",
            POR:"#F62B15",
            SAC:"#AE6EC6",
            SAS:"#D4CFD5",
            TOR:"#CE4053",
            UTA:"#402CC0",
            WAS:"#0C2751",
            TOT:"#3F4F50"

           
        
            
        }
        let trace = {
            x: apiData.map(player => player.name),
            y: apiData.map(player => player[stat]),
            type: 'bar',
            marker: {
                color: teamColors[teamAbbr]
                }
            
        }

        let title = ''

        if (stat == 'pts') title = 'Average Points per Game (APG)'
        else if (stat == 'tov') title = 'Average Turn-Overs per Game'
        else if (stat == 'blk') title = 'Average Blocks per Game'
        else if (stat == 'ast') title = 'Average Assists per Game'

        let layout = {
            title: title,
            xaxis: {title: 'PLAYERS'},
            yaxis: {title: 'AVG STATS PER GAME'}
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

    graphData('ATL','pts')
}

init()