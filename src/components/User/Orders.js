/* eslint-disable max-len */
import './user.scss';
import 'src/components/User/orders.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import OrderHistory from './OrderHistory';
import Loading from '../Loading/Loading';

function Orders() {
  const { data } = useSelector((state) => state.user.orderHistory);
  const { isLoadingOrderHistory } = useSelector((state) => state.user);
  const currentDate = new Date().toJSON().slice(0, 10);
  function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);
    return date;
  }
  const starterDate = subtractMonths(1).toJSON().slice(0, 10);
  const [startDate, setStartDate] = useState(starterDate);
  const [endDate, setEndDate] = useState(currentDate);

  const result = [];
  const startDateForFilter = new Date(startDate);
  const endDateForFilter = new Date(endDate);
  data.forEach((dataObject) => {
    const [day, month, year] = dataObject.dateOrder.slice(0, 10).split('-');
    const date = new Date(+year, +month - 1, +day);
    if (date >= startDateForFilter && date <= endDateForFilter) {
      result.push(dataObject);
    }
  });
  if (isLoadingOrderHistory) {
    return (
      <Loading />
    );
  }
  return (
    <div className="orderHistory-container">
      <div className="orderHistory-title">
        <p>
          Historique des commandes
        </p>
        <div className="filter-container">
          <h3 className="filter-container-title">Choisir ses dates:</h3>
          <div className="filter-container-input">
            <label htmlFor="start">Date de début &nbsp;
              <input
                className="input-date"
                type="date"
                id="start"
                value={startDate}
                min="2022-01-01"
                max={currentDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label htmlFor="end">Date de fin &nbsp;
              <input
                className="input-date"
                type="date"
                id="end"
                name="trip-end"
                value={endDate}
                min={startDate}
                max={currentDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>

        </div>
      </div>
      <div className="orderHistory">

        {result.length === 0 && (
          <p className="order-empty">Tu n'as pas encore commandé !</p>
        )}
        {result.length > 0 && (
          result.map((order) => (
            <OrderHistory
              order={order}
              key={order.id}
            />
          )))}
      </div>
    </div>
  );
}

export default Orders;
