import { observer } from 'mobx-react-lite';
import './App.css';
import { AuthPage } from './pages/AuthPage/authPage';
import { ChatPage } from './pages/Chat/chat';
import { myStore } from './store/store';

const App = observer(() => {
  if (!myStore.activeUserLogin) 
    return <AuthPage />
  else 
    return <ChatPage />
})

export default App;
