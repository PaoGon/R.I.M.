import React, {FC} from "react";
import "./style.css";
import { CardInterface } from "./models";


const SIZES = ["card","card--main-nav","mobile--nav","card--logs","nav--bar"]


const Card: FC<CardInterface> = ({
    cardSize,       
    children
   

}) => {


    const checkCardSize = SIZES.includes(cardSize) ? cardSize : SIZES[0];

    return (
        <div className={`cardBox  ${checkCardSize}`}>
    
           {children}
        
            </div>
    );
} 


export default  Card;
