import { useEffect, useState } from 'react';
import 'styles/typography.sass';
import 'pages/NewGame/NewGame.sass';
import EditTeam from 'components/EditTeam.js'
import EditGameResults from 'components/EditGameResults.js'
import { GAME_ROLES } from 'constants/index.js'
import api from 'utils/api.js'
import { useNavigate } from "react-router-dom";

const generateGameResults = (users) => {
    return users.map((user, index) => {
        return {
            user,
            role: index ? GAME_ROLES.CIVILIAN : GAME_ROLES.NECHTO,
            isAlive: true
        }
    })
}


function NewGame() {
    const navigate = useNavigate();
    const [isSubmitPending, setIsSubmitPending] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [gameResults, setGameResults] = useState([])
    const [areUsersSelected, setAreUsersSelected] = useState(false)

    useEffect(() => {
        const asyncFunction = async () => {
            const fetchedUsers = await api.fetch('/users');
            
            if (fetchedUsers?.length) {
                setUsers(fetchedUsers)
            }
        }

        asyncFunction()
    }, [])

    useEffect(() => {
        setGameResults(generateGameResults(selectedUsers.map(id => users.find(user => user.id === id))))
    }, [selectedUsers, users])

    const submitResults = async (results) => {
        if (isSubmitPending) {
            return
        }
    
        try {
            // setIsSubmitPending(true)
    
            await api.post('/new-game', results)
    
            // navigate('/')
        } catch (err) {
            setIsSubmitPending(false)
        }
    }


    return (
        <div className="new-game">
            <div className="new-game__header text-header-3">
                {areUsersSelected ? 'Укажите результаты игры' : 'Выберите игроков'}
            </div>

            {!areUsersSelected && users.length &&
                <EditTeam
                    users={users}
                    initialSelectedUsers={selectedUsers}
                    onSubmitUsers={(newUsersList) => {
                        setSelectedUsers(newUsersList)
                        setAreUsersSelected(true)
                    }}
                />
            }

            {!areUsersSelected && !users.length &&
                <div>
                    Загрузка
                </div>
            }

            {
                areUsersSelected &&
                <EditGameResults
                    onClickBack={() => setAreUsersSelected(false)}
                    initialResults={gameResults}
                    isSubmitPending={isSubmitPending}
                    onSubmitResults={submitResults}
                />
            }
        </div>
    );
}

export default NewGame;
