import "../styles/App.css";
import { useState, useEffect } from "react";
import getAdalabers from "../services/api";

function App() {
  const [adalabers, setAdalabers] = useState([]);
  //aqui guardo el value
  //const [search, setSearch] = useState("");
  const [newAdalaber, setNewAdalaber] = useState({
    name: "",
    counselor: "",
    speciality: "",
  });

  useEffect(() => {
    getAdalabers().then((data) => {
      setAdalabers(data.results);
    });
  }, []);

  const handleAddNewAdalaber = (eve) => {
    setNewAdalaber({
      ...newAdalaber,
      [eve.currentTarget.id]: eve.currentTarget.value,
    });
  };

  const handleClick = (eve) => {
    eve.preventDefault();
    setAdalabers([...adalabers,newAdalaber]);
    setNewAdalaber({
    name: "",
    counselor: "",
    speciality: "",
    })
  };

  /*const handleValue = (eve) => {
    const currentValue = eve.currentTarget.value;
    setSearch(currentValue);
  };*/

  const renderListAdalabers = () => {
    return adalabers.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.name}</td>
          <td>{student.counselor}</td>
          <td>{student.speciality}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <header>
        <h1>Adalabers</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>{renderListAdalabers()}</tbody>
        </table>

        <form>
          <h2>Añadir una Adalaber</h2>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="nombre"
            value={adalabers.name}
            onChange={handleAddNewAdalaber}
          />
          <label htmlFor="counselor">Tutora</label>
          <input
            type="text"
            name="counselor"
            id="counselor"
            placeholder="Tutora"
            value={adalabers.counselor}
            onChange={handleAddNewAdalaber}
          />
          <label htmlFor="speciality">Especialidad</label>
          <input
            type="text"
            name="speciality"
            id="speciality"
            placeholder="especialidad"
            value={adalabers.speciality}
            onChange={handleAddNewAdalaber}
          />
          <input
            type="submit"
            value="Añadir una nueva Adalaber"
            onClick={handleClick}
          />
        </form>
      </main>
    </>
  );
}

export default App;
