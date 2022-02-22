FROM node:16.14-alpine

COPY ./package.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install -g npm && npm install

COPY . /usr/src/app
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod 755 /usr/local/bin/entrypoint.sh

RUN cp -rf /usr/src/app/node_modules/pdfjs-dist/cmaps /usr/src/app/static/

RUN chown -R node /usr/src/app/node_modules

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT [ "entrypoint.sh" ]
# DEBUG=falseの場合の実行コマンド
CMD npm run build && npm run generate
