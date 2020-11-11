import '@babel/polyfill'
import { app, BrowserWindow } from 'electron'
import { promisify } from 'util'
import * as path from 'path'
import * as url from 'url'
import * as fs from 'fs'

const writeFile = promisify(fs.writeFile)

let mainWindow: Electron.BrowserWindow | null

const pdfOptions: Electron.PrintToPDFOptions = {
    marginsType: 0,
    pageSize: 'A4',
    printBackground: true,
    printSelectionOnly: false,
    landscape: false
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
            nodeIntegration: true,
        },
    })

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:4000`)
    } else {
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, '../../index.html'),
                protocol: 'file:',
                slashes: true
            })
        )
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.webContents.on('did-finish-load', async () => {
        const buffer = await mainWindow.webContents.printToPDF(pdfOptions)
        await writeFile(path.join(__dirname, '../../output/out.pdf'), buffer)
    })

}

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
