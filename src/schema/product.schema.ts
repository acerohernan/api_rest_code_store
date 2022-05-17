import { number, object, string } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Name is required"
        }).min(6, "Product name need at least 6 letters."),
        code: string({
            required_error: "Code is required"
        }).length(6, "Code must have 6 characteres"),
        price: number({
            required_error: "Price is required"
        }),
        stars: number({
            required_error: "Stars is required"
        }),
        description: string({
            required_error: "Description is required"
        }),
        image_url: string({
            required_error: "Image Url is required"
        }),
    }),
};

const params = {
    params: object({
        productId: string({
            required_error: "The product id is required."
        })
    })
};

export const findProductSchema = object({
    ...params
});

export const createProductSchema = object({
    ...payload,
});

export const updateProductSchema = object({
    ...payload,
    ...params
});

export const deleteProductSchema = object({
    ...params
});