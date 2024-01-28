# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

RUN wget -q https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/local/bin/yq && chmod +x /usr/local/bin/yq
RUN wget -q https://github.com/hadolint/hadolint/releases/download/v2.12.0/hadolint-Linux-x86_64 -O /usr/local/bin/hadolint && chmod +x /usr/local/bin/hadolint
RUN apt-get update && apt-get install -y --no-install-recommends bash-completion tig && rm -rf /var/lib/apt/lists/*

# RUN echo '[alias]\n\
#     a = commit --amend --no-edit\n\
#     br = branch\n\
#     ci = commit\n\
#     d = diff\n\
#     dt = difftool\n\
#     ria = rebase -i --autosquash\n\
#     riam = rebase -i --autosquash origin/main\n\
#     s = status\n' >> /home/node/.gitconfig
