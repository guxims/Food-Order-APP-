import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() ==='';
const isFiveChars = value => value.trim().length ===5;

const CheckOut = props => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputValidity,setFormInputValidity]= useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const confirmHandler = (event) =>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid =  isFiveChars(enteredPostalCode);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        const formIsValid = enteredNameIsValid&& enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
   

        if (!formIsValid){
            return;
        }
        //submit
        props.onConfirm({//dërgimi i të dhënave prej checkout component, tek cart component
            name: enteredName,
            city: enteredCity,
            street: enteredStreet,
            postalCode:enteredPostalCode
        })
    }
    const nameControlClasses =`${classes.control} ${formInputValidity.name ? '' :classes.invalid}`
    const streetControlClasses =`${classes.control} ${formInputValidity.street ? '' :classes.invalid}`
    const cityControlClasses =`${classes.control} ${formInputValidity.city ? '' :classes.invalid}`
    const postalCodeControlClasses =`${classes.control} ${formInputValidity.postalCode ? '' :classes.invalid}`
    
    return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}></input>
            {!formInputValidity.name && <p>Please enter a valid name!</p>} 
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}></input>
            {!formInputValidity.street && <p>Please enter a valid street!</p>} 
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}></input>
            {!formInputValidity.postalCode && <p>Please enter a valid postalCode!</p>} 
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}></input>
            {!formInputValidity.city && <p>Please enter a valid city!</p>} 
        </div>
        <div className={classes.actions}>
        <button type='button' onClick={props.onCancle}>Cancle</button>
        <button className={classes.confirm}>Confirm</button>
        </div>
    </form>
    )
}
export default CheckOut;