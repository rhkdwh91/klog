# 실행 중인 도커 컴포즈 확인
EXIST_A=$(sudo docker-compose -p klog-a -f docker-compose.a.yml ps | grep Up)

if [ -z "${EXIST_A}" ] # -z는 문자열 길이가 0이면 true. A가 실행 중이지 않다는 의미.
then
        # B가 실행 중인 경우
        START_CONTAINER=a
        TERMINATE_CONTAINER=b
        START_PORT=3001
        TERMINATE_PORT=3002
else
        # A가 실행 중인 경우
        START_CONTAINER=b
        TERMINATE_CONTAINER=a
        START_PORT=3002
        TERMINATE_PORT=3001
fi

echo "klog-${START_CONTAINER} up"

# 실행해야하는 컨테이너 docker-compose로 실행. -p는 docker-compose 프로젝트에 이름을 부여
# -f는 docker-compose파일 경로를 지정
sudo docker-compose -p klog-${START_CONTAINER} -f docker-compose.${START_CONTAINER}.yml up -d --build

sleep 5 # 실행되었으면 5초 대기

echo "next start!"
echo "change nginx server port"

# sed 명령어를 이용해서 아까 지정해줬던 service-url.inc의 url값을 변경해줍니다.
# sed -i "s/기존문자열/변경할문자열" 파일경로 입니다.
# 종료되는 포트를 새로 시작되는 포트로 값을 변경해줍니다.
sudo sed -i "s/${TERMINATE_PORT}/${START_PORT}/" /etc/nginx/conf.d/service-url.inc

# 새로운 포트로 nextjs 앱이 구동 되고, nginx의 포트를 변경해주었다면, nginx를 재시작해줍니다.
echo "nginx reload.."
sudo service nginx reload

# 기존에 실행 중이었던 docker-compose는 종료시켜줍니다.
echo "klog-${TERMINATE_CONTAINER} down"
sudo docker-compose -p klog-${TERMINATE_CONTAINER} -f docker-compose.${TERMINATE_CONTAINER}.yml down
echo "success deployment"