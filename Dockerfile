FROM node:14 as base

WORKDIR /app

# to be cached and npm i won't run if we didn't make a change to package.json
COPY package.json .


FROM base as development

RUN npm i

#copy all my files ( . ) to the working directory
COPY . .

CMD ["npm", "run", "start:dev"]

FROM base as production


RUN npm i --only=production

#copy all my files ( . ) to the working directory
COPY . .

CMD ["npm", "run", "start"]