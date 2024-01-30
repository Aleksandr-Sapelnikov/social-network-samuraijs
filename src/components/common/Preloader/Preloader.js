import React from "react";
import preloader from "../../../assets/images/preloader_circles.svg";


// цветом можно управлять полем fill в svg <svg fill="#fff" width="140"...
let Preloader = (props) => {
    return <div>
        <img src={preloader} alt={'preloader'}/>
    </div>
}

export default Preloader