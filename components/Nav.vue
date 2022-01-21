<template>
  <div
  :class="{ 'scrolled': !view.atTopOfPage }"
    class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:w-screen-xl md:px-24 lg:px-8 sticky top-0 z-50"
  >
    <div class="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
      <ul class="flex items-center hidden space-x-8 lg:flex">
        <li>
            <NuxtLink
            to="/"
            aria-label="Our product"
            title="Our product"
            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >Features</NuxtLink
            >
        </li>
        <li>
            <NuxtLink
            to="/pricing"
            aria-label="Our product"
            title="Our product"
            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >Pricing</NuxtLink
            >
        </li>
      </ul>
      <NuxtLink
        to="/"
        aria-label="PROTECTED BOOKMARKS"
        title="PROTECTED BOOKMARKS"
        class="inline-flex items-center lg:mx-auto"
      >
        <svg
          class="w-8 text-deep-purple-accent-400"
          viewBox="0 0 24 24"
          stroke-linejoin="round"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke="currentColor"
          fill="none"
        >
          <rect x="3" y="1" width="7" height="12"></rect>
          <rect x="3" y="17" width="7" height="6"></rect>
          <rect x="14" y="1" width="7" height="6"></rect>
          <rect x="14" y="11" width="7" height="12"></rect>
        </svg>
        
        <span
          class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase"
          >PROTECTED BOOKMARKS</span
        >
      </NuxtLink>

      <ul v-if="!this.$fire.auth.currentUser" class="flex items-center hidden ml-auto space-x-8 lg:flex">
        <li>
          <NuxtLink
            to="/login"
            aria-label="Sign in"
            title="Sign in"
            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >Sign in</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            aria-label="Sign up"
            title="Sign up"
          >
            Sign up
          </NuxtLink>
        </li>
      </ul>
      <ul v-else class="flex items-center hidden ml-auto space-x-8 lg:flex">
        <li>
          <NuxtLink
            to="app"
            aria-label="Join app"
            title="Join app"
            class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >Open app</NuxtLink
          >
        </li>
      </ul>

      <div class="ml-auto lg:hidden">
        <button
          aria-label="Open Menu"
          title="Open Menu"
          class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
          @click="isMenuOpen = true"
        >
          <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
            ></path>
            <path
              fill="currentColor"
              d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
            ></path>
            <path
              fill="currentColor"
              d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
            ></path>
          </svg>
        </button>
        <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full">
          <div class="p-5 bg-white border rounded shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <NuxtLink
                  to="/"
                  aria-label="Protected Bookmarks"
                  title="Protected Bookmarks"
                  class="inline-flex items-center"
                >
                  <svg
                    class="w-8 text-deep-purple-accent-400"
                    viewBox="0 0 24 24"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke="currentColor"
                    fill="none"
                  >
                    <rect x="3" y="1" width="7" height="12"></rect>
                    <rect x="3" y="17" width="7" height="6"></rect>
                    <rect x="14" y="1" width="7" height="6"></rect>
                    <rect x="14" y="11" width="7" height="12"></rect>
                  </svg>
                  <span
                    class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase"
                    >Protected Bookmarks</span
                  >
                </NuxtLink>
              </div>
              <div>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  @click="isMenuOpen = false"
                >
                  <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <nav>
              <ul class="space-y-4">
                <li>
                  <NuxtLink
                    to="/"
                    aria-label="Our product"
                    title="Our product"
                    class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >Features</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/pricing"
                    aria-label="Product pricing"
                    title="Product pricing"
                    class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >Pricing</NuxtLink
                  >
                </li>
                <li>
                  <a
                    href="http://app.localhost:3000"
                    aria-label="Sign in"
                    title="Sign in"
                    class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >Sign in</a
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/register"
                    class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="Sign up"
                  >
                    Sign up
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      view: {
            atTopOfPage: true
        }
    };
  },
  methods: {
    // the function to call when the user scrolls, added as a method
    handleScroll(){
        // when the user scrolls, check the pageYOffset
        if(window.pageYOffset>0){
            // user is scrolled
            if(this.view.atTopOfPage) this.view.atTopOfPage = false
        }else{
            // user is at top of page
            if(!this.view.atTopOfPage) this.view.atTopOfPage = true
        }
    }
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
},
  
};
</script>

<style scoped>
.scrolled {
    @apply transform duration-100 shadow-xl bg-white;
    border-bottom: 0px;
}
</style>