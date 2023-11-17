<template>
    <div class="container">
        <div class="wrapper">
            <h2 class="text-center font-weight-bold">Add an Article</h2>
            <form name="addArticleForm" v-on:submit.prevent="onSubmit">
                <div class="form-group mb-3">
                    <label for="title" class="text-theme">Title: </label>
                    <input
                        type="text"
                        name="title"
                        v-model="article.title"
                        class="form-control"
                        placeholder=""
                        required
                    />
                </div>
                <div class="form-group mb-3">
                    <label for="content" class="text-theme">Content: </label>
                    <textarea
                        type="text"
                        name="content"
                        v-model="article.content"
                        class="form-control"
                        placeholder=""
                        required
                        rows="8"
                        style="resize: none"
                    ></textarea>
                </div>
                <div class="form-group mb-3">
                    <button
                        type="submit"
                        class="btn btn-success bg-theme form-control"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: {},
            user_id: null,
        };
    },
    emits: ["onAddArticleResult"],
    methods: {
        addArticle: async function (payload) {
            const result = await fetch("/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            return result;
        },
        onSubmit: async function () {
            const result = await this.addArticle({
                ...this.article,
                user_id: this.user_id,
                dateCreated: new Date(),
            });
            const data = await result.json();

            if (result.status === 201) {
                this.$router.push({ path: "/article" });
            }
        },
    },
    beforeMount() {
        this.user_id = localStorage.getItem("user_id");
    },
};
</script>

<style scoped>
.wrapper {
    margin: 5rem auto;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
