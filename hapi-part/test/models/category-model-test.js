import { assert } from "chai";
import { db } from "../../src/model/db.js";
import {testCategory, testCategories, testuser,} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("category Model tests", () => {

    setup(async () => {
        db.init();
        await db.categoryStore.deleteAllCategories();
        const user = await db.userStore.addNewUser(testuser);
        for (let i = 0; i < testCategories.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testCategories[i] = await db.categoryStore.addCategory(user._id, testCategories[i]);
        }
    });

    test("create a category", async () => {
        const user = await db.userStore.addNewUser(testuser);
        const newCategory = await db.categoryStore.addCategory(user._id, testCategory);
        assertSubset(testCategory, newCategory);
    });

    test("delete all category", async () => {
        let returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories.length, 3);
        await db.categoryStore.deleteAllCategories();
        returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories.length, 0);
    });

    test("get a category - success", async () => {
        const user = await db.userStore.addNewUser(testuser);
        const category = await db.categoryStore.addCategory(user._id,testCategory);
        const returnedcategory1 = await db.categoryStore.getCategoryById(category._id);
        assert.deepEqual(category, returnedcategory1);
    });

    test("delete One category - success", async () => {
        await db.categoryStore.deleteCategoryById(testCategories[0]._id);
        const returnedcategorys = await db.categoryStore.getAllCategories();
        assert.equal(returnedcategorys.length, testCategories.length - 1);
        const deletedcategory = await db.categoryStore.getCategoryById(testCategories[0]._id);
        assert.isNull(deletedcategory);
    });

    test("get a category - bad params", async () => {
        assert.isNull(await db.categoryStore.getCategoryById(""));
        assert.isNull(await db.categoryStore.getCategoryById());
    });

    test("delete One category - fail", async () => {
        await db.categoryStore.deleteCategoryById("bad-id");
        const allcategorys = await db.categoryStore.getAllCategories();
        assert.equal(testCategories.length, allcategorys.length);
    });
});
