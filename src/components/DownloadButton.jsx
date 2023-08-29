import React from 'react'
import { useSelector } from 'react-redux'
import style from './downloadButton.module.css'

function DownloadButton() {
    const plan = useSelector((state) => state.training.arr)
    const handleDownload = () => {
        let str = ''
        for (let i = 0; i < plan.length; i++) {
            str += plan[i].title + '-' + '4x15' + '\n'
        }
        const content = str
        const filename = 'Training Plan.txt'
        const element = document.createElement('a')
        const file = new Blob([content], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = filename
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div className={style.downloadButtonBlock}>
            <button onClick={handleDownload} className={style.btnDownload}>
                Download
            </button>
        </div>
    )
}

export default DownloadButton
