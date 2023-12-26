import Ingame from './pages/ingame'
import styled from 'styled-components'
import store from './redux-toolkit/store';
import { Provider } from 'react-redux';

const StyledIngame = styled(Ingame)`
  width:100%;
  height: 100%;

  background-color: #9caa84;
  text-align: center;  
`;

function App() {
  return (
    <Provider store={store}>
      <StyledIngame />
    </Provider>    
  );
}

export default App;
