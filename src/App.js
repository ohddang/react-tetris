import Ingame from './pages/ingame'
import styled from 'styled-components'

const StyledIngame = styled(Ingame)`
  width:100%;
  height: 100%;

  background-color: #9caa84;
  text-align: center;  
`;

function App() {
  return (
    <StyledIngame />
  );
}

export default App;
