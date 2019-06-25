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

RUN nodejs --version

# fucking debian installs `node` as `nodejs`
RUN sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 4

RUN node --version

# PhantomJS
WORKDIR /usr/local/share
RUN sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
  sudo tar xjf phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
  sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/share/phantomjs && \
  sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && \
  sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/phantomjs
RUN sudo apt-get install -y libfreetype6 fontconfig

RUN curl https://install.meteor.com/?release=1.4.4.5 | sh

RUN mkdir ~/.npm-global
RUN npm config set prefix '~/.npm-global'
RUN export PATH=~/.npm-global/bin:$PATH
RUN npm config get prefix

COPY package.json .

RUN npm i iron-meteor

COPY . .
RUN sudo chown -R app:app app

WORKDIR /home/app/lisg/src

# ENV METEOR_ALLOW_SUPERUSER true
# ENV METEOR_SETTINGS $(cat config/production/settings.json)
# RUN ls -hali
RUN METEOR_SETTINGS=$(cat config/production/settings.json) sudo ./node_modules/.bin/iron build

RUN ls -hali
RUN (cd build/bundle/programs/server && npm install)

ENV PORT 3000

CMD ['METEOR_SETTINGS=$(cat config/production/settings.json)', 'node', 'build/bundle/main.js', '--', '--env', 'production', '--release']
