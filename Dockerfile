FROM node:lts-alpine as dependencies

ENV PORT=3000

HEALTHCHECK --interval=5s \
 --timeout=10s \
 --start-period=10s \
 --retries=5 \
 CMD curl -o /dev/null -s --fail http://localhost:$PORT/ping || exit 1

WORKDIR /app

COPY ./package.json ./yarn.lock /app/

RUN yarn install && yarn cache clean

COPY . .

FROM dependencies as development

VOLUME /app

ENTRYPOINT ["sh"]
CMD [ "/app/docker/dev/run.sh" ]

FROM dependencies

ENTRYPOINT ["yarn", "run"]
CMD [ "start" ]