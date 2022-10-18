ARG  IMG_BASE=latest
FROM ghcr.io/disic/designgouvovh/base:${IMG_BASE}
MAINTAINER Olivier JAVAUX <olivier.javaux@ovhcloud.com>

# Install nginx

ARG VERSION=1.22.0

# start script for nginx
COPY run_all run_nginx /tmp/

# must be root to install everything
USER "root"

RUN \
  \
  # version to avoid cache \
  echo "version $VERSION" && \
  \
  # install needed packages \
  apk add --no-cache nginx nginx-mod-http-headers-more openssl && \
  \
  # copy run scripts in /root \
  mv /tmp/run_all /tmp/run_nginx /root && \
  chmod u+x,go= /root/run_all /root/run_nginx && \
  \
  # create nginx user \
  adduser -D -u 2002 dinum_nginx && \
  cp /root/.profile /home/dinum_nginx/.profile && \
  # add /var/lib/nginx because it is owned by root and perms are restricted \
  chown -R dinum_nginx:dinum_nginx /home/dinum_nginx /var/lib/nginx &&  \
  chmod -R go= /home/dinum_nginx /var/lib/nginx && \
  \
  # cleanup \
  find /var/cache/apk /tmp /var/tmp /run /var/log -mindepth 1 -delete -print

# Entrypoint is tini, add command to execute
CMD ["/root/run_all"]

# Run as root - nginx does privilege separation
# USER "root"
WORKDIR "/root"

# source /root/.profile even if not login shell
ENV ENV="/root/.profile"

# Do not expose ports. They will be exposed explicitly by k8s / start script
## EXPOSE 80 443
