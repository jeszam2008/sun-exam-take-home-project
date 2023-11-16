<template>
    <div class="container pt-5">
        <div class="row">
            <div class="col-lg-7 col-md-6 col-12">
                <span v-for="(x, index) in [1, 2]">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam magnam, labore quidem voluptates, omnis corporis
                    laborum, velit quibusdam similique architecto autem dicta
                    libero accusantium? Voluptatum doloribus tenetur labore
                    dolores perferendis. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Animi ratione voluptates exercitationem
                    hic vero magni? Incidunt optio, architecto natus, culpa sed
                    illum numquam tenetur nostrum inventore alias dolore eius
                    corporis.
                </span>
            </div>
            <div class="col-lg-5 col-md-6 col-12">
                <div class="comment-wrapper">
                    <div class="comment-header">
                        <h5 class="mb-0">Comments</h5>
                    </div>
                    <div class="comment-section">
                        <div
                            class="d-flex flex-column"
                            v-for="(x, index) in [1, 2, 3, 4, 5, 6, 7]"
                        >
                            <span class="user-name font-weight-bold"
                                >xxxxx</span
                            >
                            <span class="comment-content">Lorem</span>
                            <span class="date">August 12. 2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
