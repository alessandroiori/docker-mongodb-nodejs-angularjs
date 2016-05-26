FROM node:6.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /app
COPY ./webapp /app
WORKDIR /app/webapp

RUN npm install

EXPOSE 3000

CMD [ "echo", "ok" ]

