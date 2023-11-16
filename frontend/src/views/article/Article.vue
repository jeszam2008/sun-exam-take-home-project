<template>
    <nav class="navbar navbar-expand-md bg-theme navbar-dark">
        <div class="container">
            <router-link :to="{ path: '/' }" class="navbar-brand">
                <span class="font-weight-bold">Bulletin Board</span>
            </router-link>
            <ul class="navbar-nav d-flex flex-row justify-content-between">
                <li class="nav-item mr-2">
                    <button
                        type="button"
                        class="btn btn-success btn-sm text-white"
                    >
                        <i class="fa fa-sign-out mr-1"></i>
                        <span>Sign Out</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>
    <router-view />
</template>
