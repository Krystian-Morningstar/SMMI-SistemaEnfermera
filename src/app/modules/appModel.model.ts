import { signal } from "@angular/core"

    var isLogged = signal(false)
    var userTapOpened = signal(false)

    function getLoggedStatus(): boolean{
        return isLogged()
    }

    function getUserTabStatus(): boolean{
        return userTapOpened()
    }

    function login(){
        isLogged.set(true)
    }

    function logout(){
        isLogged.set(false)
    }

    function switchTab(){
        userTapOpened.set(!userTapOpened())
    }

    export {getLoggedStatus, getUserTabStatus, login, logout, switchTab}