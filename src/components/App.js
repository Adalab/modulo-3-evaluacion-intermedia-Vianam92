import "../styles/App.css";
import { useState, useEffect } from "react";
import getAdalabers from "../services/api";

function App() {
  const [adalabers, setAdalabers] = useState([]);

  useEffect(() => {
    getAdalabers().then((data) => {
      setAdalabers(data.results);
      console.log(data.results);
    });
  }, []);

  const renderListAdalabers = () => {
    return adalabers.map((student) => {
      return (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{student.name}</td>
              <td>{student.counselor}</td>
              <td>{student.speciality}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  };

  return (
    <>
      <header>
        <h1>Adalabers</h1>
      </header>
      <main>{renderListAdalabers()}</main>
    </>
  );
}

export default App;
