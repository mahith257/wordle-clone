import './Modal.css'

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>Congrats!</h1>
                <p className='solution'>{solution}</p>
                <p>No of turns taken: {turn}</p>
            </div>
        )}

        {!isCorrect && (
            <div>
                <h1>Unlucky!</h1>
                <p className='solution'>{solution}</p>
                <p>Better luck next time</p>
            </div>
        )}
    </div>
  );
}
