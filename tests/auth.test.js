const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {

  it("should register a user", async () => {

    const randomEmail = `user${Date.now()}@gmail.com`;

    const res = await request(app)
      .post("/api/user/register")
      .send({
        name: "Test User",
        email: randomEmail,
        password: "123456",
        role: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(randomEmail);

  });

});