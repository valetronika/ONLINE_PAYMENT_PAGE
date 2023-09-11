import React, { useEffect, useState } from "react";
import { useForm ,setError} from "react-hook-form";
import s from "./PaymentForm.module.scss";
import linie from "../../assets/linie.svg";
import visa_mastercard from "../../assets/vizza_large (1) 1.png";
import mastercard from "../../assets/mastercard.svg";
import visa from "../../assets/visa.svg";

export default function PaymentForm({ setDataCards, dataCards }) {
    let {
        register,
        handleSubmit,
        reset,
        getValues,
        setError,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [indexImage, setIndexImage] = useState(0);
    const images = [visa_mastercard, visa, mastercard];

    // -------------разбивка value по 4 цифры----------------
    // const [cardNumber, setCardNumber] = useState('');


    //-------------------------

    const refreshLocalStorage = (dataCards) => {
        localStorage.setItem("data", JSON.stringify(dataCards));
    };
    useEffect(() => {
        refreshLocalStorage(dataCards);
    }, [dataCards]);   
    


    // --------------------
    const handleClick = (data) => {

        setDataCards((prevDataCards) => {
            if (Array.isArray(prevDataCards)) {
                return [...prevDataCards, data];
            } else {
                return [data];
            }
        });
        reset()
    };
 
    // ----------------------------

    return (
        <form className={s.form_wrapper} onSubmit={handleSubmit(data=>{
            handleClick(data);
        })}>
            <div className={s.cards}>
                <div className={s.front_side}>
                    <div className={s.front_side__inputs}>
                        {/* -----------------cardholder----------------- */}

                        <label className={s.label}>
                            <input
                                type="text"
                                placeholder="Holder of card"
                                {...register("cardholder", {
                                    required: "Invalid name",
                                    pattern: {
                                        value: /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/,
                                        message: "Invalid name",
                                    },
                                })}
                            />
                            {errors.cardholder && (
                                <p className={s.error}>
                                    {errors.cardholder.message}
                                </p>
                            )}
                        </label>
                        {/* -----------------cardnumber----------------- */}
                        <label className={s.label}>
                            <input
                                
                                type="text"
                                placeholder="Number of card"
                                {...register("cardnumber", {
                                    required: "Invalid card number",
                                    pattern: {
                                        value: /^\d{16}$/,
                                        message: "Invalid card number",
                                    },
                                    validate:(value)=>{
                                        if(+value[0]===5){
                                            setIndexImage(2);
                                        } else if ( +value[0]===4){
                                            setIndexImage(1);
                                        }else setIndexImage(0);
                                    }
                                })}
                                maxLength="16"
                            />
                            {errors.cardnumber && (
                                <p className={s.error}>
                                    {errors.cardnumber.message}
                                </p>
                            )}
                        </label>
                    </div>
                    <p>VALID THRU</p>
                    {/* ---------------------------------front_side__down----------------------------- */}
                    <div className={s.front_side__down}>
                        <div>
                            {/* ------------------------month_input------------------------- */}
                            <label className={s.label}>
                                <input
                                    type="text"
                                    placeholder="MM"
                                    className={s.conf_info}
                                    {...register("mm_input", {
                                        required: "Invalid",
                                        pattern: {
                                            value: /^\d{2}$/,
                                            message: "Invalid",
                                        },
                                        validate:(value)=>{
                                            if(parseInt(value)>12){
                                                return "Invalid"
                                            }else {
                                                return true
                                            }
                                            
                                        }
                                    })}
                                    maxLength="2"
                                />
                                {errors.mm_input && (
                                    <p className={s.error}>
                                        {errors.mm_input.message}
                                    </p>
                                )}
                            </label>
                        </div>
                        <img src={linie} alt="linie" />
                        {/* --------------------------------year_input------------------------ */}
                        <div>
                            <label className={s.label}>
                                <input

                                    type="text"
                                    placeholder="YYYY"
                                    className={s.conf_info}
                                    {...register("yy_input", {
                                        required: "Invalid",
                                        pattern: {
                                            value: /^\d{2}$/,
                                            message: "*цифры",
                                        },
                                        validate:(value)=>{
                                            let date_now = new Date().toLocaleDateString();
                                            let current_year = parseInt(date_now.split(".")[2]);
                                            if(parseInt(value)<current_year%100){
                                                return "Invalid"
                                            }else {
                                                return true
                                            }
                                            
                                        }
                                    })}
                                    maxLength="2"
                                />
                                {errors.yy_input && (
                                    <p className={s.error}>
                                        {errors.yy_input.message}
                                    </p>
                                )}
                            </label>
                        </div>
                        {/* -----------------------------платежная система картинка --------------- */}
                        <div className={s.front_side__img}>
                            <img
                                src={images[indexImage]}
                                alt="visa_mastercard"
                            />
                        </div>
                    </div>
                </div>
                {/* -----------------------------back_side---------------------------------- */}
                <div className={s.back_side_container}>
                    <div></div>
                    <label className={s.label}>
                        <input
                            type="password"
                            placeholder="CVC"
                            className={s.conf_info}
                            {...register("cvc", {
                                required: "Invalid",
                                minLength: {
                                    value: 3,
                                    message: "Invalid",
                                },
                                pattern: {
                                    value: /^\d{3}$/,
                                    message: "*цифры",
                                },
                            })}
                            maxLength="3"
                        />
                        {errors.cvc && (
                            <p className={s.error}>{errors.cvc.message}</p>
                        )}
                    </label>
                </div>
            </div>
            <div className={s.btn}>
                <input type="submit" className={s.btn__submit} />
            </div>
        </form>
    );
}
