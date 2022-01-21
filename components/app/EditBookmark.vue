<template>
    <div>
  <button class="transition duration-100 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center fixed right-0 bottom-0 mb-5 mr-5 z-50" type="button">
  Add bookmark
    </button>
  <!--Modal-->
    
    

<div v-if="loaded" class="fixed flex justify-center items-center md:h-full md:inset-0 animated fadeIn faster z-50 transition ease-in duration-700 animated fadeIn" style="transition: opacity 0.25s ease;" >
    <div @click="closeEditBookmark" class="absolute w-full h-full bg-black opacity-50 z-40 cursor-default transition-none"></div>
    <div class="relative px-4 w-full max-w-2xl h-full md:h-auto z-50">
        <!-- Modal content -->
        <div @keyup.enter="editNewBookmark" @keydown.esc="closeEditBookmark" tabindex="0" class="relative rounded-lg shadow" style="background-color: rgb(55 65 81/var(--tw-bg-opacity));">

            <!-- Modal header -->
            <div class="flex justify-between items-start p-5 rounded-t border-b" style="border-color: rgb(75 85 99/var(--tw-border-opacity));">
                <h3 class="text-xl font-semibold lg:text-2xl text-white">
                    Edit Bookmark
                </h3>
                <button @click="closeEditBookmark" type="button" class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="default-modal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>

            <!-- Modal body -->
            <div class="p-6 space-y-6">

                <div>
                <label for="title" class="text-base leading-relaxed text-gray-400">Title</label>
                <input type="text" input autofocus v-model="newBookmark.title" name="title"
                    class="transform duration-100 block w-full px-4 py-2 mt-2 border rounded-md bg-theme-page text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring">
            </div>

                <div>
                <label for="title" class="text-base leading-relaxed text-gray-400">URL</label>
                <input type="text" v-model="newBookmark.url"
                    class="transform duration-100 block w-full px-4 py-2 mt-2 border rounded-md bg-theme-page text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring">
            </div>

            </div>

            <!-- Modal footer -->
            <div class="flex items-center justify-center p-6 space-x-2 rounded-b border-t" style="border-color: rgb(75 85 99/var(--tw-border-opacity));">
                <button @click="editNewBookmark" data-modal-toggle="default-modal" type="button" class="transform duration-100 text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    Accept
                </button>
            </div>
        </div>
    </div>
</div>

  </div>
</template>

<script>
    export default {
        props: ['bookmarkToEdit'],
        data() {
            return {
                newBookmark: {},
                loaded: false,
                //newBookmark: {title: '', icon: '', url: '', labels: ''},
            }
        },
        mounted() {
            var data = JSON.stringify(this.bookmarkToEdit)
            this.newBookmark = JSON.parse(data)
            this.loaded = true
        },
        methods: {
                closeEditBookmark() {
                    this.$emit('closeEditBookmark', false)
                },

            // Edits bookmark (First add the new bookmark, then delete the original. This is more efficient than coping the whole firebase bookmarks object arrays
            // and upload again).
            editNewBookmark() {
                return new Promise ((resolve, reject) => {
                    var reHTTP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

                    if (!this.newBookmark.title) {
                            this.$store.dispatch('throwMessage', [ 'You must add a title!' , 'warning' ] )
                        return
                    }
                    if (!this.newBookmark.url.match(reHTTP)) {
                            this.$store.dispatch('throwMessage', [ 'The url must be complete!' , 'warning' ] )
                        return
                    }

                    this.newBookmark.icon = `https://s2.googleusercontent.com/s2/favicons?sz=128&domain=${this.newBookmark.url}`


                    var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userData.userid);
                    docRef.update({
                    bookmarks: this.$fireModule.firestore.FieldValue.arrayUnion(this.newBookmark)
                    })
                    .then(() => {
                    docRef.update({
                    bookmarks: this.$fireModule.firestore.FieldValue.arrayRemove(this.bookmarkToEdit),
                    })
                    }).then(
                        this.newBookmark = {title: '', icon: '', url: '', labels: ''},
                        this.closeEditBookmark(),
                        this.$swal.fire({
                                icon: 'success',
                                title: "<h5 style='color:white'> Your bookmark was edited! </h5>",
                                background: '#282B39',
                            }),
                            this.$store.dispatch('throwMessage', [ 'Your bookmark was edited!' , 'success' ] ),
                        resolve()
                    ).catch(error => {
                        this.$store.dispatch('throwMessage', [ error.message , 'error' ] ),
                        this.closeEditBookmark()
                        reject()
                    })
                })
        }
        }
    }
</script>

<style lang="scss" scoped>

</style>