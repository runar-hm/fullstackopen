const  { test, page, request, beforeEach, describe, expect } = require('@playwright/test')
const { initBlogPosts, initUsers, loginWith, addBlog } = require('./helper')
const { before } = require('node:test')
const user = require('../../../part4/bloglist/models/user')

describe('test blogApp', () => {
    beforeEach( async ({ page, request }) => {
        await request.post('/api/testing/clearAll')

        await request.post('/api/users', {data:initUsers[0]})
        await request.post('/api/users', {data:initUsers[1]})        

        await page.goto('/')
    })

    test('loginForm is shown', async ({ page }) => {
        await expect(page.getByRole('heading', {name: 'Log in'})).toBeVisible()
        await expect(page.getByPlaceholder('username')).toBeVisible()
        await expect(page.getByPlaceholder('password')).toBeVisible()
        
    })

    describe('log in', () => {

        test('with correct credentials', async ({ page }) => {
            await loginWith(page, initUsers[0].username, initUsers[0].password)
            await expect(page.getByRole('button', { name: /log out/i })).toBeVisible()
        })

        test('with wrong credentials', async ({ page }) => {
            await loginWith(page, initUsers[0].username, initUsers[1].password)
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach( async ( { page }) => {
            await loginWith(page, initUsers[0].username, initUsers[0].password)
        })

        test('a new blog can be created', async ({ page }) => {
            
            addBlog(page, initBlogPosts[0])

            await expect(page.getByText(`${initBlogPosts[0].title} - ${initBlogPosts[0].author}`)).toBeVisible()
            
        })

        test('a blog can be liked', async ({ page }) => {
            addBlog(page, initBlogPosts[0])

            await page.getByRole('button', { name: 'expand' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('1like')).toBeVisible()

        })

        test('a blog can be deleted by user', async ({ page }) => {
            await addBlog(page, initBlogPosts[0])

            await page.getByRole('button', { name: 'expand' }).click()

            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'delete' }).click()

            await expect(page.getByText(`Blog "${initBlogPosts[0].title}" deleted`)).toBeVisible()
        })

        test('delete btn only shows on posts posted by logged in user', async ({ page }) => {
            await addBlog(page, initBlogPosts[0])
            
            const firstBlog = await page.getByText(`${initBlogPosts[0].title} - ${initBlogPosts[0].author}`)
            await expect(firstBlog).toBeVisible()

            await page.getByRole('button', { name: 'log out' }).click()
            await loginWith(page, initUsers[1].username, initUsers[1].password)
            await addBlog(page, initBlogPosts[1])
            
            const secondBlog = page.getByText(`${initBlogPosts[1].title} - ${initBlogPosts[1].author}`)
            await expect(secondBlog).toBeVisible()

            // Expand first blog and expect NO delete BTN
            await firstBlog.locator('..').getByRole('button', { name: 'expand' }).click()
            await expect(firstBlog.locator('..').getByRole('button', { name: 'delete' })).not.toBeVisible()

            // Expand second blog and expect delete BTN
            await secondBlog.locator('..').getByRole('button', { name: 'expand' }).click()
            await expect(secondBlog.locator('..').getByRole('button', { name: 'delete' })).toBeVisible()


        })
    })
})
