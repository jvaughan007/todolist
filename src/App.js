import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import User from './components/sidebar/User';
import AddNewTodo from './components/sidebar/AddNewTodo';
import Calendar from './components/sidebar/Calendar';
import Projects from './components/sidebar/Projects';
import Main from './components/main/Main';
import Todos from './components/main/Todos';
import EditTodo from './components/main/EditTodo';


const App = () => {
  return (
    <div className="App">
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;
