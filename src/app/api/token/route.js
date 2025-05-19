import { NextResponse } from "next/server"
import puppeteer from "puppeteer";

export const GET = async (request) => {
    try {

        const res = await fetch('https://dlrms.land.gov.bd/', {method: "GET"});
        console.log('your header is : ',res);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://dlrms.land.gov.bd/");
        const cookies = await page.cookies();
        // const token = cookies.find(cookie => cookie.name === 'dlrms_app_token')?.value;
        console.log('Your cookies is : ', cookies); // 👉 "Plqjc5sCUIRckdH36DGbm9MdQxtNYr9Jy0y="

        // await browser.close();
        return NextResponse.json({ message: 'token' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed' });
    }
}

