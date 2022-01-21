<template>
    <!-- Search bar -->
    <div class="relative w-72">
      <input type="text" v-model="searchQuery"
      class="w-72 transition ease-in duration-300 bg-theme-navbar block px-2 py-2 ml-5 mb-3 md:ml-0
      text-gray-700 rounded-md border-white border border-opacity-30 focus:border-blue-500 focus:outline-none focus:ring">
        <button disabled type="submit" class="absolute right-0 top-0 bottom-0 md:pr-3">
          <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
    </div>
</template>

<script>
    export default {
      props: ['bookmarks'],
        data() {
            return {
              searchQuery: null,
              filteringBookmarks: null,
            }
        },
        watch: {
        searchQuery(newValue) {
          if(newValue) {
            this.filteringBookmarks=this.bookmarks.filter(data => 
            
            data.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||  
            (data.favorites == true && 'favorites'.toLowerCase().includes(this.searchQuery.toLowerCase()) ) || 
            data.url.toLowerCase().includes(this.searchQuery.toLowerCase())


            )
          }else{
            this.filteringBookmarks=this.bookmarks;
          }
          this.$emit('update:filteredBookmarks',  this.filteringBookmarks)
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>