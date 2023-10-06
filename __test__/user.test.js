const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../index');

const helper = require('../helpers/user.helper')

require("dotenv").config()

beforeEach(async() => {
    await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async() => {
    await mongoose.connection.close();
})

describe("Check User's route requests", () => {

    it("Get all users", async () => {
        const res = await request(app)
        .get('/api/users');

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 10000);

    it("Get a user", async () => {

        const result = await helper.findLastInsertedUser();

        const res = await request(app)
        .get('/api/users/' + result.username);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email);
    });

    it("Post create a user", async() => {
        
        const res = await request(app)
        .post('/api/users')
        .send({
            username: "test30",
            password: "12345",
            name: "name for test4",
            surname: "surname for test 4",
            email: "test30@aueb.gr"
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    });

    it("Post create a user that already exists", async() => {

        const result = await helper.findLastInsertedUser();

        const res = await request(app)
        .post('/api/users')
        .send({
            username: result.username,
            password: "11111",
            name: "new name",
            surname: "new surname",
            email: "new@aueb.gr"
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBeFalsy();
    })

    it("Patch update a user", async() => {
        const result = await helper.findLastInsertedUser();

        const res = await request(app)
        .patch("/api/users/" + result.username)
        .send({
            username: result.username,
            name: "new updated name 2",
            surname: "new updated surname 2",
            email: "new2@aueb.gr",
            address: {
                area: "area 10",
                road: "road 10"
            },
            phone: [
                {
                    type: "mobile",
                    number: "111111"
                }
            ]
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })

    it("Delete, delete a user", async() => {
        const result = await helper.findLastInsertedUser();

        const res = await request(app)
            .delete("/api/users/" + result.username);
            expect(res.statusCode).toBe(200);
    })
})