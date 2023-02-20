const width = self.innerWidth
const height = self.innerHeight
const base = document.querySelector<HTMLCanvasElement>('#base')!
const context = base.getContext('2d')!
const screen = {
    lines: 0,
    logback: <string[]>[],
    boxes: 10,
    elements: <number[]>[],
}

function font() {
    context.font = '32px JetBrains Mono'
}

function clearFrame() {
    context.clearRect(0, 0, width, height)
}

function resetLog() {
    screen.lines = 0
    screen.logback = []
}

function resetElements() {
    screen.elements = []
    for (let i = 0; i < screen.boxes * screen.boxes; i++) {
        screen.elements.push(0)
    }
}

function reset() {
    resetLog()
    resetElements()
}

function log(message: string) {
    screen.lines += 1
    screen.logback.push(message)
    if (screen.lines * 30 >= height) {
        screen.lines -= 1
        screen.logback.shift()
        redraw()
        return
    }
    redraw()
}

function drawElements() {
    const colors = ['white', '#c605a6', 'aqua', 'yellow', 'black', 'orange', 'blue', 'red', 'purple', 'pink', '#98FB98']
    const offset = Math.round((Math.max(width, height) - Math.min(width, height)) / 2)
    const boxWidth = Math.round(Math.min(width, height) / screen.boxes)
    for (let x = 0; x < screen.boxes; x++) {
        for (let y = 0; y < screen.boxes; y++) {
            const element = screen.elements[x * screen.boxes + y]
            context.fillStyle = colors[element]
            if (width > height) {
                context.fillRect(boxWidth * x + offset, boxWidth * y, boxWidth, boxWidth)
            } else {
                context.fillRect(boxWidth * x, boxWidth * y + offset, boxWidth, boxWidth)
            }
        }
    }
}

function drawLog() {
    font()
    context.fillStyle = '#98FB98'
    for (let i = 0; i < screen.logback.length; i++) {
        context.fillText(screen.logback[i], 1, i * 30 + 30)
    }
}

function redraw() {
    clearFrame()
    drawElements()
    drawLog()
}

function loadElements() {
    for (let x = 0; x < screen.boxes; x++) {
        for (let y = 0; y < screen.boxes; y++) {
            const element = Math.round(Math.random() * 9.501);
            screen.elements[x * screen.boxes + y] = element
            if (element == 10) {
                log('An exotic square was revealed')
            }
        }
    }
}

export function load() {
    base.width = width
    base.height = height
    reset()
    log(`Size: ${width}:${height}`)
    base.addEventListener('click', _ => {
        resetElements()
        loadElements()
        redraw()
    })
}
