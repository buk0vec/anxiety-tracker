# Anxiety Tracker

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbuk0vec%2Fanxiety-tracker.git&env=DATABASE_URL,PRIVATE_SITE_PASSWORD)

## Why?

Because I have anxiety and I sometimes have panic attacks. The goal of this web application is to provide objective daily anxiety and panic attack reporting as described in [Mastery of Your Anxiety and Panic](https://www.amazon.com/Mastery-Your-Anxiety-Panic-Treatments/dp/0195311353).

## Features

- Daily reporting of anxiety, depression, and worry levels
- Basic password-protection of the website and API routes
- Saves information in a Postgres database

## Todo

- Panic attack reporting

## Technology Used

This project uses SvelteKit and Prisma. 

## Setup

1. `git clone https://github.com/buk0vec/anxiety-tracker.git`
2. `cd anxiety-tracker`
3. `yarn install`
4. Create a .env file and add a Postgres connection string to `DATABASE_URL` and a site password to `PRIVATE_SITE_PASSWORD`
5. Run `npx prisma db push` to push the Prisma schema to your database
6. `yarn dev` to start the development server!