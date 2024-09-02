import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';
import { DropdownLoggedIn } from './DropdownLoggedIn';
import { DropdownLoggedOut } from './DropdownLoggedOut';
import { Loading } from './Loading';

export const HeaderDropdown = ({setDropdownVisible}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchUser(){
            const data = await getCurrentUser();
            setLoading(false);
            setUser(data);
        }
        fetchUser();
    }, []);
  return (
    <div>
        { loading? (
            <Loading/>
        ) : user ? (
            <DropdownLoggedIn 
                setDropdownVisible={setDropdownVisible} 
                currentUser={user}
            />
        ) : (
            <DropdownLoggedOut 
                setDropdownVisible={setDropdownVisible}
            />
        )}
    </div>
  )
}
