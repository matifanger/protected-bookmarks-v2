<template>
<div>
    <div class="relative md:fixed flex w-full items-center px-6 pb-6 bg-theme-navbar z-50">
    <NuxtLink to="/app" title="bookmarks" class="text-xl text-white font-semibold pt-6 flex">
        <svg width="35" height="30" viewBox="0 0 256 366" version="1.1" preserveAspectRatio="xMidYMid">
                    <defs>
                        <linearGradient x1="12.5189534%" y1="85.2128611%" x2="88.2282959%" y2="10.0225497%" id="linearGradient-1">
                            <stop stop-color="#FF0057" stop-opacity="0.16" offset="0%">
                            </stop>
                            <stop stop-color="#FF0057" offset="86.1354%">
                            </stop>
                        </linearGradient>
                    </defs>
                    <g>
                        <path d="M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z" fill="#001B38">
                        </path>
                        <circle fill="url(#linearGradient-1)" transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) " cx="147.013244" cy="147.014675" r="78.9933938">
                        </circle>
                        <circle fill="url(#linearGradient-1)" opacity="0.5" transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) " cx="147.013244" cy="147.014675" r="78.9933938">
                        </circle>
                    </g>
        </svg>
        <span>PROTECTED BOOKMARKS</span>
    </NuxtLink>

      <button v-if="dropdownIsOpen" @click="dropdownIsOpen = false" class="fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-black opacity-50 z-50 cursor-default" />

      <button @click="dropdownIsOpen = true" class="absolute right-0 transition ease-in duration-300 block mt-6 mr-5 p-2 text-white border border-transparent hover:border-white rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>

              <!-- Dropdown menu -->
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">

            <div v-if="dropdownIsOpen"  class="absolute right-0 w-48 py-2 mt-5 bg-theme-navbar rounded-md shadow-xl dark:bg-gray-800 z-50">
                <div class="px-4 pb-6">
                  <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">Main</h3>
                  <ul class="mb-8 text-sm font-medium">
                    <li v-for="(item,key) in navbar.main" :key="key">
                      <NuxtLink :to="item.href" :title="item.title" @click.native="dropdown_handler()" :class="getCurrentPage(item.namepage) ? 'bg-indigo-500' : 'hover:bg-gray-900'" class="flex items-center pl-3 py-3 pr-4 text-gray-50 rounded">
                        <span class="inline-block mr-3">
                          <code v-html="item.icon"></code>
                        </span>
                        <span>{{item.title}}</span>
                      </NuxtLink>
                    </li>
                  </ul>

                  <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">Secondary</h3>
                  <ul class="text-sm font-medium">
                    <li v-for="(item,key) in navbar.secondary" :key="key">
                      <NuxtLink :to="item.href" :title="item.title" :class="getCurrentPage(item.namepage) ? 'bg-indigo-500' : 'hover:bg-gray-900'" class="cursor-not-allowed flex items-center pl-3 py-3 pr-2 text-gray-50 rounded">
                        <span class="inline-block mr-3">
                          <code v-html="item.icon"></code>
                        </span>
                        <span>{{item.title}}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                  
                  <ul class="pt-8">
                  <li v-for="(item,key) in navbar.utility" :key="key">
                    <NuxtLink :to="item.href" :title="item.title" :class="getCurrentPage(item.namepage) ? 'bg-indigo-500' : 'hover:bg-gray-900'" class="flex items-center pl-3 py-3 pr-2 text-gray-50 rounded">
                      <span class="inline-block mr-4">
                        <code v-html="item.icon"></code>
                      </span>
                      <span>{{item.title}}</span>
                    </NuxtLink>
                    </li>
                  </ul>
                  
                </div>
            </div>
        </transition>
      </button>

  </div>


  <div class="hidden lg:block navbar-menu relative overflow-auto">
    <nav class="fixed top-14 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-theme-navbar">
      <div class="px-4 pb-6">
        <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">Main</h3>
        <ul class="mb-8 text-sm font-medium">
          <li v-for="(item,key) in navbar.main" :key="key">
            <NuxtLink :to="item.href" :title="item.title" :class="getCurrentPage(item.namepage) ? 'bg-indigo-500' : 'hover:bg-gray-900'" class="flex items-center pl-3 py-3 pr-4 text-gray-50 rounded">
              <span class="inline-block mr-3">
                <code v-html="item.icon"></code>
              </span>
              <span>{{item.title}}</span>
            </NuxtLink>
          </li>
        </ul>

        <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">Secondary</h3>
        <ul class="text-sm font-medium">
          <li v-for="(item,key) in navbar.secondary" :key="key">
            <NuxtLink :to="item.href" :title="item.title" :event="item.disabled ? '' : 'click'"  :class="[getCurrentPage(item.namepage) ? 'bg-indigo-500' : 'hover:bg-gray-900', item.disabled ? 'cursor-not-allowed' : '']" class="flex items-center pl-3 py-3 pr-2 text-gray-50 rounded">
              <span class="inline-block mr-3">
                <code v-html="item.icon"></code>
              </span>
              <span>{{item.title}}</span>
            </NuxtLink>
          </li>
        </ul>
        
        <ul class="pt-8">
        <li v-for="(item,key) in navbar.utility" :key="key">
          <NuxtLink :to="item.href" :title="item.title" :event="item.disabled ? '' : 'click'" :class="[getCurrentPage(item.namepage) ? 'bg-indigo-500' : 'hover:bg-gray-900', item.disabled ? 'cursor-not-allowed' : '']" class="flex items-center pl-3 py-3 pr-2 text-gray-50 rounded">
            <span class="inline-block mr-4">
              <code v-html="item.icon"></code>
            </span>
            <span>{{item.title}}</span>
          </NuxtLink>
          </li>
        </ul>
        
      </div>
    </nav>
  </div>

                  <div class="lg:ml-80 overflow-auto min-h-screen bg-theme-page">
                    <!-- MAIN CONTENT -->
                    <div class="md:pl-4 md:pr-4">
                        <div class="md:pt-24 pt-4">
                            <Nuxt />
                        </div>
                    </div>
                </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
              dropdownIsOpen: false,
              currentRoute: null,
                navbar: {
                    main: [ 
                        {title: 'Bookmarks', href: '/app', namepage: 'app', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg>`},
//                         {title: 'Favorites', href: '/app/favorites', enabled: false, namepage: 'app-favorites', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
// </svg>`},
                        {title: 'Bin', href: '/app/bin', namepage: 'app-bin', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>`},
                    ],
                    secondary: [
                        {title: 'Support Center', href: '/app/support-center', namepage: 'app-support-center', disabled: true,  icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`},
                    ],
                    utility: [  
                        {title: 'Settings', href: '/app/settings', namepage: 'app-settings', disabled: true, icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>`},
                        {title: 'Log Out', href: '/app/log-out', namepage: 'app-log-out', icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>`},
                    ],
                }
            }
        },
        methods: {
          getCurrentPage(item) {
            if (this.getrouteName === item) {
              return true
            } else return false
          },
          dropdown_handler() {
            this.dropdownIsOpen = !this.dropdownIsOpen
          }
        },
      computed: {
        getrouteName: function () {
            return this.$route.name
        },
    }
  }
</script>

<style lang="scss" scoped>

</style>