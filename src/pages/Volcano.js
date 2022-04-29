import { useNavigate } from "react-router-dom"


import volcano_light from "../assets/volcano_light.jpg"

export default function Volcano () {

    const navigate = useNavigate()

    return (
        <div className="home-container">
            <div className="home-picture">
                <img src={volcano_light} alt="volcano" />
            </div>
            <div className="home-info">
                <button onClick={() => navigate("/")}>
                    click me
                </button>
            </div>
        </div>
    )

}