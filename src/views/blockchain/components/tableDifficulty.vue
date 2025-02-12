<template>
  <div>
    <h5>Tabela de Dificuldade para Hash com Zeros à Esquerda</h5>
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Número de Zeros à Esquerda</th>
          <th>Probabilidade de Acerto (aproximada)</th>
          <th>Dificuldade Relativa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in difficultyTable" :key="index">
          <td>{{ row.zeros }}</td>
          <td>{{ row.probability }}</td>
          <td>{{ row.difficulty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const difficultyTable = [
  { zeros: 1, probability: '1 em 16', difficulty: '1x' },
  { zeros: 2, probability: '1 em 256', difficulty: '16x' },
  { zeros: 3, probability: '1 em 4.096', difficulty: '256x' },
  { zeros: 4, probability: '1 em 65.536', difficulty: '4.096x' },
  { zeros: 5, probability: '1 em 1.048.576', difficulty: '65.536x' },
  { zeros: 6, probability: '1 em 16.777.216', difficulty: '1.048.576x' },
  { zeros: 7, probability: '1 em 268.435.456', difficulty: '16.777.216x' },
  { zeros: 8, probability: '1 em 4.294.967.296', difficulty: '268.435.456x' },
  { zeros: 9, probability: '1 em 68.719.476.736', difficulty: '4.294.967.296x' },
  { zeros: 10, probability: '1 em 1.099.511.627.776', difficulty: '68.719.476.736x' },
  { zeros: 11, probability: '1 em 17.592.186.044.416', difficulty: '1.099.511.627.776x' },
  { zeros: 12, probability: '1 em 281.474.976.710.656', difficulty: '17.592.186.044.416x' },
];
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  font-size: 12px;
}

th {
  background-color: #f4f4f4;
}
</style>