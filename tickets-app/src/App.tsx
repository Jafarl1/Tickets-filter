import React, { useState, useEffect } from "react";
import "./assets/style.css";
import { useSelector } from "react-redux";

function App() {
  const [filtered, setFiltered] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [filters, setFilters] = useState({});

  const ts: any = useSelector(state => state);

  useEffect(() => {
    setTickets(ts.tickets)
  }, [ts]);

  useEffect(() => {
    setFiltered(ts.tickets)
  }, [ts]);

  const [currency, setCurrency] = useState("rub");

  const Selected = (e: React.ChangeEvent<any>) => {
    if (e.target.id === "usd") {
      setCurrency("usd");
    } else if (e.target.id === "eur") {
      setCurrency("eur");
    } else {
      setCurrency("rub");
    }
  };

  
  const Checked = (a: React.ChangeEvent<any>) => {
    let newTickets: any[] = [];
    let newFilters: any = {
      ...filters,
      [a.target.id]: a.target.checked,
    };
    setFilters(newFilters);

    for (let k in newFilters) {
      if (newFilters[k] && k !== "all") {
        tickets.forEach((ticket) => {
          if (ticket.stops === Number(k)) {
            newTickets.push(ticket);
          }
        });
      }
    }

    if (newFilters.all || newTickets.length === 0) {
      setFiltered(tickets);
    } else {
      setFiltered(newTickets);
    }
  };

  return (
    <>
      <div className="main">
        <div className="logo">
          <i className="fa-solid fa-plane"></i>
        </div>
        <div className="content">
          <div className="filter">
            <h2>Валюта</h2>
            <div className="label-group">
              <input
                type="radio"
                name="currency"
                id="rub"
                defaultChecked
                onChange={(e) => Selected(e)}
              />
              <label htmlFor="rub" className="rub-label">
                {" "}
                RUB{" "}
              </label>
              <input
                type="radio"
                name="currency"
                id="usd"
                onChange={(e) => Selected(e)}
              />
              <label htmlFor="usd" className="usd-label">
                {" "}
                USD{" "}
              </label>
              <input
                type="radio"
                name="currency"
                id="eur"
                onChange={(e) => Selected(e)}
              />
              <label htmlFor="eur" className="eur-label">
                {" "}
                EUR
              </label>
            </div>
            <h2>Количество пересадок</h2>
            <div className="check-group">
              <label htmlFor="all">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  onChange={(a) => Checked(a)}
                />
                <span className="mark"></span>
                Все
              </label>
              <label htmlFor="0">
                <input
                  type="checkbox"
                  name="all"
                  id="0"
                  onChange={(a) => Checked(a)}
                />
                <span className="mark"></span>
                Без пересадок{" "}
              </label>
              <label htmlFor="1">
                <input
                  type="checkbox"
                  name="all"
                  id="1"
                  onChange={(a) => Checked(a)}
                />
                <span className="mark"></span>1 пересадка{" "}
              </label>
              <label htmlFor="2">
                <input
                  type="checkbox"
                  name="all"
                  id="2"
                  onChange={(a) => Checked(a)}
                />
                <span className="mark"></span>2 пересадка{" "}
              </label>
              <label htmlFor="3">
                <input
                  type="checkbox"
                  name="all"
                  id="3"
                  onChange={(a) => Checked(a)}
                />
                <span className="mark"></span>3 пересадка{" "}
              </label>
            </div>
          </div>
          <div className="tickets">
            {filtered.map((a, i) => (
              <div className="item" key={i}>
                <div className="airlines">
                  <div className="company">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0fqAPoDwiWcCwfHMBva1xUrHp_QEXoBMcki7sbYnS_w&s"
                      alt="Turkish Airlines"
                    />
                  </div>
                  <div className="buy-btn">
                    Купить <br />
                    за
                    <span className="price">
                      {currency === "usd"
                        ? `${a.price * 0.016} USD`
                        : currency === "eur"
                        ? `${a.price * 0.016} EUR`
                        : `${a.price} RUB`}
                    </span>
                  </div>
                </div>
                <div className="all-info">
                  <div className="flight-time">
                    <p className="dep-time">{a.departure_time}</p>
                    <div className="transfer">
                      {a.stops === 0
                        ? "Без пересадок"
                        : a.stops === 1
                        ? "1 пересадка"
                        : `${a.stops} пересадки`}
                      <i className="fa-solid fa-plane"></i>
                    </div>
                    <p className="arr-time">{a.arrival_time}</p>
                  </div>
                  <div className="flight-adress">
                    <div className="departure">
                      <p>
                        {a.origin}, {a.origin_name}
                      </p>
                      <span>9 kt t</span>
                    </div>
                    <div className="arrival">
                      <p>
                        {a.destination_name}, {a.destination}
                      </p>
                      <span>9 kt t</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
