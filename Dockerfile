FROM node:16

#PORT 선정
# ENV PORT 3001
# TimeZone 설정
#RUN apk --no-cache add tzdata && \
 #       cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  #      echo "Asia/Seoul" > /etc/timezone

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
#docker run --rm -it -dp 3001:3001 ubuntu:20.04 /bin/sh
#docker-compose up --build -d
#docker-compose up
#docker-compose up -d : docker run의 -d 옵션과 동일
#docker-compose up --force-recreat : 컨테이너를 새로 만들기
#docker-compose up --build : 도커 이미지를 다시 빌드(build로 선언했을 때만)

#멈춘 컨테이너를 재개
#docker-compose start
#docker-compose start wordpress : wordpress 컨테이너만 재개

#restart
#docker-compose restart
#docker-compose restart klog //klog 컨테이너만 재시작

#stop
#docker-compose stop
#docker-compose stop klog //klog 컨테이너만 멈춤

#down
#docker-compose down 컨테이너를 종료하고 삭제
#docker-compose down --rmi all 전체삭제
#docker-compose rm

#logs
#docker-compose logs
#docker-compose logs -f: 로그 follow

#build
#컨테이너 build 부분에 정의된 내용대로 빌드
#build로 선언된 컨테이너만 빌드됨
#docker-compose build
#docker-compose build wordpress : wordpress 컨테이너만 build