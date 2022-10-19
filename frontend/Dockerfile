FROM azuneed.azurecr.io/base-alpine:3.12.3
MAINTAINER Olivier JAVAUX <olivier.javaux@balc.fr>

# create Azuneed webapp image
# nginx config will be loaded at runtime using configmap

ARG VERSION=1.0

# nginx config
ADD config /tmp/config/

# webapp files (lateron clone git repo and co)
ADD webapp.tar.gz /data/webapp/
ADD maintenance.tar.gz /data/maintenance/

# copy files
COPY run_nginx /tmp/

RUN \
  \
  # version to avoid cache \
  echo "version $VERSION" && \
  \
  # install needed packages \
  while (! apk add --no-cache nginx nginx-mod-http-geoip2 nginx-mod-http-headers-more); do sleep 1; done && \
  \
  # copy run scripts in /root
  mv /tmp/run_nginx /root && \
  chmod u+x,go= /root/run_nginx && \
  \
  # create nginx user \
  adduser -D -u 2208 dpl_nginx && \
  cp /root/.profile /home/dpl_nginx/.profile && \
  # add /var/lib/nginx because it is owned by root and perms are restricted \
  chown -R dpl_nginx:dpl_nginx /home/dpl_nginx /var/lib/nginx &&  \
  chmod -R go= /home/dpl_nginx /var/lib/nginx && \
  \
  # limit rights on file \
  chmod -R g=rX,o= /data /etc/nginx && \
  chown -R root:dpl_nginx /data && \
  \
  # nginx config \
  rm -rf /etc/nginx && \
  mkdir /etc/nginx /etc/nginx_user && \
  tar -C /tmp/config/common/config_nginx -cf - . | tar -C /etc/nginx -xf - && \
  tar -C /tmp/config/rh-azuneed/config_nginx -cf - . | tar -C /etc/nginx -xf - && \
  tar -C /tmp/config/common/config_nginx_user -cf - . | tar -C /etc/nginx_user -xf - && \
  tar -C /tmp/config/rh-azuneed/config_nginx_user -cf - . | tar -C /etc/nginx_user -xf - && \
  rm -rf tmp/config && \
  chown -R root:root /etc/nginx && \
  chown -R root:2208 /etc/nginx_user && \
  chmod -R go= /etc/nginx && \
  chmod -R g=rX,o= /etc/nginx_user && \
  \
  # cleanup \
  find /var/cache/apk /tmp /var/tmp /run /var/log -mindepth 1 -delete -print

# Run as root - nginx does privilege separation
USER root

# Entrypoint is tini, add command to execute
CMD ["/root/run_nginx"]
