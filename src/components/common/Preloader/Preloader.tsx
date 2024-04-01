import React from "react";
import preloader from "../../../assets/images/preloader_circles.svg";

type PropsType = {
}
// цветом можно управлять полем fill в svg <svg fill="#fff" width="140"...
let Preloader: React.FC<PropsType> = () => {
    return <div>
        <img src={preloader} alt={'preloader'}/>
    </div>
}

export default Preloader