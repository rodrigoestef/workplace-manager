const fs = require('fs')
const path = require('path')
const {app, BrowserWindow,Tray,Menu} = require('electron')
const {exec} = require('child_process')

const bd = path.resolve('./util/bd.json')


function main() {
    const win = new BrowserWindow({
        width:600,
        height:400,
        show:false,
        icon:path.resolve('./src/icon/app.png'),
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.setMenu(null)
    win.loadFile(path.resolve('./src/index.html'))

    var tray = new Tray('./src/icon/app.png');

    tray.on('double-click',()=>{
        win.show()
    })

    var {projects} = JSON.parse(fs.readFileSync(bd,'utf8'))
    var menu = []
    projects.forEach(e => {
        menu.push({label:e.name,click:()=>exec(`code ${e.dir}`,()=>{})})
    })
    menu.push({label:'sair',click:()=>{app.exit()}})
    tray.setContextMenu(Menu.buildFromTemplate(menu))
    
    win.on('close',e=>{
        e.preventDefault()
        var {projects} = JSON.parse(fs.readFileSync(bd,'utf8'))
        menu = []
        projects.forEach(e => {
            menu.push({label:e.name,click:()=>exec(`code ${e.dir}`,()=>{})})
        })
        menu.push({label:'sair',click:()=>{app.exit()}})
        tray.setContextMenu(Menu.buildFromTemplate(menu))
        win.hide()
    })
}

app.on('window-all-closed',()=>{})

app.whenReady().then(main)