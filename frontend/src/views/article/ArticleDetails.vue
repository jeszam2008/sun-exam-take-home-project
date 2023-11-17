<template>
    <div class="container pt-5">
        <div class="row">
            <div class="col-lg-7 col-md-6 col-12">
                <div class="wrapper d-flex flex-column">
                    <div class="article-header">
                        <h1 class="title">{{ article.title }}</h1>
                        <span
                            class="attributes d-flex flex-column justify-content-between"
                        >
                            <div>
                                <span class="user">
                                    <i class="fa fa-user mr-2"></i>
                                    <span
                                        >Posted By: {{ article.user_id }}</span
                                    >
                                </span>
                            </div>
                            <div>
                                <span class="datePosted">
                                    <span>
                                        <i class="fa fa-calendar mr-2"></i>
                                        Date Posted:
                                        {{ filteredDate(article.dateCreated) }}
                                    </span>
                                </span>
                            </div>
                        </span>
                    </div>
                    <hr />
                    <div class="article-content" v-html="article.content"></div>
                    <hr />
                    <div
                        class="comment-article d-flex flex-column"
                        v-if="!addComment"
                    >
                        <div class="text-right">
                            <button
                                class="btn btn-dark"
                                @click="
                                    () => {
                                        newComment = null;
                                        addComment = !addComment;
                                    }
                                "
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                    <form
                        name="addComment"
                        v-if="addComment"
                        v-on:submit.prevent="postComment(newComment)"
                    >
                        <div class="form-group mb-3">
                            <textarea
                                type="text"
                                name="content"
                                v-model="newComment"
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
                                class="btn btn-dark form-control"
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-5 col-md-6 col-12">
                <div class="comment-wrapper">
                    <div class="comment-header">
                        <h5 class="mb-0">Comments</h5>
                    </div>
                    <div v-if="!comments.length" class="text-center mt-5">
                        <span>No comment yet</span>
                    </div>
                    <div class="comment-section" v-if="comments.length">
                        <div
                            class="d-flex flex-column"
                            v-for="(comment, index) in comments"
                            :key="index"
                        >
                            <span class="user-name font-weight-bold">{{
                                comment.user_id
                            }}</span>
                            <span class="comment-content">{{
                                comment.comment
                            }}</span>
                            <span class="date">{{
                                filteredDate(comment.dateCreated)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            user_id: null,
            article_id: null,
            article: {},
            comments: [],
            addComment: false,
            newComment: null,
        };
    },
    methods: {
        filteredDate(date) {
            return moment(date).format("MMMM DD, yyyy hh:mm:ss A");
        },
        fetchArticle: async function (id) {
            const result = await fetch("/api/articles/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await result.json();
            this.article = data;
        },
        fetchComments: async function () {
            const result = await fetch(
                "/api/comments?" +
                    new URLSearchParams({
                        _sort: "dateCreated",
                        _order: "desc",
                        articleId: this.article_id,
                    }),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await result.json();
            this.comments = data;
        },
        addComments: async function (payload) {
            const result = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            return result;
        },
        postComment: async function (thisComment) {
            const result = await this.addComments({
                comment: thisComment,
                user_id: this.user_id,
                articleId: this.article_id,
                dateCreated: new Date(),
            });

            if (result.status === 201) {
                this.fetchComments();
                this.addComment = false;
                this.newComment = null;
            }
        },
    },
    beforeMount() {
        this.user_id = localStorage.getItem("user_id");
        this.article_id = this.$route.params["id"];
        this.fetchArticle(this.article_id);
        this.fetchComments();
    },
};
</script>

<style scoped>
.user,
.datePosted {
    font-size: 70%;
    font-style: italic;
}

.comment-wrapper {
    top: 1rem;
    position: sticky;
    height: 450px;
    border-radius: 0.5rem;
    border: 1px solid var(--light-theme);
}

.comment-wrapper .comment-header {
    min-height: 20px;
    color: #fff;
    padding: 0.5rem;
    background-color: var(--light-theme);
}
.comment-wrapper .comment-section {
    overflow-y: auto;
    height: calc(100% - 3rem);
    position: relative;
}

.comment-wrapper .comment-section .date {
    text-align: right;
    font-size: 60%;
    color: #82848a;
    font-style: italic;
}

.comment-wrapper .comment-section .user-name {
    font-weight: bold;
    font-size: 80%;
}
.comment-wrapper .comment-section .comment-content {
    font-size: 80%;
}

.comment-wrapper .comment-section div {
    padding: 0.25rem;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
}

.comment-wrapper .comment-section div:first-child {
    margin-top: 1rem;
}

.comment-wrapper .comment-section div:last-child {
    margin-bottom: 1rem;
}
</style>
