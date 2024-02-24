const { test, expect } = require('@playwright/test');
import MailosaurClient from "mailosaur";

const api_key = process.env.API_KEY;
const server_id = process.env.SERVER_ID;
const mailosaur = new MailosaurClient(api_key);
const testEmailAddress = `feet-yourself@${server_id}.mailosaur.net`;

test.describe("Send an email and test its content:", () => {
    test('Mailosaur Test', async({ page }) => {
    await page.goto('https://example.mailosaur.com/password-reset');
    await page.fill('#email', testEmailAddress);
    await page.click('button[type="submit"]');
    const email = await mailosaur.messages.get(server_id,{
        sentTo: testEmailAddress,
    });
    await expect(email.subject).toBe('Set your new password for ACME Product');
});
})
