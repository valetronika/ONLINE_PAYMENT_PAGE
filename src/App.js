import { useState } from "react";
import "./App.css";
import PaymentForm from "./components/PaymentForm/PaymentForm";
import TableItem from "./components/TableItem/TableItem";
import ImageItem from "./components/ImageItem/ImageItem";

function App() {
    let datas = JSON.parse(localStorage.getItem("data"));
    const [dataCards, setDataCards] = useState(datas && datas.length>0? datas:[]);


    return (
        <div className="main-container">
            <a href="https://github.com/valetronika/ONLINE_PAYMENT_PAGE" className="link_git">{`github<<< `}</a>
            <div className="main-container__pay">
                <PaymentForm dataCards={dataCards} setDataCards={setDataCards} />
                <ImageItem/>
            </div>
            <TableItem dataCards={dataCards} setDataCards={setDataCards}/>
        </div>
    );
}

export default App;
