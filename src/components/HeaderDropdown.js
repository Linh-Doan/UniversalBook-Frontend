import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';
import { DropdownLoggedIn } from './DropdownLoggedIn';
import { DropdownLoggedOut } from './DropdownLoggedOut';

export const HeaderDropdown = ({setDropdownVisible}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchUser(){
            const data = await getCurrentUser();
            setUser(data);
        }
        fetchUser();
    }, [])
  return (
    <div>
        {user ? <DropdownLoggedIn setDropdownVisible={setDropdownVisible} currentUser={user}/> : <DropdownLoggedOut setDropdownVisible={setDropdownVisible} /> }
    </div>
  )
}
