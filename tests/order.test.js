const request = require("supertest");
const app = require("../server");

describe("Order API", () => {

    it("should not create order without auth", async () => {

        const res = await request(app)
        .post("/api/orders");

        expect(res.statusCode).toBe(401);

    });

});