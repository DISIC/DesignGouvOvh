FROM alpine:3.16.2
MAINTAINER Olivier JAVAUX <olivier.javaux@ovhcloud.com>

COPY config/profile_ovh config/bashrc_add config/banner /tmp/

# image de base a partir de alpine avec ajout de tini et qques modifs
RUN \
  \
  # install tini \
  apk add --no-cache tini && \
  \
  # cleanup unused cron entries \
  sed -i -e 's/^\([0-9*]\)/## \1/' /etc/crontabs/root && \
  \
  # No history, Automatic deconnection and umask \
  cp /tmp/profile_ovh /etc/profile.d/ovh.sh && \
  chmod a+r /etc/profile.d/ovh.sh && \
  cat /tmp/bashrc_add > /root/.profile && \
  \
  # Banner \
  cp /tmp/banner /etc/issue && \
  cp /tmp/banner /etc/motd && \
  \
  # create dedicated user \
  adduser -D -u 2001 ovh_user && \
  cp /root/.profile /home/ovh_user/.profile && \
  chown -R ovh_user:ovh_user /home/ovh_user &&  \
  chmod -R go= /home/ovh_user && \
  \
  # cleanup \
  rm -f /tmp/profile_ovh /tmp/bashrc_add /tmp/banner && \
  find /var/cache/apk /tmp /var/tmp /run /var/log -mindepth 1 -delete -print

# entrypoint is tini
ENTRYPOINT ["/sbin/tini", "--"]

# rootless
USER "ovh_user"
WORKDIR "/home/ovh_user"

# source /home/ovh_user/.profile even if not login shell
ENV ENV="/home/ovh_user/.profile"

