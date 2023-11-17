<template>
    <div class="container">
        <div class="modal fade show" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Confirmation</h4>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            @click="closeModal({ isConfirm: false, payload })"
                        >
                            &times;
                        </button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <p>Are you sure you want to delete this article?</p>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-sm bg-theme btn-success"
                            data-dismiss="modal"
                            @click="closeModal({ isConfirm: true, payload })"
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            data-dismiss="modal"
                            @click="closeModal({ isConfirm: false, payload })"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["payload"],
    data() {
        return {
            isConfirm: false,
        };
    },
    methods: {
        closeModal(payload) {
            this.$emit("onClose", payload);
        },
    },
    emits: ["onConfirmation"],
};
</script>

<style scoped>
.modal {
    display: block;
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal .fade {
    transition: opacity 0.15s linear;
}
</style>
