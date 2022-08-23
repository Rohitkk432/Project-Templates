import './App.css';
import Loginpage from './components/Loginpage';

//React-router
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

//graphql Apollo client imports 
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
    uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Loginpage/>} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
