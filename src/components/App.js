import "../styles/App.scss";
import { useState, useEffect } from "react";
import getAdalabers from "../services/api";

function App() {
  const [adalabers, setAdalabers] = useState([]);
  //aqui guardo el value
  const [search, setSearch] = useState("");
  const [filterCounselor, setfilterCounselor] = useState("All");
  const [newAdalaber, setNewAdalaber] = useState({
    name: "",
    counselor: "",
    speciality: "",
  });

  useEffect(() => {
    getAdalabers().then(data => {
      setAdalabers(data.results);
    });
  }, []);

  const handleAddNewAdalaber = (eve) => {
    setNewAdalaber({
      ...newAdalaber,
      [eve.currentTarget.id]: eve.currentTarget.value,
    });
  };

  const handleChangeCounselor = (eve) => {
    setfilterCounselor(eve.currentTarget.value);
  };

  const handleClick = (eve) => {
    eve.preventDefault();
    newAdalaber.id = adalabers.length;
    setAdalabers([...adalabers, newAdalaber]);
    setNewAdalaber({
      name: "",
      counselor: "",
      speciality: "",
    });
  };
 
  const isDisabled= newAdalaber === "";

  const handleSearchAdalaber = (eve) => {
    const current = eve.currentTarget.value;
    setSearch(current);
  };

  const renderListAdalabers = adalabers
    .filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (eachAdalaber) =>
        filterCounselor === "All" || filterCounselor === eachAdalaber.counselor
    )
    .map((student, index) => {
      return (
        <tr key={index} id={student.id}>
          <td>{student.name}</td>
          <td>{student.counselor}</td>
          <td>{student.speciality}</td>
          <th>
            <ul>{student.social_networks.map(item => {
            return (
              <li><a href={item.url}>{item.name}</a></li>
            )
          })}</ul></th>
        </tr>
      );
    });

  return (
    <>
      <header>
        <h1 className="title">Adalabers</h1>
      </header>
      <main>
        <form className="form">
          <label htmlFor="search" className="form__label">
            Nombre:
          </label>
          <input
            className="form__input"
            autoComplete="off"
            type="text"
            name="search"
            placeholder="filtrar alumna"
            onChange={handleSearchAdalaber}
          />
          <label htmlFor="counselor">Escoje una Tutora</label>
          <select
            name="counselor"
            id="counselor"
            onChange={handleChangeCounselor}
            value={filterCounselor}
          >
            <option value="All">Cualquiera</option>
            <option Value="Yanelis">Yanelis</option>
            <option value="Dayana">Dayana</option>
            <option value="Iván">Ivan</option>
          </select>
        </form>
        <table className="table" cellPadding="2">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
              <th>Redes Sociales</th>
            </tr>
          </thead>
          <tbody>{renderListAdalabers}</tbody>
        </table>

        <form className="add-form">
          <h2 className="add-form__h2">Añadir una Adalaber</h2>
          <label htmlFor="name" className="add-form__label">
            Nombre
          </label>
          <input
            className="add-form__input"
            type="text"
            name="name"
            id="name"
            placeholder="nombre"
            value={newAdalaber.name}
            onChange={handleAddNewAdalaber}
          />
          <label htmlFor="counselor" className="add-form__label">
            Tutora
          </label>
          <input
            className="add-form__input"
            type="text"
            name="counselor"
            id="counselor"
            placeholder="Tutora"
            value={newAdalaber.counselor}
            onChange={handleAddNewAdalaber}
          />
          <label htmlFor="speciality" className="add-form__label">
            Especialidad
          </label>
          <input
            className="add-form__input"
            type="text"
            name="speciality"
            id="speciality"
            placeholder="especialidad"
            value={newAdalaber.speciality}
            onChange={handleAddNewAdalaber}
          />
          <input
            className="add-form__btn"
            type="submit"
            value="Añadir una nueva Adalaber"
            onClick={handleClick}
            disabled={isDisabled}
          />
        </form>
      </main>
    </>
  );
}

export default App;
