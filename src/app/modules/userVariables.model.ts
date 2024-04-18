var isVisible: boolean = false;
var isLogged: boolean = true;

function toggleTabVisibility(){
    isVisible = !isVisible
}

function switchLogin(){
    isLogged = !isLogged;
}

export { isVisible, isLogged, toggleTabVisibility, switchLogin }