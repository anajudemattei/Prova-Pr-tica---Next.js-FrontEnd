"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Pacientes.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Pacientes() {
    const [data, setData] = useState({
        pacientes: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        paciente: null,
        consulta: null,
        loading: false,
    });

    useEffect(() => {
        const fetchPacientes = async () => {
            const cached = getSessionStorage("pacientesData", []);
            if (cached.length > 0) {
                setData({ pacientes: cached, loading: false, current: 1, pageSize: 5 });
                return;
            }

            try {
                const { data: pacientes } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/pacientes`,
                    {
                        headers: HEADERS,
                    }
                );
                setSessionStorage("pacientesData", pacientes);
                setData({ pacientes, loading: false, current: 1, pageSize: 5 });
            } catch {
                toast.error("Erro ao carregar PACIENTES!");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchPacientes();
    }, []);

    const openModal = async (paciente) => {
        setModalInfo({ visible: true, paciente, consulta: null, loading: true });

        const cacheKey = `consulta_${paciente.id}`;
        const cached = getSessionStorage(cacheKey, null);
        if (cached) {
            setModalInfo((m) => ({ ...m, consulta: cached, loading: false }));
            return;
        }

        try {
            const { data: consulta } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consulta/${paciente.id}`,
                {
                    headers: HEADERS,
                }
            );
            setSessionStorage(cacheKey, consulta);
            setModalInfo((m) => ({ ...m, consulta, loading: false }));
        } catch {
            toast.error("Erro ao carregar avaliação.");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

    const paginatedPacientes = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.pacientes.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <h1>Lista de Pacientes e Consultas</h1>

            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.pacientes.length}
                onChange={(page, size) =>
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "100"]}
            />

            {data.loading ? (
                <Image
                    src="/image/loading.gif"
                    width={300}
                    height={200}
                    alt="Loading"
                 />
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedPacientes().map((paciente) => (
                        <Card
                            key={paciente.id}
                            className={styles.card}
                            hoverable
                            onClick={() => openModal(paciente)}
                            cover={
                                <Image
                                    alt={paciente.name}
                                    src={
                                        paciente.photo && paciente.photo.startsWith("http")
                                            ? paciente.photo
                                            : "/images/220.svg"
                                    }
                                    width={220}
                                    height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={paciente.name}
                                description={`Email: ${paciente.email}`}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={`Detalhes do Paciente: ${modalInfo.paciente?.name}`}
                open={modalInfo.visible}
                onCancel={() =>
                    setModalInfo({
                        visible: false,
                        paciente: null,
                        consulta: null,
                        loading: false,
                    })
                }
                onOk={() =>
                    setModalInfo({
                        visible: false,
                        paciente: null,
                        consulta: null,
                        loading: false,
                    })
                }
                width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.consulta ? (
                    <div className={styles.consultaInfo}>
                        <p>
                            <span className={styles.label}>consulta:</span>{" "}
                            {modalInfo.consulta.nome}
                        </p>
                        <p>
                            <span className={styles.label}>Paciente:</span>{" "}
                            {modalInfo.consulta.gerente || "Não informado"}
                        </p>
                        <p>
                            <span className={styles.label}>Data:</span>{" "}
                            {modalInfo.consulta.data || "Não informado"}
                        </p>
                        <p>
                            <span className={styles.label}>Hora:</span>{" "}
                            {modalInfo.consulta.hora || "Não informado"}
                        </p>
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Informações do consulta não encontradas.</p>
                )}
            </Modal>

            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}