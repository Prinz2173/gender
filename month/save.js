let thisMonth = document.querySelector('h1').dataset.month
let monthDays = document.querySelectorAll(`${thisMonth}`)
const saveBtn = document.querySelector('#saveGender')
let blockedDays = []
let eventDays = []
let verefyDay = ''

saveBtn.addEventListener('click', saveInformations)

function saveInformations(){
    
    let i = 0

    monthDays.forEach(day =>{
        i++
        
        if(localStorage.getItem(`${thisMonth}day${i}`)){
            localStorage.removeItem(`${thisMonth}day${i}`)
        if(localStorage.getItem(`${thisMonth}event${i}`)){
            localStorage.removeItem(`${thisMonth}event${i}`)
        }
        }if (day.classList.contains('blocked')){
            localStorage.setItem(`${thisMonth}day${i}`, 'blocked') 
        }if(day.classList.contains('eventDay')){
            let marckedEvent = day.children[0].children[0].title
            localStorage.setItem(`${thisMonth}event${i}`, `${marckedEvent}`)
        }

    })
}

function updatePage(){
    let i = 0
    monthDays.forEach(day =>{
        i++
        if(localStorage.getItem(`${thisMonth}day${i}`)){
            blockedDays.push(i)
        }
        if(localStorage.getItem(`${thisMonth}event${i}`)){
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
            let event = localStorage.getItem(`${thisMonth}event${i}`).slice(0, 5)
            let abreviation = event.concat('...')
            let eventText = document.createElement('p')
            eventText.innerHTML = `<abbr title= "${localStorage.getItem(`${thisMonth}event${i}`)}">${abreviation}</abbr>`
            eventText.className = 'eventText'
            day.appendChild(eventText)
        }
    })
}
updatePage()