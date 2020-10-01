From fedora:latest

MAINTAINER Kumar Vipin Yadav "kumarvipinyadav369@gmail.com"

Run yum -y update && \
    yum -y install git npm && \
    git clone https://github.com/vipin3699/imagematch.git && \

WORKDIR imagematch

RUN npm i


ENTRYPOINT ["npm"]
CMD ["start"]