<template>
<div class="relative">

    <div v-if="!this.pageIsLoaded">
        <Loader />
    </div>

<div v-else>

    <div v-if="this.bookmarks.length == 0">
        <AppNoBookmarks />
    </div>

    <div v-else>

    <AppSearch  :bookmarks="bookmarks" v-on:update:filteredBookmarks="filteredBookmarks = $event"  />

<!-- BOOKMARK BOXES -->
<div class="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 relative flex flex-col">
<div v-for="(item, key) in filteredBookmarks" :key="key" class="relative">

    
    <div class="bg-theme-card shadow-lg mt-1 rounded-2xl p-4 bg-white dark:bg-gray-700 w-full border-white border border-opacity-20">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
                <span class="rounded-xl p-2 bg-blue-100">
                    <!-- WEB IMAGE ICON -->
                    <img v-if="item.icon" :src="item.icon" width="25" height="25" :alt="item.title">
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <div class="flex flex-col">
                    <!-- WEB TITLE -->
                    <span class="font-bold text-md text-white dark:text-white ml-2">
                        {{item.title}}
                    </span>
                    <!-- WEB URL -->
                    <a class="truncateText text-ellipsis overflow-hidden text-sm text-gray-500 dark:text-white ml-2" target="_blank" :href="item.url">
                        {{item.url}}
                    </a>
                </div>
            </div>

    <!-- TOOLS BUTTONS -->
    <div class="relative inline-block">
        <!-- Dropdown toggle button -->
        <button @click="showDialog(item, key)" class="relative transition ease-in duration-300 block p-2 text-white border border-transparent hover:border-white rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
        </button>

    <!-- OPACITY BACKGROUND -->
        <button v-if="show == item" @click="show = false" class="fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-black opacity-50 z-50 cursor-default" />
            

            <div v-if="show == item" :class="mousePos ? 'right-0' : 'right-0 bottom-10'"  class="absolute w-48 bg-white rounded-md shadow-xl dark:bg-gray-800 z-50">

                <a v-for="(dditem,key) in dropdown.utilities" :key="'a'+key" @click="handleFunctionCall(dditem.function, item)" class="rounded-md cursor-pointer flex items-center px-3 py-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                    
                    
                    <client-only>
                        <code v-if="item.favorites == true && dditem.title == 'favorites'" v-html="dditem.iconTrue"></code>
                        <code v-else v-html="dditem.icon"></code>
                    </client-only>

                        <span v-if="dditem.title == 'favorites'" class="mx-1">{{item.favorites ? 'Remove from '+dditem.title : 'Add to '+dditem.title }}</span>
                        <span v-else class="mx-1">{{dditem.title}}</span>
                </a>

                <hr class="border-gray-200 dark:border-gray-700 ">

                <a v-for="(ddditem,key) in dropdown.modifiers" :key="'b'+key" @click="handleFunctionCall(ddditem.function, item)" :class="ddditem.color == 'red' ? 'bg-red-400 text-white hover:bg-red-500' : 'text-gray-600 hover:bg-gray-300' " class="rounded-sm cursor-pointer flex items-center p-3 text-sm capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                    <client-only><code v-html="ddditem.icon"></code>  </client-only>
                        <span class="mx-1">{{ddditem.title}}</span>
                </a>

            </div>

    </div>
    </div>

        <!-- TAGS TODO -->
        <!-- <div class="flex items-center space-x-1">
            <span v-if="item.favorites" class="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-blue-900 bg-blue-200">
                Favorites
            </span>
            <span v-if="item.important" class="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-red-400 border border-red-400  bg-white">
                IMPORTANT
            </span> 
        </div> -->

    </div>

</div>
</div>

</div>

<AppEditBookmark v-if="showEditBookmark" @closeEditBookmark="closeEditBookmark" :bookmarkToEdit="bookmarkToEdit" />

<AppCreateBookmark />

</div>
</div>
</template>

<script>
    export default {
        layout: 'dashboardv2',
        data() {
            return {
                show: [false],
                currentDialogItem: {},
                pageIsLoaded: false,
                dropdownIsOpen: false,
                showEditBookmark: false,
                newBookmark: {title: '', icon: '', url: '', labels: ''},
                bookmarks: [],
                filteredBookmarks: [],
                mousePos: true,
                dropdown: {
                    utilities: [ 
                        { title: 'Open in a new page', function: 'openInNewPage', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>` },
                        { title: 'Copy link', function: 'copyLink', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>` },
                        { title: 'favorites', function: 'ToggleFavorites',iconTrue: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="yellow">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>`  , icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>` },
                    ],
                    modifiers: [
                        { title: 'Edit', function: 'editBookmark', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`},
                        { title: 'Remove', function: 'removeBookmark', icon:`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> </svg>`, color: 'red' },
                    ],
                }
            }
        },
        mounted() {
            this.loadBookmarks()
            window.addEventListener('mousemove', this.updateMousePos);
        },
        methods: {
            closeEditBookmark() {
                this.showEditBookmark = false
            },
            queryBookmark(resultQuery) {
                this.bookmarks = resultQuery
            },
            // TODO: I should add a limiter ( https://stackoverflow.com/questions/15066849/how-to-detect-when-mousemove-has-stopped )
            // Get the mouse position and the screen height to know if the bookmark tools menu should be opened at the top or bottom.
            updateMousePos(event) {
                if (!this.show) {
                    if (event.screenY-325 < window.innerHeight / 2) {
                        this.mousePos = true
                    } else {
                        this.mousePos = false
                    }
                }
            },
            // This makes each dialog/modal unique and prevents all opening at the same time.
            showDialog(item,index){
                this.currentDialogItem = {}
                this.show = item;
                this.currentDialogItem = item;
            },
            // Handles a function passed as string.
            handleFunctionCall(functionName, arg) {
                this.show = false
                this[functionName](arg)
            },
            // Opens in a new page.
            openInNewPage(item) {
                console.log(item.url)
                window.open(item.url, '_blank').focus();
            },
            // Uses vue-clipboard2 to copy the URL to clipboard.
            copyLink(item) {
                this.$copyText(item.url).then((e) => {
                alert('Copied')
                console.log(e)
                }, function (e) {
                alert('Can not copy')
                console.log(e)
                })
            },
            // Toggle Favorites.
            ToggleFavorites(item) {
                var status = ''
                const data = JSON.stringify(item)
                const newItem = JSON.parse(data)
                if (!newItem.favorites) {
                    newItem.favorites = true
                    status = 'added to'
                } else {
                    newItem.favorites = !newItem.favorites
                    status = 'removed from'
                }
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
                        this.newBookmark = {title: '', icon: '', url: '', labels: ''},
                        this.closeEditBookmark(),
                        this.$store.dispatch('throwMessage', [ `Your bookmark was ${status} favorites!`  , 'success' ] ),
                        resolve()
                    ).catch(error => {
                        this.$store.dispatch('throwMessage', [ error.message  , 'error' ] ),
                        this.closeEditBookmark()
                        reject()
                    })
                })
            },
            // Edit bookmark.
            editBookmark(item) {
                this.bookmarkToEdit = item
                this.showEditBookmark = true
            },
            // Receives an item and removes it.
            removeBookmark(item) {
                var status = 'moved to'
                const data = JSON.stringify(item)
                const newItem = JSON.parse(data)
                newItem.bin = true
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
                        this.newBookmark = {title: '', icon: '', url: '', labels: ''},
                        this.closeEditBookmark(),
                        this.$store.dispatch('throwMessage', [ `Your bookmark was ${status} bin!`  , 'success' ] ),
                        resolve()
                    ).catch(error => {
                        this.$store.dispatch('throwMessage', [ error.message  , 'error' ] ),
                        this.closeEditBookmark()
                        reject()
                    })
                })
            },
            // Make the snapshot to load the content in real-time.
            loadBookmarks() {
                return new Promise ((resolve, reject) => {
                    var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userData.userid);
                    docRef.onSnapshot((doc) => {
                    // * console.log( " data: ", doc.data());
                    var data = doc.data()
                    if (data.bookmarks) {
                    var data =  data.bookmarks.filter(el => { return !el.bin }) 
                    this.bookmarks = data
                    this.filteredBookmarks = data
                    }
                    this.pageIsLoaded = true
                    resolve()
                })
                })
            },
            // Creates new bookmark. I use a promise just to handle errors. It's not really necessary here, but it is when i am in store.js.
            createNewBookmark() {
                return new Promise ((resolve, reject) => {
                    var docRef = this.$fire.firestore.collection('users').doc(this.$store.state.userData.userid);
                    docRef.update({
                    bookmarks: this.$fireModule.firestore.FieldValue.arrayUnion(this.newBookmark)
                    }).then(
                        this.newBookmark = {title: '', icon: '', url: '', labels: ''},
                        this.$store.dispatch('throwMessage', [ 'Your bookmark was added!'  , 'success' ] ),
                        this.modalIsOpen = false,
                        resolve()
                    ).catch(error => {
                        this.$store.dispatch('throwMessage', [ error.message , 'error' ] ),
                        this.modalIsOpen = false
                        reject()
                    })
                })
        }
    }
}
</script>

<style>
.truncateText { max-width: 200px; overflow: hidden; 
    -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; 
    text-overflow: ellipsis; white-space: nowrap; }
</style>