import { useEffect, useState } from 'react';
import 'styles/typography.sass';
import 'pages/Rating/Rating.sass';
import api from 'utils/api.js'


function Rating() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const asyncFunction = async () => {

            const users = await api.fetch('/users');
            
            if (users?.length) {
                setUsers(users)
            }
        }

        asyncFunction()
    }, [])

  return (
    <div className="rating">
        <div className="rating__header text-header-3">
            Лучшие игроки
        </div>
        {users.length ? 
            <div className='rating__grid'>
                {users.map((user, index) => {
                    return [
                        <div key={`place_${index}`} className='rating__cell rating__cell--place text-overline'>{index + 1}</div>,
                        <div key={`name_${index}`}  className='rating__cell rating__cell--name text-overline'>{user.name}</div>,
                        <div key={`rank_${index}`}  className='rating__cell rating__cell--rating text-overline'>{user.rating}</div>
                    ]
                })}
            </div>
            :
            <div>
                Загрузка
            </div>
        }
    </div>
  );
}

export default Rating;
