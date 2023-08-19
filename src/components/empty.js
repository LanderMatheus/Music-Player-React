import './styles.css'


function CardMusics({ id, title, artist, description, url, cover }) {
    return (
        <div className='card'>

            <img src={cover}/>
            <h2>{title}</h2>
            <p>{description}</p>

        </div>
    )
}

export default CardMusics;