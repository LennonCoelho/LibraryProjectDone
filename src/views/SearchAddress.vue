<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex
        class="mb-5"
        xs12
        sm6
        offset-sm3
      >
        <v-card>
          <v-card-text>
            <div>
              <h3 class="headline mb-4">Busca de endereço por CEP</h3>

              <v-layout justify-center>
                <v-text-field
                  label="Digite um CEP"
                  @keyup.enter="getAddressFromCep(message)"
                  v-model="message"
                  mask="#####-###"
                ></v-text-field>

                <v-btn
                  large
                  color="primary"
                  :disabled="!message || message.length < 8"
                  @click="getAddressFromCep(message)"
                >
                  Buscar
                </v-btn>
              </v-layout>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex
        xs12
        sm8
        offset-sm2
      >
        <v-layout justify-center>
          <v-data-table
            :loading="isLoading"
            :headers="headers"
            :items="address"
            hide-actions
            :no-data-text="noResults"
            :no-results-text="noResults"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.cep }}</td>
              <td class="text-xs-right">{{ props.item.logradouro }}</td>
              <td class="text-xs-right">{{ props.item.complemento }}</td>
              <td class="text-xs-right">{{ props.item.bairro }}</td>
              <td class="text-xs-right">{{ props.item.localidade }}</td>
              <td class="text-xs-right">{{ props.item.uf }}</td>
              <td class="text-xs-right">{{ props.item.ibge }}</td>
            </template>
          </v-data-table>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">
// Importação de bibliotecas e arquivos utilizados
import Const from '../helper/const'
import axios from 'axios'

export default {
  data: () => ({
    // Toda variável utilizada dentro do componente deve ser criada no DATA
    address: [],
    message: '',
    isLoading: false,
    noResults: 'Nenhum resultado',
    headers: [
      { text: 'CEP', value: 'cep' },
      { text: 'Logradouro', value: 'logradouro' },
      { text: 'Complemento', value: 'complemento' },
      { text: 'Bairro', value: 'bairro' },
      { text: 'Localidade', value: 'localidade' },
      { text: 'UF', value: 'uf' },
      { text: 'IBGE', value: 'ibge' }
    ]
  }),
  methods: {
    // Definição do método com o parâmetro CEP
    getAddressFromCep (cep) {
      // Trecho onde a requisição na API de CEP é executada
      if (cep) {
        this.isLoading = true

        return axios({
          method: 'get', // Método
          url: `${Const.API_VIACEP}/${cep}/json/`, // URL da API
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => { // Caso a requisição seja finalizada com sucesso então será executado o THEN
            console.log('Sucesso:', response.data)

            /*
            Nesse trecho o resultado da requisição é atribuido a uma variável
            local para ser exibida no HTML. Caso o endereço não seja encontrado,
            é retornado um objeto com um atributo erro, então a variável address
            é atribuida para um array vazio.
            */
            this.address = response.data.hasOwnProperty('erro') ? [] : [response.data]

            // Desabilita o loading
            this.isLoading = false
          })
          .catch((error) => { // Caso ocorra um erro na requisição então será executado o CATCH
            console.log('Erro:', error)

            this.address = []
            this.isLoading = false
          })
      }
    }
  }
}
</script>

<style lang="scss">
  .v-content.address .v-content__wrap { background: url(../assets/bg-address.jpg) center center no-repeat; background-size: auto 100%; }
</style>
