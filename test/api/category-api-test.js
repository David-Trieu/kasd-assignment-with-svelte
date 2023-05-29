import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testCategory, testuser, testCategories} from "../fixtures.js";

suite("Category API tests", () => {
    setup(async () => {
        await placemarkService.deleteAllCategories();
        const user1 = await placemarkService.createUser(testuser)
        for (let i = 0; i < testCategories.length; i += 1) {
            testCategories[0] = await placemarkService.createCategory(user1._id, testCategories[i]);
        }
    });
    teardown(async () => {});

    test("create a category", async () => {
        const user = await placemarkService.createUser(testuser)
        const newCategory = await placemarkService.createCategory(user._id, testCategory);
        assertSubset(testCategory, newCategory);
        assert.isDefined(newCategory._id);
    });

    test("delete all category", async () => {
        let returnedCategories = await placemarkService.getAllCategories();
        assert.equal(returnedCategories.length, 3);
        await placemarkService.deleteAllCategories();
        returnedCategories = await placemarkService.getAllCategories();
        assert.equal(returnedCategories.length, 0);
    });

    test("get a category", async () => {
        const returnedCategory = await placemarkService.getCategory(testCategories[0]._id);
        assert.deepEqual(testCategories[0], returnedCategory);
    });
    test("get a category - bad id", async () => {
        try {
            const badCategory = await placemarkService.getCategory("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No category with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a category - deleted Category", async () => {
        await placemarkService.deleteAllCategories();
        try {
            const badCategory2 = await placemarkService.getCategory(testCategories[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No category with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});