FROM node:16 as build
ARG SERVICE=kareoke
WORKDIR /srv/package/
COPY ./common /srv/package/common
COPY ./services /srv/package/services
WORKDIR /srv/package/common
RUN npm ci
WORKDIR /srv/package/services/${SERVICE}
RUN npm ci


FROM node:16
ARG SERVICE=kareoke
USER node
WORKDIR /srv/package/
COPY --from=build /srv/package/common /srv/package/common
COPY --from=build /srv/package/services/${SERVICE} /srv/package/services/${SERVICE}
WORKDIR /srv/package/services/${SERVICE}
CMD npm run start
