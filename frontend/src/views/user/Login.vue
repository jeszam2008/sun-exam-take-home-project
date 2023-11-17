<template>
    <div class="login">
        <div class="container">
            <div class="wrapper p-4">
                <h1 class="mt-4 text-center font-weight-bold">
                    Bulletin Board
                </h1>
                <form
                    name="loginForm"
                    class="mt-5"
                    v-on:submit.prevent="onSubmit"
                >
                    <div class="form-group">
                        <label for="username" class="text-theme"
                            >Enter your username as guest:
                        </label>
                        <input
                            type="text"
                            name="username"
                            v-model="username"
                            class="form-control"
                            placeholder="Ex: jonnhy360"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <button
                            type="submit"
                            class="btn btn-success bg-theme form-control"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
        };
    },
    methods: {
        redirectTo(config) {
            this.$router.push(config);
        },
        getUser: async function (userId) {
            const result = await fetch(
                "/api/users?" + new URLSearchParams({ username: userId }),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return result;
        },
        registerUser: async function (userId) {
            const result = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: userId }),
            });

            return result;
        },
        onSubmit: async function () {
            let result = await this.getUser(this.username);
            let data = await result.json();

            if (!data.length) {
                result = await this.registerUser(this.username);
                data = await result.json();

                if (result.status === 201) {
                    localStorage.setItem("user_id", this.username);
                    this.redirectTo({ path: "/" });
                }
            } else {
                localStorage.setItem("user_id", this.username);
                this.redirectTo({ path: "/" });
            }
        },
    },
    beforeMount() {
        if (localStorage.getItem("user_id")) {
            this.redirectTo({ path: "/" });
        }
    },
};
</script>

<style scoped>
.login .wrapper {
    margin: 5rem auto;
    width: 100%;
    max-width: 450px;
    border: 1px solid var(--light-theme);
}
</style>
