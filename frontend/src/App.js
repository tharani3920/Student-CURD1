import logo from './logo.svg';
import StudentForm from './Component/StudentForm';
import StudentTable from './Component/StudentTable';

function App() {
  return (
    <div>
      <StudentForm />
      <div style={{marginTop:'2rem',marginBottom:'2rem'}}>
        <StudentTable />
      </div>     
    </div>
  );
}

export default App;
