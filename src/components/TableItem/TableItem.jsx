import s from "./TableItem.module.scss";
import React, { useEffect } from "react";

export default function TableItem({ dataCards, setDataCards }) {
    useEffect(() => {
        let datas = JSON.parse(localStorage.getItem("data"));
        if (datas.length > 0) {
            setDataCards(datas);
        }
    }, []);

    useEffect(() => {
        let datas = JSON.parse(localStorage.getItem("data"));
    }, [dataCards]);

    return (
        <div className={s["table-wrapper"]}>
            <table className={s.table}>
                <thead>
                    <tr className={s.table__head}>
                        <th>NAME</th>
                        <th>CARD NUMBER</th>
                        <th>DATE EXPIRE</th>
                        <th>CODE</th>
                    </tr>
                </thead>
                <tbody className={s.table__body}>
                    {dataCards &&
                        dataCards.map(
                            (
                                {
                                    cardholder,
                                    cardnumber,
                                    cvc,
                                    mm_input,
                                    yy_input,
                                },
                                index
                            ) => {
                                return (
                                    <tr key={`${index}${cardholder}`}>
                                        <td>{cardholder}</td>
                                        <td>{cardnumber}</td>
                                        <td>{`${mm_input}/${yy_input}`}</td>
                                        <td>{`**${cvc[2]}`}</td>
                                    </tr>
                                );
                            }
                        )}
                </tbody>
            </table>
        </div>
    );
}
