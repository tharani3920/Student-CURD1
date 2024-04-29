import React from "react";
import { useRef, useState } from "react";
// import "./style.css";
function Curd() {
  const list = [
    {
      id: 1,
      name: "HP",
      Price: "2000",
    },
    {
      id: 1,
      name: "dell",
      Price: "2000",
    },
  ];
  const [lists, setList] = useState(list);
  const [updateState, setupdateState] = useState(-1);
  return (
    <div className="Curd">
      <div>
        <AddList setList={setList} />
        <form onSubmit={handleSubmit}>
          {" "}
          <table>
            {list.map((current) =>
              updateState === current.id ? (
                <EditList current={current} lists={lists} setList={setList} />
              ) : (
                <tr>
                  <td>{current.name}</td>
                  <td>{current.Price}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleSubmit(current.id)}
                    >
                      edit
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handledelte(current.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </table>
        </form>
      </div>
    </div>
  );
  function handleSubmit(id) {
    setupdateState(id);
  }
  function handledelte(id) {
    const newlist = lists.map((li) => li.id !== id);
    setList(newlist);
  }
  function handleSubmit(event) {
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const newlist = lists.map((li) =>
      li.id === updateState ? { ...li, name: name, price: price } : li
    );
    setList(newlist);
    setupdateState(-1);
  }
}

function EditList({ current, lists, setList }) {
  function handleInputname(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, name: value } : li
    );
    setList(newlist);
  }
  function handleInputprice(event) {
    const value = event.target.value;
    const newlist = lists.map((li) =>
      li.id === current.id ? { ...li, price: value } : li
    );
    setList(newlist);
  }
  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={{ handleInputname }}
          name="name"
          value={current.name}
        ></input>
      </td>
      <td>
        <input
          type="text"
          onChange={handleInputprice}
          name="price"
          value={current.price}
        ></input>
      </td>
      <td>
        <button type="submit">Update</button>
      </td>
    </tr>
  );
}
function AddList(setList) {
  const nameRef = useRef();
  const priceRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.Price.value;
    const newlist = {
      id: 3,
      name,
      price,
    };
    setList((prevList) => {
      return prevList.concat(newlist);
    });
    nameRef.current.value = " ";
    priceRef.current.value = " ";
  }

  return (
    <form className="addform" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="enter your name">
        {nameRef}
      </input>
      <input type="text" name="price" placeholder="enter your price">
        {priceRef}
      </input>
      <button type="submit">submit</button>
    </form>
  );
}
export default Curd;
