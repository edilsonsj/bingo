let outputSorteio = window.document.querySelector('div#sorteio')
let num_sorteados = window.document.querySelector(`div#num-sorteados`)
let minha_cartela = window.document.querySelector('div#minha-cartela')
let counterSorteio = window.document.querySelector('span#counter')
let Status = window.document.querySelector('p.status')
let maquinaStatus = window.document.querySelector('p.maquinaStatus')
let td = document.getElementsByTagName('td')
let table_card = window.document.querySelector('table.table-card')
let getCards = window.document.querySelector('input#getCards')
let initBTN = window.document.querySelector('input#init')
let numSorteados = []
let card = []
let cardMaquina = []
let verifica = 0
let verificaMaquina = 0

initBTN.style.display = 'none'

card = getCard()
cardMaquina = getCard()


getCards.addEventListener('click', function(){
    for(let i in card){
        document.getElementById('q'+i).innerHTML = card[i]
    }
    
    for (let i = 0; i < cardMaquina.length; i++) {
        document.getElementById('mq'+i).innerHTML = cardMaquina[i]
        
    }
    getCards.style.display = 'none'
    initBTN.style.display = 'inline'
})

function getCard() {
    let card = []

    let b = {start: 1, end: 15, changeRange(val){
        this.start += Number(val)
        this.end += Number(val)}}
        
    for(let count = 1; count <= 61; count +=15){
        let start = b.start
        let end = b.end
        let x = randomNumCard(start, end)

        for(let i = 1; i <= 5; i++){
            while (inList(card, x)) {
                x = randomNumCard(start, end)
            }
            card.push(x)
        }
        b.changeRange(15)
    }
    //console.log(card)
    card.sort((a, b) => a - b)
    console.log(card)
    return card
}

initBTN.addEventListener('click', function(){
    initBTN.style.display = 'none'

    const intervaloSorteio = (callback, qtdSorteios, intervalo) => {
        let i = setInterval( () => {
            callback([counter, qtdSorteios])
            counter++
            if (verifica === 25 || verificaMaquina == 25) clearInterval(i)   
        }, intervalo)
    }
    
    intervaloSorteio(sorteioNum, 75, 1000)
})



//Sorteia os números do Bingo (quando o botão Sortear é clicado)
function sorteioNum() {
    let qtdSorteios = 75
    if(numSorteados.length < qtdSorteios){
        var n = randomNumSorteio()
        while(inList(numSorteados, n)){
            n = randomNumSorteio()
            //num_sorteados.innerHTML += `Já Sorteado: ${n} /`
        }
        numSorteados.push(n)
        counterSorteio.innerHTML = `Rodada: ${numSorteados.length}`
        outputSorteio.innerHTML += ` ${n}`
        console.log(`Sorteio[${numSorteados.length}]: ${n}`);
        isSorteado(card, n)
        isSorteadoMaquina(cardMaquina, n)
    } else if (numSorteados.length === qtdSorteios) {
        window.alert('Todos os números foram sorteados')
        window.location.reload()
    }
}

function isSorteado(card, num){
    if (card.indexOf(Number(num)) != -1) {
        verifica+=1
        document.getElementById('q'+card.indexOf(Number(num))).style.backgroundColor='Green'
        document.getElementById('q'+card.indexOf(Number(num))).style.color = 'White'
        console.log(`${num} foi sorteado [${verifica}/25]`)
        Status.innerHTML = `${num} foi sorteado [${verifica}/25]`
        if (verifica == 25) {
            Status.innerHTML = `Bingo! [${verifica}/25]`
            bingo('Você')
        }
        
    } 
}
function isSorteadoMaquina(card, num){
    if (card.indexOf(Number(num)) != -1) {
        verificaMaquina+=1
        document.getElementById('mq'+card.indexOf(Number(num))).style.backgroundColor='Green'
        document.getElementById('mq'+card.indexOf(Number(num))).style.color = 'White'
        console.log(`${num} foi sorteado [${verificaMaquina}/25]`)
        maquinaStatus.innerHTML = `${num} foi sorteado [${verificaMaquina}/25]`

        if (verificaMaquina == 25) {
            maquinaStatus.innerHTML = `Bingo! [${verificaMaquina}/25]`
            bingo('Máquina')
        }
        
    } 
}

function bingo(playerName) {
    window.alert(playerName + ': Bingo!')
}

function randomNumCard(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomNumSorteio(){
    return Math.floor(Math.random() * 75 + 1)
}

function inList(array, n) {
    return array.indexOf(Number(n)) != -1 ? true : false
}