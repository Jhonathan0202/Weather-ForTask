import type { JSX } from "react";

const Weather = (): JSX.Element => {
    return (
        <>
            <main
                style={{
                    display: "flex",
                    textWrap: "balance",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "20px",
                    height: "80vh",
                }}
            >
                <p style={{ fontSize: "1.2rem" }}>
                    Página de Clima em construção... Em breve você poderá
                    verificar o clima na sua localidade!
                </p>
            </main>
        </>
    );
};
export default Weather;
