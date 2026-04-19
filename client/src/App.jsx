
import './App.css'
import Body from './Body'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'

import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Connections from './components/Connections'
import Requests from './components/Requests';
import Chat from './components/Chat';


function App() {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body />}> 

              {/* <Route index element={<Feed />} /> */}
              <Route path='/feed' element={<Feed />} />
               <Route path='/login' element={<Login />} />
              <Route path='profile' element={<Profile />} />
              <Route path='/connections' element={ <Connections></Connections>}></Route>
               <Route path='/requests' element={<Requests></Requests>}></Route>
               <Route path='/chat/:targetUserId' element={<Chat></Chat>}></Route>
            </Route>
           
          </Routes>
        </BrowserRouter>
        <Toaster position='top-center' />
      </Provider>
    </div>
  )
}

export default App 
