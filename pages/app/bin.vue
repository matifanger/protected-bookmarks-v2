<template>
<div>
<div v-if="!this.pageIsLoaded">
    <Loader />
</div>

<div v-else>

    <div v-if="this.bookmarks.length == 0">
        <AppNoBookmarks />
    </div>

    <div v-else>


    <div class="relative">
        <AppSearch :bookmarks="bookmarks" v-on:update:filteredBookmarks="filteredBookmarks = $event" />
        
<div class="w-full mx-auto px-2 sm:px-0">
        <div class="pt-2 pb-2">
                <div class="inline-block w-full rounded-lg overflow-hidden text-center border border-white border-opacity-30">
                    <table class="min-w-full">

                        <thead class="bg-theme-navbar text-white text-opacity-90 border-b border-white border-opacity-30">
                            <tr class="text-white text-opacity-90">
                                <th scope="col" class="px-5 py-3 text-sm uppercase font-normal">
                                    Icon
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm uppercase font-normal">
                                    Title
                                </th>
                                <th sco pe="col" class="px-5 py-3 text-sm uppercase font-normal">
                                    Url
                                </th>
                                <th scope="col" class="px-5 py-3 text-sm uppercase font-normal">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item,key) in filteredBookmarks" :key="key" class="hover:bg-theme-card text-white text-opacity-90 border-b border-white border-opacity-30 text-sm">
                                <td class="p-4">
                                    <p class=" whitespace-no-wrap">
                                        <!-- WEB IMAGE ICON -->
                                            <img v-if="item.icon" :src="item.icon" width="25" height="25" :alt="item.title">
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                    </p>
                                </td>
                                <td class="text-sm">
                                    <p class="whitespace-no-wrap">
                                        {{item.title}}
                                    </p>
                                </td>
                                <td>
                                    <a class="truncateText text-ellipsis overflow-hidden text-sm text-gray-500 dark:text-white ml-2" target="_blank" rel="noopener noreferrer" :href="item.url">
                                        {{item.url}}
                                    </a>
                                </td>
                                <td>
                                <span @click="toggleBinBookmark(item)" class="relative inline-block my-2 px-3 py-1 font-semibold text-black leading-tight cursor-pointer">
                                        <span aria-hidden="true" class="absolute inset-0 "></span>
                                        <span class="relative">
                                            <client-only>
                                                <code v-html="restoreIcon"></code>
                                            </client-only>
                                        </span>
                                    </span>
                                    <span @click="removeBookmark(item)" class="relative inline-block my-2 px-3 py-1 font-semibold text-black leading-tight cursor-pointer">
                                        <span aria-hidden="true" class="absolute inset-0 bg-red-500 rounded-full"></span>
                                        <span class="relative">
                                            <client-only>
                                                <code v-html="deleteIcon"></code>
                                            </client-only>
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    <!-- Make the 1/2/.. index pages.
                        <div class="px-5 py-5 flex flex-col xs:flex-row items-center xs:justify-between text-white text-opacity-90">
                        <div class="flex items-center">
                            <button type="button" class="w-full p-4 text-base rounded-l-xl hover:bg-gray-100 border border-white border-opacity-30">
                                <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                            <button type="button" class="w-full px-4 py-2 border-t border-b text-base border-white border-opacity-30 text-indigo-500 hover:bg-gray-100 ">
                                1
                            </button>
                            <button type="button" class="w-full px-4 py-2 border text-base border-white border-opacity-30 hover:bg-gray-100">
                                2
                            </button>
                            <button type="button" class="w-full px-4 py-2 border-t border-b text-base border-white border-opacity-30  hover:bg-gray-100">
                                3
                            </button>
                            <button type="button" class="w-full px-4 py-2 border text-base border-white border-opacity-30 hover:bg-gray-100">
                                4
                            </button>
                            <button type="button" class="w-full p-4 border-t border-b border-r text-base border-white border-opacity-30 rounded-r-xl hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</template>

<script>
    export default {
        layout: 'dashboardv2',

        data() {
            return {
                pageIsLoaded:false,
                bookmarks: [],
                filteredBookmarks: [],
                restoreIcon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>`,
                deleteIcon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>`
            }
        },
        mounted() {
            this.loadBookmarks()
        },
        methods: {
            // Make the snapshot to load the content in real-time.
            loadBookmarks() {
                return new Promise ((resolve, reject) => {
                    var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userData.userid);
                    docRef.onSnapshot((doc) => {
                    var data = doc.data()
                    if (data.bookmarks) {
                    data = data.bookmarks.filter(el => { return el.bin == true })
                    this.bookmarks = data
                    this.filteredBookmarks = data
                    }
                    this.pageIsLoaded = true
                    resolve()
                })
                })
            },
            toggleBinBookmark(item) {
                var status = ''
                const data = JSON.stringify(item)
                const newItem = JSON.parse(data)
                newItem.bin = false
                status = 'restaured from the'
                return new Promise ((resolve, reject) => {
                    var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userData.userid);
                    docRef.update({
                    bookmarks: this.$fireModule.firestore.FieldValue.arrayUnion(newItem)
                    })
                    .then(() => {
                    docRef.update({
                    bookmarks: this.$fireModule.firestore.FieldValue.arrayRemove(item),
                    })
                    }).then(
                        console.log('success'),
                        this.newBookmark = {title: '', icon: '', url: '', labels: ''},
                        this.$store.dispatch('throwMessage', [ `Your bookmark was ${status} bin!`  , 'success' ] ),
                        resolve()
                    ).catch(error => {
                        this.$store.dispatch('throwMessage', [ error.message  , 'error' ] ),
                        reject()
                    })
                })
            },
            removeBookmark(item) {
                return new Promise ((resolve, reject) => {
                    var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userData.userid);
                    docRef.update({
                    bookmarks: this.$fireModule.firestore.FieldValue.arrayRemove(item)
                    }).then(
                        this.newBookmark = {title: '', icon: '', url: '', labels: ''},
                        this.modalIsOpen = false,
                        this.$store.dispatch('throwMessage', [ `Your bookmark was permanently removed!`  , 'success' ] ),
                        resolve()
                    ).catch(error => {
                        this.$store.dispatch('throwMessage', [ error.message  , 'error' ] ),
                        this.modalIsOpen = false
                        reject()
                    })
            })
            },
        }
    }
</script>

<style>
.truncateText { max-width: 200px; overflow: hidden; 
    -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; 
    text-overflow: ellipsis; white-space: nowrap; }
</style>