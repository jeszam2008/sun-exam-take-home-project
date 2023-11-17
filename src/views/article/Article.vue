<template>
    <HeaderNavbar />
    <router-view />
</template>

<script>
import HeaderNavbar from "../../components/HeaderNavbar.vue";

export default {
    components: { HeaderNavbar },
    beforeMount() {
        if (!localStorage.getItem("user_id")) {
            this.$router.push({ path: "/login" });
        }
    },
};
</script>
