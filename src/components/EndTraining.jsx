import ReactDOM from 'react-dom'

export default function EndTraining({ totalWeight, closeModal }) {
    return ReactDOM.createPortal(
        <>
            <h1>Congratulations Training End</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px 0 0 0',
                }}
            >
                Your Total Weight {totalWeight} kg
            </div>

            <button
                onClick={closeModal}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px auto 0 auto',
                }}
            >
                Close Portal
            </button>
        </>,
        document.getElementById('newRoot')
    )
}
