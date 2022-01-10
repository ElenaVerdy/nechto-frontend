import { useEffect, useState } from 'react';
import 'components/EditGameResults.sass';
import { GAME_ROLES } from 'constants/index.js'


const roles = [GAME_ROLES.CIVILIAN, GAME_ROLES.INFECTED, GAME_ROLES.NECHTO];

const hasSingleNechto = (results) => {
    return results.filter(player => player.role === GAME_ROLES.NECHTO).length === 1
}

const isNechtoAlive = (results) => {
    return results.find(player => player.role === GAME_ROLES.NECHTO).isAlive
}

const hasAliveCivilians = (results) => {
    return !!results.find(player => player.role === GAME_ROLES.CIVILIAN && player.isAlive)
}


export default function EditGameResults({
    initialResults,
    onClickBack,
    onSubmitResults
}) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        setResults(initialResults)
    }, [initialResults])

    const toggleIsAlive = (userId) => {
        const player = results.find(player => player.user.id === userId);

        player.isAlive = !player.isAlive

        setResults(results.slice())
    }

    const changeRole = (userId) => {
        const player = results.find(player => player.user.id === userId);
        const roleIndex = roles.indexOf(player.role)

        player.role = roles[roleIndex === 2 ? 0 : roleIndex + 1]

        setResults(results.slice())
    }

    const areResultsValid = () => {
        if (!hasSingleNechto(results)) return false

        if (isNechtoAlive(results) && hasAliveCivilians(results)) return false

        if (!isNechtoAlive(results) && !hasAliveCivilians(results)) return false

        return true
    }


    return (
        <div className='edit-game-results__grid-wrapper'>
            <div className='edit-game-results__grid'>
                <div className='edit-game-results__cell edit-game-results__cell--name text-overline'>Имя</div>
                <div className='edit-game-results__cell edit-game-results__cell--role text-overline'>Роль</div>
                <div className='edit-game-results__cell edit-game-results__cell--death text-overline'>Выжил?</div>
                {results.map((player, index) => {
                    return [
                        <div key={`name_${index}`} className='edit-game-results__cell edit-game-results__cell--name text-overline'>{player.user.name}</div>,
                        <div
                            key={`role_${index}`} 
                            onClick={() => changeRole(player.user.id)}
                            className='edit-game-results__cell edit-game-results__cell--role text-overline'
                        >{player.role}</div>,
                        <input
                            key={`input_${index}`}
                            id={`input_${index}`}
                            className='edit-game-results__cell edit-game-results__cell--death'
                            type="checkbox"
                            value={index}
                            checked={player.isAlive}
                            onChange={() => toggleIsAlive(player.user.id)}
                        />
                    ]
                })}
            </div>

            <button
                className='edit-game-results__button button-primary-outlined'
                onClick={() => onClickBack()}
            >Назад</button>

            <button
                className='edit-game-results__button button-primary'
                disabled={!areResultsValid()}
                onClick={() => onSubmitResults(results)}
            >Сохранить</button>
        </div>
    )
}
