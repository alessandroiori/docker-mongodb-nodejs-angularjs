FROM node:6.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /app
ADD webapp /app
WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

