"use client";

import Image from "next/image";
import { Button } from "antd";
import styles from "./Home.module.css";
import Link from 'next/link';
import { Roboto_Slab } from "next/font/google";


const fontSlab = Roboto_Slab ({
  variable: "--font-slab",
  subsets: ["latin"],
});

export default function Home() {
    return (
        <div className={styles.container}>
            <Image
                src="/image/anaju.png"
                alt="Ana Julia Demattei"
                width={300}
                height={300}
                priority 
                className={styles.image}
            />
            <h1>Pacientes e Consultas</h1>
            <p>Prova Prática - Next.js Front End</p>
            <p>Aluna: Ana Julia Demattei</p>
            <p>Turma: TDS1</p>
            <p>Instrutores: Thiago Ferreira e Marcelo Carboni</p>
            <p>Projeto: Pacientes e Consultas</p>
            <p>Esse projeto relaciona a entidade paciente com sua consulta, deixando mais facil gerenciar cada</p>
            <p>paciente e suas consultas médicas dentro de um consultorio.</p>
        
                    <Link href="/pacientes" prefetch>
                        <Button type="primary" className={styles.button}>
                            Ver Pacientes
                        </Button>
                    </Link>
        </div>
    );
}
