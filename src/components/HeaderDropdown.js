import { DropdownLoggedIn } from './DropdownLoggedIn';
import { DropdownLoggedOut } from './DropdownLoggedOut';
import { Loading } from './Loading';
import { useUser } from '../hooks/useUser';

export const HeaderDropdown = ({setDropdownVisible}) => {
    const {isLoading, user} = useUser();
  return (
    <div>
        { isLoading? (
            <Loading height="200px"/>
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
