FROM mongo:3.0.4

RUN apt-get update && \
	mkdir -p /data/db/snapcook && \
	mkdir /database

ADD database /database
COPY start-mongodb.sh /temp/start-mongodb.sh

#WORKDIR /database
#RUN sh /temp/start-mongodb.sh


EXPOSE 27017

CMD ["echo 'ciao'"]