//Imports
import { useState } from 'react';
import SignUp from '../../pages/SignUp';

//Preparation

//Component
function App() {
    const [token, setToken] = useState(null);
    return (
        <div>
            <SignUp setToken={setToken} />
            {token}
        </div>
    );
}

//Exports
export default App;
