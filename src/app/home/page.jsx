"use client";

import Image from "next/image";
import { Skeleton } from "antd";
import styles from "./Home.module.css";
import Link from 'next/link';



export default function Home() {
    return (
        
        <div className={styles.container}>
            <Skeleton />
            <h1>Pacientes e Consultas</h1>
            <h1>Ana Julia Demattei</h1>
            <p>Turma: TDS1</p>
            <p>Instrutores: Thiago Ferreira e Marcelo Carboni</p>
            <p>Prova Prática - Next.js Front End</p>
            <p>Projeto: Pacientes e Consultas</p>
            <p>Esse projeto relaciona a entidade paciente com sua consulta, deixando mais facil gerenciar cada paciente e suas consultas médicas dentro de um consultorio.</p>
            <Image
                src="/image/anaju.jpg"
                alt="Ana Julia Demattei"
                width={500}
                height={500}
                className={styles.image}
        />
        <Link href="/pacientes" className={styles.button}>
            Ir para Pacientes
        </Link>
        <Skeleton/>
    </div>
    );
}
