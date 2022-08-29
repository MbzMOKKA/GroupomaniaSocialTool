//Imports
//import { useState } from 'react';
import SignUp from '../../pages/SignUp';
//import { formatDate } from '../../utils/functions/misc';
import { useContext } from 'react';
import { TokenContext } from '../../utils/context/index';

//Preparation

//Component
function App() {
    const { token, updateToken } = useContext(TokenContext);

    return (
        <div>
            <SignUp />
            {token}
            -------------------
            {/*formatDate(today)*/}
        </div>
    );
}

//Exports
export default App;
