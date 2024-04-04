import './App.css';
import './InputFields';
import ram from './ram_on_plane.png';
import InputFields from "./InputFields";

const App = () => (
    <div className="App">
        <header className="header">
            <h1>Jai Shri Ram Airlines</h1>
        </header>
        <main className="main">
            <InputFields/>
        </main>
        {/*<img srcSet={ram} alt={"ram on a ride"}/>*/}
    </div>
);

export default App;
