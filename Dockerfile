FROM node:16

#PORT 선정
ENV PORT 3001
# TimeZone 설정
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

# 앱 디렉터리 생성
WORKDIR /usr/src/app

COPY package*.json ./
#ADD . /usr/src/app
RUN npm install --legacy-peer-deps

# pm2 설치
# RUN npm install -g pm2 

# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production
# ENV NODE_ENV production

# dockerfile을 실행하는 경로에서 소스 복사
COPY ./ ./

ENV NODE_ENV production

# 아래 포트로 매핑
# EXPOSE 3001

RUN npm run build:prod

# pm2-runtime으로 실행 
#CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
CMD ["npm", "run", "start:prod"]

#docker ps -a, docker ps, docker rm [imageId], docker image ls, docker rmi [imageId],
#docker build -t [tagName] ./ , docker run -dp 3001:3001 [tagName]
#docker-compose up --build -d