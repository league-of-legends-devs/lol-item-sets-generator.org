# FROM ubuntu:16.04
FROM node:4.8.4-stretch

RUN apt-get update && \
  apt-get -y install --no-install-recommends curl bzip2 bsdtar build-essential python git wget sudo

# RUN useradd -d /home/app -m -s /bin/bash app
# RUN echo "app:app" | chpasswd && adduser app sudo && echo "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
# USER app
RUN echo "node:node" | chpasswd && adduser node sudo && echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER node

RUN mkdir -p ~/lisg/src
WORKDIR ~/lisg/src

# RUN curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
#   sudo apt-get install -y nodejs npm

# RUN nodejs --version

# # fucking debian installs `node` as `nodejs`
# RUN sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 4

# RUN node --version

# # PhantomJS
# WORKDIR /usr/local/share
# RUN sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
#   sudo tar xjf phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
#   sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/share/phantomjs && \
#   sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && \
#   sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/phantomjs
# RUN sudo apt-get install -y libfreetype6 fontconfig

ENV METEOR_NO_RELEASE_CHECK true
ENV METEOR_ALLOW_SUPERUSER true

RUN mkdir -p ~/.meteor

# RUN curl https://install.meteor.com/?release=1.3.2.4 | sh
# RUN curl https://install.meteor.com/?release=1.4.4.5 | sh
RUN curl https://install.meteor.com/?release=1.8.0.2 | sh

# RUN mkdir ~/.npm-global
# RUN npm config set prefix '~/.npm-global'
# ENV PATH ~/.npm-global/bin:$PATH
# RUN npm config get prefix

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

COPY package.json .

# --prefix ~/.npm-global
ENV NODE_PATH ~/.npm-global/node_modules
# RUN npm i -g iron-meteor@1.5.3
RUN npm i -g iron-meteor@1.8.1
# RUN npm i -g mup
# RUN sudo chown -R $(whoami):$(whoami) ~/.npm-global

WORKDIR ~/lisg/src

COPY . .
RUN sudo chown -R node:node app

# RUN ~/.npm-global/bin/iron mup prod

# RUN ls -hali
# RUN iron build
# meteor build /~/lisg/src/~/lisg/src/build --directory
RUN cd app && METEOR_SETTINGS=$(cat ../config/production/settings.json) /home/node/.meteor/meteor build ~/lisg/src/build --directory

RUN (cd build/bundle/programs/server && npm install)
# RUN (cd build/bundle/programs/server && npm uninstall fibers && npm install fibers)

ENV PORT 3000

CMD ['node', 'build/bundle/main.js', '--', '--env', 'production', '--release']
