From fedora:latest

MAINTAINER Kumar Vipin Yadav "kumarvipinyadav369@gmail.com"

Run yum -y update && \
    yum -y install git npm && \
    git clone https://github.com/vipin3699/imagematch.git

WORKDIR imagematch

EXPOSE 8080
RUN npm i


ENTRYPOINT ["npm"]
CMD ["start"]