let monthCards = document.querySelectorAll('.monthCard')
let tools = document.querySelectorAll('.headerTool')
let selBtn = document.querySelector('#selTool')
let achiBtn = document.querySelector('#achiTool')
let blockBtn = document.querySelector('#blockTool')

selBtn.addEventListener('click', select)
achiBtn.addEventListener('click', achievement)
blockBtn.addEventListener('click', block)

function select(ev){
    let btn = ev.currentTarget
    if(btn.classList.contains('actTool')){
        btn.classList.remove('actTool')
        monthCards.forEach(function(month){
            month.dataset.tool = 'nothing'
        })
    }else{
        tools.forEach(function(tool){
            tool.classList.remove('actTool')
        })
        btn.classList.add('actTool')
        monthCards.forEach(function(month){
            month.dataset.tool = 'selectTool'
        })
    }
    useTool()
}

function achievement(ev){
    let btn = ev.currentTarget
    if(btn.classList.contains('actTool')){
        btn.classList.remove('actTool')
        monthCards.forEach(function(month){
            month.dataset.tool = 'nothing'
        })
    }else{
        tools.forEach(function(tool){
            tool.classList.remove('actTool')
        })
        btn.classList.add('actTool')
        monthCards.forEach(function(month){
            month.dataset.tool = 'achievementTool'
        })
    }
    useTool()
}

function block(ev){
    let btn = ev.currentTarget
    if(btn.classList.contains('actTool')){
        btn.classList.remove('actTool')
        monthCards.forEach(function(month){
            month.dataset.tool = 'nothing'
        })
    }else{
        tools.forEach(function(tool){
            tool.classList.remove('actTool')
        })
        btn.classList.add('actTool')
        monthCards.forEach(function(month){
            month.dataset.tool = 'blockTool'
        })
    }
    useTool()
}

function useTool(){
    monthCards.forEach(function(monthCard){

        monthCard.removeEventListener('click', redirect)
        monthCard.removeEventListener('click', showAchievs)
        monthCard.removeEventListener('click', blockMonth)

        if(monthCard.dataset.tool === 'selectTool'){
            monthCard.addEventListener('click', redirect)
        }else if(monthCard.dataset.tool === 'achivementTool'){
            monthCard.addEventListener('click', showAchievs)
        }else if(monthCard.dataset.tool === 'blockTool'){
            monthCard.addEventListener('click', blockMonth)
        }
    })
}

function redirect(ev){
    let month = ev.currentTarget
    let id = month.id
    window.location.href = `month/${id}/${id}.html`
}

function showAchievs(ev){
    alert('Função em construção !!!')
}

function blockMonth(ev){
    alert('Função em construção')
    // let month = ev.currentTarget

    // if (month.classList.contains('block')){
    //     month.classList.remove('block')
    //     month.children[0].classList.remove('block')
    // }else{
    //     month.classList.add('block')
    //     month.children[0].classList.add('block')
    // }
}