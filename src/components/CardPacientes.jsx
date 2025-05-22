import styles from "../styles/CardPacientes.module.css"

export default function CardPacientes( {consulta, onClick} ) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img 
                src={consulta.image} 
                alt={consulta.name}
                className={styles.avatar}
            />
            <h3 className={styles.title}>{consulta.name}</h3>
            <p>{consulta.name}</p>
            <p>{consulta.paciente}</p>
            <p>{consulta.data} </p>
            <p>{consulta.hora}</p>
        </div>
    );
}