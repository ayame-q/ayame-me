FROM node:16.14-alpine

COPY ./package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install -g npm && npm install

COPY . /usr/src/app
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod 755 /usr/local/bin/entrypoint.sh

ENV HOST 0.0.0.0
EXPOSE 8000

ENTRYPOINT [ "entrypoint.sh" ]
CMD npm run start
