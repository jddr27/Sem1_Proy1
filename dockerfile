FROM node
WORKDIR /app
ADD . /app
RUN npm install
RUN npm init
RUN npm install express -save
RUN npm install mysql -save
RUN npm install body-parser -save
ENV PORT=3000
ENV IP="172.17.0.2"

CMD ["node","server.js"]
