<template>
    <div class="container d-flex flex-column pt-5">
        <div class="d-flex justify-content-between">
            <h3 class="text-left">Articles</h3>
            <button
                type="button"
                class="btn btn-success text-right mb-4"
                @click="redirectPage({ path: '/article/add' })"
            >
                <i class="fa fa-plus mr-1"></i>
                <span>Create New Article</span>
            </button>
        </div>

        <article class="wrapper">
            <div class="row">
                <div
                    class="col-lg-4 col-md-6"
                    v-for="(article, index) in articles"
                    :key="article.id"
                >
                    <div
                        class="card mb-4 cursor-pointer"
                        @click="
                            redirectPage({
                                path: 'article/details',
                                name: 'article-details',
                                params: { id: article.id },
                            })
                        "
                    >
                        <div class="card-header text-white">
                            <span class="title font-weight-bold">
                                {{ article.title }}
                            </span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <span class="user">
                                <i class="fa fa-user mr-2"></i>
                                <span>Posted By: {{ article.user_id }}</span>
                            </span>
                            <span class="datePosted">
                                <span>
                                    <i class="fa fa-calendar mr-2"></i>
                                    Date Posted:
                                    {{ filteredDate(article.dateCreated) }}
                                </span>
                            </span>
                            <span class="content">
                                {{
                                    article.content.length > 100
                                        ? article.content.slice(0, 100) +
                                          "......."
                                        : article.content
                                }}
                            </span>
                            <button
                                v-if="article.user_id === user_id"
                                title="Delete Article"
                                type="button"
                                class="btn btn-danger btn-delete"
                                @click.stop="openConfirmationToDelete(article)"
                            >
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="text-center col-12"
                    v-if="!articles.length && !isLoading"
                >
                    <h2>No articles to show</h2>
                </div>
                <div
                    class="text-center col-12"
                    v-if="!articles.length && isLoading"
                >
                    <h2>Loading data..</h2>
                </div>
            </div>
        </article>
        <ConfirmationModal
            v-if="openConfirmationModal"
            :payload="modalPayload"
            @onClose="onCloseModal($event)"
        />
    </div>
</template>

<script>
import moment from "moment";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

export default {
    components: { ConfirmationModal },
    data() {
        return {
            user_id: null,
            isLoading: false,
            articles: [],
            openConfirmationModal: false,
            modalPayload: null,
        };
    },
    methods: {
        redirectPage(config) {
            this.$router.push(config);
        },
        deleteArticle: async function (id) {
            const result = await fetch("/api/articles/" + id, {
                method: "DELETE",
                headers: { "Content-type": "application/json" },
            });
            return result;
        },
        fetchArticles: async function () {
            this.isLoading = true;
            const result = await fetch("/api/articles", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await result.json();
            this.articles = data;
            this.isLoading = false;
        },
        filteredDate(date) {
            return moment(date).format("MMMM DD, yyyy hh:mm:ss A");
        },
        openConfirmationToDelete(payload) {
            this.modalPayload = payload;
            this.openConfirmationModal = true;
        },
        onCloseModal: async function ({ isConfirm, payload }) {
            if (isConfirm) {
                const result = await this.deleteArticle(payload.id);

                if (result.status === 200) {
                    this.fetchArticles();
                }
            }
            this.openConfirmationModal = false;
        },
    },
    mounted() {
        this.user_id = localStorage.getItem("user_id");
        this.isLoading = true;
        this.fetchArticles();
    },
};
</script>

<style scoped>
article .card:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

article .card .card-header {
    color: #fff;
    background-color: var(--light-theme) !important;
}
.card-body .user,
.card-body .datePosted {
    font-size: 70%;
    font-style: italic;
}

.card-body .content {
    font-size: 80%;
    margin-top: 1rem;
}

.card-body .btn-delete {
    right: 0;
    bottom: 0;
    margin: 1rem;
    position: absolute;
    opacity: 0.3;
    border-radius: 100%;
    transition: opacity 0.2s;
    z-index: 99;
}
.card-body .btn-delete:hover {
    opacity: 1;
}
</style>
