import { useEffect, useState } from 'react';
import 'components/EditTeam.sass';

export default function EditTeam({
    users,
    initialSelectedUsers,
    onSubmitUsers
}) {
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        setSelectedUsers(initialSelectedUsers)
    }, [initialSelectedUsers])

    const toggleIsSelected = (userId) => {
        const selectedIndex = selectedUsers.indexOf(userId)

        if (selectedIndex === -1) {
            selectedUsers.push(userId)
        } else {
            selectedUsers.splice(selectedIndex, 1)
        }
        

        setSelectedUsers(selectedUsers.slice())
    }

    return (
        <div className='edit-team__grid-wrapper'>
        <div className='edit-team__grid'>
            {users.map((user, index) => {
                return [
                    <input
                        key={`input_${index}`}
                        id={`input_${index}`}
                        type="checkbox"
                        value={index}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleIsSelected(user.id)}
                    />,
                    <label htmlFor={`input_${index}`} key={`name_${index}`}  className='rating__cell rating__cell--name text-overline'>{user.name}</label>
                ]
            })}
        </div>

        <button
            className='edit-team__button button-primary'
            disabled={selectedUsers.length < 4}
            onClick={() => onSubmitUsers(selectedUsers)}
        >Далее</button>
        </div>
    )
}
