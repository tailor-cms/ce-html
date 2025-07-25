ARG PNPM_HOME="/root/.local/share/pnpm"
ARG PNPM_VERSION="10.12.3"

FROM node:24-alpine
ARG PNPM_VERSION
# github and ssh
RUN apk add openssh-client && apk add git
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan -H github.com >> ~/.ssh/known_hosts
# pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ENV PNPM_HOME=$PNPM_HOME
ENV PATH="${PATH}:${PNPM_HOME}"
# Copy codebase, install dependencies and start
WORKDIR /app
COPY ./ ./
RUN pnpm i
EXPOSE 8010 8020 8030 8080
CMD ["pnpm", "dev"]
