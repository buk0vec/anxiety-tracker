# Anxiety Tracker

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbuk0vec%2Fanxiety-tracker.git&env=DATABASE_URL,PRIVATE_SITE_PASSWORD)

## Why?

Because I have anxiety and I sometimes have panic attacks. The goal of this web application is to provide objective daily anxiety and panic attack reporting as described in [Mastery of Your Anxiety and Panic](https://www.amazon.com/Mastery-Your-Anxiety-Panic-Treatments/dp/0195311353).

## Features

- Daily reporting of anxiety, depression, and worry levels
- Basic password-protection of the website and API routes
- Saves information in a Postgres database
- Panic attack reporting
- Average anxiety per week graph

## Demo videos

https://user-images.githubusercontent.com/39397198/211743102-afd465ce-e4de-470b-912b-f5c1e32d7ca6.mov

https://user-images.githubusercontent.com/39397198/211743148-b1395d1f-c676-45d2-b2aa-b5275915a0e7.mov

https://user-images.githubusercontent.com/39397198/211743157-8c796424-c89b-4339-86d1-c6971ee3d82a.mov

https://user-images.githubusercontent.com/39397198/211743165-3561a49c-13e4-406f-81c3-d9e79b26f55c.mov

https://user-images.githubusercontent.com/39397198/211743172-25e123b4-0def-47c2-be33-0546e1755d46.mov

## Technology Used

This project uses SvelteKit and Prisma. 

## Setup

1. `git clone https://github.com/buk0vec/anxiety-tracker.git`
2. `cd anxiety-tracker`
3. `yarn install`
4. Create a .env file and add a Postgres connection string to `DATABASE_URL` and a site password to `PRIVATE_SITE_PASSWORD`
5. Run `npx prisma db push` to push the Prisma schema to your database
6. `yarn dev` to start the development server!
