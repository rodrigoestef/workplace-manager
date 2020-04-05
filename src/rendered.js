const fs = require('fs')
const path = require('path')

const {dialog} = require('electron').remote.require('electron')

const bd = path.resolve('./util/bd.json')

const {projects} = JSON.parse(fs.readFileSync(bd,'utf8'))

// console.log(buffer)

function render(){
    document.querySelector('tbody').innerHTML=''
    projects.forEach((e,i) => {
        const row = document.createElement('tr')
        const index = document.createElement('th')
        index.innerText = i
        const name = document.createElement('td')
        name.innerText = e.name
        const del = document.createElement('td')
        del.innerHTML = '<img style="height:20px; width:20px;" src="./icon/Trash.png"/>'
        row.appendChild(index)
        row.appendChild(name)
        row.appendChild(del)
        document.querySelector('tbody').appendChild(row)
    })
    document.querySelectorAll('tr').forEach((e,i) =>{
        if(e.querySelector('img')){
    
            e.querySelector('img').addEventListener('click',()=>{
            
                    projects.splice(i-1,1)
                    fs.writeFileSync(bd,JSON.stringify({projects}))
                    render()
            })
    
        }
    })
}
render()



document.querySelector('button').onclick = () =>{
    const folder = dialog.showOpenDialogSync({properties:['openDirectory']})[0]
    projects.push({
        name:folder.split('\\').pop(),
        dir:folder
    })
    fs.writeFileSync(bd,JSON.stringify({projects}))
    render()
}


