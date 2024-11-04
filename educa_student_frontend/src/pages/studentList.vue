<template>
  <div>
    <div class="d-flex align-center ga-3">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      >
      </v-text-field>
      <v-btn
        elevated
        color="grey-darken-2"
        :size="$vuetify.display.mdAndUp ? 'x-large' : 'small'"
        @click="newStudent"
        >Student registration</v-btn
      >
    </div>
    <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="students"
      :search="search"
      class="custom-table"
    >
      <template #[`item.action`]="{ item }">
        <div class="d-flex justify-start ga-2">
          <v-tooltip text="Edit">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                size="x-small"
                color="primary"
                class="d-flex justify-center align-center"
                @click="editItem(item.raw)"
              >
                <v-icon icon="mdi-pencil" class="" />
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Remove">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                size="x-small"
                color="error"
                class="d-flex justify-center align-center"
                @click="deleteItem(item)"
              >
                <v-icon icon="mdi-delete" />
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mdiDelete, mdiPencil } from '@mdi/js';
export default {
  data() {
    return {
      mdiPencil,
      mdiDelete,
      search: '',
      sortBy: [{ key: 'ra', order: 'asc' }],
      headers: [
        { title: 'Registro Academico', key: 'ra' },
        { title: 'Nome', key: 'name' },
        { title: 'CPF', key: 'cpf' },
        { title: 'Ações', key: 'action' },
      ],
      students: [
        {
          ra: 20241001,
          name: 'Valentina de Jesus',
          cpf: 12345678901,
          action: '',
        },
        {
          ra: 20241002,
          name: 'Lucas da Silva',
          cpf: 23456789012,
          action: '',
        },
        {
          ra: 20241003,
          name: 'Mariana Oliveira',
          cpf: 34567890123,
          action: '',
        },
        {
          ra: 20241004,
          name: 'Gabriel Santos',
          cpf: 45678901234,
          action: '',
        },
        {
          ra: 20241005,
          name: 'Sofia Almeida',
          cpf: 56789012345,
          action: '',
        },
        {
          ra: 20241006,
          name: 'Rafael Lima',
          cpf: 67890123456,
          action: '',
        },
        {
          ra: 20241007,
          name: 'Ana Clara Costa',
          cpf: 78901234567,
          action: '',
        },
        {
          ra: 20241008,
          name: 'Felipe Pereira',
          cpf: 89012345678,
          action: '',
        },
        {
          ra: 20241009,
          name: 'Isabella Martins',
          cpf: 90123456789,
          action: '',
        },
        {
          ra: 20241010,
          name: 'Gustavo Rodrigues',
          cpf: 10123456789,
          action: '',
        },
        {
          ra: 20241011,
          name: 'Lara Ferreira',
          cpf: 11123456789,
          action: '',
        },
        {
          ra: 20241012,
          name: 'Eduardo Ribeiro',
          cpf: 12123456789,
          action: '',
        },
        {
          ra: 20241013,
          name: 'Luiza Gomes',
          cpf: 13123456789,
          action: '',
        },
        {
          ra: 20241014,
          name: 'Thiago Nascimento',
          cpf: 14123456789,
          action: '',
        },
        {
          ra: 20241015,
          name: 'Júlia Rocha',
          cpf: 15123456789,
          action: '',
        },
        {
          ra: 20241016,
          name: 'Vitor Martins',
          cpf: 16123456789,
          action: '',
        },
        {
          ra: 20241017,
          name: 'Bianca Soares',
          cpf: 17123456789,
          action: '',
        },
        {
          ra: 20241018,
          name: 'Leonardo Alves',
          cpf: 18123456789,
          action: '',
        },
        {
          ra: 20241019,
          name: 'Amanda Lima',
          cpf: 19123456789,
          action: '',
        },
        {
          ra: 20241020,
          name: 'Felipe Souza',
          cpf: 20123456789,
          action: '',
        },
      ],
    };
  },
  methods: {
    deleteItem(item) {
      console.log(item);
    },
    newStudent() {
      this.$router.push('/studentForm');
    },
  },
};
</script>

<style>
.custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 650px;
}

@media (max-width: 750px) {
  .custom-table {
    height: 70vh;
  }
}
.custom-table th {
  background-color: #424242;
}

.custom-table tr:nth-child(even) {
  background-color: #42424260;
}
</style>
