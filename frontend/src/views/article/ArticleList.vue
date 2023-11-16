<template>
    <div class="container d-flex flex-column pt-5">
        <div class="text-right mb-4">
            <button type="button" class="btn btn-success">
                <i class="fa fa-plus mr-1"></i>
                <span>Create New Article</span>
            </button>
        </div>
        <article class="wrapper">
            <div class="row">
                <div
                    class="col-lg-4 col-md-6"
                    v-for="(x, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    :key="index"
                >
                    <div
                        class="card mb-4 cursor-pointer"
                        @click="redirectToDetails"
                    >
                        <div class="card-header text-white">
                            <span class="text-sm">
                                Headersaaaaaaaaasssssssssssssssssssssssssssssssssssssssssssssssssssssss
                            </span>
                        </div>
                        <div class="card-body">Content</div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    methods: {
        redirectToDetails: function (event) {
            console.log("sasa");
            this.$router.push({ path: "article/details" });
        },
    },
};
</script>
