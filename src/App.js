import './App.css';
import SignUp from './screens/signup/SignUp';
import Address from './screens/address-set-up/Address';
import Account from './screens/account-set-up/Account'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div >
<Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/address" element={<Address />} />
        
        <Route path='/account' element={<Account/>} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* Other routes */}
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
