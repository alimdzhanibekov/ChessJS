let dzanChess = "
oooooooooo.              oooo                              
`888'   `Y8b             `888                              
 888      888   oooooooo  888 .oo.    .oooo.   ooo. .oo.   
 888      888  d'""7d8P   888P"Y88b  `P  )88b  `888P"Y88b  
 888      888    .d8P'    888   888   .oP"888   888   888  
 888     d88'  .d8P'  .P  888   888  d8(  888   888   888  
o888bood8P'   d8888888P  o888o o888o `Y888""8o o888o o888o 
                                                           
                                                           
                                                           
  .oooooo.   oooo                                    
 d8P'  `Y8b  `888                                    
888           888 .oo.    .ooooo.   .oooo.o  .oooo.o 
888           888P"Y88b  d88' `88b d88(  "8 d88(  "8 
888           888   888  888ooo888 `"Y88b.  `"Y88b.  
`88b    ooo   888   888  888    .o o.  )88b o.  )88b 
 `Y8bood8P'  o888o o888o `Y8bod8P' 8""888P' 8""888P' "
let board = {
    "1_1": "wR1",
    "1_2": "wP1",
    "1_3": "",
    "1_4": "",
    "1_5": "",
    "1_6": "",
    "1_7": "bP1",
    "1_8": "bR1",
    "2_1": "wN1",
    "2_2": "wP2",
    "2_3": "",
    "2_4": "",
    "2_5": "",
    "2_6": "",
    "2_7": "bP2",
    "2_8": "bN1",
    "3_1": "wB1",
    "3_2": "wP3",
    "3_3": "",
    "3_4": "",
    "3_5": "",
    "3_6": "",
    "3_7": "bP3",
    "3_8": "bB1",
    "4_1": "wQ1",
    "4_2": "wP4",
    "4_3": "",
    "4_4": "",
    "4_5": "",
    "4_6": "",
    "4_7": "bP4",
    "4_8": "bQ1",
    "5_1": "wK",
    "5_2": "wP5",
    "5_3": "",
    "5_4": "",
    "5_5": "",
    "5_6": "",
    "5_7": "bP5",
    "5_8": "bK",
    "6_1": "wB2",
    "6_2": "wP6",
    "6_3": "",
    "6_4": "",
    "6_5": "",
    "6_6": "",
    "6_7": "bP6",
    "6_8": "bB2",
    "7_1": "wN2",
    "7_2": "wP7",
    "7_3": "",
    "7_4": "",
    "7_5": "",
    "7_6": "",
    "7_7": "bP7",
    "7_8": "bN2",
    "8_1": "wR2",
    "8_2": "wP8",
    "8_3": "",
    "8_4": "",
    "8_5": "",
    "8_6": "",
    "8_7": "bP8",
    "8_8": "bR2",

}

let canMovePiece = []

let history = []

let records = []

let whoseMove = "w"

let figId = ""

let whoIsWin = ""

let wKingId = "5_1"

let bKingId = "5_8"

let moveGamer = 1

let startTime = 0

let finishTime = 0

let isFirstMove = true

let isMoveWK = false

let isMoveBK = false

let isMoveWR1 = false

let isMoveWR2 = false

let isMoveBR1 = false

let isMoveBR2 = false

let isStartTime = false

function isReс(time) {

    for(let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        records.push(key)

    }

    records.push(time)

    records.sort((a, b) => a - b)


    if (records.indexOf(time, 0) >= 10) {
        return -1
    }
    else {
        return records.indexOf(time, 0)
    }
}

function isStalemate(id) {
    let newDateNow = new Date()

    moveB(id, 2)
    moveR(id, 2)

    let isProtectionKing = true

    let emptyP = 0

    canMovePiece.splice(0, canMovePiece.length)

    for (let i = 1; i <= 8; i++) {

        for (let j = 1; j <= 8; j++) {

            if (i.toString() + '_' + j.toString() !== id && board[i.toString() + '_' + j.toString()][0] === whoseMove) {

                canMove(i.toString() + '_' + j.toString())

                console.log('С поля = ' + i.toString() + '_' + j.toString() + " ,фигура"  + board[i.toString() + '_' + j.toString()] + " ,может пойти  = " + canMovePiece)

            }
            if (board[i.toString() + '_' + j.toString()] === "") {
                emptyP += 1
            }

        }
    }

    if (canMovePiece.length === 0) {
        console.log('id = ' + id + ', canMovePiece = ' + canMovePiece)
        isProtectionKing = false
    }


    canMovePiece.splice(0, canMovePiece.length)

    canMove(id)

    if ((isCheck(id) === false && canMovePiece.length === 0 && isProtectionKing === false) || (emptyP === 62)){
        finishTime = newDateNow.getHours() * 3600 + newDateNow.getMinutes() * 60 + newDateNow.getSeconds()

        whoIsWin = 'draw'
        let modalWindow = document.getElementById('idGameOver')
        let formModal = document.getElementById('formId')
        let endGame = document.getElementById('theEnd')
        let secondButton = document.getElementById('secondButtonId')

        modalWindow.style.display = 'grid'
        formModal.style.display = 'grid'


        if (isReс(finishTime - startTime) === -1) {

            formModal.style.display = 'none'
            secondButton.style.display = 'grid'


        }

        records.splice(0, records.length)

        endGame.innerHTML += 'Ничья'
    }
    else {
        canMovePiece.splice(0, canMovePiece.length)
    }

}

function isMate(id) {

    let newDateNow = new Date()

    moveB(id, 2)
    moveR(id, 2)

    let isProtectionKing = true

    canMovePiece.splice(0, canMovePiece.length)

    for (let i = 1; i <= 8; i++) {

        for (let j = 1; j <= 8; j++) {

            if (i.toString() + '_' + j.toString() !== id && board[i.toString() + '_' + j.toString()][0] === whoseMove) {

                canMove(i.toString() + '_' + j.toString())

                console.log('С поля = ' + i.toString() + '_' + j.toString() + " ,фигура"  + board[i.toString() + '_' + j.toString()] + " ,может пойти  = " + canMovePiece)

            }
        }
    }

    if (canMovePiece.length === 0) {
        isProtectionKing = false
    }


    canMovePiece.splice(0, canMovePiece.length)

    canMove(id)

    if (isCheck(id) === true && canMovePiece.length === 0 && isProtectionKing === false) {

        finishTime = newDateNow.getHours() * 3600 + newDateNow.getMinutes() * 60 + newDateNow.getSeconds()

        whoIsWin = whoseMove === 'w' ? 'b' : 'w'

        let modalWindow = document.getElementById('idGameOver')
        let formModal = document.getElementById('formId')
        let endGame = document.getElementById('theEnd')
        let secondButton = document.getElementById('secondButtonId')

        modalWindow.style.display = 'grid'
        formModal.style.display = 'grid'


        if (isReс(finishTime - startTime) === -1) {

            formModal.style.display = 'none'
            secondButton.style.display = 'grid'


        }

        records.splice(0, records.length)

        endGame.innerHTML += 'Выиграли ' + (whoIsWin === 'w' ? 'белые' : 'черные')

    }
    else {
        canMovePiece.splice(0, canMovePiece.length)
    }
}


function toRecords() {

    let modalWindow = document.getElementById('idGameRecords')

    modalWindow.style.display = 'grid'

    let rec = document.getElementById('recordsChess')

    rec.innerText = ''

    let tmpRec = []

    for(let i=0; i<localStorage.length; i++) {

        let key = localStorage.key(i)
        tmpRec.push(key)

    }

    tmpRec.sort((a,b) => (a - b))

    for(let i=0; i<localStorage.length; i++) {

        let key2 = tmpRec[i]
        rec.innerText += (i+1).toString() + ". " + localStorage.getItem(key2) + " за " + key2 + " секунд " + '\n'

    }

}

function saveRes() {

    let formModal = document.getElementById('formId')
    let wGamer = document.getElementById('wGamerId')
    let bGamer = document.getElementById('bGamerId')

    if (formModal.style.display === 'grid') {
        let i = isReс(finishTime - startTime)
        if (whoIsWin === 'w') {
            localStorage.setItem(records[i].toString(), wGamer.value + " выиграл у " + bGamer.value)
        }
        else if (whoIsWin === 'b') {
            localStorage.setItem(records[i].toString(), bGamer.value + ' выиграл у ' + wGamer.value)
        }
        else {
            localStorage.setItem(records[i].toString(), wGamer.value + ' сделал ничью c ' + bGamer.value)
        }
        while (localStorage.length >= 10) {
            delete localStorage.records[records.length - 1]
        }
    }

    location.reload();

}

function exitFromRecords() {

    let modalWindowRecords = document.getElementById('idGameRecords')
    modalWindowRecords.style.display = 'none'

}


function isLink(from, to) {

    let tmpFrom = board[from]
    let tmpTo = board[to]
    board[to] = board[from]
    board[from] = ""

    if (isCheck(wKingId) === true && whoseMove === 'w') {
        board[from] = tmpFrom
        board[to] = tmpTo
        return true
    }

    else if (isCheck(bKingId) === true && whoseMove === 'b') {
        board[from] = tmpFrom
        board[to] = tmpTo
        return true
    }

    else {
        board[from] = tmpFrom
        board[to] = tmpTo
    }

    return false

}

function isCheck(id) {

    let isCheckBool = false

    let isGood = true

    let tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while (( ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8) ) && isGood ) {

        if (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) + 1).toString()] === "") {

            tmpId[1] += 1

        }
        else if (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] === whoseMove) {

            isGood= false

        }
        else if ( (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove) && ( (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "Q") || (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "R") ) ) {

            isCheckBool = true
            isGood = false

        }
        else {
            isGood = false
        }

    }

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8) ) && isGood ) {

        if (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) - 1).toString()] === "") {

            tmpId[1] -= 1

        }
        else if (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] === whoseMove) {

            isGood= false

        }
        else if ( (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "Q") || (board[(Number(tmpId[0])).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "R") ) ) {

            isCheckBool = true
            isGood = false
        }
        else {
            isGood = false
        }

    }

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8) ) && isGood ) {

        if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1])).toString()] === "") {

            tmpId[0] -= 1

        }
        else if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1])).toString()][0] === whoseMove) {

            isGood= false

        }
        else if ( (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1])).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1])).toString()][1] === "Q") || (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1])).toString()][1] === "R") ) ) {

            isCheckBool = true
            isGood = false
        }
        else {
            isGood = false
        }

    }

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8) ) && isGood ) {

        if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1])).toString()] === "") {

            tmpId[0] += 1

        }
        else if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1])).toString()][0] === whoseMove) {

            isGood= false

        }
        else if ( (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1])).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1])).toString()][1] === "Q") || (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1])).toString()][1] === "R") ) ) {

            isCheckBool = true
            isGood = false

        }
        else {
            isGood = false
        }

    }

    // for B

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8) && isGood){

        if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()] === "") {

            tmpId[0] += 1
            tmpId[1] -= 1

        }
        else if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] === whoseMove) {

            isGood = false

        }
        else if ( (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "Q") || (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "B") ) ) {
            isCheckBool = true
            isGood = false
        }
        else{
            isGood = false
        }

    }

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8) && isGood){

        if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()] === "") {

            tmpId[0] -= 1
            tmpId[1] += 1

        }
        else if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] === whoseMove) {

            isGood = false

        }
        else if ( (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "Q") || (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "B") ) ) {
            isCheckBool = true
            isGood = false
        }
        else{
            isGood = false
        }

    }

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8) && isGood){

        if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()] === "") {

            tmpId[0] -= 1
            tmpId[1] -= 1

        }
        else if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] === whoseMove) {

            isGood = false

        }
        else if ( (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "Q") || (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "B") ) ) {
            isCheckBool = true
            isGood = false
        }
        else{
            isGood = false
        }

    }

    isGood = true

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    while ((((Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8) && isGood){

        if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()] === "") {

            tmpId[0] += 1
            tmpId[1] += 1

        }
        else if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] === whoseMove) {

            isGood = false

        }
        else if ( (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove) && ((board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "Q") || (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "B") ) ) {
            isCheckBool = true
            isGood = false
        }
        else{
            isGood = false
        }

    }

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    if ( ( (( Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) + 2) >= 1) && ((Number(tmpId[1]) + 2) <= 8) )  {

        if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 2).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 2).toString()][1] === "N") {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) + 2) >= 1) && ((Number(tmpId[0]) + 2) <= 8)) && ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8) )  {

        if (board[(Number(tmpId[0]) + 2).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 2).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === "N") {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) + 2) >= 1) && ((Number(tmpId[0]) + 2) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8) )  {

        if (board[(Number(tmpId[0]) + 2).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 2).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === "N") {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) - 2) >= 1) && ((Number(tmpId[1]) - 2) <= 8) )  {

        if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 2).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 2).toString()][1] === "N") {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) - 2) >= 1) && ((Number(tmpId[1]) - 2) <= 8) )  {

        if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 2).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 2).toString()][1] === 'N') {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) - 2) >= 1) && ((Number(tmpId[0]) - 2) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8) )  {

        if (board[(Number(tmpId[0]) - 2).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 2).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === 'N') {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) - 2) >= 1) && ((Number(tmpId[0]) - 2) <= 8)) && ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8) )  {

        if (board[(Number(tmpId[0]) - 2).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 2).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === 'N') {

            return true

        }

    }

    if ( ( (( Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) + 2) >= 1) && ((Number(tmpId[1]) + 2) <= 8) )  {

        if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 2).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 2).toString()][1] === 'N') {

            return true

        }
    }

    tmpId = id.split('_')

    for (let i = 0; i < tmpId.length; i++) {
        tmpId[i] = Number(tmpId[i])
    }

    // for P

    // if (((( Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8)) {
    //
    //     if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === 'P') {
    //
    //         return true
    //
    //     }
    // }
    //
    // if (((( Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8)) {
    //
    //     if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === 'P') {
    //
    //         return true
    //
    //     }
    // }


    if (whoseMove === 'w') {
        if (((( Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8)) {

            if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === 'P') {

                return true

            }
        }

        if (((( Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) + 1) >= 1) && ((Number(tmpId[1]) + 1) <= 8)) {

            if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) + 1).toString()][1] === 'P') {

                return true

            }
        }
    }

    if (whoseMove === 'b') {
        if (((( Number(tmpId[0]) - 1) >= 1) && ((Number(tmpId[0]) - 1) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8)) {

            if (board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) - 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === 'P') {

                return true

            }
        }

        if (((( Number(tmpId[0]) + 1) >= 1) && ((Number(tmpId[0]) + 1) <= 8)) && ((Number(tmpId[1]) - 1) >= 1) && ((Number(tmpId[1]) - 1) <= 8)) {

            if (board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][0] !== whoseMove && board[(Number(tmpId[0]) + 1).toString() + "_" + (Number(tmpId[1]) - 1).toString()][1] === 'P') {

                return true

            }
        }
    }


    return isCheckBool


}

function moveP(id) {

    if (board[id][0] === 'w') {

        let idFig = id.split('_')

        if (id[2] === '2') {

            idFig[1] = (Number(idFig[1]) + 1).toString()

            idFig = idFig.join("_")

            if (board[idFig] === "" && isLink(id, idFig) === false) {

                canMovePiece.push(idFig)

            }

            let pSecondMove = (Number(idFig[2]) + 1).toString()


            if (board[idFig] === "" && board[idFig[0] + idFig[1] + pSecondMove] === "" && isLink(id, idFig[0] + idFig[1] + pSecondMove) === false) {

                canMovePiece.push(idFig[0] + idFig[1] + pSecondMove)

            }

        }
        else {

            idFig[1] = (Number(idFig[1]) + 1).toString()

            idFig = idFig.join("_")

            if (board[idFig] === "" && isLink(id, idFig) === false) {

                canMovePiece.push(idFig)


            }

        }

        let pBeat = id.split('_')
        let pBeatLeft = (Number(pBeat[0]) - 1).toString() + "_" + (Number(pBeat[1]) + 1).toString()
        let pBeatRight = (Number(pBeat[0]) + 1).toString() + "_" + (Number(pBeat[1]) + 1).toString()

        if (board[pBeatLeft] && board[pBeatLeft][0] !== whoseMove && isLink(id, pBeatLeft) === false) {
            canMovePiece.push(pBeatLeft)
        }

        if (board[pBeatRight] && board[pBeatRight][0] !== whoseMove && isLink(id, pBeatRight) === false) {
            canMovePiece.push(pBeatRight)
        }

        let indexInHistory = history.indexOf(formatting(id[0] + "_" + (Number(id[2]) - 1).toString(), 0)   + "-" +   formatting(id, 0))

        if (indexInHistory === -1) {

            indexInHistory = history.indexOf(formatting((Number(id[0]) - 1).toString() + "_" + (Number(id[2]) - 1).toString(), 0)  + "-" +   formatting(id, 0))

            if (indexInHistory === -1) {

                indexInHistory = history.indexOf(formatting((Number(id[0]) + 1).toString() + "_" + (Number(id[2]) - 1).toString(), 0) + "-" + formatting(id, 0))

            }

        }

        if ((Number(id[0]) - 1 >= 1) && id[2] === '5' && history[history.length - 1][1] === '7' && history[history.length - 1][4] === '5' && (formatting(history[indexInHistory][3], 2) - formatting(history[history.length - 1][0], 2) === 1)){

            let tmpBP = board[(((Number(id[0]) - 1) + "_" + (Number(id[2]))).toString())]

            board[(((Number(id[0]) - 1) + "_" + (Number(id[2]))).toString())] = ""

            if (isLink(id, (((Number(id[0]) - 1) + "_" + (Number(id[2])) + 1).toString())) === false) {

                canMovePiece.push((((Number(id[0]) - 1) + "_" + (Number(id[2]) + 1)).toString()))

            }
            board[(((Number(id[0]) - 1) + "_" + (Number(id[2]))).toString())] = tmpBP
        }

        if ((Number(id[0]) + 1 <= 8) && id[2] === '5' && history[history.length - 1][1] === '7' && history[history.length - 1][4] === '5' && (formatting(history[indexInHistory][3], 2) - formatting(history[history.length - 1][0], 2) === -1)){

            let tmpBP = board[(((Number(id[0]) + 1) + "_" + (Number(id[2]))).toString())]
            board[(((Number(id[0]) + 1) + "_" + (Number(id[2]))).toString())] = ""

            if (isLink(id, (((Number(id[0]) +  1) + "_" + (Number(id[2])) + 1).toString())) === false) {

                canMovePiece.push((((Number(id[0]) + 1) + "_" + (Number(id[2]) + 1)).toString()))

            }
            board[(((Number(id[0]) + 1) + "_" + (Number(id[2]))).toString())] = tmpBP
        }
    }

    else {

        let newIdFig = id.split('_')


        if (id[2] === '7') {

            newIdFig[1] = (Number(newIdFig[1]) - 1).toString()


            newIdFig = newIdFig.join("_")


            if (board[newIdFig] === "" && isLink(id, newIdFig) === false) {

                canMovePiece.push(newIdFig)

            }

            let newPSecondMove = (Number(newIdFig[2]) - 1).toString()

            if (board[newIdFig] === "" && board[newIdFig[0] + newIdFig[1] + newPSecondMove] === "" && isLink(id,newIdFig[0] + newIdFig[1] + newPSecondMove) === false) {

                canMovePiece.push(newIdFig[0] + newIdFig[1] + newPSecondMove)

            }
        }
        else {

            newIdFig[1] = (Number(newIdFig[1]) - 1).toString()

            let Tmp = newIdFig.join("_")


            if (board[Tmp] === "" && isLink(id, Tmp) === false) {

                canMovePiece.push(Tmp)

            }
        }

        let PBeatPiecePlusOne = id.split('_')
        let PBeatLeft = (Number(PBeatPiecePlusOne[0]) - 1).toString() + "_" + (Number(PBeatPiecePlusOne[1]) - 1).toString()
        let PBeatRight = (Number(PBeatPiecePlusOne[0]) + 1).toString() + "_" + (Number(PBeatPiecePlusOne[1]) - 1).toString()

        if (board[PBeatLeft] && board[PBeatLeft][0] !== whoseMove && isLink(id, PBeatLeft) === false) {

            canMovePiece.push(PBeatLeft)

        }

        if (board[PBeatRight] && board[PBeatRight][0] !== whoseMove && isLink(id, PBeatRight) === false) {

            canMovePiece.push(PBeatRight)

        }

        let indexInHistory = history.indexOf(formatting(id[0] + "_" + (Number(id[2]) + 1).toString(), 0)   + "-" +   formatting(id, 0))

        if (indexInHistory === -1) {

            indexInHistory = history.indexOf(formatting((Number(id[0]) - 1).toString() + "_" + (Number(id[2]) + 1).toString(), 0)  + "-" +   formatting(id, 0))

            if (indexInHistory === -1) {

                indexInHistory = history.indexOf(formatting((Number(id[0]) + 1).toString() + "_" + (Number(id[2]) + 1).toString(), 0) + "-" + formatting(id, 0))

            }

        }

        if ((Number(id[0]) - 1 >= 1) && id[2] === '4' && history[history.length - 1][1] === '2' && history[history.length - 1][4] === '4' && (formatting(history[indexInHistory][3], 2) - formatting(history[history.length - 1][0], 2) === 1)){

            let tmpBP = board[(((Number(id[0]) - 1) + "_" + (Number(id[2]))).toString())]

            board[(((Number(id[0]) - 1) + "_" + (Number(id[2]))).toString())] = ""

            if (isLink(id, (((Number(id[0]) - 1) + "_" + (Number(id[2])) - 1).toString())) === false) {

                canMovePiece.push((((Number(id[0]) - 1) + "_" + (Number(id[2]) - 1)).toString()))

            }
            board[(((Number(id[0]) - 1) + "_" + (Number(id[2]))).toString())] = tmpBP
        }

        if ((Number(id[0]) + 1 <= 8) && id[2] === '4' && history[history.length - 1][1] === '2' && history[history.length - 1][4] === '4' && (formatting(history[indexInHistory][3], 2) - formatting(history[history.length - 1][0], 2) === -1)){

            let tmpBP = board[(((Number(id[0]) + 1) + "_" + (Number(id[2]))).toString())]

            board[(((Number(id[0]) + 1) + "_" + (Number(id[2]))).toString())] = ""

            if (isLink(id, (((Number(id[0]) + 1) + "_" + (Number(id[2])) - 1).toString())) === false) {

                canMovePiece.push((((Number(id[0]) + 1) + "_" + (Number(id[2]) - 1)).toString()))

            }
            board[(((Number(id[0]) + 1) + "_" + (Number(id[2]))).toString())] = tmpBP
        }
    }
}

function moveB(id, flag) {

    let BCoordinate = id.split("_")

    let tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]

    if (flag === 1) {

        let isGoodMoveForB = true

        while ((((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8)) && ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString())

                }

                tmpCoordinate[0] -= 1
                tmpCoordinate[1] += 1
            } else if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString())

                }

                isGoodMoveForB = false

            } else {
                isGoodMoveForB = false
            }

        }

        isGoodMoveForB = true
        tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]


        while ((((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8)) && ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString())

                }

                tmpCoordinate[0] += 1
                tmpCoordinate[1] -= 1
            } else if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString())

                }

                isGoodMoveForB = false
            } else {
                isGoodMoveForB = false
            }

        }

        isGoodMoveForB = true
        tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]


        while ((((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8)) && ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString())

                }

                tmpCoordinate[0] += 1
                tmpCoordinate[1] += 1
            } else if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString())

                }

                isGoodMoveForB = false
            } else {
                isGoodMoveForB = false
            }


        }

        isGoodMoveForB = true
        tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]


        while ((((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8)) && (((Number(tmpCoordinate[1]) - 1) >= 1)) && (((Number(tmpCoordinate[1]) - 1) >= 1)) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                    if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                        canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString())

                    }

                }

                tmpCoordinate[0] -= 1
                tmpCoordinate[1] -= 1
            } else if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString())

                }

                isGoodMoveForB = false
            } else {
                isGoodMoveForB = false
            }

        }


    } else {

        let isGoodMoveForB = true

        while ((((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8)) && ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && ((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8)) && ((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1])).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8)) && (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if (isGoodMoveForB !== false) {
                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString())
                    isGoodMoveForB = false
                }

            } else {
                isGoodMoveForB = false
            }

        }

        isGoodMoveForB = true
        tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]

        while ((((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8)) && ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                if ((((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8)) && ((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8)) && ((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8)) && ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8)) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1])).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8)) && (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if (isGoodMoveForB !== false) {
                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString())
                    isGoodMoveForB = false
                }
            }
            else {
                isGoodMoveForB = false
            }

        }

        isGoodMoveForB = true
        tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]


        while ((((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8)) && ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                if ((((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8)) && ((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8)) && ((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8)) && ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8)) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1])).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8)) && (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if (isGoodMoveForB !== false) {
                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString())
                    isGoodMoveForB = false
                }
            } else {
                isGoodMoveForB = false
            }


        }

        isGoodMoveForB = true
        tmpCoordinate = [Number(BCoordinate[0]), Number(BCoordinate[1])]


        while ((((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8)) && ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && isGoodMoveForB) {

            if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && ((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8)) && ((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1])).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8)) && (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if ((((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8)) && ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][1] === 'K')) {
                    isGoodMoveForB = false
                }
                if (isGoodMoveForB !== false) {
                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString())
                    isGoodMoveForB = false
                }

            } else {
                isGoodMoveForB = false
            }
        }
    }
}


function moveR(id, flag) {

    let RCoordinate = id.split("_")

    let isGoodMoveForR = true

    let tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]

    if (flag === 1) {
        while (( ((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) )  && isGoodMoveForR ){

            if (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()] === "" ) {

                if (isLink(id, (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                    canMovePiece.push( (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString() )

                }

                tmpCoordinate[0] += 0
                tmpCoordinate[1] += 1
            }
            else if (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                    canMovePiece.push( (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString() )

                }
                isGoodMoveForR = false
            }
            else {
                isGoodMoveForR = false
            }

        }

        isGoodMoveForR = true

        tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]


        while (( ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) )  && isGoodMoveForR ){

            if (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                    canMovePiece.push( (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString() )

                }

                tmpCoordinate[0] += 0
                tmpCoordinate[1] -= 1
            }
            else if (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                    canMovePiece.push( (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString() )

                }

                isGoodMoveForR = false

            }
            else {
                isGoodMoveForR = false
            }

        }

        isGoodMoveForR = true

        tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]


        while (( ((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8) )  && isGoodMoveForR ){

            if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString())

                }

                tmpCoordinate[0] -= 1
                tmpCoordinate[1] += 0

            }
            else if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()][0] !== whoseMove) {

                if (isLink(id, (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString())

                }
                isGoodMoveForR = false
            }
            else {
                isGoodMoveForR = false
            }

        }

        isGoodMoveForR = true

        tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]


        while (( ((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8) )  && isGoodMoveForR ) {

            if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()] === "") {

                if (isLink(id, (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString())

                }


                tmpCoordinate[0] += 1
                tmpCoordinate[1] += 0
            }
            else if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()][0] !== whoseMove){

                if (isLink(id, (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()) === false) {

                    canMovePiece.push((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString())

                }

                isGoodMoveForR = false
            }
            else {
                isGoodMoveForR = false
            }

        }
    }
    else {
        while ((((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) )  && isGoodMoveForR ){

            if (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()) === false) {

                if (((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    break
                }

                if ( ((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && ((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8) && (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    break
                }

                if (((Number(tmpCoordinate[1]) + 2) >= 1) && ((Number(tmpCoordinate[1]) + 2) <= 8) && ((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8) && (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) + 2).toString()][1] === 'K')) {
                    break
                }

                else {
                    canMovePiece.push( (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString() )
                    break
                }
            }
            else {
                break
            }

        }

        isGoodMoveForR = true

        tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]


        while (( ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) )  && isGoodMoveForR ){

            if (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()) === false) {

                if (((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && (board[(Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    break
                }

                if ( ((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && ((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8) && (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    break
                }

                if (((Number(tmpCoordinate[1]) - 2) >= 1) && ((Number(tmpCoordinate[1]) - 2) <= 8) && ((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8) && (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1]) - 2).toString()][1] === 'K')) {
                    break
                }

                else {
                    canMovePiece.push( (Number(tmpCoordinate[0])).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString() )
                    break
                }
            }
            else {
                break
            }

        }

        isGoodMoveForR = true

        tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]


        while (( ((Number(tmpCoordinate[0]) - 1) >= 1) && ((Number(tmpCoordinate[0]) - 1) <= 8) )  && isGoodMoveForR ){

            if (board[(Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()) === false) {

                if (((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1])).toString()][1] === 'K')) {
                    break
                }

                if ( ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && ((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][1] === 'K')) {
                    break
                }

                if (((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && ((Number(tmpCoordinate[0]) - 2) >= 1) && ((Number(tmpCoordinate[0]) - 2) <= 8) && (board[(Number(tmpCoordinate[0]) - 2).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][1] === 'K')) {
                    break
                }

                else {
                    canMovePiece.push( (Number(tmpCoordinate[0]) - 1).toString() + "_" + (Number(tmpCoordinate[1])).toString() )
                    break
                }
            }
            else {
                break
            }

        }

        isGoodMoveForR = true

        tmpCoordinate = [Number(RCoordinate[0]), Number(RCoordinate[1])]


        while (( ((Number(tmpCoordinate[0]) + 1) >= 1) && ((Number(tmpCoordinate[0]) + 1) <= 8) )  && isGoodMoveForR ) {

            if (board[(Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()][0] !== whoseMove && isCheck((Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString()) === false){

                if (((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1])).toString()][1] === 'K')) {
                    break
                }

                if ( ((Number(tmpCoordinate[1]) - 1) >= 1) && ((Number(tmpCoordinate[1]) - 1) <= 8) && ((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1]) - 1).toString()][1] === 'K')) {
                    break
                }

                if (((Number(tmpCoordinate[1]) + 1) >= 1) && ((Number(tmpCoordinate[1]) + 1) <= 8) && ((Number(tmpCoordinate[0]) + 2) >= 1) && ((Number(tmpCoordinate[0]) + 2) <= 8) && (board[(Number(tmpCoordinate[0]) + 2).toString() + "_" + (Number(tmpCoordinate[1]) + 1).toString()][1] === 'K')) {
                    break
                }

                else {
                    canMovePiece.push( (Number(tmpCoordinate[0]) + 1).toString() + "_" + (Number(tmpCoordinate[1])).toString() )
                    break
                }
            }
            else {
                break
            }

        }
    }
}

function  moveN(id) {
    let wNCoordinate = id.split("_")

    if ( ( (( Number(wNCoordinate[0]) + 1) >= 1) && ((Number(wNCoordinate[0]) + 1) <= 8)) && ((Number(wNCoordinate[1]) + 2) >= 1) && ((Number(wNCoordinate[1]) + 2) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) + 1).toString() + "_" + (Number(wNCoordinate[1]) + 2).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) + 1).toString() + "_" + (Number(wNCoordinate[1]) + 2).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) + 1).toString() + "_" + (Number(wNCoordinate[1]) + 2).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) + 2) >= 1) && ((Number(wNCoordinate[0]) + 2) <= 8)) && ((Number(wNCoordinate[1]) + 1) >= 1) && ((Number(wNCoordinate[1]) + 1) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) + 2).toString() + "_" + (Number(wNCoordinate[1]) + 1).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) + 2).toString() + "_" + (Number(wNCoordinate[1]) + 1).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) + 2).toString() + "_" + (Number(wNCoordinate[1]) + 1).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) + 2) >= 1) && ((Number(wNCoordinate[0]) + 2) <= 8)) && ((Number(wNCoordinate[1]) - 1) >= 1) && ((Number(wNCoordinate[1]) - 1) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) + 2).toString() + "_" + (Number(wNCoordinate[1]) - 1).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) + 2).toString() + "_" + (Number(wNCoordinate[1]) - 1).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) + 2).toString() + "_" + (Number(wNCoordinate[1]) - 1).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) + 1) >= 1) && ((Number(wNCoordinate[0]) + 1) <= 8)) && ((Number(wNCoordinate[1]) - 2) >= 1) && ((Number(wNCoordinate[1]) - 2) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) + 1).toString() + "_" + (Number(wNCoordinate[1]) - 2).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) + 1).toString() + "_" + (Number(wNCoordinate[1]) - 2).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) + 1).toString() + "_" + (Number(wNCoordinate[1]) - 2).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) - 1) >= 1) && ((Number(wNCoordinate[0]) - 1) <= 8)) && ((Number(wNCoordinate[1]) - 2) >= 1) && ((Number(wNCoordinate[1]) - 2) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) - 1).toString() + "_" + (Number(wNCoordinate[1]) - 2).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) - 1).toString() + "_" + (Number(wNCoordinate[1]) - 2).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) - 1).toString() + "_" + (Number(wNCoordinate[1]) - 2).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) - 2) >= 1) && ((Number(wNCoordinate[0]) - 2) <= 8)) && ((Number(wNCoordinate[1]) - 1) >= 1) && ((Number(wNCoordinate[1]) - 1) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) - 2).toString() + "_" + (Number(wNCoordinate[1]) - 1).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) - 2).toString() + "_" + (Number(wNCoordinate[1]) - 1).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) - 2).toString() + "_" + (Number(wNCoordinate[1]) - 1).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) - 2) >= 1) && ((Number(wNCoordinate[0]) - 2) <= 8)) && ((Number(wNCoordinate[1]) + 1) >= 1) && ((Number(wNCoordinate[1]) + 1) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) - 2).toString() + "_" + (Number(wNCoordinate[1]) + 1).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) - 2).toString() + "_" + (Number(wNCoordinate[1]) + 1).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) - 2).toString() + "_" + (Number(wNCoordinate[1]) + 1).toString() )

        }

    }

    if ( ( (( Number(wNCoordinate[0]) - 1) >= 1) && ((Number(wNCoordinate[0]) - 1) <= 8)) && ((Number(wNCoordinate[1]) + 2) >= 1) && ((Number(wNCoordinate[1]) + 2) <= 8) )  {

        if (board[(Number(wNCoordinate[0]) - 1).toString() + "_" + (Number(wNCoordinate[1]) + 2).toString()][0] !== whoseMove && isLink(id, (Number(wNCoordinate[0]) - 1).toString() + "_" + (Number(wNCoordinate[1]) + 2).toString()) === false) {

            canMovePiece.push( (Number(wNCoordinate[0]) - 1).toString() + "_" + (Number(wNCoordinate[1]) + 2).toString() )

        }
    }

}
function formatting(id, flag) {

    const numbToLet = {
         1: 'a',
         2: 'b',
         3: 'c',
         4: 'd',
         5: 'e',
         6: 'f',
         7: 'g',
         8: 'h',
         'a': '1',
         'b': '2',
         'c': '3',
         'd': '4',
         'e': '5',
         'f': '6',
         'g': '7',
         'h': '8'
    }

    if (flag === 0) {

        let pieceId = id.split('_')
        return numbToLet[id[0]] + id[2]

    }
    else if(flag === 1) {

        console.log("idInput = " +  id)
        return id.length === 2 ? numbToLet[id[0]] + "_" + id[1] : numbToLet[id[1]] + "_" + id[2]

    }
    else {

        return Number(numbToLet[id])

    }
}


function canMove(id) {

    if (board[id][1] === 'P') {
        moveP(id)

    } else if (board[id][1] === "N") {

        moveN(id)

    } else if (board[id][1] === "B") {

        moveB(id, 1)

    } else if (board[id][1] === "R") {

        moveR(id, 1)

    } else if (board[id][1] === "Q") {

        moveB(id, 1)

        moveR(id, 1)

    } else if (board[id][1] === 'K') {

        if(board[id][0] === 'w'){

            if (wKingId === "5_1" && isMoveWK === false && board["8_1"] === 'wR2' && isMoveWR2 === false && board["6_1"] === "" && isCheck("6_1") === false && board["7_1"] === "" && isCheck("7_1") === false && isCheck(wKingId) === false) {
                canMovePiece.push("7_1")
            }

            if (wKingId === "5_1" && isMoveWK === false && board["1_1"] === 'wR1' && isMoveWR1 === false && board["4_1"] === "" && isCheck("4_1") === false && board["3_1"] === "" && isCheck("3_1") === false && isCheck(wKingId) === false) {
                canMovePiece.push("3_1")
            }

            moveB(id, 2)
            moveR(id, 2)

            for (let i = 0; i < canMovePiece.length; i++) {

                let tmp = board[wKingId]

                board[wKingId] = ""

                if (isCheck(canMovePiece[i]) === true) {
                    canMovePiece.splice(i, 1)
                }

                board[wKingId] = tmp

            }


        }
        else {

            if (bKingId === "5_8" && isMoveBK === false && board["8_8"] === 'bR2' && isMoveBR2 === false && board["6_8"] === "" && isCheck("6_8") === false && board["7_8"] === "" && isCheck("7_8") === false && isCheck(bKingId) === false) {
                canMovePiece.push("7_8")
            }

            if (bKingId === "5_8" && isMoveBK === false && board["1_8"] === 'bR1' && isMoveWR1 === false && board["4_8"] === "" && isCheck("4_8") === false && board["3_8"] === "" && isCheck("3_8") === false && isCheck(bKingId) === false) {
                canMovePiece.push("3_8")
            }

            moveB(id, 2)
            moveR(id, 2)

            for (let i = 0; i < canMovePiece.length; i++) {

                let tmp = board[bKingId]

                board[bKingId] = ""

                if (isCheck(canMovePiece[i]) === true) {
                    canMovePiece.splice(i, 1)
                }

                board[bKingId] = tmp

            }

        }
    }
}

function move(event) {

    let bKingCheck = document.getElementById(bKingId)
    let wKingCheck = document.getElementById(wKingId)

    if (isFirstMove === true) {

        console.log("first")
        console.log("Ход " + (whoseMove === 'w' ? 'белых' : 'черных').toString())

        figId = event.target.id

        console.log('Id клетки, где фигура стоит' + figId)
        console.log('Значение фигуры' + board[figId])

        if (board[figId] && board[event.target.id][0] === whoseMove) {

            canMove(figId)

            if (canMovePiece.length > 0) {

                let pieceNow = document.getElementById(figId)

                pieceNow.style.backgroundColor = '#7B61FF'
                pieceNow.style.opacity = '0.9'

                for (let i = 0; i < canMovePiece.length; i++) {

                    let points = document.getElementById(canMovePiece[i])
                    points.innerHTML = '<div id = "divInPoint" class="point" onclick="move(event)"></div>'

                    let divInPoints = document.getElementById('divInPoint')
                    divInPoints.id = points.id

                    points.style.textAlign = 'center'

                }
            }

            isFirstMove = false

        }

    } else {

        let toPiece = event.target.id

        if (figId === toPiece) {

            isFirstMove = true

            let pieceNow = document.getElementById(figId)
            pieceNow.style.backgroundColor = ''
            pieceNow.style.opacity = ''

            for (let i = 0; i < canMovePiece.length; i++) {
                let points = document.getElementById(canMovePiece[i])
                points.innerHTML = ''
            }

            canMovePiece.splice(0, canMovePiece.length)

            bKingCheck.style.backgroundColor = ''
            wKingCheck.style.backgroundColor = ''

            if (isCheck(bKingId) === true && whoseMove === 'b') {

                bKingCheck.style.backgroundColor = 'red'

            } else if (isCheck(wKingId) === true && whoseMove === 'w') {

                wKingCheck.style.backgroundColor = 'red'

            }

        } else {

            let fromP = document.getElementById(figId)
            let toP = document.getElementById(toPiece)

            console.log('Куда можем ходить = ' + canMovePiece)

            if (canMovePiece.indexOf(toPiece, 0) !== -1) {

                let fig = board[figId][1] === "P" ? '' : board[figId][1]

                if (board[figId][0] === 'w' && board[figId][1] === 'P' && toPiece[2] === '8') {

                    console.log('Случай с превращением пешки в ферзи!')

                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/wQ.png)"


                    let figFrom = ""

                    figFrom += fig
                    figFrom += formatting(fromP.id, 0)

                    let figTo = ''

                    figTo += fig
                    figTo += formatting(toP.id, 0)

                    history.push(figFrom + "-" + figTo)

                    board[figId] = 'wQ'
                    board[toPiece] = board[figId]
                    board[figId] = ""

                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                } else if (board[figId][0] === 'b' && board[figId][1] === 'P' && toPiece[2] === '1') {

                    console.log('Случай с превращением пешки в ферзи!')
                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/bQ.png)"

                    if (isStartTime === false) {
                        startTime = Date.now()
                        isStartTime = false
                    }

                    let figFrom = ''

                    figFrom += fig
                    figFrom += formatting(fromP.id, 0)

                    let figTo = ''

                    figTo += fig
                    figTo += formatting(toP.id, 0)

                    history.push(figFrom + "-" + figTo)

                    board[figId] = 'bQ'
                    board[toPiece] = board[figId]
                    board[figId] = ""

                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                } else if (board[figId][0] === 'w' && board[figId][1] === 'K' && (Number(toPiece[0]) - Number(figId[0]) === 2) && toPiece === "7_1") {

                    let newRockId = document.getElementById((Number(toPiece[0]) - 1).toString() + toPiece[1] + toPiece[2])
                    let oldRockId = document.getElementById('8_1')
                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/wK.png)"
                    newRockId.style.backgroundImage = "url(../pieces/wR.png)"
                    oldRockId.style.backgroundImage = ""
                    history.push('0-0')

                    board[toPiece] = board[figId]
                    wKingId = toPiece
                    board[figId] = ""
                    board["8_1"] = ""
                    board["6_1"] = 'wR2'


                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                } else if (board[figId][0] === 'w' && board[figId][1] === 'K' && (Number(toPiece[0]) - Number(figId[0]) === -2) && toPiece === "3_1") {

                    let newRockId = document.getElementById((Number(toPiece[0]) + 1).toString() + toPiece[1] + toPiece[2])
                    let oldRockId = document.getElementById('1_1')
                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/wK.png)"
                    newRockId.style.backgroundImage = "url(../pieces/wR.png)"
                    oldRockId.style.backgroundImage = ""
                    history.push('0-0-0')

                    board[toPiece] = board[figId]
                    wKingId = toPiece
                    board[figId] = ""
                    board["1_1"] = ""
                    board["4_1"] = 'wR1'


                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                } else if (board[figId][0] === 'b' && board[figId][1] === 'K' && (Number(toPiece[0]) - Number(figId[0]) === 2) && toPiece === "7_8") {

                    let newRockId = document.getElementById((Number(toPiece[0]) - 1).toString() + toPiece[1] + toPiece[2])
                    let oldRockId = document.getElementById('8_8')
                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/bK.png)"
                    newRockId.style.backgroundImage = "url(../pieces/bR.png)"
                    oldRockId.style.backgroundImage = ""
                    history.push('0-0')

                    board[toPiece] = board[figId]
                    bKingId = toPiece
                    board[figId] = ""
                    board["8_8"] = ""
                    board["6_8"] = 'bR2'


                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                } else if (board[figId][0] === 'b' && board[figId][1] === 'K' && (Number(toPiece[0]) - Number(figId[0]) === -2) && toPiece === "3_8") {

                    let newRockId = document.getElementById((Number(toPiece[0]) + 1).toString() + toPiece[1] + toPiece[2])
                    let oldRockId = document.getElementById('1_8')
                    fromP.style.backgroundImage = ""
                    toP.style.backgroundImage = "url(../pieces/bK.png)"
                    newRockId.style.backgroundImage = "url(../pieces/bR.png)"
                    oldRockId.style.backgroundImage = ""
                    history.push('0-0-0')

                    board[toPiece] = board[figId]
                    bKingId = toPiece
                    board[figId] = ""
                    board["1_8"] = ""
                    board["4_8"] = 'bR1'


                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                } else if (figId[2] === '5' && board[figId][0] === 'w' && board[figId][1] === 'P' && (board[(Number(figId[0]) - 1).toString() + "_" + (Number(figId[2]) + 1).toString()] === "" || board[(Number(figId[0]) + 1).toString() + "_" + (Number(figId[0]) + 1).toString()] === "")) {

                    let fromPMinusOne = document.getElementById(toPiece[0] + "_" + (Number(toPiece[2]) - 1).toString())
                    fromPMinusOne.style.backgroundImage = ''
                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/" + board[figId][0] + board[figId][1] + ".png)"
                    board[toPiece] = board[figId]
                    board[figId] = ""
                    board[toPiece[0] + "_" + (Number(toPiece[2]) - 1).toString()] = ""

                    let figFrom = ''

                    figFrom += fig
                    figFrom += formatting(fromP.id, 0)

                    let figTo = ''

                    figTo += fig
                    figTo += formatting(toP.id, 0)

                    history.push(figFrom + "-" + figTo)

                } else if (figId[2] === '4' && board[figId][0] === 'b' && board[figId][1] === 'P' && (board[(Number(figId[0]) - 1).toString() + "_" + (Number(figId[2]) - 1).toString()] === "" || board[(Number(figId[0]) + 1).toString() + "_" + (Number(figId[0]) - 1).toString()] === "")) {

                    let fromPMinusOne = document.getElementById(toPiece[0] + "_" + (Number(toPiece[2]) + 1).toString())
                    fromPMinusOne.style.backgroundImage = ''
                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/" + board[figId][0] + board[figId][1] + ".png)"
                    board[toPiece] = board[figId]
                    board[figId] = ""
                    board[toPiece[0] + "_" + (Number(toPiece[2]) + 1).toString()] = ""

                    let figFrom = ''

                    figFrom += fig
                    figFrom += formatting(fromP.id, 0)

                    let figTo = ''

                    figTo += fig
                    figTo += formatting(toP.id, 0)

                    history.push(figFrom + "-" + figTo)

                } else {
                    let DateNow = new Date()

                    console.log('Случай без превращения пешек в ферзи!')
                    console.log('figID = ' + figId)

                    let toPiece = event.target.id

                    fromP.style.backgroundImage = ''
                    toP.style.backgroundImage = "url(../pieces/" + board[figId][0] + board[figId][1] + ".png)"

                    if (isStartTime === false) {
                        startTime = DateNow.getHours() * 3600 + DateNow.getMinutes() * 60 + DateNow.getSeconds()
                        isStartTime = true
                    }

                    let figFrom = ''

                    figFrom += fig
                    figFrom += formatting(fromP.id, 0)

                    let figTo = ''

                    figTo += fig
                    figTo += formatting(toP.id, 0)

                    history.push(figFrom + "-" + figTo)

                    board[toPiece] = board[figId]
                    board[figId] = ""

                    if (board[toPiece][0] === 'w' && board[toPiece][1] === 'K') {
                        wKingId = toPiece
                    }
                    else if (board[toPiece][0] === 'b' && board[toPiece][1] === 'K') {
                        bKingId = toPiece
                    }

                    for (let i = 0; i < canMovePiece.length; i++) {
                        let points = document.getElementById(canMovePiece[i])
                        points.innerHTML = ''
                    }

                    canMovePiece.splice(0, canMovePiece.length)

                    if (board[toPiece][0] === 'w' && board[toPiece][1] === 'K') {
                        isMoveWK = true
                    }

                    if (board[toPiece][0] === 'b' && board[toPiece][1] === 'K') {
                        isMoveBK = true
                    }

                    if (board[toPiece][0] === 'w' && board[toPiece][1] === 'R' && board[toPiece][2] === '1') {
                        isMoveWR1 = true
                    }

                    if (board[toPiece][0] === 'w' && board[toPiece][1] === 'R' && board[toPiece][2] === '2') {
                        isMoveWR2 = true
                    }

                    if (board[toPiece][0] === 'b' && board[toPiece][1] === 'R' && board[toPiece][2] === '1') {
                        isMoveBR1 = true
                    }

                    if (board[toPiece][0] === 'b' && board[toPiece][1] === 'R' && board[toPiece][2] === '2') {
                        isMoveBR2 = true
                    }

                }

                let wMove = document.getElementById('move')

                if (whoseMove === 'w') {
                    whoseMove = 'b'
                    wMove.innerHTML = 'Ходят Черные'

                } else {
                    wMove.innerHTML = 'Ходят Белые'
                    whoseMove = 'w'

                }

                if (history.length % 2 !== 0) {
                    let leftMoveI = document.getElementById('leftMoves')
                    leftMoveI.innerHTML += moveGamer.toString() + "."
                    moveGamer += 1
                    leftMoveI.innerHTML += history[history.length - 1] + " "
                    leftMoveI.innerHTML += '<br>'
                }
                else if (history.length % 2 === 0) {
                    let rightMoveI = document.getElementById('rightMoves')
                    rightMoveI.innerHTML += history[history.length - 1] + " "
                    rightMoveI.innerHTML += '<br>'
                }

            }

            let pieceNow = document.getElementById(figId)
            pieceNow.style.backgroundColor = ''
            pieceNow.style.opacity = ''

            for (let i = 0; i < canMovePiece.length; i++) {

                let points = document.getElementById(canMovePiece[i])
                points.innerHTML = ''

            }

            isFirstMove = true

            canMovePiece.splice(0, canMovePiece.length)


            bKingCheck.style.backgroundColor = ''
            wKingCheck.style.backgroundColor = ''

            if (isCheck(bKingId) === true && whoseMove === 'b') {

                bKingCheck.style.backgroundColor = 'red'
                isMate(bKingId)

            } else if (isCheck(wKingId) === true && whoseMove === 'w') {

                wKingCheck.style.backgroundColor = 'red'
                isMate(wKingId)

            }

            if (whoseMove === 'w') {
                isStalemate(wKingId)
            } else {
                isStalemate(bKingId)
            }

        }
    }
}


