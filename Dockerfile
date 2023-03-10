FROM node:16 As development

# Set the working directory
WORKDIR /presence-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# FROM node:16 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# # Set the working directory
# WORKDIR /presence-api

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /presence-api/dist ./dist

# CMD ["npm", "start"]