import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { CometChat } from '@cometchat-pro/chat'
import { cometChatConfig } from '@cometchat-pro/chat'

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const user = JSON.parse(localStorage.getItem('user'))

    if (requiresAuth && !user) {
        console.log('You are not authorized to access this area.')
        next('login')
    } else {
        next()
    }
})

const appID = "23506040eb3e267e"
const region = "us"
const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build()

console.log('Test', cometChatConfig)

CometChat.init(appID, appSetting)
    .then(() => {
        console.log('Initialization completed successfully')
            // You can now call login function.
        createApp(App).use(router).mount('#app')
    })
    .catch((error) => {
        console.log('Initialization failed with error:', error)
    })