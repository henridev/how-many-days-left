import React, { useState } from "react";
import "./styles.css";
const today = new Date();

export default function App() {
  const [state, setState] = useState({
    day: 16,
    month: 7,
    year: 1997,
    toLive: 80
  });

  const [months, setMonths] = useState({
    totalMonths: test(
      new Date(state.year, state.month, state.day), // November 4th, 2008
      new Date(state.year + state.toLive, state.month, state.day)
    ),
    monthsSpent: test(
      new Date(state.year, state.month, state.day), // November 4th, 2008
      new Date(today.getFullYear(), today.getMonth(), today.getDay()) // March 12th, 2010
    )
  });

  function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  function test(d1, d2) {
    var diff = monthDiff(d1, d2);
    console.log(
      d1.toISOString().substring(0, 10),
      "to",
      d2.toISOString().substring(0, 10),
      ":",
      diff
    );
    return diff;
  }

  const totalMonths = test(
    new Date(1997, 7, 16), // November 4th, 2008
    new Date(2077, 7, 16) // March 12th, 2010
  );
  const monthsSpent = test(
    new Date(1997, 7, 16), // November 4th, 2008
    new Date(today.getFullYear(), today.getMonth(), today.getDay()) // March 12th, 2010
  );
  const monthsToLive = totalMonths - monthsSpent;

  function handleChange(e) {
    const value = Number(e.target.value);
    const name = e.target.name;
    setState({ ...state, [name]: value });
    console.log(state);
  }

  console.log(monthsToLive);

  return (
    <div>
      <div className="inputs">
        <h2>enter birthday here </h2>
        <div className="inputs">
          <div>
            <label>day: </label>
            <input
              placeholder="day"
              type="number"
              name="day"
              value={state.day}
              onChange={handleChange}
            />
            <div />
            <div>
              <label>month: </label>
              <input
                placeholder="month"
                type="number"
                name="month"
                value={state.month}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>year: </label>
              <input
                placeholder="year"
                type="number"
                name="year"
                value={state.year}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>i will become years old: </label>
              <input
                placeholder="years old"
                type="number"
                name="toLive"
                value={state.toLive}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={e => {
                setMonths({
                  totalMonths: test(
                    new Date(state.year, state.month, state.day),
                    new Date(state.year + state.toLive, state.month, state.day)
                  ),
                  monthsSpent: test(
                    new Date(state.year, state.month, state.day),
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDay()
                    )
                  )
                });
              }}
            >
              show what's left
            </button>
          </div>
        </div>
      </div>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {range(1, months.totalMonths).map((el, i) => (
          <div
            key={i}
            className={i > months.monthsSpent ? "box alive" : "box dead"}
          >
            {i > months.monthsSpent ? "todo" : "done"}
          </div>
        ))}
      </div>
    </div>
  );
}
