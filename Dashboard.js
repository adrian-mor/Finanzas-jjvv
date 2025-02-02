import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "transactions"));
      setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Resumen Financiero</h2>
      {transactions.map((t) => (
        <div key={t.id}>
          <p>{t.tipo}: {t.categoria} - ${t.monto}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
