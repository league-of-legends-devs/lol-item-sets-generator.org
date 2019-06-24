FROM ubuntu:16.04

RUN apt-get update && \
  apt-get -y install sudo

RUN useradd -d /home/app -m -s /bin/bash app
RUN echo "app:app" | chpasswd && adduser app sudo && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER app

RUN mkdir -p /home/app/lisg/src
WORKDIR /home/app/lisg/src

RUN sudo apt-get -qq update && \
  sudo apt-get install -y --no-install-recommends curl bzip2 bsdtar build-essential python git wget

RUN curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
  sudo apt-get install -y nodejs npm

# fucking debian installs `node` as `nodejs`
RUN sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

RUN curl https://install.meteor.com/?release=1.3.2.4 | sh

COPY package.json .

RUN npm i iron-meteor

COPY . .
RUN sudo chown -R app:app app

# ENV METEOR_ALLOW_SUPERUSER true
RUN METEOR_SETTINGS=$(cat config/production/settings.json) ./node_modules/.bin/iron build

RUN ls -hali
RUN (cd build/bundle/programs/server && npm install)

ENV PORT 3000

CMD ['METEOR_SETTINGS=$(cat config/production/settings.json)', 'node', 'build/bundle/main.js', '--', '--env', 'production', '--release']
