import { useEffect, useState } from 'react';
import './App.css';
import { TaskCreator } from './Components/TaskCreator';
import { TaskTable } from './Components/TaskTable';
import { VisibilityControl } from './Components/VisibilityControl';
import { Container } from './Components/container';

function App() {
  const [ taskItems, setTaskItem ] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false)

  function createNewTask(taskName) {
    if(!taskItems.find(task => task.name === taskName)) {
      setTaskItem([...taskItems, {name: taskName, done: false}])
    }
  }

  const toggleTask = task => {
    setTaskItem(
      taskItems.map(t => (t.name === task.name) ? {...t, done: !t.done} : t)
    );
  }

  useEffect(() => {
    let data = localStorage.getItem('task')
    if(data) {
      setTaskItem(JSON.parse(data))
    }
  }, []);

  const cleanTasks = () => {
    setTaskItem(taskItems.filter(task => !task.done))
    setShowCompleted(false)
  }

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskItems))
  }, [ taskItems ])


  return (
    <main className='bg-dark vh-100 text-white'>
      <Container>
        <TaskCreator createNewTask={createNewTask}/>
        <TaskTable tasks={taskItems} toggleTask={toggleTask}/>
  
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
  
        {
          showCompleted && (
            <TaskTable tasks={taskItems} toggleTask={toggleTask} showCompleted={showCompleted}/>
          )
        }
      </Container>
    </main>
  );
}

export default App;
