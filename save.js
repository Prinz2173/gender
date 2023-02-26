let monthDays = document.querySelectorAll('.march')
const saveBtn = document.querySelector('#saveGender')
let blockedDays = []
let eventDays = []
let verefyDay = ''

saveBtn.addEventListener('click', saveInformations)

function saveInformations(){
    
    let i = 0
    localStorage.clear()

    monthDays.forEach(day =>{
        i++
    
        if (day.classList.contains('blocked')){
            localStorage.setItem(`day${i}`, 'blocked') 
        }if(day.classList.contains('eventDay')){
            let marckedEvent = day.children[0].children[0].title
            localStorage.setItem(`event${i}`, `${marckedEvent}`)
        }

    })
}

function updatePage(){
    let i = 0
    monthDays.forEach(day =>{
        i++
        if(localStorage.getItem(`day${i}`)){
            blockedDays.push(i)
        }
        if(localStorage.getItem(`event${i}`)){
            eventDays.push(i)
        }
        
    })

    monthDays.forEach(day =>{
        if (eventDays.includes(Number(day.dataset.value))){
            day.classList.add('eventDay')
        }if (blockedDays.includes(Number(day.dataset.value))){
            day.classList.add('blocked')
            day.dataset.tool = 'blocked'
        }
    })
    i = 0
    monthDays.forEach(day => {
        i++
        if (day.classList.contains('eventDay')){
            let event = localStorage.getItem(`event${i}`).slice(0, 5)
            let abreviation = event.concat('...')
            let eventText = document.createElement('p')
            eventText.innerHTML = `<abbr title= "${localStorage.getItem(`event${i}`)}">${abreviation}</abbr>`
            eventText.className = 'eventText'
            day.appendChild(eventText)
        }
    })
}
updatePage()