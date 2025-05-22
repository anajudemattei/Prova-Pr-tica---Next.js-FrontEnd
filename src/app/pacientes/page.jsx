"use client";
import React from "react";
import styles from "./Pacientes.module.css";
import Link from 'next/link';
import { Skeleton } from "antd";

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Pacientes e Consultas</h1>
            <Skeleton
                active
                paragraph={{ rows: 4 }}
                title={{ width: 200 }}
                className={styles.skeleton}
            />
        </div>
    );
}