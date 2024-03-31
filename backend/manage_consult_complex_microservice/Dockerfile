FROM node:slim
WORKDIR /usr/src/app/manage_consult_complex_microservice

# Copy All Files
COPY . .
# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "index.js" ]

# Remember to add .dockerignore file to ignore node_modules and other files