import "../styles/App.scss";
import { useState, useEffect } from "react";
import getAdalabers from "../services/api";

function App() {
  const [adalabers, setAdalabers] = useState([]);
  //aqui guardo el value
  const [search, setSearch] = useState("");
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
    setAdalabers([...adalabers, newAdalaber]);
    setNewAdalaber({
      name: "",
      counselor: "",
      speciality: "",
    });
  };

  const handleSearchAdalaber = (eve) => {
    const currentValue = eve.currentTarget.value;
    setSearch(currentValue);
  };

  const renderListAdalabers = adalabers.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((student,index) => {
    return (
      <tr key={index}>
        <td>{student.name}</td>
        <td>{student.counselor}</td>
        <td>{student.speciality}</td>
      </tr>
    );
  }
  );

  return (
    <>
      <header>
        <h1 className="title">Adalabers</h1>
      </header>
      <main>
        <form className="form">
          <label htmlFor="search" className="form__label">Nombre:</label>
          <input
          className="form__input"
          autoComplete="off"
            type="text"
            name="search"
            placeholder="filtrar alumna"
            onChange={handleSearchAdalaber}
          />
        </form>
        <table  className="table" cellPadding="2">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>{renderListAdalabers}</tbody>
        </table>

        <form className="add-form">
          <h2 className="add-form__h2">Añadir una Adalaber</h2>
          <label htmlFor="name" className="add-form__label">Nombre</label>
          <input
          className="add-form__input"
            type="text"
            name="name"
            id="name"
            placeholder="nombre"
            value={adalabers.name}
            onChange={handleAddNewAdalaber}
          />
          <label htmlFor="counselor" className="add-form__label">Tutora</label>
          <input
          className="add-form__input"
            type="text"
            name="counselor"
            id="counselor"
            placeholder="Tutora"
            value={adalabers.counselor}
            onChange={handleAddNewAdalaber}
          />
          <label htmlFor="speciality" className="add-form__label">Especialidad</label>
          <input
          className="add-form__input"
            type="text"
            name="speciality"
            id="speciality"
            placeholder="especialidad"
            value={adalabers.speciality}
            onChange={handleAddNewAdalaber}
          />
          <input
          className="add-form__btn"
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
