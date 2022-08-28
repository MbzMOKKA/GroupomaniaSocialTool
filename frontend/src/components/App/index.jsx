//Imports
import { useState } from 'react';
import SignUp from '../../pages/SignUp';
import { formatDate } from '../../utils/functions/misc';

//Preparation

//Component
function App() {
    const [token, setToken] = useState(null);
    const [today, setToday] = useState(null);

    return (
        <div>
            <SignUp setToken={setToken} setToday={setToday} />
            {token}
            -------------------
            {formatDate(today)}
        </div>
    );
}

//Exports
export default App;
