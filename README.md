# Snack Store REST API #
This is a project made for automating the billing process on a kiosk where snacks are sold.
## Setup
1. Clone the repository `git clone https://github.com/rdev32/Ravn-Challenge-V2-Renato.git`
2. Once inside the downloaded folder, run `npm install`
3. Create and fill your `.env` file as in `.env.example`
4. To generate the PostgreSQL database be sure to have docker installed and run `docker-compose up`
5. Migration to the database can be done with the command `npx prisma migrate deploy`
6. To get the models required for the application run `npx prisma generate`
7. After doing the stepts above, run `npm run build`
8. You can now start the application with `npm start`
## Documentation
Get to know the list of routes by entering `http://localhost:5000/docs`