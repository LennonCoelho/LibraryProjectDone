<template>
  <v-app id="inspire" dark>
    <toast
      :key="0"
      position="se"
    />

    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-container>
          <v-text-field
            label="Nome do livro"
            v-model="nameBook"
          ></v-text-field>

          <v-text-field
            label="Número de páginas"
            v-model="numberPages"
            mask="######"
          ></v-text-field>

          <v-btn
            large
            center
            :loading="isLoadingNewBook"
            @click="addBook()"
          >
            Adicionar
          </v-btn>
        </v-container>

        <v-container v-if="(getterAllBooks && getterAllBooks.length === 0) && !isLoadingAllBooks" fluid fill-height>
          <v-layout justify-center align-center>
            Nenhum registro encontrado
          </v-layout>
        </v-container>

        <v-container v-if="isLoadingAllBooks" fluid fill-height>
          <v-layout justify-center align-center>
            <v-progress-circular
              indeterminate
              color="white"
            ></v-progress-circular>
          </v-layout>
        </v-container>

        <div v-if="(getterAllBooks && getterAllBooks.length > 0) && !isLoadingAllBooks">
          <v-list-tile
            v-for="(item, index) in getterAllBooks"
            :key="index"
            @click="SET_SELECTED_BOOK(item)"
          >
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>

            <v-icon @click="removeBook(item)">remove</v-icon>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline text-uppercase">
        <span>Library</span>
        <span class="font-weight-light">Project</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex v-if="Object.keys(getterSelectedBook).length > 0" xs12 sm8>
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
              ></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ getterSelectedBook.title }}</h3>
                  <div>{{ getterSelectedBook.pages }} Páginas</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange">Ver mais</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

          <h1 v-else>Selecione um livro</h1>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app fixed>
      <span>&copy; InfoWeek - 2019 Centro Universitário de Patos de Minas - UNIPAM.</span>
    </v-footer>
  </v-app>
</template>

<script>
import { Toast } from 'vuex-toast'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Toast
  },
  data: () => ({
    drawer: null,
    isLoadingAllBooks: false,
    isLoadingNewBook: false,
    nameBook: '',
    numberPages: '',
    newBook: ''
  }),
  computed: {
    ...mapGetters([
      'getterAllBooks',
      'getterSelectedBook'
    ])
  },
  mounted () {
    this.getAllBooks()
  },
  methods: {
    ...mapActions([
      'actionGetAllBooks',
      'actionAddBook',
      'actionDeleteBook'
    ]),
    ...mapMutations([
      'SET_SELECTED_BOOK'
    ]),
    getAllBooks () {
      this.isLoadingAllBooks = true

      this.actionGetAllBooks()
        .then(() => {
          setTimeout(() => {
            this.SET_SELECTED_BOOK()

            this.isLoadingAllBooks = false
          }, 500)
        })
        .catch(() => {
          setTimeout(() => {
            this.isLoadingAllBooks = false
          }, 500)
        })
    },
    addBook () {
      const book = {
        pages: this.numberPages,
        title: this.nameBook
      }

      this.isLoadingNewBook = true

      this.actionAddBook(book)
        .then(() => {
          this.isLoadingNewBook = false

          this.nameBook = this.numberPages = ''
        })
        .catch(() => {
          this.isLoadingNewBook = false
        })
    },
    removeBook (book) {
      this.isLoadingNewBook = true

      this.actionDeleteBook(book)
        .then(() => {
          this.isLoadingNewBook = false

          this.nameBook = this.numberPages = ''
        })
        .catch(() => {
          this.isLoadingNewBook = false
        })
    }
  }
}
</script>
