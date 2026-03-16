const request = require("supertest");
const app = require("../server");

describe("Cart API", () => {

    it("should fail without token", async () => {

        const res = await request(app)
        .post("/api/cart")
        .send({
            product:"123",
            quantity:1
        });

        expect(res.statusCode).toBe(401);

    });

});