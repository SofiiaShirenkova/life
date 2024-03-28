const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.height = innerHeight
canvas.width = innerHeight * 100 / 71 + 7

const deadColor = 'black'
const aliveColor = '#00FF00'


const cellsize = 10
const delta = 1

//создание клетки
class Cell {
    constructor(position) {
        this.position = position
        this.color = deadColor
        this.nextcolor = deadColor
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x - delta, this.position.y - delta, cellsize - delta, cellsize - delta)
        c.fill()
        c.closePath()
    }
} 

//создание сетки
const gridwidth = 100
const gridheight = 71
let grid = []
for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
    let array = []
    for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
        let cell = new Cell({x: j * cellsize, y: i * cellsize})
        array.push(cell)
    }
    grid.push(array)
}

for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
    for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
        grid[i][j].draw()
    } //рисуем сеточку :3
}

//ВСЕ ПРАВИЛА ИГРЫ ЖИЗНЬ

function animate(){
    for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
        for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
            let cnt = 0
            if(grid[(i + 1) % gridheight][(j + 1) % gridwidth].color == aliveColor){ cnt++ }
            if(grid[(i + 1) % gridheight][j].color == aliveColor){ cnt++ }
            if(grid[i][(j + 1) % gridwidth].color == aliveColor){ cnt++ }
            if(grid[(i - 1 + gridheight) % gridheight][(j - 1 + gridwidth) % gridwidth].color == aliveColor){ cnt++ }
            if(grid[i][(j - 1 + gridwidth) % gridwidth].color == aliveColor){ cnt++ }
            if(grid[(i - 1 + gridheight) % gridheight][j].color == aliveColor){ cnt++ }
            if(grid[(i + 1) % gridheight][(j - 1 + gridwidth) % gridwidth].color == aliveColor){ cnt++ }
            if(grid[(i - 1 + gridheight) % gridheight][(j + 1) % gridwidth].color == aliveColor){ cnt++ }
    
            if(grid[i][j].color == deadColor){
                if(cnt == 3){
                    grid[i][j].nextcolor = aliveColor
                }
                else{
                    grid[i][j].nextcolor = deadColor
                }
            }
            if(grid[i][j].color == aliveColor){
                if(cnt < 2 || cnt > 3){
                    grid[i][j].nextcolor = deadColor
                }
                else{
                    grid[i][j].nextcolor = aliveColor
                }
            }
        }
    }
    
    
    for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
        for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
            grid[i][j].draw()
            grid[i][j].color = grid[i][j].nextcolor
        }
    }
}


let an //сделали эн глобальным -- теперь он имеет доступ, а раньше не имел тк был в эвентлистенере
let isPlaying //булевая переменная

//кнопочки
//кнопка начать
function PB() {
            if(!isPlaying){ //если оно уже проигрывается, то не проигрываем второй раз
                an = setInterval(animate, 100) //выполнять функцию анимэйт -- запустили анимацию
            }
            isPlaying = true
}

//кнопка стоп
function SB() {
            isPlaying = false
            clearInterval(an) //пауза -- очищение переменной эн -- отмена запуска анимации
}

//кнопка рандом
function RB() {
            isPlaying = false
            clearInterval(an)
            for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
                for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
                    if(Math.random() > 0.4){
                        grid[i][j].color = deadColor
                        grid[i][j].nextcolor = deadColor
                    }
                    else{
                        grid[i][j].color = aliveColor
                        grid[i][j].nextcolor = deadColor
                    }
                    grid[i][j].draw()
                }
            }
} 

//кнопка очистки
function CB() {
            isPlaying = false
            clearInterval(an)
            for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
                for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
                    grid[i][j].color = deadColor //каждую клеточку делаем белой, а потом зарисовываем
                    grid[i][j].nextcolor = deadColor
                    grid[i][j].draw()
                }
            }
}

addEventListener('click', mouse => {
    let inew = Math.floor(mouse.clientY / cellsize), 
    jnew = Math.floor(mouse.clientX / cellsize)
    grid[inew][jnew].color = aliveColor
    grid[inew][jnew].draw()
    console.log(mouse.clientX, mouse.clientY)
})



addEventListener('click', mouse => {
        closeStudyscreenLife()
})

//экран обучения
function closeStudyscreenLife(){
    let sl = document.getElementById("studyLife");
    sl.style.display="none";
}

if (screen.width <= 600) {
    let ad2 = document.getElementById("anotherDevice2");
    ad2.style.display="flex";
    let canvasLifeL = document.getElementById("canvasLife");
    canvasLifeL.style.display="none";
    let btnLife = document.getElementById("buttons");
    btnLife.style.display="none";
} else {
    let ad2 = document.getElementById("anotherDevice2");
    ad2.style.display = "none";
    let canvasLifeL = document.getElementById("canvasLife");
    canvasLifeL.style.display="flex";
    let btnLife = document.getElementById("buttons");
    btnLife.style.display="flex";
}