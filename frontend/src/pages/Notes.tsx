import type { JSX } from "react"

const Notes = (): JSX.Element => {
  return (
    <main
        style={{
            display: "flex",
            textWrap: "balance",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
            height: "80vh"
        }}
    >
        <p style={{fontSize: "1.2rem"}}>Página de Notas em construção... Em breve você poderá criar blocos de notas para organizar suas ideias, tarefas e lembretes de forma prática e eficiente!</p>
    </main>
  )
}
export default Notes