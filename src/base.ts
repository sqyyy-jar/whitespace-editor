const width = self.innerWidth
const height = self.innerHeight
const base = document.querySelector<HTMLCanvasElement>('#base')!
const context = base.getContext('2d')!
const state = {
    lines: 0,
    maxLog: 5,
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
    state.lines = 0
    state.logback = []
}

function resetElements() {
    state.elements = []
    for (let i = 0; i < state.boxes * state.boxes; i++) {
        state.elements.push(0)
    }
}

function reset() {
    resetLog()
    resetElements()
}

function log(message: string) {
    state.lines += 1
    state.logback.push(message)
    if (state.lines > state.maxLog) {
        state.lines -= 1
        state.logback.shift()
        redraw()
        return
    }
    redraw()
}

function drawElements() {
    const colors = ['white', '#c605a6', 'aqua', 'yellow', 'black', 'orange', 'blue', 'red', 'purple', 'pink', '#98FB98']
    const offset = Math.round((Math.max(width, height) - Math.min(width, height)) / 2)
    const boxWidth = Math.round(Math.min(width, height) / state.boxes)
    for (let x = 0; x < state.boxes; x++) {
        for (let y = 0; y < state.boxes; y++) {
            const element = state.elements[x * state.boxes + y]
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
    for (let i = 0; i < state.logback.length; i++) {
        context.fillText(state.logback[i], 1, i * 30 + 30)
    }
}

function redraw() {
    clearFrame()
    drawElements()
    drawLog()
}

function loadElements() {
    for (let x = 0; x < state.boxes; x++) {
        for (let y = 0; y < state.boxes; y++) {
            const element = Math.round(Math.random() * 9.501);
            state.elements[x * state.boxes + y] = element
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
    loadElements()
    redraw()
    base.addEventListener('click', _ => {
        loadElements()
        redraw()
    })
}
