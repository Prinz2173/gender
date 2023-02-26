let februaryDays = document.querySelectorAll('.february')
let tools = document.querySelectorAll('.toolButton')
const selectButton = document.querySelector('#select')
const markButton = document.querySelector('#mark')
const eventButton = document.querySelector('#eventMark')
const removeEventButton = document.querySelector('#removeEvent')
const blockDayButton = document.querySelector('#blockDay')

let i = 0
let marks = ''

selectButton.addEventListener('click', selectTool)
markButton.addEventListener('click', markTool)
eventButton.addEventListener('click', eventMarkTool)
removeEventButton.addEventListener('click', removeEventTool)
blockDayButton.addEventListener('click', blockDayTool)

function selectTool(ev){
    let button = ev.currentTarget
    
    
    februaryDays.forEach(function(day){
        if (day.dataset.tool === 'select'){
            day.dataset.tool = 'nothing'
            if (day.classList.contains('selectDay')){
                day.classList.remove('selectDay')
                day.href = `#`
            }
            day.removeEventListener('click', selectionavel)
            button.classList.remove('choosenTool')
        }
        else if (day.dataset.tool === 'blocked'){
            
        }
        else{
            day.dataset.tool = 'select'
            tools.forEach(function(tool){
                if (tool.classList.contains('choosenTool')){
                    tool.classList.remove('choosenTool')
                }
            })
            button.classList.add('choosenTool')
            
        }
    })
    useTool()
}
function markTool(ev){
    let button = ev.currentTarget
    februaryDays.forEach(function(day){
        if (i === 1){
            i=0
            day.classList.remove('markDay')
        }
        if (day.dataset.tool === 'mark'){
            day.dataset.tool = 'nothing'
            day.removeEventListener('click', markDays)
            button.classList.remove('choosenTool')
        }else if (day.dataset.tool === 'blocked'){
            
        }else{
            day.dataset.tool = 'mark'
            tools.forEach(function(tool){
                if (tool.classList.contains('choosenTool')){
                    tool.classList.remove('choosenTool')
                }
            })
            button.classList.add('choosenTool')
            
        }
    })
    useTool()
}
function eventMarkTool(ev){
    let button = ev.currentTarget
    removeSelect()
    
    februaryDays.forEach(function(day){
        if (day.dataset.tool === 'eventMark'){
            day.dataset.tool = 'nothing'
            day.removeEventListener('click', markEvent)
            button.classList.remove('choosenTool')
        }
        else if (day.dataset.tool === 'blocked'){
           
        }else{
            day.dataset.tool = 'eventMark'
            tools.forEach(function(tool){
                if (tool.classList.contains('choosenTool')){
                    tool.classList.remove('choosenTool')
                }
            })
            button.classList.add('choosenTool')
            
        }
    })
    useTool()
}
function removeEventTool(ev){
    let button = ev.currentTarget
    
    februaryDays.forEach(function(day){
        if (day.dataset.tool === 'removeEvent'){
            day.dataset.tool = 'nothing'
            button.classList.remove('choosenTool')
        }
        else if (day.dataset.tool === 'blocked'){
    
        }else{
            day.dataset.tool = 'removeEvent'
            tools.forEach(function(tool){
                if (tool.classList.contains('choosenTool')){
                    tool.classList.remove('choosenTool')
                }
            })
            button.classList.add('choosenTool')
            
        }
    })
    useTool()
}
function blockDayTool(ev){
    let button = ev.currentTarget
    
    februaryDays.forEach(function(day){
        if (day.dataset.tool === 'blockDay'){
            day.dataset.tool = 'nothing'
            button.classList.remove('choosenTool')
        }
        else{
            day.dataset.tool = 'blockDay'
            tools.forEach(function(tool){
                if (tool.classList.contains('choosenTool')){
                    tool.classList.remove('choosenTool')
                }
            })
            button.classList.add('choosenTool')
            
        }
    })
    useTool()
}

function useTool(){
    marks = ''

    februaryDays.forEach(function(day){
        day.removeEventListener('click', selectionavel)
        day.removeEventListener('click', markDays)
        day.removeEventListener('click', markEvent)
        day.removeEventListener('click', removeEvent)
        day.removeEventListener('click', blockingDay)
        let tool = day.dataset.tool
        switch(tool){
            case 'select':
                day.addEventListener('click', selectionavel)
                break
            case 'mark':
                day.addEventListener('click', markDays)
                removeSelect()
                break
            case 'eventMark':
                day.addEventListener('click', markEvent)
                removeSelect()
                break
            case 'removeEvent':
                day.addEventListener('click', removeEvent)
                removeSelect()
                break
            case 'blockDay' || 'blocked':
                day.addEventListener('click', blockingDay)
                removeSelect()
                break
        }
    })
}

function selectionavel(ev){
    
    let daySelect = ev.currentTarget
    if (daySelect.classList.contains('selectDay')){
        daySelect.href = `days/day${daySelect.dataset.value}.html`
        localStorage.setItem(`selDay`, `day${daySelect.dataset.value}`)
    }
    else{
        februaryDays.forEach(function(day){
            if (day.classList.contains('selectDay')){
                day.classList.remove('selectDay')
                day.href = `#`
            }
            if (day.classList.contains('markDay') || day.classList.contains('betweenMarkDays')){
                day.classList.remove('markDay')
                day.classList.remove('betweenMarkDays')
            }
        })
        daySelect.classList.toggle('selectDay')
    }
}

function removeSelect(){
    februaryDays.forEach(function(day){
        if (day.classList.contains('selectDay')){
            day.classList.remove('selectDay')
            day.href = `#`
        }
        day.removeEventListener('click', selectionavel)
    }
    
)}

function markDays(ev){
    
    let daySelect1 = ev.currentTarget
    
    if (i >= 2){
        februaryDays.forEach(function(day){
        
            day.classList.remove('markDay')
            day.classList.remove('betweenMarkDays')
            marks = ''
            i = 0
        }
    )}
    daySelect1.classList.add('markDay')
    marks += `${daySelect1.dataset.value} ; `
    i++
    if(i === 2){
        arrMarks = marks.split(';')
        februaryDays.forEach(function(day){
            if(Number(day.dataset.value) > arrMarks[0] && Number(day.dataset.value) < arrMarks[1]){
                    day.classList.add('betweenMarkDays')
            }else if(Number(day.dataset.value) > arrMarks[1] && Number(day.dataset.value) < arrMarks[0]){
                day.classList.add('betweenMarkDays')
            }
                
        })
    }     
}

function markEvent(ev){

    let eventDay = ev.currentTarget

    if(!eventDay.classList.contains('eventDay')){
        eventDay.classList.add('eventDay')
        let input = document.createElement('input')
        input.type = 'text'
        input.id = 'eventInput'
        input.addEventListener('blur', eventNote)
        eventDay.appendChild(input)
        input.focus()
    }
}

function eventNote(){
    let element = document.querySelector('#eventInput')
    let eventDay = element.parentNode
    if (element.value !== ''){
        let subText = element.value.slice(0, 5)
        let abreviation = subText.concat(' ...')
        let eventText = document.createElement('p')
        eventText.innerHTML = `<abbr title= "${element.value}">${abreviation}</abbr>`
        eventText.className = 'eventText'
        eventDay.removeChild(element)
        eventDay.appendChild(eventText)
    }
    else{
        eventDay.removeChild(element)
        eventDay.classList.remove('eventDay')
    }
    
}

function removeEvent(ev){

    let reEventDay = ev.currentTarget

    if(reEventDay.classList.contains('eventDay')){
        
        let p = reEventDay.children[0]
        p.remove()
        reEventDay.classList.remove('eventDay')
    }
}

function blockingDay(ev){
    let selBlockDay = ev.currentTarget

    februaryDays.forEach(function(day){
        if(day.classList.contains('blocked')){
            day.dataset.tool = 'blocked'
        }
    })
    if (selBlockDay.classList.contains('markDay') || selBlockDay.classList.contains('betweenMarkDays')){
        selBlockDay.classList.remove('markDay')
        selBlockDay.classList.remove('betweenMarkDays')
    }
    if(selBlockDay.dataset.tool !== 'blocked'){
        selBlockDay.classList.add('blocked')
        selBlockDay.dataset.tool = 'blocked'
    }else{
        selBlockDay.classList.remove('blocked')
        selBlockDay.dataset.tool = 'blockDay'
    }
    
}