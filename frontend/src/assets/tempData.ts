export const dataBlocks = [
  {
    id: 101,
    title: "Rotina Diária",
    description: "Tarefas essenciais para manter o dia organizado.",
    notifications: true,
    color: "#2d8cff", // Azul
    tasks: [1, 2, 4],
    countTasksDone: 1
  },
  {
    id: 102,
    title: "Lazer e Bem-estar",
    description: "Atividades ao ar livre e hobbies.",
    notifications: false,
    color: "#0EA53E", // Verde Água
    tasks: [3, 5],
    countTasksDone: 0
  },
  {
    id: 103,
    title: "Trabalho / Projetos",
    description: "Foco total em entregas de software.",
    notifications: true,
    color: "#EC711F", // Vermelho
    tasks: [],
    countTasksDone: 0
  },
  {
    id: 104,
    title: "Estudos",
    description: "Cursos online e leituras técnicas.",
    notifications: true,
    color: "#EC711F", // Laranja
    tasks: [4],
    countTasksDone: 0
  },
  {
    id: 105,
    title: "Casa",
    description: "Manutenção e organização do lar.",
    notifications: false,
    color: "#bc86ff", // Roxo
    tasks: [1, 5],
    countTasksDone: 0
  }
];

export const dataTasks = [
  {
    id: 1,
    title: "Comprar ingredientes para o jantar",
    scheduledDate: new Date("2026-03-15T18:00:00"),
    consultWeather: false,
    done: false
  },
  {
    id: 2,
    title: "Treino de perna na academia",
    scheduledDate: new Date("2026-03-13T07:00:00"),
    consultWeather: false,
    done: true
  },
  {
    id: 3,
    title: "Caminhada no parque",
    scheduledDate: new Date("2026-03-14T16:30:00"),
    consultWeather: true,
    done: false
  },
  {
    id: 4,
    title: "Leitura do capítulo 5 de Clean Code",
    scheduledDate: new Date("2026-03-13T20:00:00"),
    consultWeather: false,
    done: false
  },
  {
    id: 5,
    title: "Lavar o carro",
    scheduledDate: new Date("2026-03-16T09:00:00"),
    consultWeather: true,
    done: false
  }
];
